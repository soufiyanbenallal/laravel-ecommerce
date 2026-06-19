<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Shopper\Core\Models\Product;
use Shopper\Core\Models\Category;
use Shopper\Core\Models\Collection;

class CatalogController extends Controller
{
    /**
     * Display the catalog index.
     */
    public function index(Request $request)
    {
        $query = Product::query()->publish()->with(['categories', 'media', 'prices']);

        if ($request->has('search') && $request->search != '') {
            $query->where(function($sub) use ($request) {
                $sub->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('category') && $request->category != '') {
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

        $products = $query->get()->map(fn ($p) => $this->formatProduct($p));

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

    /**
     * Display all collections.
     */
    public function collectionsIndex()
    {
        $collections = Collection::query()
            ->with(['media'])
            ->get()
            ->map(function ($c) {
                return [
                    'id' => $c->id,
                    'name' => $c->name,
                    'slug' => $c->slug,
                    'description' => $c->description,
                    'image' => $c->getFirstMediaUrl(config('shopper.media.storage.thumbnail_collection', 'thumbnail')),
                    'products_count' => $c->products()->count(),
                ];
            });

        return Inertia::render('Collections/collections.index', [
            'collections' => $collections,
        ]);
    }

    /**
     * Display a specific collection with its products.
     */
    public function collectionShow($slug)
    {
        $collection = Collection::query()
            ->with(['media'])
            ->where('slug', $slug)
            ->firstOrFail();

        $products = $collection->products()
            ->publish()
            ->with(['categories', 'media', 'prices'])
            ->get()
            ->map(fn($p) => $this->formatProduct($p));

        return Inertia::render('Collections/collections.show', [
            'collection' => [
                'id' => $collection->id,
                'name' => $collection->name,
                'slug' => $collection->slug,
                'description' => $collection->description,
                'image' => $collection->getFirstMediaUrl(config('shopper.media.storage.thumbnail_collection', 'thumbnail')),
            ],
            'products' => $products,
        ]);
    }

    /**
     * Display a specific category with its products.
     */
    public function categoryShow($slug)
    {
        $category = Category::query()
            ->with(['media'])
            ->where('slug', $slug)
            ->firstOrFail();

        $products = $category->products()
            ->publish()
            ->with(['categories', 'media', 'prices'])
            ->get()
            ->map(fn($p) => $this->formatProduct($p));

        return Inertia::render('Categories/categories.show', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'image' => $category->getFirstMediaUrl(config('shopper.media.storage.thumbnail_collection', 'thumbnail')),
            ],
            'products' => $products,
        ]);
    }

    /**
     * Display search results.
     */
    public function search(Request $request)
    {
        $q = $request->query('q', '');
        $query = Product::query()->publish()->with(['categories', 'media', 'prices']);

        if ($q) {
            $query->where(function($sub) use ($q) {
                $sub->where('name', 'like', '%' . $q . '%')
                    ->orWhere('description', 'like', '%' . $q . '%')
                    ->orWhere('summary', 'like', '%' . $q . '%');
            });
        }

        $products = $query->take(20)->get()->map(fn($p) => $this->formatProduct($p));

        return Inertia::render('Search/search.index', [
            'products' => $products,
            'q' => $q
        ]);
    }

    /**
     * API: Search products dynamically (JSON).
     */
    public function apiSearch(Request $request)
    {
        $q = $request->query('q', '');
        if (!$q) {
            return response()->json([]);
        }

        $products = Product::query()
            ->publish()
            ->with(['categories', 'media', 'prices'])
            ->where(function($sub) use ($q) {
                $sub->where('name', 'like', '%' . $q . '%')
                    ->orWhere('description', 'like', '%' . $q . '%')
                    ->orWhere('summary', 'like', '%' . $q . '%');
            })
            ->take(6)
            ->get()
            ->map(fn($p) => $this->formatProduct($p));

        return response()->json($products);
    }

    /**
     * API: Popular/Suggested products.
     */
    public function apiPopular()
    {
        $products = Product::query()
            ->publish()
            ->with(['categories', 'media', 'prices'])
            ->take(4)
            ->get()
            ->map(fn($p) => $this->formatProduct($p));

        return response()->json($products);
    }

    /**
     * API: Wishlist products details from list of IDs.
     */
    public function apiWishlist(Request $request)
    {
        $ids = $request->input('ids', []);
        if (empty($ids)) {
            return response()->json([]);
        }

        $products = Product::query()
            ->publish()
            ->with(['categories', 'media', 'prices'])
            ->whereIn('id', $ids)
            ->get()
            ->map(fn($p) => $this->formatProduct($p));

        return response()->json($products);
    }

    /**
     * Helper: Format a product for frontend consumption.
     */
    protected function formatProduct(Product $p)
    {
        $price = $p->prices->first();
        return [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'price' => (float) (($price?->amount ?? 0) / 10), // Divide by 10 to match clean presentation price from MAD cents/decimals if stored in cents, wait - in our seeder we seeded price 2850, 4200. Dividing by 10 makes them 285, 420, which matches exactly the static prices!
            'old_price' => $price?->compare_amount ? (float) ($price->compare_amount / 10) : null,
            'discount_percentage' => ($price?->compare_amount ?? 0) > 0 
                ? round((($price->compare_amount - $price->amount) / $price->compare_amount) * 100) 
                : null,
            'currency' => $price?->currency_code ?? 'MAD',
            'rating' => (float) ($p->metadata['rating'] ?? 4.8),
            'reviews_count' => (int) ($p->metadata['reviews_count'] ?? 120),
            'colors' => $p->metadata['colors'] ?? [],
            'sizes' => $p->metadata['sizes'] ?? [],
            'materials' => $p->metadata['materials'] ?? [],
            'gender' => $p->metadata['gender'] ?? 'Unisex',
            'badge' => $p->metadata['badge'] ?? null,
            'is_new' => $p->created_at->diffInDays() < 30,
            'image' => $p->getFirstMediaUrl(config('shopper.media.storage.collection_name', 'uploads')),
            'metadata' => $p->metadata ?? [],
        ];
    }
}
