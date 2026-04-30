<?php

namespace App\Services\Checkout;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;
use Shopper\Core\Models\Order;
use Shopper\Core\Models\OrderAddress;
use Shopper\Core\Models\OrderItem;
use Shopper\Core\Models\PaymentMethod;
use Shopper\Core\Models\Product;

class ShopperCheckoutService
{
    private const CART_SESSION_KEY = 'checkout.cart';

    public function checkoutPayload(): array
    {
        if (! $this->hasProductsTable()) {
            return [
                'cartItems' => [],
                'paymentMethods' => [],
                'totals' => [
                    'subtotal' => 0,
                    'discount' => 0,
                    'total' => 0,
                    'currency' => shopper_currency(),
                ],
            ];
        }

        $cartItems = $this->cartItems();
        $totals = $this->calculateTotals($cartItems);

        return [
            'cartItems' => $cartItems,
            'paymentMethods' => $this->paymentMethods(),
            'totals' => $totals,
        ];
    }

    public function cartPayload(): array
    {
        $cartItems = $this->cartItems();

        return [
            'cartItems' => $cartItems,
            'totals' => $this->calculateTotals($cartItems),
        ];
    }

    public function addItemBySlug(string $slug, int $quantity = 1): void
    {
        if (! $this->hasProductsTable()) {
            return;
        }

        $product = Product::query()
            ->where('is_visible', true)
            ->where('slug', $slug)
            ->first();

        if (! $product) {
            return;
        }

        $cart = session()->get(self::CART_SESSION_KEY, []);
        $key = (string) $product->id;

        $cart[$key] = ((int) ($cart[$key] ?? 0)) + max($quantity, 1);

        session()->put(self::CART_SESSION_KEY, $cart);
    }

    public function updateItemQuantity(int $productId, int $quantity): void
    {
        $cart = session()->get(self::CART_SESSION_KEY, []);
        $key = (string) $productId;

        if (! array_key_exists($key, $cart)) {
            return;
        }

        if ($quantity <= 0) {
            unset($cart[$key]);
        } else {
            $cart[$key] = $quantity;
        }

        session()->put(self::CART_SESSION_KEY, $cart);
    }

    public function removeItem(int $productId): void
    {
        $cart = session()->get(self::CART_SESSION_KEY, []);
        $key = (string) $productId;

        if (! array_key_exists($key, $cart)) {
            return;
        }

        unset($cart[$key]);
        session()->put(self::CART_SESSION_KEY, $cart);
    }

    public function createOrder(array $payload, int $customerId): Order
    {
        if (! $this->canPersistOrders()) {
            throw ValidationException::withMessages([
                'cart' => 'Checkout is not configured yet. Shopper order tables are missing.',
            ]);
        }

        $cartItems = $this->cartItems();

        if (count($cartItems) === 0) {
            throw ValidationException::withMessages([
                'cart' => 'Your cart is empty. Add at least one activity before checkout.',
            ]);
        }

        $totals = $this->calculateTotals($cartItems, Arr::get($payload, 'promo_code'));

        return DB::transaction(function () use ($payload, $customerId, $cartItems, $totals): Order {
            $billingAddress = $this->createOrderAddress($payload, $customerId);
            $paymentMethodId = $this->resolvePaymentMethodId(Arr::get($payload, 'payment_method_slug'));

            $order = Order::query()->create([
                'number' => generate_number(),
                'price_amount' => (int) round($totals['total'] * 100),
                'currency_code' => $totals['currency'],
                'payment_method_id' => $paymentMethodId,
                'customer_id' => $customerId,
                'billing_address_id' => $billingAddress?->id,
                'shipping_address_id' => $billingAddress?->id,
                'channel_id' => $this->resolveChannelId(),
                'notes' => json_encode([
                    'email' => Arr::get($payload, 'email'),
                    'phone' => Arr::get($payload, 'phone'),
                    'special_notes' => Arr::get($payload, 'special_notes'),
                    'guests' => Arr::get($payload, 'guests'),
                    'nationality' => Arr::get($payload, 'nationality'),
                    'promo_code' => Arr::get($payload, 'promo_code'),
                    'discount' => $totals['discount'],
                ], \JSON_UNESCAPED_UNICODE),
            ]);

            foreach ($cartItems as $item) {
                OrderItem::query()->create([
                    'order_id' => $order->id,
                    'name' => $item['name'],
                    'sku' => 'activity-' . $item['id'],
                    'product_id' => $item['id'],
                    'product_type' => Product::class,
                    'quantity' => $item['quantity'],
                    'unit_price_amount' => (int) round($item['unitPrice'] * 100),
                ]);
            }

            session()->forget(self::CART_SESSION_KEY);

            return $order->fresh(['items', 'paymentMethod', 'billingAddress']);
        });
    }

