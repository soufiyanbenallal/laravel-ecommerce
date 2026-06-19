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
        $price = $p->prices->first();
        return [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'description' => $p->description,
            'price' => (float) (($price?->amount ?? 0) / 10),
            'old_price' => $price?->compare_amount ? (float) ($price->compare_amount / 10) : null,
            'currency' => $price?->currency_code ?? 'MAD',
            'sku' => $p->sku,
            'stock' => $p->stock,
            'stock_status' => $p->stock > 0 ? 'in_stock' : 'out_of_stock',
            'rating' => (float) ($p->metadata['rating'] ?? 4.8),
            'reviews_count' => (int) ($p->metadata['reviews_count'] ?? 120),
            'colors' => $p->metadata['colors'] ?? [],
            'sizes' => $p->metadata['sizes'] ?? [],
            'materials' => $p->metadata['materials'] ?? [],
            'gender' => $p->metadata['gender'] ?? 'Unisex',
            'badge' => $p->metadata['badge'] ?? null,
            'category' => $p->categories->first()?->name ?? 'Apparel',
            'metadata' => $p->metadata ?? [],
            'image' => $p->getFirstMediaUrl(config('shopper.media.storage.collection_name', 'uploads')),
            'gallery' => $p->getMedia(config('shopper.media.storage.collection_name', 'uploads'))->map(fn($m) => $m->getUrl())->values()->all(),
        ];
    }

    protected function getProductReviews($p): array
    {
        // Fallback to mock on-brand reviews if database is empty
        $dbReviews = $p->ratings()
            ->where('approved', true)
            ->with('author')
            ->latest()
            ->limit(20)
            ->get();

        if ($dbReviews->isEmpty()) {
            return [
                [
                    'id' => 1,
                    'rating' => 5,
                    'title' => 'Worth every cent.',
                    'content' => 'The weight, the drape, the colour — all exactly as described. This will be a winter staple for years.',
                    'created_at' => now()->subDays(12)->toIso8601String(),
                    'author' => ['name' => 'Élise M.']
                ],
                [
                    'id' => 2,
                    'rating' => 5,
                    'title' => 'Quietly perfect.',
                    'content' => 'I almost wish it were louder so I could tell everyone about it. The fit is generous but tidy.',
                    'created_at' => now()->subDays(24)->toIso8601String(),
                    'author' => ['name' => 'Henrik R.']
                ]
            ];
        }

        return $dbReviews->map(fn($r) => [
            'id' => $r->id,
            'rating' => $r->rating,
            'title' => $r->title,
            'content' => $r->content,
            'is_recommended' => $r->is_recommended,
            'created_at' => $r->created_at->toIso8601String(),
            'author' => [
                'name' => $r->author?->full_name ?? 'Anonyme',
            ],
        ])->values()->all();
    }

    protected function getReviewStats($p): array
    {
        $reviews = $p->ratings()->where('approved', true);
        $total = $reviews->count();
        
        if ($total === 0) {
            $avg = (float) ($p->metadata['rating'] ?? 4.8);
            $total = (int) ($p->metadata['reviews_count'] ?? 120);
            $distribution = [5 => round($total * 0.8), 4 => round($total * 0.15), 3 => round($total * 0.05), 2 => 0, 1 => 0];
        } else {
            $avg = round($reviews->avg('rating'), 1);
            $distribution = [5 => 0, 4 => 0, 3 => 0, 2 => 0, 1 => 0];
            foreach ($reviews->pluck('rating') as $r) {
                $distribution[(int) $r] = ($distribution[(int) $r] ?? 0) + 1;
            }
        }

        return [
            'average' => $avg,
            'total' => $total,
            'distribution' => $distribution,
        ];
    }

    protected function getRelatedProducts($p)
    {
        $categoryIds = $p->categories->pluck('id');

        $related = Product::where('id', '!=', $p->id)
            ->publish()
            ->with(['media', 'prices', 'categories'])
            ->when($categoryIds->isNotEmpty(), fn($q) => $q->whereHas('categories', fn($cq) => $cq->whereIn('id', $categoryIds)))
            ->take(4)
            ->get();

        if ($related->count() < 4) {
            $existing = $related->pluck('id')->push($p->id)->toArray();
            $more = Product::whereNotIn('id', $existing)
                ->publish()
                ->with(['media', 'prices', 'categories'])
                ->take(4 - $related->count())
                ->get();
            $related = $related->concat($more);
        }

        return $related->map(fn($rp) => $this->formatRelatedProduct($rp))->values()->all();
    }

    protected function formatRelatedProduct($p)
    {
        $price = $p->prices->first();
        return [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'price' => (float) (($price?->amount ?? 0) / 10),
            'old_price' => $price?->compare_amount ? (float) ($price->compare_amount / 10) : null,
            'currency' => $price?->currency_code ?? 'MAD',
            'rating' => (float) ($p->metadata['rating'] ?? 4.8),
            'reviews_count' => (int) ($p->metadata['reviews_count'] ?? 120),
            'colors' => $p->metadata['colors'] ?? [],
            'sizes' => $p->metadata['sizes'] ?? [],
            'materials' => $p->metadata['materials'] ?? [],
            'gender' => $p->metadata['gender'] ?? 'Unisex',
            'badge' => $p->metadata['badge'] ?? null,
            'category' => $p->categories->first()?->name ?? 'Apparel',
            'image' => $p->getFirstMediaUrl(config('shopper.media.storage.collection_name', 'uploads')),
        ];
    }
}
