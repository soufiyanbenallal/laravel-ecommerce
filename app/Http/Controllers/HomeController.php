<?php

namespace App\Http\Controllers;

use App\Services\HomeService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    protected $homeService;

    public function __construct(HomeService $homeService)
    {
        $this->homeService = $homeService;
    }

    public function index(): Response
    {
        return Inertia::render('Home/home.index', $this->homeService->getHomeData());
    }
}
