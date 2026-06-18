<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Shopper\Core\Models\Product;
use Shopper\Core\Models\Category;

class CatalogController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()->publish()->with(['categories', 'media', 'prices']);

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        if ($request->has('category')) {
            $query->whereHas('categories', function($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        $sort = $request->input('sort', 'latest');
        match ($sort) {
            'price_asc' => $query->orderByRaw('(SELECT amount FROM shopper_products_prices WHERE shopper_products_prices.product_id = shopper_products.id ORDER BY id ASC LIMIT 1) ASC'),
            'price_desc' => $query->orderByRaw('(SELECT amount FROM shopper_products_prices WHERE shopper_products_prices.product_id = shopper_products.id ORDER BY id ASC LIMIT 1) DESC'),
            default => $query->latest(),
        };

        $products = $query->paginate(12)->withQueryString();

        $products->through(function ($p) {
            $price = $p->prices->first();
            return [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => (float) ($price?->amount ?? 0),
                'old_price' => (float) ($price?->compare_amount ?? 0),
                'discount_percentage' => ($price?->compare_amount ?? 0) > 0 
                    ? round((($price->compare_amount - $price->amount) / $price->compare_amount) * 100) 
                    : null,
                'currency' => $price?->currency_code ?? 'MAD',
                'rating' => 4.8,
                'reviews_count' => rand(10, 50),
                'is_new' => $p->created_at->diffInDays() < 30,
                'image' => $p->getFirstMediaUrl(config('shopper.media.storage.collection_name', 'uploads')),
                'metadata' => $p->metadata ?? [],
            ];
        });

        return Inertia::render('Shop/catalog.index', [
            'products' => $products,
            'categories' => Category::where('is_enabled', true)->get()->map(fn($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'icon' => $c->metadata['icon'] ?? '📦',
                'image' => $c->getFirstMediaUrl(config('shopper.media.storage.thumbnail_collection', 'thumbnail')),
            ]),
            'filters' => $request->only(['search', 'category', 'sort']),
        ]);
    }
}