    public function orderSummary(string $number, int $customerId): ?array
    {
        if (! $this->hasOrdersTable()) {
            return null;
        }

        $order = Order::query()
            ->with(['items', 'paymentMethod', 'billingAddress'])
            ->where('number', $number)
            ->where('customer_id', $customerId)
            ->first();

        if (! $order) {
            return null;
        }

        $metadata = $this->orderMetadata($order);
        $subtotal = round(($order->price_amount ?? 0) / 100, 2);
        $discount = (float) ($metadata['discount'] ?? 0);
        $total = max($subtotal, 0);

        return [
            'number' => $order->number,
            'status' => (string) $order->status?->value,
            'createdAt' => $order->created_at?->toIso8601String(),
            'currency' => $order->currency_code,
            'subtotal' => $subtotal,
            'discount' => $discount,
            'total' => $total,
            'paymentMethod' => $order->paymentMethod?->title,
            'customer' => [
                'firstName' => $order->billingAddress?->first_name,
                'lastName' => $order->billingAddress?->last_name,
                'email' => $metadata['email'] ?? null,
                'phone' => $metadata['phone'] ?? $order->billingAddress?->phone,
                'streetAddress' => $order->billingAddress?->street_address,
                'postalCode' => $order->billingAddress?->postal_code,
                'city' => $order->billingAddress?->city,
                'countryName' => $order->billingAddress?->country_name,
            ],
            'specialNotes' => $metadata['special_notes'] ?? null,
            'items' => $order->items->map(fn (OrderItem $item) => [
                'id' => $item->id,
                'name' => $item->name,
                'quantity' => $item->quantity,
                'unitPrice' => round($item->unit_price_amount / 100, 2),
                'totalPrice' => round(($item->unit_price_amount * $item->quantity) / 100, 2),
            ])->values()->all(),
            'invoiceUrl' => route('account.orders.invoice', ['number' => $order->number]),
        ];
    }

    public function invoiceContent(string $number, int $customerId): ?array
    {
        $summary = $this->orderSummary($number, $customerId);

        if (! $summary) {
            return null;
        }

        $lines = [
            'MARRAKECH EVASION - RECEIPT / INVOICE',
            '======================================',
            'Order Number: ' . $summary['number'],
            'Status: ' . strtoupper((string) $summary['status']),
            'Created At: ' . ($summary['createdAt'] ?? ''),
            'Payment Method: ' . ($summary['paymentMethod'] ?? 'N/A'),
            '',
            'Customer',
            '--------',
            trim(($summary['customer']['firstName'] ?? '') . ' ' . ($summary['customer']['lastName'] ?? '')),
            'Email: ' . ($summary['customer']['email'] ?? 'N/A'),
            'Phone: ' . ($summary['customer']['phone'] ?? 'N/A'),
            'Address: ' . ($summary['customer']['streetAddress'] ?? 'N/A'),
            'City/Postal: ' . trim(($summary['customer']['city'] ?? '') . ' ' . ($summary['customer']['postalCode'] ?? '')),
            'Country: ' . ($summary['customer']['countryName'] ?? 'N/A'),
            '',
            'Items',
            '-----',
        ];

        foreach ($summary['items'] as $item) {
            $lines[] = sprintf(
                '%s x%d - %s %s',
                $item['name'],
                $item['quantity'],
                number_format((float) $item['totalPrice'], 2, '.', ''),
                $summary['currency']
            );
        }

        $lines[] = '';
        $lines[] = 'Subtotal: ' . number_format((float) $summary['subtotal'], 2, '.', '') . ' ' . $summary['currency'];
        $lines[] = 'Discount: ' . number_format((float) $summary['discount'], 2, '.', '') . ' ' . $summary['currency'];
        $lines[] = 'Total: ' . number_format((float) $summary['total'], 2, '.', '') . ' ' . $summary['currency'];

        return [
            'filename' => 'invoice-' . strtolower($summary['number']) . '.txt',
            'content' => implode(PHP_EOL, $lines) . PHP_EOL,
        ];
    }

    public function customerOrders(int $customerId): array
    {
        if (! $this->hasOrdersTable()) {
            return [];
        }

        return Order::query()
            ->where('customer_id', $customerId)
            ->latest('id')
            ->limit(30)
            ->get(['number', 'status', 'price_amount', 'currency_code', 'created_at'])
            ->map(fn (Order $order) => [
                'number' => $order->number,
                'status' => (string) $order->status?->value,
                'total' => round(($order->price_amount ?? 0) / 100, 2),
                'currency' => $order->currency_code,
                'createdAt' => $order->created_at?->toIso8601String(),
                'url' => route('account.orders.submitted', ['number' => $order->number]),
            ])
            ->values()
            ->all();
    }

