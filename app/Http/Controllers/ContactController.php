<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'in:order,product,wholesale,other'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        session()->flash('success', 'Votre message a été envoyé avec succès. Nous vous répondrons sous 24h.');

        return back();
    }

    public function sourcing(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:120'],
            'quantity' => ['required', 'string', 'max:50'],
            'budget' => ['nullable', 'string', 'max:120'],
            'description' => ['required', 'string', 'max:5000'],
            'contact_phone' => ['required', 'string', 'max:20'],
        ]);

        session()->flash('success', 'Votre demande de sourcing a été envoyée. Un agent vous contactera sous 24h.');

        return back();
    }
}
