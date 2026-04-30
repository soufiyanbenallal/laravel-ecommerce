<?php

namespace App\Http\Controllers;

use App\Services\TravelCatalogService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct() {}

    public function index(): Response
    {
        return Inertia::render('home/home');
    }
}
