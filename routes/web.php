<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/items', [CartController::class, 'store'])->name('cart.items.store');
Route::patch('/cart/items/{productId}', [CartController::class, 'update'])->name('cart.items.update');
Route::delete('/cart/items/{productId}', [CartController::class, 'destroy'])->name('cart.items.destroy');

Route::middleware('auth')->group(function (): void {
	Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
	Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

	Route::prefix('account')->group(function (): void {
		Route::get('/orders', [CheckoutController::class, 'orders'])->name('account.orders.index');
		Route::get('/orders/{number}', [CheckoutController::class, 'submitted'])->name('account.orders.submitted');
		Route::get('/orders/{number}/invoice', [CheckoutController::class, 'invoice'])->name('account.orders.invoice');
	});
});
