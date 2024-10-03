<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;
use App\Models\Message;
use App\Models\Student;
use App\Models\Employer;
use App\Models\Company;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

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
                'notifications' => $guard && Auth::guard($guard)->check() ?
                                    DB::table('notifications')
                                    ->where('notifiable_id', Auth::guard($guard)->user() instanceof Student ? Auth::guard($guard)->user()->id : Auth::guard($guard)->user()->companyID)
                                    ->where('notifiable_type', Auth::guard($guard)->user() instanceof Student ? 'App\Models\Student' : 'App\Models\Company')
                                    ->whereNull('read_at') // Fetch only unread notifications
                                    ->get() : [],
            'unreadMessagesCount' => $guard && Auth::guard($guard)->check() ? 
                Message::where(function ($query) use ($guard) {
                $user = Auth::guard($guard)->user();

            // Check if the user is a student or an employer
            if ($user instanceof Student) {
                $query->where('receiver_id', $user->id)
                      ->where('receiver_type', 'student'); // Use AND logic here
            } elseif ($user instanceof Employer) {
                $query->where('receiver_id', $user->companyID)
                      ->where('receiver_type', 'employer'); // Use AND logic here
            }})
            ->where('messageStatus', 'unread')
            ->count() : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'message' => $request->session()->get('message'),
                'error' => $request->session()->get('error'),
            ],
        ]);
    }
}