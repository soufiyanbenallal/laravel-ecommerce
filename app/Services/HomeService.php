<?php

namespace App\Services;

use Shopper\Core\Models\Category;
use Shopper\Core\Models\Collection;
use Shopper\Core\Models\Product;
use Illuminate\Support\Collection as SupportCollection;

class HomeService
{
    /**
     * Get data for the home page.
     *
     * @return array
     */
    public function getHomeData(): array
    {
        return [
            'categories' => $this->getFeaturedCategories(),
            'flash_deals' => $this->getFlashDeals(),
            'new_arrivals' => $this->getNewArrivals(),
            'collections' => $this->getFeaturedCollections(),
            'testimonials' => $this->getTestimonials(),
        ];
    }

    protected function getFeaturedCategories()
    {
        // For now return actual Shopper categories or mock if empty
        $categories = Category::withCount('products')->where('is_enabled', true)->take(8)->get();
        
        if ($categories->isEmpty()) {
            return [];
        }

        return $categories->map(fn($c) => [
            'id' => $c->id,
            'name' => $c->name,
            'slug' => $c->slug,
            'icon' => $c->metadata['icon'] ?? '📦',
            'products_count' => $c->products_count,
            'color' => $c->metadata['color'] ?? '#FF6200',
            'image' => $c->getFirstMediaUrl(config('shopper.media.storage.thumbnail_collection', 'thumbnail')),
        ]);
    }

    protected function getFlashDeals()
    {
        // Products with 'flash-deal' tag or specific discount
        return Product::with(['media', 'categories', 'prices'])
            ->publish()
            ->take(4)
            ->get()
            ->map(fn($p) => $this->formatProduct($p));
    }

    protected function getNewArrivals()
    {
        return Product::with(['media', 'categories', 'prices'])
            ->publish()
            ->latest()
            ->take(8)
            ->get()
            ->map(fn($p) => $this->formatProduct($p));
    }

    protected function getFeaturedCollections()
    {
        return Collection::take(4)->get()->map(fn($c) => [
            'id' => $c->id,
            'name' => $c->name,
            'slug' => $c->slug,
            'description' => $c->description,
            'products_count' => $c->products()->count(),
            'metadata' => $c->metadata ?? ['emoji' => '⚡'],
            'image' => $c->getFirstMediaUrl(config('shopper.media.storage.thumbnail_collection', 'thumbnail')),
        ]);
    }

    protected function getTestimonials()
    {
        // Mocking testimonials as Shopper doesn't have a native Testimonial model usually
        return [
            [
                'id' => 1,
                'name' => 'Karim El Mansouri',
                'city' => 'Casablanca',
                'rating' => 5,
                'text' => 'Incroyable service ! J\'ai commandé un iPhone reconditionné et il est arrivé en parfait état dans les 2 jours. Prix imbattable.',
                'product_name' => 'iPhone 14 Pro Max',
                'is_verified' => true
            ],
            [
                'id' => 2,
                'name' => 'Fatima Zahra Benali',
                'city' => 'Rabat',
                'rating' => 5,
                'text' => 'KENZ a transformé ma façon de consommer. Produits 100% authentiques, livraison ultra rapide, et des économies de 40%.',
                'product_name' => 'Smart TV Samsung 65"',
                'is_verified' => true
            ],
        ];
    }

    protected function formatProduct($p)
    {
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
            'rating' => 4.8, // Mock or from Review model
            'reviews_count' => 120,
            'is_new' => $p->created_at->diffInDays() < 30,
            'metadata' => [
                'emoji' => $p->metadata['emoji'] ?? '📱',
                'condition' => $p->metadata['condition'] ?? 'Neuf',
            ],
            'stock_status' => $p->stock > 0 ? 'in_stock' : 'out_of_stock',
            'image' => $p->getFirstMediaUrl(config('shopper.media.storage.collection_name', 'uploads')),
        ];
    }
}
