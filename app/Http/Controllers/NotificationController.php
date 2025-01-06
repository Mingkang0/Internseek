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
    
        // Check if the user is a Student
        if ($user instanceof Student) {
            Notification::where('notifiable_id', $user->id)
                        ->where('notifiable_type', 'App\Models\Student')
                        ->update(['read_at' => now()]);
        } 
        // Check if the user is an Employer
        elseif ($user instanceof Employer) {
            // Employer could have a related Company, we mark notifications for both Employer and Company
            Notification::where('notifiable_id', $user->id)  // Notifications for the Employer
                        ->where('notifiable_type', 'App\Models\Employer')
                        ->update(['read_at' => now()]);
    
            // Additionally, if the Employer has a Company, mark notifications for the Company too
            if ($user->companyID) {  // Assuming Employer has a relationship with Company
                Notification::where('notifiable_id', $user->companyID)  // Notifications for the Company
                            ->where('notifiable_type', 'App\Models\Company')
                            ->update(['read_at' => now()]);
            }
        } 
        else {
            return back()->with('error', 'Invalid user role.');
        }
    }
    

    public function index() {
        $guard = session('userGuard');
        $userRole = session('userRole');
    
        // Get the currently authenticated user based on the guard
        $user = Auth::guard($guard)->user();
    
        // Initialize the notifications collection
        $mergedNotifications = collect();  // Start with an empty collection to avoid issues with undefined variables
    
        if ($user instanceof Student) {
            // Get notifications for the student
            $notifications = Notification::where('notifiable_id', $user->id)
                                        ->where('notifiable_type', 'App\Models\Student')
                                        ->orderBy('created_at', 'desc')
                                        ->get();
        } else if ($user instanceof Employer) {
            // Get company notifications for the employer
            $companyNotifications = Notification::where('notifiable_type', 'App\Models\Company')
                                                 ->where('notifiable_id', $user->companyID)
                                                 ->orderBy('created_at', 'desc')
                                                 ->get();
    
            // Get employer notifications for the employer
            $employerNotifications = Notification::where('notifiable_type', 'App\Models\Employer')
                                                 ->where('notifiable_id', $user->id)
                                                 ->orderBy('created_at', 'desc')
                                                 ->get();
    
            // Merge the company and employer notifications
            $mergedNotifications = $companyNotifications->union($employerNotifications);
        } else {
            // Invalid user role
            return back()->with('error', 'Invalid user role.');
        }

        // Return the notifications to the view
        return Inertia::render('Notifications/page', [
            'notifications' => $mergedNotifications
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
            Notification::where('notifiable_id', $user->id)  // Notifications for the Employer
                        ->where('notifiable_type', 'App\Models\Employer')
                        ->delete();
            if($user->companyID){
                Notification::where('notifiable_id', $user->companyID)  // Notifications for the Company
                            ->where('notifiable_type', 'App\Models\Company')
                            ->delete();
            }
        } else {
            return back()->with('error', 'Invalid user role.');
        }
    }
    
}