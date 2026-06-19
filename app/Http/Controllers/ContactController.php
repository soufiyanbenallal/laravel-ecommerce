<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contact\StoreContactMessageRequest;
use App\Http\Requests\Contact\StoreSourcingRequest;
use Illuminate\Http\RedirectResponse;

class ContactController extends Controller
{
    public function store(StoreContactMessageRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        session()->flash('success', 'Votre message a été envoyé avec succès. Nous vous répondrons sous 24h.');

        return back();
    }

    public function sourcing(StoreSourcingRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        session()->flash('success', 'Votre demande de sourcing a été envoyée. Un agent vous contactera sous 24h.');

        return back();
    }
}

