<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Shopper\Core\Models\PaymentMethod;
use Shopper\Core\Models\Zone;

class PaymentMethodsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currency = \Shopper\Core\Models\Currency::where('code', 'MAD')->first();

        // For simplicity, attach to a global zone if any exists, else just create it.
        $zone = Zone::firstOrCreate(
            ['slug' => 'global'],
            [
                'name' => 'Global Zone', 
                'code' => 'GLB', 
                'is_enabled' => true,
                'currency_id' => $currency->id,
            ]
        );

        // 1. Stripe
        $stripe = PaymentMethod::updateOrCreate(
            ['slug' => 'stripe'],
            [
                'title' => 'Stripe',
                'driver' => 'stripe',
                'description' => 'Pay securely with your credit or debit card.',
                'is_enabled' => true,
            ]
        );
        $stripe->zones()->syncWithoutDetaching([$zone->id]);

        // 2. PayPal
        $paypal = PaymentMethod::updateOrCreate(
            ['slug' => 'paypal'],
            [
                'title' => 'PayPal',
                'driver' => 'paypal',
                'description' => 'Pay safely via PayPal.',
                'is_enabled' => true,
            ]
        );
        $paypal->zones()->syncWithoutDetaching([$zone->id]);

        // 3. Pay on Site Custom Flow
        $payOnSite = PaymentMethod::updateOrCreate(
            ['slug' => 'pay-on-site'],
            [
                'title' => 'Pay on Site',
                'driver' => 'custom',
                'description' => 'Pay when you arrive at the activity location.',
                'is_enabled' => true,
            ]
        );
        $payOnSite->zones()->syncWithoutDetaching([$zone->id]);
    }
}
