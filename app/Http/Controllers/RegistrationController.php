<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\ContactPerson;
use Illuminate\Support\Facades\Auth;
use App\Models\Employer;
use Illuminate\Support\Facades\Storage;

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
        $employers = Employer::where('companyName', 'like', "%{$companyName}%")
                   ->where('registrationStatus', 'Approved')
                   ->get();

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
    
    public function createCompany()
    {
        $guard = session('userGuard');
        $user = Auth::guard('employer')->user();

        $contactPerson = ContactPerson::find($user->id);

        return Inertia::render('Registration/Employer/registrationForm', [
            'contactPerson' => $contactPerson,
        ]);
    }

    public function handleRegistration(Request $request) {

        // Validate the input data
        $validatedData = $request->validate([
            'companyInfo.companyName' => 'required',
            'companyInfo.companyEmail' => 'required|email',
            'companyInfo.companyType' => 'required',
            'companyInfo.companyPhone' => 'required',
            'companyInfo.companyAddress1' => 'required',
            'companyInfo.companyAddress2' => 'required',
            'companyInfo.companyPostalCode' => 'required',
            'companyInfo.companyCity' => 'required',
            'companyInfo.companyState' => 'required',
            'companyInfo.companyCountry' => 'required',
            'companyInfo.companySector' => 'required',
            'companyInfo.companySize' => 'required',
            'companyInfo.companyWebsite' => 'required',
            'companyInfo.documentType' => 'required',
            'companyInfo.documentName' => 'required|mimes:pdf,doc,docx',
            'companyInfo.businessRegNum' => 'required',
            'companyInfo.businessRegDate' => 'required',
            'logo.companyLogo' => 'required|mimes:png,svg,jpg,jpeg|max:2048',
            'contactPersonInfo.firstName' => 'required',
            'contactPersonInfo.lastName' => 'required',
            'contactPersonInfo.email' => 'required|email',
            'contactPersonInfo.position' => 'required',
            'contactPersonInfo.department' => 'required',
        ]);
    
        // Handle file uploads
        if ($request->hasFile('companyInfo.documentName')) {
            $documentPath = $request->file('companyInfo.documentName')->store('public/company/businessRegDocuments');
            $validatedData['companyInfo']['documentName'] = basename($documentPath);
        }
    
        if ($request->hasFile('logo.companyLogo')) {
            $logoPath = $request->file('logo.companyLogo')->store('public/company/companyLogo');
            $validatedData['logo']['companyLogo'] = basename($logoPath);
        }
    
        // Add default registration status
        $validatedData['companyInfo']['registrationStatus'] = 'Pending';
    
        // Merge all validated data into one array for creating the Employer
        $companyData = array_merge(
            $validatedData['companyInfo'],
            ['companyLogo' => $validatedData['logo']['companyLogo']],
        );
    
        // Create the Employer
        $company = Employer::create($companyData);


        // Handle contact person information
        $contactPersonData = [
            'employerID' => $company->id,
            'first_name' => $validatedData['contactPersonInfo']['firstName'],
            'last_name' => $validatedData['contactPersonInfo']['lastName'],
            'email' => $validatedData['contactPersonInfo']['email'],
            'position' => $validatedData['contactPersonInfo']['position'],
            'department' => $validatedData['contactPersonInfo']['department'],
        ];
        
        $request->session()->put('employer', $company);


        // Create or update contact person
        ContactPerson::updateOrCreate(
            ['email' => $validatedData['contactPersonInfo']['email']], // Unique identifier
            $contactPersonData
        );

        // Redirect to employer dashboard
        return redirect()->route('employer.dashboard')->with('success', 'Successfully register company!');
    }


    public function editRegistrationDetails()
    {
        $guard = session('userGuard');
        $user = Auth::guard('employer')->user();

        $contactPerson = ContactPerson::find($user->id);

        $employer = Employer::find($contactPerson->employerID);


        return Inertia::render('Registration/Employer/editRegistrationDetails', [
            'contactPerson' => $contactPerson,
            'employer' => $employer,
        ]);
    }
    

    public function updateRegistrationDetails(Request $request, $id)
    {
        // Retrieve the employer and contact person
        $employer = Employer::find($id);
        $user = Auth::guard('employer')->user();
        $contactPerson = ContactPerson::find($user->id);
    
        // Validate the input data
        $validatedData = $request->validate([
            'companyName' => 'required',
            'companyEmail' => 'required|email',
            'companyType' => 'required',
            'companyPhone' => 'required',
            'companyAddress1' => 'required',
            'companyAddress2' => 'required',
            'companyPostalCode' => 'required',
            'companyCity' => 'required',
            'companyState' => 'required',
            'companyCountry' => 'required',
            'companySector' => 'required',
            'companySize' => 'required',
            'companyWebsite' => 'required',
            'documentType' => 'required',
            'documentName' => 'nullable|mimes:pdf,doc,docx',
            'businessRegNum' => 'required',
            'businessRegDate' => 'required',
            'companyLogo' => 'nullable|mimes:png,svg,jpg,jpeg|max:2048',
            'firstName' => 'required',
            'lastName' => 'required',
            'email' => 'required|email',
            'position' => 'required',
            'department' => 'required',
        ]);
    
        // Handle file uploads
        if ($request->hasFile('documentName')) {
            $documentPath = $request->file('documentName')->store('public/company/businessRegDocuments');
            $validatedData['documentName'] = basename($documentPath);
        }
    
        if ($request->hasFile('companyLogo')) {
            $logoPath = $request->file('companyLogo')->store('public/company/companyLogo');
            $validatedData['companyLogo'] = basename($logoPath);
        }
    
        // Add default registration status
        $validatedData['registrationStatus'] = 'Pending';
    
        // Update the employer with validated data
        $employer->update($validatedData);
    
        // Update the contact person details
        $contactPerson->update([
            'firstName' => $validatedData['firstName'],
            'lastName' => $validatedData['lastName'],
            'email' => $validatedData['email'],
            'position' => $validatedData['position'],
            'department' => $validatedData['department'],
        ]);
        // Redirect back with success message
        return redirect()->route('employer.dashboard')->with('success', 'Registration details updated successfully!');
    }

}