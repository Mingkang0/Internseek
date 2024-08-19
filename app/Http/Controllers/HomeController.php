<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'auth' => [
                'user' => auth()->check() ? auth()->user() : null,
                'role' => auth()->check() ? auth()->user()->role : null,
            ],
        ]);
    }
}
