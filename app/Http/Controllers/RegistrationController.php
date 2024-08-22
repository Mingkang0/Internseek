<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\ContactPerson;
use Illuminate\Support\Facades\Auth;
use App\Models\Employer;

class RegistrationController extends Controller
{
    public function createStudent()
    {
        return Inertia::render('Registration/Student/registrationForm');
    }

    public function createEmployer()
    {
        return Inertia::render('Registration/Employer/contactPersonRegistration');
    }

    public function storeStudent(Request $request)
    {
        $validateData = $request->validate([
            'firstName' => 'required',
            'lastName' => 'required',
            'email' => 'required|email',
            'phoneNum' => 'required',
            'password' => 'required',
            'confirmPassword' => 'required|same:password',
        ]);

        if($validateData['password'] !== $validateData['confirmPassword'])
        {
            return back()->withErrors(['password' => 'Passwords do not match']);
        }

        // Hash the password
        $validateData['password'] = bcrypt($validateData['password']);

        $student = Student::create($validateData);

        Auth::guard('student')->login($student);

        $request->session()->regenerate();
            
        // Store the user role in session
        $request->session()->put('userRole', 'student');
        $request->session()->put('userGuard', 'student');

        // Share the userRole with Inertia
        Inertia::share('auth', [
            'user' => $student,
            'role' => 'student',
        ]);
        
        return redirect()->route('internships.index');
    }

    public function storeEmployer(Request $request)
    {
        $validateData = $request->validate([
            'firstName' => 'required',
            'lastName' => 'required',
            'phoneNum' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'confirmPassword' => 'required|same:password',
        ]);

        if($validateData['password'] !== $validateData['confirmPassword'])
        {
            return back()->withErrors(['password' => 'Passwords do not match']);
        }

        // Hash the password
        $validateData['password'] = bcrypt($validateData['password']);

        $contactPerson= ContactPerson::create($validateData);


        Auth::guard('employer')->login($contactPerson);

        $request->session()->regenerate();
            
        // Store the user role in session
        $request->session()->put('userRole', 'employer');
        $request->session()->put('userGuard', 'employer');

        // Share the userRole with Inertia
        Inertia::share('auth', [
            'user' => $contactPerson,
            'role' => 'employer',
        ]);
        
        return redirect()->route('employer.dashboard');
        
    }

    public function addExistingEmployer()
    {
        return Inertia::render('Registration/Employer/searchExistingCompany');
    }

    public function searchExistingEmployer(Request $request)
    {
        $companyName = $request->input('companyName');
        $employers = Employer::where('companyName', 'like', "%{$companyName}%")->get();
        return Inertia::render('Registration/Employer/searchExistingCompany', [
        'employers' => $employers,
    ]);
    }

    public function addExistingEmployerToContactPerson(Request $request) {
        $id = $request->id;
        $employer = Employer::find($id);
        $guard = session('userGuard');
        $user = Auth::guard('employer')->user();


        // Check if the authenticated user is a contact person
        if ($user instanceof ContactPerson) {
            if ($employer) {
                // Associate the contact person with the employer
                $user->employerID = $employer->id;
                $user->save();

                // Store the employer details in the session
                $request->session()->put('employer', $employer);

                // Attach the employer object to the user object
                $user->employer = $employer;

                 // Optionally, update the user role and guard in the session
                $request->session()->put('userRole', 'employer');
                $request->session()->put('userGuard', 'employer'); // Ensure correct guard is used

                 // Share the userRole with Inertia (optional)
                Inertia::share('auth', [
                'user' => $user->toArray(),
                'role' => 'employer',
                ]);

             // Redirect to the employer dashboard or another appropriate route
             
                return redirect()->route('employer.dashboard')->with('success', 'Company added successfully');
            } else {
            return redirect()->back()->with('error', 'Employer not found.');
            }
        } else {
            return redirect()->route('login')->with('error', 'You are not authorized to view this page');
        }
        }



}