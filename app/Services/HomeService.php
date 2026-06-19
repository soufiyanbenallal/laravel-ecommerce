<?php

namespace App\Services;

use Shopper\Core\Models\Category;
use Shopper\Core\Models\Collection;
use Shopper\Core\Models\Product;

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
        $categories = Category::withCount('products')->where('is_enabled', true)->take(8)->get();
        
        return $categories->map(fn($c) => [
            'id' => $c->id,
            'name' => $c->name,
            'slug' => $c->slug,
            'icon' => $c->metadata['icon'] ?? '📦',
            'products_count' => $c->products_count,
            'color' => $c->metadata['color'] ?? '#efe9dd',
            'image' => $c->getFirstMediaUrl(config('shopper.media.storage.thumbnail_collection', 'thumbnail')),
        ]);
    }

    protected function getFlashDeals()
    {
        return Product::with(['media', 'categories', 'prices'])
            ->publish()
            ->where('featured', true)
            ->take(4)
            ->get()
            ->map(fn($p) => $this->formatProduct($p));
    }

    protected function getNewArrivals()
    {
        return Product::with(['media', 'categories', 'prices'])
            ->publish()
            ->latest()
            ->take(4)
            ->get()
            ->map(fn($p) => $this->formatProduct($p));
    }

    protected function getFeaturedCollections()
    {
        return Collection::with(['media'])
            ->take(3)
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'description' => $c->description,
                'image' => $c->getFirstMediaUrl(config('shopper.media.storage.thumbnail_collection', 'thumbnail')),
                'products_count' => $c->products()->count(),
            ]);
    }

    protected function getTestimonials()
    {
        return [
            [
                'id' => 1,
                'name' => 'Marguerite L.',
                'city' => 'Paris',
                'rating' => 5,
                'text' => 'The Halden coat has lived through three winters and looks better each one. Worth every euro.',
                'product_name' => 'Halden Wool Overcoat',
                'is_verified' => true
            ],
            [
                'id' => 2,
                'name' => 'Daichi K.',
                'city' => 'Kyoto',
                'rating' => 5,
                'text' => 'Loafers that feel like they were made for my feet. The resoling service is a small miracle.',
                'product_name' => 'Nara Leather Loafer',
                'is_verified' => true
            ],
            [
                'id' => 3,
                'name' => 'Anna B.',
                'city' => 'Copenhagen',
                'rating' => 5,
                'text' => 'I bought the cashmere on a whim and now I own four. Quiet confidence in every stitch.',
                'product_name' => 'Halden Cashmere Pullover',
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
            'price' => (float) (($price?->amount ?? 0) / 10), // Divide by 10 to match clean presentation price from MAD cents/decimals
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
