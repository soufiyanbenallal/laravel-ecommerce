<?php

namespace App\Http\Controllers;

use App\Services\Checkout\ShopperCheckoutService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function __construct(private readonly ShopperCheckoutService $checkout) {}

    public function index(): Response
    {
        return Inertia::render('Cart/Index', $this->checkout->cartPayload());
    }

    public function store(Request $request): RedirectResponse
    {
        $payload = $request->validate([
            'slug' => ['required', 'string', 'max:255'],
            'quantity' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        $this->checkout->addItemBySlug($payload['slug'], (int) ($payload['quantity'] ?? 1));

        return to_route('cart.index');
    }

    public function update(Request $request, int $productId): RedirectResponse
    {
        $payload = $request->validate([
            'quantity' => ['required', 'integer', 'min:0', 'max:50'],
        ]);

        $this->checkout->updateItemQuantity($productId, (int) $payload['quantity']);

        return to_route('cart.index');
    }

    public function destroy(int $productId): RedirectResponse
    {
        $this->checkout->removeItem($productId);

        return to_route('cart.index');
    }
}
