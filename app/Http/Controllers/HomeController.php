<?php

namespace App\Http\Controllers;

use App\Services\TravelCatalogService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(private readonly TravelCatalogService $catalog) {}

    public function index(): Response
    {
        return Inertia::render('Home', $this->catalog->homePayload());
    }
}
