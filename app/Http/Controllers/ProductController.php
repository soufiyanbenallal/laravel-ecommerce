<?php

namespace App\Http\Controllers;

use Shopper\Core\Models\Product;
use Shopper\Core\Models\Review;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function show(string $slug): Response
    {
        $product = Product::with(['media', 'categories', 'options', 'variants', 'prices'])
            ->publish()
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Shop/product.show', [
            'product' => $this->formatProductDetail($product),
            'related_products' => $this->getRelatedProducts($product),
            'reviews' => $this->getProductReviews($product),
            'review_stats' => $this->getReviewStats($product),
        ]);
    }

    protected function formatProductDetail($p)
    {
        return [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'description' => $p->description,
            'price' => (float) ($p->prices->first()?->amount ?? 0),
            'old_price' => (float) ($p->prices->first()?->compare_amount ?? 0),
            'currency' => $p->prices->first()?->currency_code ?? 'MAD',
            'sku' => $p->sku,
            'stock' => $p->stock,
            'stock_status' => $p->stock > 0 ? 'in_stock' : 'out_of_stock',
            'metadata' => $p->metadata ?? [
                'emoji' => '📱',
                'condition' => 'Neuf · Import Direct',
                'warranty' => '12 mois',
                'origin' => 'Shenzhen, Chine',
            ],
            'categories' => $p->categories->map(fn($c) => ['name' => $c->name, 'slug' => $c->slug]),
            'attributes' => $p->options->map(fn($a) => [
                'name' => $a->name, 
                'value' => $a->pivot->attribute_custom_value ?? $a->values->firstWhere('id', $a->pivot->attribute_value_id)?->value ?? ''
            ]),
            'image' => $p->getFirstMediaUrl(config('shopper.media.storage.collection_name', 'uploads')),
            'gallery' => $p->getMedia(config('shopper.media.storage.collection_name', 'uploads'))->map(fn($m) => [
                'id' => $m->id,
                'url' => $m->getUrl(),
                'thumb' => $m->getUrl('medium'),
            ]),
        ];
    }

    protected function getProductReviews($p): array
    {
        return $p->ratings()
            ->where('approved', true)
            ->with('author')
            ->latest()
            ->limit(20)
            ->get()
            ->map(fn($r) => [
                'id' => $r->id,
                'rating' => $r->rating,
                'title' => $r->title,
                'content' => $r->content,
                'is_recommended' => $r->is_recommended,
                'created_at' => $r->created_at->toIso8601String(),
                'author' => [
                    'name' => $r->author?->full_name ?? 'Anonyme',
                    'avatar' => $r->author?->picture,
                ],
            ])
            ->values()
            ->all();
    }

    protected function getReviewStats($p): array
    {
        $reviews = $p->ratings()->where('approved', true);
        $total = $reviews->count();
        $avg = $total > 0 ? round($reviews->avg('rating'), 1) : 0;

        $distribution = [5 => 0, 4 => 0, 3 => 0, 2 => 0, 1 => 0];
        foreach ($reviews->pluck('rating') as $r) {
            $distribution[(int) $r] = ($distribution[(int) $r] ?? 0) + 1;
        }

        return [
            'average' => $avg,
            'total' => $total,
            'distribution' => $distribution,
            'recommendation_rate' => $total > 0
                ? round($p->ratings()->where('approved', true)->where('is_recommended', true)->count() / $total * 100)
                : 0,
        ];
    }

    protected function getRelatedProducts($p)
    {
        $categoryIds = $p->categories->pluck('id');

        $related = Product::where('id', '!=', $p->id)
            ->publish()
            ->with(['media', 'prices'])
            ->when($categoryIds->isNotEmpty(), fn($q) => $q->whereHas('categories', fn($cq) => $cq->whereIn('id', $categoryIds)))
            ->take(4)
            ->get();

        if ($related->count() < 4) {
            $existing = $related->pluck('id')->push($p->id)->toArray();
            $more = Product::whereNotIn('id', $existing)
                ->publish()
                ->with(['media', 'prices'])
                ->take(4 - $related->count())
                ->get();
            $related = $related->concat($more);
        }

        return $related->map(fn($rp) => [
            'id' => $rp->id,
            'name' => $rp->name,
            'slug' => $rp->slug,
            'price' => (float) ($rp->prices->first()?->amount ?? 0),
            'old_price' => (float) ($rp->prices->first()?->compare_amount ?? 0),
            'currency' => $rp->prices->first()?->currency_code ?? 'MAD',
            'image' => $rp->getFirstMediaUrl(config('shopper.media.storage.collection_name', 'uploads')),
            'metadata' => ['emoji' => '📦'],
        ])->values()->all();
    }
}
