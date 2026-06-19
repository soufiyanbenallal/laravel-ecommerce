<?php

namespace App\Http\Controllers;

use App\Http\Requests\Checkout\StoreCheckoutOrderRequest;
use App\Services\Checkout\ShopperCheckoutService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CheckoutController extends Controller
{
    public function __construct(private readonly ShopperCheckoutService $checkout) {}

    public function index(): InertiaResponse
    {
        return Inertia::render('Checkout/checkout.index', $this->checkout->checkoutPayload());
    }

    public function store(StoreCheckoutOrderRequest $request): RedirectResponse
    {
        $order = $this->checkout->createOrder($request->validated(), (int) $request->user()->id);

        return to_route('account.orders.submitted', ['number' => $order->number]);
    }

    public function orders(Request $request): InertiaResponse
    {
        return Inertia::render('Account/account.orders.index', [
            'orders' => $this->checkout->customerOrders((int) $request->user()->id),
        ]);
    }

    public function submitted(Request $request, string $number): InertiaResponse
    {
        $order = $this->checkout->orderSummary($number, (int) $request->user()->id);

        abort_if(! $order, Response::HTTP_NOT_FOUND);

        return Inertia::render('Account/account.orders.submitted', [
            'order' => $order,
        ]);
    }

    public function invoice(Request $request, string $number): StreamedResponse
    {
        $invoice = $this->checkout->invoiceContent($number, (int) $request->user()->id);

        abort_if(! $invoice, Response::HTTP_NOT_FOUND);

        return response()->streamDownload(
            fn () => print($invoice['content']),
            $invoice['filename'],
            ['Content-Type' => 'text/plain; charset=UTF-8']
        );
    }
}
