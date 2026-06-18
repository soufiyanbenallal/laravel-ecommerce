<?php

use App\Services\HomeService;
use Inertia\Testing\AssertableInertia as Assert;
it('renders the home page with correct inertia props', function () {
    $this->withoutVite();
    $response = $this->get(route('home'));

    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Home/home.index', false)
        ->has('categories')
        ->has('flash_deals')
        ->has('new_arrivals')
        ->has('collections')
        ->has('testimonials')
    );
});
