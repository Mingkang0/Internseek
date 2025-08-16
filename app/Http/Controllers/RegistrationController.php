<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use App\Models\Employer;
use Illuminate\Support\Facades\Storage;

class RegistrationController extends Controller
{
    public function createStudent()
    {
        return Inertia::render('RegisterAccount/Student/registrationForm');
    }

    public function createEmployer()
    {
        return Inertia::render('RegisterAccount/Employer/employerRegistration');
    }

    public function storeStudent(Request $request)
    {
        $validateData = $request->validate([
            'firstName' => 'required',
            'lastName' => 'required',
            'email' => 'required|email|unique:students,email',
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
        
        if($request->email)
        return redirect()->route('internships.index');

    }

    public function storeEmployer(Request $request)
    {
        $validateData = $request->validate([
            'firstName' => 'required',
            'lastName' => 'required',
            'phoneNum' => 'required',
            'email' => 'required|email|unique:employers,email',
            'password' => 'required',
            'confirmPassword' => 'required|same:password',
        ]);

        if($validateData['password'] !== $validateData['confirmPassword'])
        {
            return back()->withErrors(['password' => 'Passwords do not match']);
        }

        // Hash the password
        $validateData['password'] = bcrypt($validateData['password']);

        $employer= Employer::create($validateData);


        Auth::guard('employer')->login($employer);

        $request->session()->regenerate();
            
        // Store the user role in session
        $request->session()->put('userRole', 'employer');
        $request->session()->put('userGuard', 'employer');

        // Share the userRole with Inertia
        Inertia::share('auth', [
            'user' => $employer,
            'role' => 'employer',
        ]);
        
        return redirect()->route('employer.dashboard');
        
    }

    public function addExistingCompany()
    {
        return Inertia::render('ManageCompanyRegistration/employer/searchExistingCompany');
    }

    public function searchExistingCompany(Request $request)
    {
        $companyName = $request->input('companyName');
        $companies = Company::where('companyName', 'LIKE', '%' . $companyName . '%')
                   ->where('registrationStatus', 'Approved')
                   ->get();
        return Inertia::render('ManageCompanyRegistration/employer/searchExistingCompany', [
            'companies' => $companies,
    ]);
    }

    public function addExistingCompanyToEmployer(Request $request) {
        $id = $request->id;
        $company = Company::find($id);
        $guard = session('userGuard');
        $user = Auth::guard('employer')->user();


        // Check if the authenticated user is a employer
        if ($user instanceof Employer) {
            if ($company) {
                // Associate the employer with the company
                $user->companyID = $company->id;
                $user->userType = 'user';
                $user->status = 'Inactive';
                $user->save();

                // Store the company details in the session
                $request->session()->put('company', $company);

                // Attach the company object to the user object
                $user->company = $company;

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

        $employer = Employer::find($user->id);

        return Inertia::render('ManageCompanyRegistration/employer/companyRegistrationForm', [
            'employer' => $employer,
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
            'employerInfo.firstName' => 'required',
            'employerInfo.lastName' => 'required',
            'employerInfo.position' => 'required',
            'employerInfo.department' => 'required',
        ]);
    
        // Handle file uploads
        if ($request->hasFile('companyInfo.documentName')) {
            //Delete the old document
            //    Storage::delete('public/company/businessRegDocuments/' . $company->documentName);
            $documentPath = $request->file('companyInfo.documentName')->store('public/company/businessRegDocuments');
            $validatedData['companyInfo']['documentName'] = basename($documentPath);
        }
    
        if ($request->hasFile('logo.companyLogo')) {
            //Delete the old logo
             //    Storage::delete('public/company/companyLogo/' . $company->companyLogo);
    
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
        $company = Company::create($companyData);


        $userType = 'admin';
        // Handle employer information
        $employerData = [
            'companyID' => $company->id,
            'first_name' => $validatedData['employerInfo']['firstName'],
            'last_name' => $validatedData['employerInfo']['lastName'],
            'email' => $request->employerInfo['email'],
            'position' => $validatedData['employerInfo']['position'],
            'department' => $validatedData['employerInfo']['department'],
            'userType' => $userType,
            'status' => 'Active',
        ];
        
        $request->session()->put('company', $company);


        // Create or update employer
        Employer::updateOrCreate(
            ['email' => $employerData['email']],
            $employerData
        );

        // Redirect to employer dashboard
        return redirect()->route('employer.dashboard')->with('success', 'Successfully register company!');
    }


    public function editRegistrationDetails()
    {
        $guard = session('userGuard');
        $user = Auth::guard('employer')->user();

        $employer = Employer::find($user->id);

        $company = Company::find($employer->companyID);


        return Inertia::render('ManageCompanyRegistration/employer/editRegistrationDetails', [
            'employer' => $employer,
            'company' => $company,
        ]);
    }
    

    public function updateRegistrationDetails(Request $request, $id)
    {
        // Retrieve the employer and company
        $company = Company::find($id);
        $user = Auth::guard('employer')->user();
        $employer = Employer::find($user->id);
    
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
    
        // Update the company with validated data
        $company->update($validatedData);
    
        // Update the employer details
        $employer->update([
            'firstName' => $validatedData['firstName'],
            'lastName' => $validatedData['lastName'],
            'position' => $validatedData['position'],
            'department' => $validatedData['department'],
        ]);
        // Redirect back with success message
        return redirect()->route('employer.dashboard')->with('success', 'Registration details updated successfully!');
    }

}