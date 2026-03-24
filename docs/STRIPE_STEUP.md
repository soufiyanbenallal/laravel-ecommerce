Payments
Stripe

Copy page

Accept payments with Stripe using PaymentIntents, 3D Secure, and webhooks.

The shopper/stripe package is a first-party Stripe driver for Shopper’s payment system. It uses Stripe PaymentIntents to handle card payments with full support for 3D Secure authentication, manual and automatic capture, partial refunds, and webhook processing.
​
Installation
composer require shopper/stripe
The service provider is auto-discovered. It registers the stripe driver with the payment manager and merges the default configuration.
​
Configuration
Publish the config file:
php artisan vendor:publish --tag=shopper-stripe-config
This creates config/shopper/stripe.php:
return [

    'secret_key' => env('STRIPE_SECRET_KEY'),

    'publishable_key' => env('STRIPE_PUBLISHABLE_KEY'),

    'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),

    'capture_method' => env('STRIPE_CAPTURE_METHOD', 'manual'),

];
Add your credentials to .env:
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CAPTURE_METHOD=manual
Never commit your Stripe keys to version control. Always use environment variables.
​
Capture Method
The capture_method setting controls when funds are collected from the customer.
Value	Behavior	Use case
manual	Authorize first, capture later from the admin panel	Physical goods — verify stock before charging
automatic	Capture immediately when the customer confirms	Digital products, subscriptions, instant fulfillment
Manual capture is the default. When using manual capture, the payment status goes through Pending → Authorized → Paid. The merchant captures from the order detail page when ready.
Authorization holds typically expire after 7 days (varies by card network). You must capture within that window or the hold is released and the customer is not charged.
​
Payment Method Setup
Create a payment method record linked to the Stripe driver. This makes it selectable at checkout.
use Shopper\Core\Models\PaymentMethod;

PaymentMethod::query()->create([
    'title' => 'Credit Card',
    'slug' => 'credit-card',
    'driver' => 'stripe',
    'description' => 'Pay securely with your credit or debit card.',
    'is_enabled' => true,
]);
Assign it to the zones where Stripe should be available:
$paymentMethod->zones()->attach([$europeZoneId, $northAmericaZoneId]);
​
Payment Flow
The Stripe driver uses the PaymentIntent API. Here’s the complete flow for a checkout with manual capture:
​
1. Initiate at Checkout
When the customer places an order, initiate the payment. The driver creates a Stripe PaymentIntent and returns a clientSecret for the frontend.
use Shopper\Payment\Services\PaymentProcessingService;

$service = resolve(PaymentProcessingService::class);
$result = $service->initiate($order);

if ($result->clientSecret) {
    session()->put('stripe_payment', [
        'client_secret' => $result->clientSecret,
        'publishable_key' => $result->data['publishable_key'],
    ]);

    return redirect()->route('stripe-payment', $order->number);
}
​
2. Confirm on the Frontend
On your payment page, use Stripe.js with the Payment Element to collect card details and confirm the payment:
```
<div id="payment-element"></div>
<button id="submit">Pay now</button>

<script src="https://js.stripe.com/v3/"></script>
<script>
  const stripe = Stripe('{{ $publishableKey }}')
  const elements = stripe.elements({ clientSecret: '{{ $clientSecret }}' })

  const paymentElement = elements.create('payment')
  paymentElement.mount('#payment-element')

  document.getElementById('submit').addEventListener('click', async () => {
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: '{{ route("payment.callback", $order->number) }}',
      },
    })

    if (error) {
      // Show error to the customer
    }
  })
</script>
```
After the customer confirms, Stripe handles 3D Secure if required, then redirects to your return_url.
​
3. Handle the Callback
On the callback page, verify the payment status:
use Shopper\Payment\Services\PaymentProcessingService;

$service = resolve(PaymentProcessingService::class);
$reference = $service->getLatestReference($order);
$result = $service->authorize($order, $reference);

if ($result->success) {
    return redirect()->route('order-confirmed', $order->number);
}
With manual capture, the order’s payment_status is now Authorized. With automatic capture, it goes straight to Paid.
​
4. Capture from the Admin Panel
When the order is ready to ship, the merchant clicks Capture payment on the order detail page. This calls capturePayment() on the Stripe driver and collects the funds.
The payment status changes from Authorized to Paid.
​
Webhooks
Stripe sends webhook events for asynchronous payment updates. The driver handles these events and converts them into standardized actions.
​
Setting Up
In your Stripe Dashboard, create a webhook endpoint pointing to your application (e.g. https://yourstore.com/webhooks/stripe)
Copy the signing secret to your .env:
STRIPE_WEBHOOK_SECRET=whsec_...
Create a webhook controller:
namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Shopper\Payment\Facades\Payment;

class StripeWebhookController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $driver = Payment::driver('stripe');

        $result = $driver->handleWebhook(
            payload: [
                'raw_body' => $request->getContent(),
            ],
            headers: [
                'stripe_signature' => $request->header('Stripe-Signature'),
            ],
        );

        if ($result->isIgnored()) {
            return response()->json(['status' => 'ignored']);
        }

        // Process the result based on the action
        // e.g., update order status, send notifications

        return response()->json(['status' => 'ok']);
    }
}
Register the route (excluded from CSRF verification):
Route::post('/webhooks/stripe', StripeWebhookController::class);
​
Handled Events
Stripe Event	Action	Description
payment_intent.amount_capturable_updated	authorized	Payment authorized, ready to capture
payment_intent.succeeded	captured	Payment captured successfully
payment_intent.payment_failed	failed	Payment attempt failed
payment_intent.canceled	canceled	Payment intent cancelled
charge.refunded	refunded	Charge was refunded
All other events are returned as ignored.
​
Signature Verification
The driver verifies every webhook using the signing secret. If the signature is invalid, a StripeException is thrown. This prevents forged webhook payloads from being processed.
​
Refunds
The driver supports full and partial refunds through the PaymentProcessingService:
$service = resolve(PaymentProcessingService::class);
$reference = $service->getLatestReference($order);

// Full refund
$result = $service->refund($order, $reference, $order->price_amount);

// Partial refund
$result = $service->refund(
    order: $order,
    reference: $reference,
    amount: 2000,
    reason: 'Product damaged',
);
The order’s payment_status automatically updates to PartiallyRefunded or Refunded based on the total refunded amount compared to the order total.
​
Cancellation
Cancel an authorized payment before capture to release the hold without processing a refund:
$result = $service->cancel($order, $reference);
The order’s payment_status changes to Voided. No funds are collected and no refund fees apply.
​
Testing
​
Stripe Test Cards
Use Stripe’s test card numbers in test mode:
Card Number	Scenario
4242 4242 4242 4242	Successful payment
4000 0025 0000 3155	Requires 3D Secure authentication
4000 0000 0000 9995	Declined (insufficient funds)
4000 0000 0000 0002	Declined (generic)
​
Webhook Testing
Use the Stripe CLI to forward events to your local environment:
stripe listen --forward-to localhost:8000/webhooks/stripe
The CLI prints a webhook signing secret — use it as STRIPE_WEBHOOK_SECRET during development.
​
Test Mode
Make sure your .env uses sk_test_ and pk_test_ keys. Stripe automatically isolates test data from live data