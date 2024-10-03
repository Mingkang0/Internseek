<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;
use App\Models\Employer;
use App\Models\Company;
use Inertia\Inertia;

class NotificationController extends Controller
{

    public function markAllAsRead()
    {
        $guard = session('userGuard');
        $userRole = session('userRole');

        $user = Auth::guard($guard)->user();


        if($user instanceof Student){
            Notification::where('notifiable_id', $user->id)
                        ->where('notifiable_type', 'App\Models\Student')
                        ->update(['read_at' => now()]);
        } else if($user instanceof Employer){
           Notification::where('notifiable_id', $user->companyID)
                        ->where('notifiable_type', 'App\Models\Company')
                        ->update(['read_at' => now()]);
        } else {
            return back()->with('error', 'Invalid user role.');
        }
    }

    public function index(){
        $guard = session('userGuard');
        $userRole = session('userRole');

        $user = Auth::guard($guard)->user();

        if($user instanceof Student){
            $notifications = Notification::where('notifiable_id', $user->id)
                                        ->where('notifiable_type', 'App\Models\Student')
                                        ->orderBy('created_at', 'desc')
                                        ->get();
        } else if($user instanceof Employer){
            $employerNotifications = Notification::where('notifiable_type', 'App\Models\Employer')
            ->where('notifiable_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
        
            $companyNotifications = Notification::where('notifiable_type', 'App\Models\Company')
            ->where('notifiable_id', $user->companyID)
            ->orderBy('created_at', 'desc')
            ->get();
        
            $notifications = $employerNotifications->merge($companyNotifications)->sortByDesc('created_at');
        } else {
            return back()->with('error', 'Invalid user role.');
        }

        return Inertia::render('Notifications/page', [
            'notifications' => $notifications
        ]);
    }

    public function deleteAllNotifications(){

        $guard = session('userGuard');
        $userRole = session('userRole');


        $user = Auth::guard($guard)->user();

        if($user instanceof Student){
            Notification::where('notifiable_id', $user->id)
                        ->where('notifiable_type', 'App\Models\Student')
                        ->delete();
        } 
        else if($user instanceof Employer){
            Notification::where('notifiable_id', $user->companyID)
                        ->where('notifiable_type', 'App\Models\Company')
                        ->delete();
        } else {
            return back()->with('error', 'Invalid user role.');
        }
    }
    
}
