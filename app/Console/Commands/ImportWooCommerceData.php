<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Shopper\Core\Models\Product;
use Shopper\Core\Models\Category;
use Shopper\Core\Models\Currency;
use Shopper\Core\Models\Price;
use Shopper\Core\Enum\ProductType;

class ImportWooCommerceData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'shopper:import-woo {file?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import WooCommerce JSON data into Shopper';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $file = $this->argument('file') ?? base_path('docs/reports/woocommerce-one-time-import.json');

        if (!File::exists($file)) {
            $this->error("File not found at: {$file}");
            return 1;
        }

        $this->info("Parsing JSON from {$file}...");
        
        $json = File::get($file);
        $data = json_decode($json, true);

        if (!$data) {
            $this->error("Failed to decode JSON.");
            return 1;
        }

        $currency = Currency::firstOrFail();

        $count = 0;
        $bar = $this->output->createProgressBar(count($data));

        foreach ($data as $item) {
            // Safety check for empty items in the JSON array (like the trailing empty objects in the mock)
            if (empty($item['name'])) {
                $bar->advance();
                continue;
            }
             $generatedSKU = 'MA-' . Str::slug($item['name']) . '-' . Str::random(6);
            // Create or update Product
            $product = Product::updateOrCreate(
                ['slug' => $item['slug'] ?? Str::slug($item['name'])],
                [
                    'name' => $item['name'],
                    'summary' => $item['short_description'] ?? null,
                    'description' => $item['description'] ?? null,
                    'seo_title' => $item['name'],
                    'seo_description' => $item['short_description'] ?? null,
                    'featured' => isset($item['Is featured?']) ? $item['Is featured?'] === '1' : 0,
                    'is_visible' => $item['is_published'] ?? false,
                    'sku' => $generatedSKU,
                    'type' => ProductType::Virtual->value, 
                ]
            );

            // Handle Prices
            $dummyPrice = rand(300, 1800); // Fallback price if none provided
            $regularPrice = isset($item['regular_price']) && is_numeric($item['regular_price']) ? (float)$item['regular_price'] : $dummyPrice;
            $salePrice = isset($item['sale_price']) && is_numeric($item['sale_price']) ? (float)$item['sale_price'] : $dummyPrice + rand(20, 200); // Ensure sale price is more than regular price

            // if ($regularPrice > 0 || $salePrice > 0) {
                // Update or create price
                Price::updateOrCreate(
                    [
                        'priceable_id' => $product->id,
                        'priceable_type' => get_class($product),
                        'currency_id' => $currency->id,
                    ],
                    [
                        'amount' => $salePrice ?: $regularPrice,   // Active price to pay
                        'compare_amount' => $salePrice ? $regularPrice : null, // Original price (if sale exists)
                    ]
                );
            // }

            // Attach Categories
            if (!empty($item['categories']) && is_array($item['categories'])) {
                $categoryIds = [];
                foreach ($item['categories'] as $catName) {
                    $category = Category::firstOrCreate(
                        ['slug' => Str::slug($catName)],
                        ['name' => $catName, 'is_enabled' => true]
                    );
                    $categoryIds[] = $category->id;
                }
                $product->categories()->sync($categoryIds);
            }

            // Optional: Import Images via Spatie Media Library
            // Use Shopper's configured collection (or 'default' as fallback)
            $mediaCollection = config('shopper.media.storage.default_collection', 'default');
            
            if (!empty($item['images']) && is_array($item['images'])) {
                foreach ($item['images'] as $imageUrl) {
                    if (is_string($imageUrl) && filter_var($imageUrl, FILTER_VALIDATE_URL)) {
                        // Check if we don't already have images
                        if ($product->getMedia($mediaCollection)->isEmpty()) {
                            try {
                                $product->addMediaFromUrl($imageUrl)
                                        ->toMediaCollection($mediaCollection);
                            } catch (\Exception $e) {
                                // Mute exceptions for broken external URLs
                                Log::info("Failed to import image from URL: {$imageUrl}. Error: " . $e->getMessage());
                            }
                        }
                    }
                }
            }

            $count++;
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("Successfully imported {$count} products from WooCommerce.");
        
        return 0;
    }
}
