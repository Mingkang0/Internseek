<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Admin;
use App\Models\Employer;
use App\Models\Student;
use App\Models\Company;
use App\Models\Message;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;


class LoginController extends Controller
{

    public function studentLogin()
    {
        $email = Cookie::get('remember_email');
        if($email){
            $email = Cookie::get('remember_email');
            return Inertia::render('ManageLogin/Student', ['remember_email' => $email]);
        }
        else {
        return Inertia::render('ManageLogin/Student');
        }
    }

    public function employerLogin()
    {
        $email = Cookie::get('remember_email');
        if($email){
            $email = Cookie::get('remember_email');
            return Inertia::render('ManageLogin/Employer', ['remember_email' => $email]);
        }
        else {
        return Inertia::render('ManageLogin/Employer');
        }
    }

    public function adminLogin()
    {
        $email = Cookie::get('remember_email');
        if($email){
            $email = Cookie::get('remember_email');
            return Inertia::render('ManageLogin/Admin', ['remember_email' => $email]);
        }
        else {
        return Inertia::render('ManageLogin/Admin');
        }
    }
    
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'role' => 'required|in:admin,employer,student',
            'remember' => 'boolean',
        ]);
    
        $role = $request->role;
    

        if ($request->remember === true) {
            Cookie::queue(Cookie::make('remember_email', $request->email, 60 * 24 * 30, '/', null, true, true, false, 'Lax'));
            $token = Str::random(60); // generate a random token
            $user = null; // initialize user variable
            switch ($role) {
                case 'admin':
                    $user = Admin::where('email', $request->email)->first();
                    if (!$user) {
                        return back()->withErrors(['email' => 'Invalid admin email.']);
                    }
                    break;
                case 'employer':
                    $employer = Employer::where('email', $request->email)->first();
                    if (!$employer) {
                        return back()->withErrors(['email' => 'Invalid employer email.']);
                    }
                    $user = $employer;
                    break;
                case 'student':
                    $user = Student::where('email', $request->email)->first();
                    if (!$user) {
                        return back()->withErrors(['email' => 'Invalid student email.']);
                    }
                    break;
                default:
                    return back()->withErrors(['email' => 'Invalid user role.']);
            }
            $user->remember_token = $token;
            $user->save();
            Cookie::queue(Cookie::make('remember_token', $token, 60 * 24 * 30, '/', null, true, true, false, 'Lax'));
        }
    
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
                $employer = Employer::where('email', $credentials['email'])->first();
                if (!$employer) {
                    return back()->withErrors(['email' => 'Invalid employer email.']);
                }
                $user = $employer;
                $company = Company::find($user->companyID);
                if ($company) {
                    // Store the employer details in the session
                    $request->session()->put('company', $company);
                    // Optionally, attach the employer to the user object
                    $user->company = $company;
                }
                break;
            case 'student':
                $guard = 'student';
                $user = Student::where('email', $credentials['email'])->first();
                break;
            default:
                return back()->withErrors(['email' => 'Invalid user role.']);
        }

        if (!$user) {
            $roleFriendlyName = match ($role) {
                'admin' => 'Admin',
                'employer' => 'Employer',
                'student' => 'Student',
            };
        
            return back()->withErrors([
                'email' => "No {$roleFriendlyName} account found with the provided email.",
            ]);
        }
        
    
        if (Auth::guard($guard)->attempt(['email' => $user->email, 'password' => $request->password], $request->remember)) {
            $request->session()->regenerate();
            // Store the user role in session
            $request->session()->put('userRole', $role);
            $request->session()->put('userGuard', $guard);
        
            // Share the user Role with Inertia
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
        
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
            'password' => 'The password is incorrect.',
        ]);
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

    public function redirectToLinkedIn()
    {
        return Socialite::driver('linkedin-openid')->redirect();
    }

    public function handleLinkedInCallback()
    {
        try {
            // Retrieve the user from LinkedIn
            $linkedinUser = Socialite::driver('linkedin-openid')->user();
        } catch (\Exception $e) {
            return redirect('/login/student')->with('error', 'Unable to login with LinkedIn.');
        }
    
        // Find student by LinkedIn ID or email
        $student = Student::where('linkedin_id', $linkedinUser->id)
                          ->orWhere('email', $linkedinUser->email)
                          ->first();
    
        if ($student) {
            $student->update([
                'linkedin_id' => $linkedinUser->id,
                'linkedin_token' => $linkedinUser->token,
            ]);
        } else {
            // Create new student
            $student = Student::create([
                'firstName' => $linkedinUser->user['given_name'], // From LinkedIn data
                'lastName' => $linkedinUser->user['family_name'], // From LinkedIn data
                'email' => $linkedinUser->email,
                'linkedin_id' => $linkedinUser->id,
                'linkedin_token' => $linkedinUser->token,
                'profilePicture' => $linkedinUser->avatar, // From LinkedIn data
                'password' => Hash::make(Str::random(12)), // Random password since it won't be used
            ]);
        }
    
        // Log the student in
        Auth::guard('student')->login($student);

        session(['userRole' => 'student']);
        session(['userGuard' => 'student']);

        Inertia::share('auth', [
            'user' => $student->toArray(), 
            'role' => 'student',
        ]);
    
        return redirect()->route('internships.index');
    }
    
}