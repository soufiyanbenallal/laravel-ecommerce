<?php

namespace App\Http\Requests\Checkout;

use Illuminate\Foundation\Http\FormRequest;

class StoreCheckoutOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'max:255'],
            'first_name' => ['required', 'string', 'max:120'],
            'last_name' => ['required', 'string', 'max:120'],
            'phone' => ['required', 'string', 'max:60'],
            'nationality' => ['nullable', 'string', 'max:120'],
            'guests' => ['nullable', 'integer', 'min:1', 'max:30'],
            'street_address' => ['required', 'string', 'max:255'],
            'postal_code' => ['required', 'string', 'max:40'],
            'city' => ['required', 'string', 'max:120'],
            'country_name' => ['required', 'string', 'max:120'],
            'special_notes' => ['nullable', 'string', 'max:2000'],
            'payment_method_slug' => ['nullable', 'string', 'max:120'],
            'promo_code' => ['nullable', 'string', 'max:64'],
            'terms_accepted' => ['accepted'],
        ];
    }
}
