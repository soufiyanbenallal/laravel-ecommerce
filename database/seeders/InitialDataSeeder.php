<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Shopper\Core\Models\Category;
use Shopper\Core\Models\Product;
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
use Shopper\Core\Models\ProductVariant;
use Shopper\Core\Enum\CollectionType;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class InitialDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Core Config
        $currency = Currency::firstOrCreate(['code' => 'MAD'], [
            'name' => 'Moroccan Dirham',
            'symbol' => 'DH',
            'format' => '%s MAD',
            'exchange_rate' => 1.00000000,
        ]);

        $channel = Channel::firstOrCreate(['slug' => 'web-store'], [
            'name' => 'Web Store',
            'is_default' => true,
            'is_enabled' => true,
            'url' => config('app.url'),
        ]);

        $morocco = Country::where('cca2', 'MA')->first();
        $inventory = Inventory::firstOrCreate(['code' => 'MAIN'], [
            'name' => 'Main Warehouse',
            'email' => 'warehouse@kenz.ma',
            'city' => 'Casablanca',
            'country_id' => $morocco->id ?? 1,
            'street_address' => 'Boulevard Mohammed V',
            'is_default' => true,
            'postal_code' => '20000',
        ]);

        // 2. Brands
        $brands = [
            ['name' => 'Apple', 'slug' => 'apple'],
            ['name' => 'Samsung', 'slug' => 'samsung'],
            ['name' => 'DJI', 'slug' => 'dji'],
            ['name' => 'Dyson', 'slug' => 'dyson'],
        ];
        foreach ($brands as $b) {
            Brand::updateOrCreate(['slug' => $b['slug']], ['name' => $b['name'], 'is_enabled' => true]);
        }

        // 3. Categories
        $categories = [
            ['name' => 'Électronique', 'slug' => 'electronique', 'icon' => '📱'],
            ['name' => 'Mode & Accessoires', 'slug' => 'mode', 'icon' => '👕'],
            ['name' => 'Maison & Déco', 'slug' => 'maison', 'icon' => '🏠'],
        ];
        foreach ($categories as $cat) {
            Category::updateOrCreate(['slug' => $cat['slug']], [
                'name' => $cat['name'],
                'is_enabled' => true,
                'description' => "Explore our {$cat['name']} collection.",
            ]);
        }

        // 4. Attributes
        $colorAttr = Attribute::firstOrCreate(['slug' => 'color'], [
            'name' => 'Couleur', 'type' => 'colorpicker', 'is_enabled' => true
        ]);
        $black = AttributeValue::firstOrCreate(['attribute_id' => $colorAttr->id, 'key' => 'noir'], ['value' => 'Noir']);
        $white = AttributeValue::firstOrCreate(['attribute_id' => $colorAttr->id, 'key' => 'blanc'], ['value' => 'Blanc']);

        // 5. Collections
        $flashCollection = Collection::firstOrCreate(['slug' => 'flash-deals'], [
            'name' => 'Ventes Flash',
            'type' => CollectionType::Manual,
            'published_at' => now(),
        ]);

        // 6. Products
        $products = [
            [
                'name' => 'iPhone 15 Pro Max',
                'brand' => 'apple',
                'category' => 'electronique',
                'price' => 12500,
                'compare' => 14000,
                'featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
                ],
                'variants' => [
                    ['name' => '128GB Black', 'price' => 12500, 'color' => $black],
                    ['name' => '256GB White', 'price' => 13800, 'color' => $white],
                ]
            ],
            [
                'name' => 'DJI Mini 4 Pro',
                'brand' => 'dji',
                'category' => 'electronique',
                'price' => 9500,
                'compare' => 10500,
                'featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=800',
                ],
            ]
        ];

        foreach ($products as $pData) {
            $brand = Brand::where('slug', $pData['brand'])->first();
            $product = Product::create([
                'name' => $pData['name'],
                'slug' => Str::slug($pData['name']),
                'brand_id' => $brand->id ?? null,
                'description' => "Detailed description for {$pData['name']}.",
                'seo_title' => $pData['name'] . ' | KENZ Morocco',
                'seo_description' => "Buy {$pData['name']} at best price in Morocco.",
                'featured' => $pData['featured'] ?? false,
                'is_visible' => true,
                'published_at' => now(),
                'sku' => strtoupper(Str::random(8)),
            ]);

            // Price
            Price::create([
                'priceable_id' => $product->id,
                'priceable_type' => get_class($product),
                'amount' => $pData['price'],
                'compare_amount' => $pData['compare'] ?? null,
                'currency_id' => $currency->id,
            ]);

            // Relations
            $this->linkProduct($product, Category::where('slug', $pData['category'])->first());
            $this->linkProduct($product, $channel);
            $this->linkProduct($product, $flashCollection);

            // Inventory
            DB::table(shopper_table('inventory_histories'))->insert([
                'inventory_id' => $inventory->id,
                'stockable_id' => $product->id,
                'stockable_type' => get_class($product),
                'quantity' => 100,
                'event' => 'Initial Stock',
                'user_id' => 1,
                'created_at' => now(), 'updated_at' => now(),
            ]);

            // Media
            foreach ($pData['images'] as $url) {
                try {
                    $product->addMediaFromUrl($url)->toMediaCollection('public');
                } catch (\Exception $e) {}
            }

            // Variants
            if (isset($pData['variants'])) {
                foreach ($pData['variants'] as $v) {
                    $variant = ProductVariant::create([
                        'product_id' => $product->id,
                        'name' => $v['name'],
                        'sku' => strtoupper(Str::random(10)),
                    ]);
                    
                    Price::create([
                        'priceable_id' => $variant->id,
                        'priceable_type' => get_class($variant),
                        'amount' => $v['price'],
                        'currency_id' => $currency->id,
                    ]);

                    if (isset($v['color'])) {
                        $variant->values()->attach($v['color']->id);
                    }
                }
            }
        }
    }

    protected function linkProduct($product, $model)
    {
        if (!$model) return;
        DB::table(shopper_table('product_has_relations'))->insert([
            'product_id' => $product->id,
            'productable_id' => $model->id,
            'productable_type' => get_class($model),
        ]);
    }
}
