<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Get role from query parameters or session if it's not stored in the user model
        $role = $request->session()->get('userRole'); // Adjust this if using a different storage method
        $guard = $request->session()->get('userGuard'); // Adjust this if using a different storage method

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $guard ? Auth::guard($guard)->user() : null,
                'role' => $role,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'message' => $request->session()->get('message'),
            ],
        ]);
    }
}