    private function paymentMethods(): array
    {
        if (! $this->hasPaymentMethodsTable()) {
            return [];
        }

        return PaymentMethod::query()
            ->enabled()
            ->orderBy('title')
            ->get(['id', 'title', 'slug', 'description'])
            ->map(fn (PaymentMethod $method) => [
                'id' => $method->id,
                'title' => $method->title,
                'slug' => $method->slug,
                'description' => $method->description,
            ])
            ->values()
            ->all();
    }

    private function cartItems(): array
    {
        if (! $this->hasProductsTable()) {
            return [];
        }

        $cart = session()->get(self::CART_SESSION_KEY, []);
        $productIds = array_map('intval', array_keys($cart));

        if (count($productIds) === 0) {
            return [];
        }

        $products = Product::query()
            ->where('is_visible', true)
            ->whereIn('id', $productIds)
            ->with(['prices', 'media'])
            ->get()
            ->keyBy('id');

        $items = [];

        foreach ($cart as $productId => $quantity) {
            /** @var Product|null $product */
            $product = $products->get((int) $productId);

            if (! $product) {
                continue;
            }

            $unitPrice = (float) ($product->prices->first()?->amount ?? 0);
            $qty = max((int) $quantity, 1);

            $items[] = [
                'id' => $product->id,
                'slug' => $product->slug,
                'name' => $product->name,
                'summary' => str($product->description)->stripTags()->squish()->limit(100)->toString(),
                'image' => $product->getFirstMediaUrl('default') ?: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&q=80&fit=crop',
                'quantity' => $qty,
                'unitPrice' => $unitPrice,
                'totalPrice' => round($unitPrice * $qty, 2),
            ];
        }

        return $items;
    }

    private function calculateTotals(array $cartItems, ?string $promoCode = null): array
    {
        $subtotal = round(array_reduce($cartItems, fn (float $carry, array $item) => $carry + (float) $item['totalPrice'], 0), 2);
        $normalizedPromo = strtoupper(trim((string) $promoCode));
        $discount = $normalizedPromo === 'MARRAKECH10' ? round($subtotal * 0.10, 2) : 0;
        $total = max(round($subtotal - $discount, 2), 0);

        return [
            'subtotal' => $subtotal,
            'discount' => $discount,
            'total' => $total,
            'currency' => shopper_currency(),
        ];
    }

    private function createOrderAddress(array $payload, ?int $customerId): ?OrderAddress
    {
        if (! $this->hasOrderAddressesTable()) {
            return null;
        }

        return OrderAddress::query()->create([
            'customer_id' => $customerId,
            'first_name' => Arr::get($payload, 'first_name'),
            'last_name' => Arr::get($payload, 'last_name'),
            'street_address' => Arr::get($payload, 'street_address'),
            'street_address_plus' => null,
            'postal_code' => Arr::get($payload, 'postal_code'),
            'city' => Arr::get($payload, 'city'),
            'phone' => Arr::get($payload, 'phone'),
            'country_name' => Arr::get($payload, 'country_name'),
        ]);
    }

    private function resolvePaymentMethodId(?string $slug): ?int
    {
        if (! $this->hasPaymentMethodsTable() || ! $slug) {
            return null;
        }

        return PaymentMethod::query()
            ->enabled()
            ->where('slug', $slug)
            ->value('id');
    }

    private function resolveChannelId(): ?int
    {
        if (! Schema::hasTable(shopper_table('channels'))) {
            return null;
        }

        $channelModelClass = config('shopper.models.channel');

        return $channelModelClass::query()->orderBy('id')->value('id');
    }

    private function orderMetadata(Order $order): array
    {
        if (! $order->notes) {
            return [];
        }

        $decoded = json_decode($order->notes, true);

        return is_array($decoded) ? $decoded : [];
    }

    private function canPersistOrders(): bool
    {
        return $this->hasOrdersTable() && $this->hasOrderItemsTable();
    }

    private function hasProductsTable(): bool
    {
        return Schema::hasTable(shopper_table('products'));
    }

    private function hasPaymentMethodsTable(): bool
    {
        return Schema::hasTable(shopper_table('payment_methods'));
    }

    private function hasOrdersTable(): bool
    {
        return Schema::hasTable(shopper_table('orders'));
    }

    private function hasOrderItemsTable(): bool
    {
        return Schema::hasTable(shopper_table('order_items'));
    }

    private function hasOrderAddressesTable(): bool
    {
        return Schema::hasTable(shopper_table('order_addresses'));
    }
}
