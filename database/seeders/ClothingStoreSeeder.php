<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Shopper\Core\Models\Category;
use Shopper\Core\Models\Product;
use Shopper\Core\Models\ProductVariant;
use Shopper\Core\Models\Channel;
use Shopper\Core\Models\Inventory;
use Shopper\Core\Models\Attribute;
use Shopper\Core\Models\AttributeValue;
use Shopper\Core\Models\Collection;
use Shopper\Core\Models\Price;
use Shopper\Core\Models\Review;
use Shopper\Core\Models\Currency;
use Shopper\Core\Models\Country;
use Shopper\Core\Models\Brand;
use Shopper\Core\Enum\CollectionType;
use Shopper\Core\Enum\ProductType;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Log;

class ClothingStoreSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // 0. Disable foreign keys and truncate existing tables to start fresh
        Schema::disableForeignKeyConstraints();
        DB::table(shopper_table('products'))->truncate();
        DB::table(shopper_table('categories'))->truncate();
        DB::table(shopper_table('collections'))->truncate();
        DB::table(shopper_table('brands'))->truncate();
        DB::table(shopper_table('attributes'))->truncate();
        DB::table(shopper_table('attribute_values'))->truncate();
        DB::table(shopper_table('product_has_relations'))->truncate();
        DB::table(shopper_table('prices'))->truncate();
        DB::table(shopper_table('inventory_histories'))->truncate();
        DB::table(shopper_table('reviews'))->truncate();
        DB::table('media')->truncate();
        Schema::enableForeignKeyConstraints();

        // 1. Core Config (Currency, Channel, Inventory)
        $mad = Currency::where('code', 'MAD')->first() ?? Currency::create([
            'code' => 'MAD',
            'name' => 'Moroccan Dirham',
            'symbol' => 'DH',
            'format' => '%s MAD',
            'exchange_rate' => 1.0,
            'is_enabled' => true,
        ]);

        $channel = Channel::first() ?? Channel::create([
            'name' => 'Atelier Nord Official Store',
            'slug' => 'atelier-nord',
            'is_default' => true,
            'is_enabled' => true,
            'url' => config('app.url'),
        ]);

        $inventory = Inventory::first() ?? Inventory::create([
            'code' => 'AN-WH-01',
            'name' => 'Atelier Nord Casablanca Hub',
            'email' => 'contact@ateliernord.com',
            'city' => 'Casablanca',
            'country_id' => Country::where('cca2', 'MA')->first()->id ?? 1,
            'street_address' => '45 Boulevard d\'Anfa',
            'is_default' => true,
            'postal_code' => '20000',
        ]);

        // 2. Brands
        $brandData = [
            ['name' => 'Atelier Nord', 'slug' => 'atelier-nord'],
            ['name' => 'Hawick Knitters', 'slug' => 'hawick-knitters'],
            ['name' => 'Tuscan Leather Lab', 'slug' => 'tuscan-leather-lab'],
            ['name' => 'Setagaya Ceramics', 'slug' => 'setagaya-ceramics'],
            ['name' => 'Northampton Shoemakers', 'slug' => 'northampton-shoemakers'],
        ];
        $brands = [];
        foreach ($brandData as $b) {
            $brands[$b['slug']] = Brand::create([
                'name' => $b['name'],
                'slug' => $b['slug'],
                'is_enabled' => true,
            ]);
        }

        // 3. Categories
        $categoryData = [
            [
                'name' => 'Apparel',
                'slug' => 'apparel',
                'description' => 'Tailored jackets, heavy tees, cashmere pullovers and easy wool trousers.',
                'image' => 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
                'color' => '#efe9dd'
            ],
            [
                'name' => 'Bags',
                'slug' => 'bags',
                'description' => 'Tote bags, weekenders, and small leather goods vegetable-tanned in Italy.',
                'image' => 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
                'color' => '#d8c8a8'
            ],
            [
                'name' => 'Footwear',
                'slug' => 'footwear',
                'description' => 'Blake-stitched loafers and Goodyear-welted Chelsea boots built to last.',
                'image' => 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
                'color' => '#c4b9a4'
            ],
            [
                'name' => 'Home',
                'slug' => 'home',
                'description' => 'Wheel-thrown porcelain vases and stone-washed European table linen.',
                'image' => 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600',
                'color' => '#f3eee3'
            ],
            [
                'name' => 'Accessories',
                'slug' => 'accessories',
                'description' => 'Titanium sunglasses and hand-rolled silk scarves printed in Como.',
                'image' => 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
                'color' => '#b8895a'
            ],
        ];
        $categories = [];
        foreach ($categoryData as $c) {
            $categories[$c['slug']] = Category::create([
                'name' => $c['name'],
                'slug' => $c['slug'],
                'description' => $c['description'],
                'is_enabled' => true,
                'metadata' => [
                    'color' => $c['color'],
                    'icon' => '📦'
                ]
            ]);
            try {
                $categories[$c['slug']]->addMediaFromUrl($c['image'])
                    ->toMediaCollection(config('shopper.media.storage.thumbnail_collection', 'thumbnail'));
            } catch (\Exception $e) {
                Log::warning("Could not add category image for {$c['slug']}: " . $e->getMessage());
            }
        }

        // 4. Collections
        $collectionData = [
            [
                'slug' => 'autumn-volume-07',
                'name' => 'Autumn — Volume 07',
                'description' => 'Quiet objects for the colder months.',
                'image' => 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
            ],
            [
                'slug' => 'everyday-essentials',
                'name' => 'Everyday Essentials',
                'description' => 'Pieces we\'d take anywhere.',
                'image' => 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
            ],
            [
                'slug' => 'tokyo-edit',
                'name' => 'The Tokyo Edit',
                'description' => 'A small selection from our makers in Setagaya.',
                'image' => 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600',
            ],
        ];
        $collections = [];
        foreach ($collectionData as $col) {
            $collections[$col['slug']] = Collection::create([
                'name' => $col['name'],
                'slug' => $col['slug'],
                'description' => $col['description'],
                'type' => CollectionType::Manual,
                'published_at' => now(),
            ]);
            try {
                $collections[$col['slug']]->addMediaFromUrl($col['image'])
                    ->toMediaCollection(config('shopper.media.storage.thumbnail_collection', 'thumbnail'));
            } catch (\Exception $e) {
                Log::warning("Could not add collection image for {$col['slug']}: " . $e->getMessage());
            }
        }

        // 5. Attributes
        $colorAttr = Attribute::create(['name' => 'Couleur', 'slug' => 'color', 'type' => 'colorpicker', 'is_enabled' => true]);
        $sizeAttr = Attribute::create(['name' => 'Taille', 'slug' => 'size', 'type' => 'select', 'is_enabled' => true]);

        $colorsList = [
            'bone' => ['key' => 'bone', 'value' => 'Bone'],
            'charcoal' => ['key' => 'charcoal', 'value' => 'Charcoal'],
            'clay' => ['key' => 'clay', 'value' => 'Clay'],
            'cognac' => ['key' => 'cognac', 'value' => 'Cognac'],
            'black' => ['key' => 'black', 'value' => 'Black'],
            'sand' => ['key' => 'sand', 'value' => 'Sand'],
            'onyx' => ['key' => 'onyx', 'value' => 'Onyx'],
            'espresso' => ['key' => 'espresso', 'value' => 'Espresso'],
            'oxblood' => ['key' => 'oxblood', 'value' => 'Oxblood'],
            'ivory' => ['key' => 'ivory', 'value' => 'Ivory'],
            'terracotta' => ['key' => 'terracotta', 'value' => 'Terracotta'],
            'sage' => ['key' => 'sage', 'value' => 'Sage'],
            'gold' => ['key' => 'gold', 'value' => 'Gold / Brown'],
            'camel' => ['key' => 'camel', 'value' => 'Camel'],
            'slate' => ['key' => 'slate', 'value' => 'Slate'],
            'olive' => ['key' => 'olive', 'value' => 'Olive'],
            'stone' => ['key' => 'stone', 'value' => 'Stone'],
            'navy' => ['key' => 'navy', 'value' => 'Navy'],
            'ink' => ['key' => 'ink', 'value' => 'Ink'],
        ];
        $colorValues = [];
        foreach ($colorsList as $ckey => $cval) {
            $colorValues[$ckey] = AttributeValue::create([
                'attribute_id' => $colorAttr->id,
                'key' => $cval['key'],
                'value' => $cval['value'],
            ]);
        }

        $sizesList = ['XS', 'S', 'M', 'L', 'XL', '38', '39', '40', '41', '42', '43', '44'];
        $sizeValues = [];
        foreach ($sizesList as $sz) {
            $sizeValues[$sz] = AttributeValue::create([
                'attribute_id' => $sizeAttr->id,
                'key' => strtolower($sz),
                'value' => $sz,
            ]);
        }

        // 6. Products
        $productsData = [
            [
                'id' => 'halden-cashmere',
                'name' => 'Halden Cashmere Pullover',
                'price' => 2850,
                'compare' => 3400,
                'category' => 'apparel',
                'brand' => 'hawick-knitters',
                'gender' => 'Women',
                'image' => 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=600',
                'gallery' => [
                    'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&q=80&w=600',
                    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
                ],
                'tagline' => 'Inner Mongolian cashmere, knitted in Scotland.',
                'description' => 'A relaxed crewneck shaped from grade-A cashmere fibres, brushed for softness and finished with ribbed cuffs that hold their form season after season.',
                'details' => [
                    '100% cashmere',
                    'Knitted in Hawick, Scotland',
                    'Hand-finished seams',
                    'Oversized fit — size down for regular',
                ],
                'colors' => ['Bone', 'Charcoal', 'Clay'],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'materials' => ['Cashmere'],
                'collection' => 'autumn-volume-07',
                'rating' => 4.9,
                'reviews' => 128,
                'stock' => 14,
                'badge' => 'New Season',
                'featured' => true,
            ],
            [
                'id' => 'marais-tote',
                'name' => 'Marais Leather Tote',
                'price' => 4200,
                'category' => 'bags',
                'brand' => 'tuscan-leather-lab',
                'gender' => 'Unisex',
                'image' => 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
                'gallery' => [
                    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600'
                ],
                'tagline' => 'Vegetable-tanned in a single piece of Tuscan leather.',
                'description' => 'An unstructured everyday carry that softens with use. The interior is left raw — no lining, no fuss — so the leather can breathe.',
                'details' => [
                    'Full-grain Tuscan leather',
                    'Handmade in Florence',
                    'Holds a 14-inch laptop',
                    'Patinas beautifully over time',
                ],
                'colors' => ['Cognac', 'Black', 'Sand'],
                'materials' => ['Leather'],
                'collection' => 'everyday-essentials',
                'rating' => 4.8,
                'reviews' => 94,
                'stock' => 8,
                'featured' => true,
            ],
            [
                'id' => 'ovo-vase',
                'name' => 'Ovo Ceramic Vase',
                'price' => 960,
                'category' => 'home',
                'brand' => 'setagaya-ceramics',
                'gender' => 'Unisex',
                'image' => 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=600',
                'tagline' => 'Wheel-thrown porcelain, fired three times.',
                'description' => 'Each vase is shaped by hand, so no two are identical. A matte glaze gives the surface a chalky, paper-like feel.',
                'details' => [
                    'Porcelain, matte glaze',
                    'Made in Setagaya, Tokyo',
                    'Holds 1.2L',
                    'Signed by the maker',
                ],
                'colors' => ['Bone'],
                'materials' => ['Porcelain'],
                'collection' => 'tokyo-edit',
                'rating' => 5.0,
                'reviews' => 41,
                'stock' => 6,
                'badge' => 'Limited',
                'featured' => true,
            ],
            [
                'id' => 'nara-loafer',
                'name' => 'Nara Leather Loafer',
                'price' => 3650,
                'category' => 'footwear',
                'brand' => 'northampton-shoemakers',
                'gender' => 'Men',
                'image' => 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=600',
                'gallery' => [
                    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600'
                ],
                'tagline' => 'Blake-stitched on a chiselled last.',
                'description' => 'A slim, low-vamp loafer cut from Italian box calf with a leather sole. Built to be resoled, not replaced.',
                'details' => [
                    'Italian box calf',
                    'Blake stitch construction',
                    'Leather sole',
                    'True to size',
                ],
                'colors' => ['Onyx', 'Espresso', 'Oxblood'],
                'sizes' => ['38', '39', '40', '41', '42', '43', '44'],
                'materials' => ['Leather'],
                'collection' => 'everyday-essentials',
                'rating' => 4.7,
                'reviews' => 73,
                'stock' => 11,
                'featured' => true,
            ],
            [
                'id' => 'linen-napkins',
                'name' => 'Tavola Linen Napkins (set of 4)',
                'price' => 640,
                'category' => 'home',
                'brand' => 'atelier-nord',
                'gender' => 'Unisex',
                'image' => 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600',
                'tagline' => 'Stone-washed European linen.',
                'description' => 'Generous 50×50cm napkins with hand-rolled hems. The weave softens after every wash.',
                'details' => [
                    '100% European linen',
                    'Stone-washed finish',
                    'Hand-rolled hems',
                    'Set of four',
                ],
                'colors' => ['Ivory', 'Terracotta', 'Sage'],
                'materials' => ['Linen'],
                'rating' => 4.6,
                'reviews' => 52,
                'stock' => 22,
                'featured' => false,
            ],
            [
                'id' => 'round-sunglasses',
                'name' => 'Cercle Sunglasses',
                'price' => 2150,
                'category' => 'accessories',
                'brand' => 'atelier-nord',
                'gender' => 'Unisex',
                'image' => 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
                'tagline' => 'Gold-plated frames with mineral glass lenses.',
                'description' => 'A pared-back round silhouette, hand-assembled in the Jura. The mineral lenses resist scratches and keep their clarity.',
                'details' => [
                    'Gold-plated titanium',
                    'CR-39 mineral lenses',
                    '100% UV protection',
                    'Made in France',
                ],
                'colors' => ['Gold'],
                'materials' => ['Titanium'],
                'collection' => 'everyday-essentials',
                'rating' => 4.8,
                'reviews' => 164,
                'stock' => 18,
                'badge' => 'Bestseller',
                'featured' => false,
            ],
            [
                'id' => 'halden-coat',
                'name' => 'Halden Wool Overcoat',
                'price' => 6850,
                'category' => 'apparel',
                'brand' => 'atelier-nord',
                'gender' => 'Women',
                'image' => 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
                'tagline' => 'Double-faced virgin wool, cut in Porto.',
                'description' => 'A long, single-breasted silhouette in pure virgin wool. Tailored shoulders, soft hand, deep welted pockets.',
                'details' => [
                    '100% virgin wool',
                    'Cut & sewn in Porto',
                    'Single-button closure',
                    'Fully lined in cupro',
                ],
                'colors' => ['Camel', 'Charcoal', 'Ivory'],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'materials' => ['Wool'],
                'collection' => 'autumn-volume-07',
                'rating' => 4.9,
                'reviews' => 86,
                'stock' => 5,
                'badge' => 'Look 01',
                'featured' => true,
            ],
            [
                'id' => 'atelier-shirt',
                'name' => 'Atelier Cotton Shirt',
                'price' => 1450,
                'category' => 'apparel',
                'brand' => 'atelier-nord',
                'gender' => 'Men',
                'image' => 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
                'tagline' => 'Long-staple Egyptian cotton, sewn in Japan.',
                'description' => 'An unfussy point-collar shirt in a fine cotton poplin. Mother-of-pearl buttons and a curved hem.',
                'details' => [
                    '100% Egyptian cotton',
                    'Sewn in Okayama',
                    'Mother-of-pearl buttons',
                    'Regular fit',
                ],
                'colors' => ['Bone', 'Slate', 'Olive'],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'materials' => ['Cotton'],
                'rating' => 4.7,
                'reviews' => 211,
                'stock' => 30,
                'featured' => false,
            ],
            [
                'id' => 'porto-trouser',
                'name' => 'Porto Wool Trouser',
                'price' => 2650,
                'category' => 'apparel',
                'brand' => 'atelier-nord',
                'gender' => 'Men',
                'image' => 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600',
                'tagline' => 'High-rise, single pleat, cuffed hem.',
                'description' => 'A relaxed wool trouser with a clean drape. Cut from a mid-weight Italian wool that holds its line.',
                'details' => [
                    'Italian wool blend',
                    'Single front pleat',
                    'Side adjusters',
                    'Unfinished hem',
                ],
                'colors' => ['Charcoal', 'Stone', 'Navy'],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'materials' => ['Wool'],
                'rating' => 4.6,
                'reviews' => 58,
                'stock' => 16,
                'featured' => false,
            ],
            [
                'id' => 'marais-boot',
                'name' => 'Marais Chelsea Boot',
                'price' => 4950,
                'compare' => 5600,
                'category' => 'footwear',
                'brand' => 'northampton-shoemakers',
                'gender' => 'Unisex',
                'image' => 'https://images.unsplash.com/photo-1638247025967-b4e38f6893b4?auto=format&fit=crop&q=80&w=600',
                'tagline' => 'Goodyear-welted in Northamptonshire.',
                'description' => 'A clean Chelsea silhouette on a slim leather sole. Designed to be worn daily and resoled twice.',
                'details' => [
                    'Calf leather upper',
                    'Goodyear welt',
                    'Leather sole',
                    'Made in England',
                ],
                'colors' => ['Black', 'Cognac'],
                'sizes' => ['38', '39', '40', '41', '42', '43', '44'],
                'materials' => ['Leather'],
                'rating' => 4.8,
                'reviews' => 47,
                'stock' => 9,
                'badge' => 'Sale',
                'featured' => false,
            ],
            [
                'id' => 'silk-scarf',
                'name' => 'Soie Square Scarf',
                'price' => 1750,
                'category' => 'accessories',
                'brand' => 'atelier-nord',
                'gender' => 'Women',
                'image' => 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=600',
                'tagline' => 'Hand-rolled silk twill from Como.',
                'description' => 'A 90cm square in heavyweight silk twill. Painted in our Lisbon studio, printed by a single mill in Como.',
                'details' => [
                    '100% silk twill',
                    'Hand-rolled hems',
                    'Printed in Como',
                    '90 × 90 cm',
                ],
                'colors' => ['Terracotta', 'Bone', 'Ink'],
                'materials' => ['Silk'],
                'rating' => 4.9,
                'reviews' => 32,
                'stock' => 12,
                'featured' => false,
            ],
            [
                'id' => 'cotton-tee',
                'name' => 'Essentiel Cotton Tee',
                'price' => 650,
                'category' => 'apparel',
                'brand' => 'atelier-nord',
                'gender' => 'Unisex',
                'image' => 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600',
                'tagline' => 'Heavyweight 280gsm organic cotton.',
                'description' => 'A relaxed crewneck in heavyweight organic cotton. Garment-dyed for a soft, lived-in hand.',
                'details' => [
                    '280gsm organic cotton',
                    'Garment-dyed',
                    'Tubular construction',
                    'Made in Portugal',
                ],
                'colors' => ['Bone', 'Black', 'Sand', 'Olive'],
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'materials' => ['Cotton'],
                'rating' => 4.8,
                'reviews' => 412,
                'stock' => 80,
                'featured' => false,
            ]
        ];

        foreach ($productsData as $p) {
            // Create Product
            $product = Product::create([
                'name' => $p['name'],
                'slug' => $p['id'], // Use the string ID as slug to match frontend expectations
                'brand_id' => $brands[$p['brand']]->id,
                'description' => $p['description'],
                'summary' => $p['tagline'],
                'seo_title' => $p['name'] . ' — Atelier Nord',
                'seo_description' => $p['tagline'],
                'featured' => $p['featured'],
                'is_visible' => true,
                'published_at' => now(),
                'type' => ProductType::Standard,
                'sku' => 'SKU-' . strtoupper(Str::random(6)),
                'metadata' => [
                    'tagline' => $p['tagline'],
                    'details' => $p['details'],
                    'colors' => $p['colors'],
                    'sizes' => $p['sizes'] ?? null,
                    'materials' => $p['materials'],
                    'gender' => $p['gender'],
                    'badge' => $p['badge'] ?? null,
                    'rating' => $p['rating'],
                    'reviews_count' => $p['reviews'],
                ]
            ]);

            // Attach to Category
            $product->categories()->attach($categories[$p['category']]->id);

            // Attach to Channel
            $product->channels()->attach($channel->id);

            // Attach to Collection if exists
            if (isset($p['collection']) && isset($collections[$p['collection']])) {
                $product->collections()->attach($collections[$p['collection']]->id);
            }

            // Price in MAD
            $product->prices()->create([
                'amount' => $p['price'],
                'compare_amount' => $p['compare'] ?? null,
                'currency_id' => $mad->id,
            ]);

            // Add Stock
            DB::table(shopper_table('inventory_histories'))->insert([
                'inventory_id' => $inventory->id,
                'stockable_id' => $product->id,
                'stockable_type' => 'product',
                'quantity' => $p['stock'],
                'event' => 'Initial Import',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Attach attributes to product level
            $product->options()->attach([$colorAttr->id, $sizeAttr->id]);

            // Spatie media upload (main image)
            try {
                $product->addMediaFromUrl($p['image'])
                    ->toMediaCollection(config('shopper.media.storage.collection_name', 'uploads'));
            } catch (\Exception $e) {
                Log::warning("Could not add image for {$p['id']}: " . $e->getMessage());
            }

            // Spatie media upload (gallery images)
            if (isset($p['gallery'])) {
                foreach ($p['gallery'] as $galUrl) {
                    try {
                        $product->addMediaFromUrl($galUrl)
                            ->toMediaCollection(config('shopper.media.storage.collection_name', 'uploads'));
                    } catch (\Exception $e) {
                        Log::warning("Could not add gallery image for {$p['id']}: " . $e->getMessage());
                    }
                }
            }

            // Add reviews to DB
            for ($i = 0; $i < rand(3, 8); $i++) {
                Review::create([
                    'reviewrateable_id' => $product->id,
                    'reviewrateable_type' => 'product',
                    'author_id' => 1,
                    'author_type' => \App\Models\User::class,
                    'rating' => rand(4, 5),
                    'content' => $faker->sentence(12),
                    'approved' => true,
                ]);
            }
        }

        // Ensure all media have UUIDs
        DB::table('media')->whereNull('uuid')->get()->each(function ($media) {
            DB::table('media')->where('id', $media->id)->update(['uuid' => (string) Str::uuid()]);
        });
    }
}
