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
use Faker\Factory as Faker;

class ProductionSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // 1. Initial configuration - Use existing or create
        $mad = Currency::where('code', 'MAD')->first() ?? Currency::create([
            'code' => 'MAD',
            'name' => 'Moroccan Dirham',
            'symbol' => 'DH',
            'format' => '%s MAD',
            'exchange_rate' => 1.0,
            'is_enabled' => true,
        ]);

        $channel = Channel::first() ?? Channel::create([
            'name' => 'Kenz Official Store',
            'slug' => 'kenz-official-store',
            'is_default' => true,
            'is_enabled' => true,
            'url' => config('app.url'),
        ]);

        $inventory = Inventory::first() ?? Inventory::create([
            'code' => 'K-WH-01',
            'name' => 'Casablanca Logistics Hub',
            'email' => 'logistics@kenz.ma',
            'city' => 'Casablanca',
            'country_id' => Country::where('cca2', 'MA')->first()->id ?? 1,
            'street_address' => '120 Boulevard Moulay Youssef',
            'is_default' => true,
            'postal_code' => '20000',
        ]);

        // 2. Taxonomy & Brands
        $brandData = [
            ['name' => 'Xiaomi', 'slug' => 'xiaomi'],
            ['name' => 'DJI', 'slug' => 'dji'],
            ['name' => 'Huawei', 'slug' => 'huawei'],
            ['name' => 'ACME Industrial', 'slug' => 'acme-industrial'],
            ['name' => 'Baseus', 'slug' => 'baseus'],
        ];
        $brands = [];
        foreach ($brandData as $b) {
            $brands[$b['slug']] = Brand::create(['name' => $b['name'], 'slug' => $b['slug'], 'is_enabled' => true]);
            // Add brand thumbnail
            try {
                $brands[$b['slug']]->addMediaFromUrl("https://logo.clearbit.com/{$b['slug']}.com")
                    ->toMediaCollection(config('shopper.media.storage.thumbnail_collection', 'thumbnail'));
            } catch (\Exception $e) {}
        }

        $categoryData = [
            ['name' => 'Électronique de Pointe', 'slug' => 'electronics', 'desc' => 'Dernières technologies importées.'],
            ['name' => 'Solutions Industrielles', 'slug' => 'industrial', 'desc' => 'Équipement professionnel pour entreprises.'],
            ['name' => 'Maison Intelligente', 'slug' => 'smart-home', 'desc' => 'Domotique et confort moderne.'],
            ['name' => 'Accessoires Premium', 'slug' => 'accessories', 'desc' => 'Le meilleur de Baseus et Xiaomi.'],
        ];
        $categories = [];
        foreach ($categoryData as $c) {
            $categories[$c['slug']] = Category::create([
                'name' => $c['name'],
                'slug' => $c['slug'],
                'description' => $c['desc'],
                'is_enabled' => true,
            ]);
            // Add category thumbnail
            try {
                $categories[$c['slug']]->addMediaFromUrl("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400")
                    ->toMediaCollection(config('shopper.media.storage.thumbnail_collection', 'thumbnail'));
            } catch (\Exception $e) {}
        }

        $collection = Collection::create([
            'name' => 'Nouveautés Sino-Maroc',
            'slug' => 'new-arrivals',
            'type' => CollectionType::Manual,
            'published_at' => now(),
        ]);
        try {
            $collection->addMediaFromUrl("https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=400")
                ->toMediaCollection(config('shopper.media.storage.thumbnail_collection', 'thumbnail'));
        } catch (\Exception $e) {}

        // 3. Attributes
        $colorAttr = Attribute::create(['name' => 'Couleur', 'slug' => 'color', 'type' => 'colorpicker', 'is_enabled' => true]);
        $storageAttr = Attribute::create(['name' => 'Stockage', 'slug' => 'storage', 'type' => 'select', 'is_enabled' => true]);

        $black = AttributeValue::create(['attribute_id' => $colorAttr->id, 'key' => 'noir', 'value' => 'Noir']);
        $silver = AttributeValue::create(['attribute_id' => $colorAttr->id, 'key' => 'argent', 'value' => 'Argent']);
        $v128 = AttributeValue::create(['attribute_id' => $storageAttr->id, 'key' => '128gb', 'value' => '128 GB']);
        $v256 = AttributeValue::create(['attribute_id' => $storageAttr->id, 'key' => '256gb', 'value' => '256 GB']);

        // 4. Products Creation
        $realProducts = [
            [
                'name' => 'Xiaomi 14 Ultra 5G',
                'brand' => 'xiaomi',
                'category' => 'electronics',
                'price' => 11990,
                'compare' => 13500,
                'featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1711100569736-234289871790?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1711100569566-50e505299402?auto=format&fit=crop&q=80&w=1200',
                ],
                'variants' => [
                    ['name' => '14 Ultra - Black 256GB', 'price' => 11990, 'values' => [$black->id, $v256->id]],
                    ['name' => '14 Ultra - Silver 128GB', 'price' => 10500, 'values' => [$silver->id, $v128->id]],
                ]
            ],
            [
                'name' => 'DJI Mavic 3 Pro Cine Premium Combo',
                'brand' => 'dji',
                'category' => 'electronics',
                'price' => 45000,
                'featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=1200',
                ],
            ],
            [
                'name' => 'ACME Graveur Laser Industriel 50W',
                'brand' => 'acme-industrial',
                'category' => 'industrial',
                'price' => 8500,
                'featured' => false,
                'images' => [
                    'https://images.unsplash.com/photo-1581244276894-8ec66b7a9727?auto=format&fit=crop&q=80&w=1200',
                ],
            ],
            [
                'name' => 'Xiaomi Smart Air Purifier 4 Pro',
                'brand' => 'xiaomi',
                'category' => 'smart-home',
                'price' => 2850,
                'compare' => 3200,
                'featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=1200',
                ],
            ]
        ];

        foreach ($realProducts as $p) {
            // Create Product
            $product = Product::create([
                'name' => $p['name'],
                'slug' => Str::slug($p['name']),
                'brand_id' => $brands[$p['brand']]->id,
                'description' => $faker->paragraphs(3, true),
                'summary' => $faker->sentence(10),
                'seo_title' => $p['name'] . ' - Kenz Maroc',
                'seo_description' => $faker->sentence(10),
                'featured' => $p['featured'],
                'is_visible' => true,
                'published_at' => now(),
                'type' => ProductType::Standard,
                'sku' => 'SKU-' . strtoupper(Str::random(6)),
            ]);

            // Relationships using Eloquent (handles Morph Map automatically)
            $product->categories()->attach($categories[$p['category']]->id);
            $product->channels()->attach($channel->id);
            $product->collections()->attach($collection->id);

            // Prices using Relationship
            $product->prices()->create([
                'amount' => $p['price'],
                'compare_amount' => $p['compare'] ?? null,
                'currency_id' => $mad->id,
            ]);

            // Stock
            DB::table(shopper_table('inventory_histories'))->insert([
                'inventory_id' => $inventory->id,
                'stockable_id' => $product->id,
                'stockable_type' => 'product', // Correct Morph Map Key
                'quantity' => $faker->numberBetween(10, 50),
                'event' => 'Initial Import',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Options (Attribute links at product level)
            if ($p['category'] === 'electronics') {
                $product->options()->attach([$colorAttr->id, $storageAttr->id]);
            }

            // Media using correct collection name
            foreach ($p['images'] as $url) {
                try {
                    $product->addMediaFromUrl($url)
                        ->toMediaCollection(config('shopper.media.storage.collection_name', 'uploads'));
                } catch (\Exception $e) {}
            }

            // Variants
            if (isset($p['variants'])) {
                foreach ($p['variants'] as $vData) {
                    $variant = ProductVariant::create([
                        'product_id' => $product->id,
                        'name' => $vData['name'],
                        'sku' => 'SKU-V-' . strtoupper(Str::random(6)),
                    ]);

                    $variant->prices()->create([
                        'amount' => $vData['price'],
                        'currency_id' => $mad->id,
                    ]);

                    // Attach attribute values to variant
                    $variant->values()->attach($vData['values']);
                }
            }

            // Reviews
            for ($i = 0; $i < rand(3, 8); $i++) {
                Review::create([
                    'reviewrateable_id' => $product->id,
                    'reviewrateable_type' => 'product', // Correct Morph Map Key
                    'author_id' => 1,
                    'author_type' => \App\Models\User::class,
                    'rating' => rand(4, 5),
                    'content' => $faker->sentence(15),
                    'approved' => true,
                ]);
            }
        }

        // Add some random fake products to fill the catalog
        Product::factory(10)->create()->each(function ($p) use ($categories, $channel, $mad, $inventory, $brands) {
            $p->update(['brand_id' => Brand::inRandomOrder()->first()->id]);
            
            $p->categories()->attach(Category::inRandomOrder()->first()->id);
            $p->channels()->attach($channel->id);
            
            $p->prices()->create([
                'amount' => rand(100, 5000),
                'currency_id' => $mad->id,
            ]);

            DB::table(shopper_table('inventory_histories'))->insert([
                'inventory_id' => $inventory->id,
                'stockable_id' => $p->id,
                'stockable_type' => 'product',
                'quantity' => rand(5, 20),
                'event' => 'Initial Import',
                'user_id' => 1,
                'created_at' => now(), 'updated_at' => now(),
            ]);
        });

        // 5. Fix Media UUIDs (Filament/Spatie plugin requirement)
        // Ensure all media have UUIDs as some seeder operations might bypass observers
        DB::table('media')->whereNull('uuid')->get()->each(function ($media) {
            DB::table('media')->where('id', $media->id)->update(['uuid' => Str::uuid()]);
        });
    }
}
