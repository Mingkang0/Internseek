<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Admin;
use App\Models\Employer;
use App\Models\Student;
use App\Models\ContactPerson;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'role' => 'required|in:admin,employer,student',
        ]);

        $role = $request->role;
    
        // Extract email and password from request
        $credentials = $request->only('email', 'password');
        $user = null;
        $guard = null;
    
        switch ($role) {
            case 'admin':
                $guard = 'admin';
                $user = Admin::where('email', $credentials['email'])->first();
                break;
            case 'employer':
                $guard = 'employer';
                $contactPerson = ContactPerson::where('email', $credentials['email'])->first();
                if (!$contactPerson) {
                    return back()->withErrors(['email' => 'Invalid contact person email.']);
                }
                $user = $contactPerson;
                $employer = Employer::find($user->employerID);
                if ($employer) {
                    // Store the employer details in the session
                    $request->session()->put('employer', $employer);
                    // Optionally, attach the employer to the user object
                    $user->employer = $employer;
                }
                
                break;
            case 'student':
                $guard = 'student';
                $user = Student::where('email', $credentials['email'])->first();
                break;
            default:
                return back()->withErrors(['email' => 'Invalid user role.']);
        }
    
        if ($user && Hash::check($credentials['password'], $user->password)) {
            Auth::guard($guard)->login($user); // Use the appropriate guard to log in the user
            $request->session()->regenerate();
        // Store the user role in session
        $request->session()->put('userRole', $role);
        $request->session()->put('userGuard', $guard);


        // Share the userRole with Inertia
        Inertia::share('auth', [
            'user' => $user->toArray(), 
            'role' => $role,
        ]);

            switch ($role) {
                case 'admin':
                    return redirect()->route('admin.dashboard');
                case 'employer':
                    return redirect()->route('employer.dashboard');
                case 'student':
                    return redirect()->route('internships.index');
            }
        }
    
        return back()->withErrors(['email' => 'The provided credentials do not match our records.']);
    }


    public function logout(Request $request)
    {
        // Determine the user's guard from the session
        $guard = $request->session()->get('userGuard');

        // Log out the user for the appropriate guard
        Auth::guard($guard)->logout();

        // Invalidate the session and regenerate a new session ID
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect to the login page
        return redirect()->route('home');
    }

    
}