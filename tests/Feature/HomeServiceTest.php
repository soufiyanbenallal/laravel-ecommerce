<?php

use App\Services\HomeService;
use Shopper\Core\Models\Category;
use Shopper\Core\Models\Product;

it('returns correctly formatted home data', function () {
    $service = new HomeService();
    $data = $service->getHomeData();

    expect($data)->toBeArray()
        ->toHaveKeys(['categories', 'flash_deals', 'new_arrivals', 'collections', 'testimonials']);
});

it('formats product data correctly', function () {
    // This requires a real product or a mock if we want to test deeper logic
    // For now we test that the structure matches our expected HomePropsType
    $service = new HomeService();
    $data = $service->getHomeData();
    
    if (count($data['new_arrivals']) > 0) {
        $product = $data['new_arrivals'][0];
        expect($product)->toHaveKeys(['id', 'name', 'slug', 'price', 'currency']);
    }
});
