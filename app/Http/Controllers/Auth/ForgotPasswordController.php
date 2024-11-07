<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Inertia\Inertia;
use App\Notifications\ForgotPassword;
use App\Models\Admin;
use App\Models\Employer;
use App\Models\Student;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class ForgotPasswordController extends Controller
{

    public function showEmployerForgotPassword()
    {
        return Inertia::render('ManageLogin/ForgotPassword/Employer');
    }

    public function showStudentForgotPassword()
    {
        return Inertia::render('ManageLogin/ForgotPassword/Student');
    }

    public function showAdminForgotPassword()
    {
        return Inertia::render('ManageLogin/ForgotPassword/Admin');
    }

    public function routeNotificationForMail()
    {
        return $this->email;
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'role' => 'required|in:admin,employer,student',
        ]);
    
        $user = null;

        if ($request->role === 'admin') {
            $user = Admin::where('email', $request->email)->first();
        } elseif ($request->role === 'employer') {
            $user = Employer::where('email', $request->email)->first();
        } elseif ($request->role === 'student') {
            $user = Student::where('email', $request->email)->first();
        }
    
        if (!$user) {
            return back()->withErrors(['email' => 'User not found.']);
        }
    
        $this->sendResetLinkEmail($user, $request->role);
    
        return redirect()->route('home')->with('success', 'Password reset link sent successfully to your email.');
    }


    private function sendResetLinkEmail($user, $role)
    {
        $token = Str::random(60);
        $user->reset_password_token = $token;
        $user->save();
        $user->notify(new ForgotPassword($token, $role));
    }



    public function showResetPassword(Request $request)
    {
        $token = $request->route('token');
        $role = $request->route('role');
        
        return Inertia::render('ManageLogin/ForgotPassword/ResetPassword', [
            'token' => $token,
            'role' => $role,
        ]);
    }

    public function resetPassword(Request $request)
    {
        $token = $request->route('token');
        $role = $request->route('role');
    
        switch ($role) {
            case 'admin':
                $user = Admin::where('reset_password_token', $token)->first();
                break;
            case 'employer':
                $user = Employer::where('reset_password_token', $token)->first();
                break;
            case 'student':
                $user = Student::where('reset_password_token', $token)->first();
                break;
            default:
                // Invalid role
                return back()->withErrors(['token' => 'Invalid role.']);
        }
    
        if (!$user) {
            return back()->withErrors(['token' => 'Invalid token.']);
        }
    
        // Validate the password reset request
        $request->validate([
            'newPassword' => 'required',
            'confirmPassword' => 'required',
        ]);

    
        if($request->newPassword !== $request->confirmPassword) {
            return back()->withErrors(['confirmPassword' => 'Passwords do not match.']);
        }
        // Update the user's password
        $user->password = bcrypt($request->newPassword);
        $user->save();

        Auth::guard($role)->login($user);

        $request->session()->regenerate();
            
        // Store the user role in session
        $request->session()->put('userRole', $role);
        $request->session()->put('userGuard', $role);

        Inertia::share ('auth', [
            'user' => $user,
            'role' => $role,
        ]);
    
        if($role === 'admin') {
            return redirect()->route('admin.dashboard')->with('success', 'Password reset successfully!');
        } elseif($role === 'employer') {
            return redirect()->route('employer.dashboard')->with('success', 'Password reset successfully!');
        } elseif($role === 'student') {
            return redirect()->route('internships.index')->with('success', 'Password reset successfully!');
        }
    }
    
}
