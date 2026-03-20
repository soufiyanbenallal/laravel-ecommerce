<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'heroSlides'       => $this->heroSlides(),
            'featuredProducts' => $this->featuredProducts(),
            'flashDeals'       => $this->flashDeals(),
            'categories'       => $this->categories(),
            'collections'      => $this->collections(),
            'testimonials'     => $this->testimonials(),
            'blogPosts'        => $this->blogPosts(),
            'stats'            => [
                'customers'    => '2.4M+',
                'countries'    => '180+',
                'satisfaction' => '99.1%',
                'responseTime' => '< 2hr',
            ],
        ]);
    }

    // ─── Hero Slides ──────────────────────────────────────────────────────
    private function heroSlides(): array
    {
        return [
            [
                'id'           => 1,
                'kicker'       => 'New Season · Spring 2026',
                'headline'     => ['Move Fast.', 'Look', 'Unstoppable.'],
                'body'         => 'TrailForce X9 — precision-engineered for streets that demand more. Every step, every surface, every story.',
                'cta'          => 'Shop the Collection',
                'ctaSecondary' => 'Watch Film',
                'image'        => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=95&fit=crop',
                'productName'  => 'TrailForce X9 Runner',
                'productPrice' => '$189',
                'tag'          => 'NEW DROP',
                'tagColor'     => '#F97316',
                'accentColor'  => '#F97316',
                'thumbImage'   => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=90&fit=crop',
            ],
            [
                'id'           => 2,
                'kicker'       => 'Watchmaking · Fine Craft 2026',
                'headline'     => ['Time is the', 'Only', 'Currency.'],
                'body'         => 'Apex Chronos Pro — sapphire crystal, Swiss movement, aerospace titanium. For those who understand precision.',
                'cta'          => 'Explore Timepieces',
                'ctaSecondary' => 'View Specs',
                'image'        => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=95&fit=crop',
                'productName'  => 'Apex Chronos Pro',
                'productPrice' => '$489',
                'tag'          => 'LIMITED',
                'tagColor'     => '#EAB308',
                'accentColor'  => '#EAB308',
                'thumbImage'   => 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=90&fit=crop',
            ],
            [
                'id'           => 3,
                'kicker'       => 'Womenswear · The Edit 2026',
                'headline'     => ['Fashion is', 'an Art.', 'Wear It.'],
                'body'         => "Curated from Paris, Milan, Tokyo — the season's most considered pieces, united for those who choose deliberately.",
                'cta'          => 'Shop the Edit',
                'ctaSecondary' => 'See Lookbook',
                'image'        => 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=95&fit=crop',
                'productName'  => 'Seasonal Collection',
                'productPrice' => 'From $89',
                'tag'          => 'EXCLUSIVE',
                'tagColor'     => '#22C55E',
                'accentColor'  => '#22C55E',
                'thumbImage'   => 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85&fit=crop',
            ],
        ];
    }

    // ─── Featured Products ────────────────────────────────────────────────
    private function featuredProducts(): array
    {
        return [
            [
                'id' => 1, 'name' => 'Apex Chronos Pro', 'brand' => 'NEXUS Watch',
                'slug' => 'apex-chronos-pro', 'price' => 489, 'originalPrice' => 589,
                'rating' => 4.9, 'reviewCount' => 1847,
                'image' => 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=90&fit=crop',
                'images' => [], 'badge' => 'bestseller', 'badgeLabel' => 'Best Seller',
                'variants' => [
                    ['id' => 1, 'color' => 'Midnight', 'colorHex' => '#1C1917', 'stock' => 12],
                    ['id' => 2, 'color' => 'Gold',     'colorHex' => '#CA8A04', 'stock' => 5],
                    ['id' => 3, 'color' => 'Silver',   'colorHex' => '#A8A29E', 'stock' => 9],
                ],
                'isNew' => false, 'isSale' => true, 'isFeatured' => true, 'category' => 'Watches',
            ],
            [
                'id' => 2, 'name' => 'Studio Pro Max Buds', 'brand' => 'SoundCraft',
                'slug' => 'studio-pro-max-buds', 'price' => 219, 'originalPrice' => 219,
                'rating' => 4.8, 'reviewCount' => 3204,
                'image' => 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=90&fit=crop',
                'images' => [], 'badge' => 'new', 'badgeLabel' => 'New Arrival',
                'variants' => [
                    ['id' => 4, 'color' => 'White', 'colorHex' => '#FAFAF9', 'stock' => 20],
                    ['id' => 5, 'color' => 'Black', 'colorHex' => '#1C1917', 'stock' => 15],
                ],
                'isNew' => true, 'isSale' => false, 'isFeatured' => true, 'category' => 'Audio',
            ],
            [
                'id' => 3, 'name' => 'Lumière Eau de Parfum', 'brand' => 'Maison NX',
                'slug' => 'lumiere-parfum', 'price' => 165, 'originalPrice' => 220,
                'rating' => 4.7, 'reviewCount' => 912,
                'image' => 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=90&fit=crop',
                'images' => [], 'badge' => 'sale', 'badgeLabel' => '−25%',
                'variants' => [
                    ['id' => 7, 'color' => 'Amber', 'colorHex' => '#D97706', 'stock' => 18],
                ],
                'isNew' => false, 'isSale' => true, 'isFeatured' => false, 'category' => 'Beauty',
            ],
            [
                'id' => 4, 'name' => 'TrailForce X9 Runner', 'brand' => 'Kinetic Studio',
                'slug' => 'trailforce-x9', 'price' => 189, 'originalPrice' => 189,
                'rating' => 4.9, 'reviewCount' => 5830,
                'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=90&fit=crop',
                'images' => [], 'badge' => 'trending', 'badgeLabel' => 'Trending',
                'variants' => [
                    ['id' => 9,  'color' => 'White', 'colorHex' => '#FAFAF9', 'stock' => 25],
                    ['id' => 10, 'color' => 'Black', 'colorHex' => '#1C1917', 'stock' => 19],
                    ['id' => 11, 'color' => 'Ember', 'colorHex' => '#EA580C', 'stock' => 8],
                ],
                'isNew' => true, 'isSale' => false, 'isFeatured' => true, 'category' => 'Footwear',
            ],
            [
                'id' => 5, 'name' => 'Cuir Slouch Tote', 'brand' => 'Maison NX',
                'slug' => 'cuir-slouch-tote', 'price' => 385, 'originalPrice' => 485,
                'rating' => 4.8, 'reviewCount' => 743,
                'image' => 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=90&fit=crop',
                'images' => [], 'badge' => 'sale', 'badgeLabel' => '−20%',
                'variants' => [
                    ['id' => 12, 'color' => 'Tan',   'colorHex' => '#92400E', 'stock' => 9],
                    ['id' => 13, 'color' => 'Black', 'colorHex' => '#1C1917', 'stock' => 14],
                ],
                'isNew' => false, 'isSale' => true, 'isFeatured' => false, 'category' => 'Bags',
            ],
            [
                'id' => 6, 'name' => 'Parallax Mirrorless', 'brand' => 'OpticArts',
                'slug' => 'parallax-mirrorless', 'price' => 1149, 'originalPrice' => 1399,
                'rating' => 4.9, 'reviewCount' => 521,
                'image' => 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=90&fit=crop',
                'images' => [], 'badge' => 'limited', 'badgeLabel' => "Editor's Pick",
                'variants' => [
                    ['id' => 15, 'color' => 'Black',  'colorHex' => '#1C1917', 'stock' => 4],
                    ['id' => 16, 'color' => 'Silver', 'colorHex' => '#A8A29E', 'stock' => 3],
                ],
                'isNew' => false, 'isSale' => true, 'isFeatured' => true, 'category' => 'Cameras',
            ],
            [
                'id' => 7, 'name' => 'Arctic Shell Jacket', 'brand' => 'Northform',
                'slug' => 'arctic-shell-jacket', 'price' => 295, 'originalPrice' => 295,
                'rating' => 4.6, 'reviewCount' => 2108,
                'image' => 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=90&fit=crop',
                'images' => [], 'badge' => 'new', 'badgeLabel' => 'New In',
                'variants' => [
                    ['id' => 17, 'color' => 'White',   'colorHex' => '#F5F5F4', 'stock' => 22],
                    ['id' => 18, 'color' => 'Slate',   'colorHex' => '#334155', 'stock' => 18],
                    ['id' => 19, 'color' => 'Graphite','colorHex' => '#404040', 'stock' => 11],
                ],
                'isNew' => true, 'isSale' => false, 'isFeatured' => false, 'category' => 'Fashion',
            ],
            [
                'id' => 8, 'name' => 'Radiance Serum Ritual', 'brand' => 'Atelier Skin',
                'slug' => 'radiance-serum', 'price' => 89, 'originalPrice' => 89,
                'rating' => 4.7, 'reviewCount' => 4215,
                'image' => 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=90&fit=crop',
                'images' => [], 'badge' => 'new', 'badgeLabel' => 'New In',
                'variants' => [
                    ['id' => 20, 'color' => 'Natural', 'colorHex' => '#FBBF24', 'stock' => 30],
                ],
                'isNew' => true, 'isSale' => false, 'isFeatured' => false, 'category' => 'Beauty',
            ],
        ];
    }

    // ─── Flash Deals ──────────────────────────────────────────────────────
    private function flashDeals(): array
    {
        return [
            [
                'id' => 1,
                'product' => [
                    'id' => 9, 'name' => 'Apex Chronos Pro (Flash)', 'brand' => 'NEXUS Watch',
                    'slug' => 'apex-chronos-flash', 'price' => 299, 'originalPrice' => 489,
                    'image' => 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=90&fit=crop',
                    'badge' => 'sale', 'badgeLabel' => '−39%', 'variants' => [],
                    'rating' => 4.9, 'reviewCount' => 1847,
                    'images' => [], 'isNew' => false, 'isSale' => true, 'isFeatured' => false, 'category' => 'Watches',
                ],
                'discountPercent' => 39, 'stockRemaining' => 6, 'soldPercent' => 87, 'endsAt' => '',
            ],
            [
                'id' => 2,
                'product' => [
                    'id' => 10, 'name' => 'Arctic Shell Jacket (Flash)', 'brand' => 'Northform',
                    'slug' => 'arctic-flash', 'price' => 159, 'originalPrice' => 295,
                    'image' => 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=90&fit=crop',
                    'badge' => 'sale', 'badgeLabel' => '−46%', 'variants' => [],
                    'rating' => 4.6, 'reviewCount' => 2108,
                    'images' => [], 'isNew' => false, 'isSale' => true, 'isFeatured' => false, 'category' => 'Fashion',
                ],
                'discountPercent' => 46, 'stockRemaining' => 11, 'soldPercent' => 71, 'endsAt' => '',
            ],
            [
                'id' => 3,
                'product' => [
                    'id' => 11, 'name' => 'Lumière Parfum (Flash)', 'brand' => 'Maison NX',
                    'slug' => 'lumiere-flash', 'price' => 72, 'originalPrice' => 165,
                    'image' => 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=90&fit=crop',
                    'badge' => 'sale', 'badgeLabel' => '−56%', 'variants' => [],
                    'rating' => 4.7, 'reviewCount' => 912,
                    'images' => [], 'isNew' => false, 'isSale' => true, 'isFeatured' => false, 'category' => 'Beauty',
                ],
                'discountPercent' => 56, 'stockRemaining' => 3, 'soldPercent' => 94, 'endsAt' => '',
            ],
            [
                'id' => 4,
                'product' => [
                    'id' => 12, 'name' => 'Studio Buds Max (Flash)', 'brand' => 'SoundCraft',
                    'slug' => 'buds-flash', 'price' => 149, 'originalPrice' => 219,
                    'image' => 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=90&fit=crop',
                    'badge' => 'sale', 'badgeLabel' => '−32%', 'variants' => [],
                    'rating' => 4.8, 'reviewCount' => 3204,
                    'images' => [], 'isNew' => false, 'isSale' => true, 'isFeatured' => false, 'category' => 'Audio',
                ],
                'discountPercent' => 32, 'stockRemaining' => 8, 'soldPercent' => 62, 'endsAt' => '',
            ],
        ];
    }

    // ─── Categories ───────────────────────────────────────────────────────
    private function categories(): array
    {
        return [
            ['id' => 1, 'name' => 'Watches',  'slug' => 'watches',  'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80&fit=crop', 'count' => 230, 'accent' => '#D97706'],
            ['id' => 2, 'name' => 'Audio',    'slug' => 'audio',    'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80&fit=crop', 'count' => 180, 'accent' => '#16A34A'],
            ['id' => 3, 'name' => 'Footwear', 'slug' => 'footwear', 'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80&fit=crop', 'count' => 420, 'accent' => '#EA580C'],
            ['id' => 4, 'name' => 'Bags',     'slug' => 'bags',     'image' => 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80&fit=crop', 'count' => 150, 'accent' => '#7C3AED'],
            ['id' => 5, 'name' => 'Cameras',  'slug' => 'cameras',  'image' => 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80&fit=crop', 'count' => 90,  'accent' => '#DC2626'],
            ['id' => 6, 'name' => 'Beauty',   'slug' => 'beauty',   'image' => 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80&fit=crop', 'count' => 310, 'accent' => '#DB2777'],
        ];
    }

    // ─── Collections ──────────────────────────────────────────────────────
    private function collections(): array
    {
        return [
            ['id' => 1, 'name' => 'The Summer Edit',    'description' => 'Lightweight styles for warm days and easy living.',   'image' => 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85&fit=crop', 'slug' => 'summer-edit',  'tag' => 'SEASONAL', 'itemCount' => 48, 'accentColor' => '#F97316'],
            ['id' => 2, 'name' => 'Urban Architecture', 'description' => 'Technical precision designed for the modern city.',   'image' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=85&fit=crop', 'slug' => 'urban',        'tag' => "MEN'S",    'itemCount' => 35, 'accentColor' => '#3B82F6'],
            ['id' => 3, 'name' => 'Audiophile Series',  'description' => 'For those who hear the difference.',                  'image' => 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=900&q=85&fit=crop', 'slug' => 'audiophile',   'tag' => 'TECH',     'itemCount' => 19, 'accentColor' => '#8B5CF6'],
            ['id' => 4, 'name' => 'The Active Edit',    'description' => 'Performance elevated as a form of beauty.',           'image' => 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=900&q=85&fit=crop', 'slug' => 'active',       'tag' => 'SPORT',    'itemCount' => 61, 'accentColor' => '#22C55E'],
        ];
    }

    // ─── Testimonials ─────────────────────────────────────────────────────
    private function testimonials(): array
    {
        return [
            ['id' => 1, 'name' => 'Aria Fontaine',  'role' => 'Art Director · Paris',        'avatar' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=85&fit=crop&crop=face', 'rating' => 5, 'verified' => true, 'productBought' => 'Apex Chronos Pro',    'text' => "NEXUS has completely changed how I shop. The curation is extraordinary — nothing exists here by accident. Every piece feels considered, purposeful. I've never returned a single item."],
            ['id' => 2, 'name' => 'Marcus Osei',   'role' => 'Architect · London',          'avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=85&fit=crop&crop=face', 'rating' => 5, 'verified' => true, 'productBought' => 'Studio Pro Max Buds', 'text' => "The Studio Buds are genuinely insane for the price. ANC is class-leading. NEXUS gets what serious buyers actually want — quality without the nonsense markup. Same-day shipping sealed it."],
            ['id' => 3, 'name' => 'Yuki Nakamura', 'role' => 'Creative Director · Tokyo',   'avatar' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=85&fit=crop&crop=face', 'rating' => 5, 'verified' => true, 'productBought' => 'Cuir Slouch Tote',    'text' => "I spent weeks looking for the right leather tote. The Cuir Slouch arrived in the most beautiful packaging I've ever seen from an online store. Three months in and it only gets better."],
            ['id' => 4, 'name' => 'James Holt',    'role' => 'Founder · Berlin',            'avatar' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=85&fit=crop&crop=face', 'rating' => 5, 'verified' => true, 'productBought' => 'TrailForce X9',       'text' => "TrailForce X9 redefined my daily commute. NEXUS shipped same-day, packaged brilliantly, and the product quality is something I couldn't find at any competitor at this price point."],
        ];
    }

    // ─── Blog Posts ───────────────────────────────────────────────────────
    private function blogPosts(): array
    {
        return [
            ['id' => 1, 'title' => 'The 12 Objects Every Considered Wardrobe Needs', 'excerpt' => 'Building a collection that rewards attention to quality and longevity.', 'image' => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=85&fit=crop', 'tag' => 'STYLE GUIDE',  'author' => 'Elena Markov',  'readTime' => '7 min', 'date' => 'Mar 18', 'slug' => 'wardrobe-essentials'],
            ['id' => 2, 'title' => 'How Kinetic Studio Reinvented the Performance Sneaker', 'excerpt' => 'Inside the design process behind TrailForce X9.', 'image' => 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=700&q=85&fit=crop', 'tag' => 'BEHIND BUILD', 'author' => 'Jean Moreau',   'readTime' => '9 min', 'date' => 'Mar 14', 'slug' => 'kinetic-studio'],
            ['id' => 3, 'title' => 'On the Art of Dressing Precisely',                'excerpt' => 'Why deliberate choices in fashion communicate more than trends.',        'image' => 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=700&q=85&fit=crop', 'tag' => 'ESSAY',        'author' => 'Daisuke Ono',   'readTime' => '5 min', 'date' => 'Mar 10', 'slug' => 'dressing-precisely'],
        ];
    }
}
