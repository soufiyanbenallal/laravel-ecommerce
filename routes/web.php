<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/nouveautes', [CatalogController::class, 'index'])->name('catalog.new');
Route::get('/promotions', [CatalogController::class, 'index'])->name('catalog.promotions');
Route::get('/reconditionnes', [CatalogController::class, 'index'])->name('catalog.refurbished');
Route::get('/grossiste', [CatalogController::class, 'index'])->name('catalog.wholesale');

Route::inertia('/about', 'About/about.index')->name('about');
Route::inertia('/contact', 'Static/static.contact')->name('contact');
Route::inertia('/faq', 'Static/static.faq')->name('faq');
Route::inertia('/sourcing', 'Static/static.sourcing')->name('sourcing');
Route::inertia('/cgv', 'Static/static.cgv')->name('cgv');
Route::inertia('/mentions-legales', 'Static/static.mentions-legales')->name('mentions-legales');
Route::inertia('/politique-confidentialite', 'Static/static.confidentialite')->name('confidentialite');

Route::get('/collections', [CatalogController::class, 'collectionsIndex'])->name('collections.index');
Route::get('/collection/{slug}', [CatalogController::class, 'collectionShow'])->name('collections.show');
Route::get('/category/{slug}', [CatalogController::class, 'categoryShow'])->name('categories.show');

Route::get('/wishlist', function () {
    return Inertia::render('Wishlist/wishlist.index');
})->name('wishlist');

Route::get('/search', [CatalogController::class, 'search'])->name('search');

Route::get('/api/search', [CatalogController::class, 'apiSearch'])->name('api.search');
Route::get('/api/search/popular', [CatalogController::class, 'apiPopular'])->name('api.search.popular');
Route::post('/api/wishlist', [CatalogController::class, 'apiWishlist'])->name('api.wishlist');

Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');

Route::middleware('throttle:cart')->group(function (): void {
    Route::post('/cart/items', [CartController::class, 'store'])->name('cart.items.store');
    Route::patch('/cart/items/{productId}', [CartController::class, 'update'])->name('cart.items.update');
    Route::delete('/cart/items/{productId}', [CartController::class, 'destroy'])->name('cart.items.destroy');
    Route::post('/cart/sync', [CartController::class, 'sync'])->name('cart.sync');
});

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::post('/sourcing', [ContactController::class, 'sourcing'])->name('sourcing.store');

Route::middleware('auth')->group(function (): void {
	Route::middleware('throttle:checkout')->group(function (): void {
        Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
        Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    });

	Route::prefix('account')->group(function (): void {
		Route::get('/orders', [CheckoutController::class, 'orders'])->name('account.orders.index');
		Route::get('/orders/{number}', [CheckoutController::class, 'submitted'])->name('account.orders.submitted');
		Route::get('/orders/{number}/invoice', [CheckoutController::class, 'invoice'])->name('account.orders.invoice');
		Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
	});
});

Route::middleware('guest')->group(function (): void {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});
