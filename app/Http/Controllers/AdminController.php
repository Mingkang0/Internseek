<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Internship;
use App\Models\Student;
use App\Models\Address;
use App\Models\Employer;
use App\Models\Branch;
use App\Models\Site;
use App\Models\Report;
use App\Models\ContactPerson;

class AdminController extends Controller
{
    public function showProfile(){
        $user = Auth::guard('admin')->user();

        $admin = Admin::findOrfail($user->id);

        return Inertia::render('Profile/admin/profileDetails', [
            'admin' => $admin,
        ]);

    }

    public function updateProfile(Request $request, $id){
        
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phoneNum' => 'required|string|max:15',
            'ICNumber' => 'required|string|max:12',
            'gender' => 'required|string|max:6',
        ]);

        $admin = Admin::findOrFail($id);

        $admin->update([
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'email' => $request->input('email'),
            'phoneNum' => $request->input('phoneNum'),
            'ICNumber' => $request->input('ICNumber'),
            'gender' => $request->input('gender'),
        ]);

        return back()->with('success', 'Profile updated successfully.')->with('message', 'Profile updated successfully.');
    }

    public function changePassword(Request $request, $id){
        
        $request->validate([
            'newPassword' => 'required|string',
            'confirmPassword' => 'required|same:newPassword',
        ]);

        $admin = Admin::findOrFail($id);

        // Ensure the new password is different from the current one
        if (Hash::check($request->input('newPassword'), $admin->password)) {
            return back()->withErrors(['error' => 'New password must be different from the current password.']);
        }

        if ($request->input('newPassword') !== $request->input('confirmPassword')) {
            return back()->with('error', 'New password and confirm password do not match.');
        }

        $admin->update([
            'password' => bcrypt($request->input('newPassword')),
        ]);

        return back()->with('success', 'Password changed successfully.')->with('message', 'Password changed successfully.');
    }

    public function internshipsList(){
        $internships = Internship::with('employer')->get();


        return Inertia::render('Reporting/admin/internshipList', [
            'internships' => $internships,
        ]);
    }

    public function internshipDetails($id){
        $internship = Internship::with('employer')->find($id);

        return Inertia::render('Reporting/admin/internshipDetails', [
            'internship' => $internship,
        ]);
    }

    public function internseekerList(){
        $internseekers = Student::all();

        return Inertia::render('Reporting/admin/internseekerList', [
            'internseekers' => $internseekers,
        ]);
    }

    public function internseekerDetails($id){
        $internseeker = Student::find($id);
        $address = Address::where('studentID', $internseeker->id)->get();

        return Inertia::render('Reporting/admin/internseekerDetails', [
            'internseeker' => $internseeker,
            'addresses' => $address,
        ]);
    }

    public function employerList(){
        $employers = Employer::where('registrationStatus', 'Approved')->get();

        return Inertia::render('Reporting/admin/employerList', [
            'employers' => $employers
        ]);
    }

    public function employerDetails($id){
        $employer = Employer::find($id);

        $contactPerson = ContactPerson::where('employerID', $employer->id)->get();

        $branches = Branch::where('employerID', $employer->id)->get();

        if ($branches->isEmpty()) {
            // No branches exist for this employer, so there will be no sites.
            $sites = collect(); // Initialize as an empty collection
        } else {
            // Branches exist, so retrieve the corresponding sites.
            $branchIds = $branches->pluck('id'); // Extract branch IDs
            $sites = Site::whereIn('branchID', $branchIds)->get();
        }

        return Inertia::render('Reporting/admin/employerDetails', [
            'employer' => $employer,
            'contactPersons' => $contactPerson,
            'branches' => $branches,
            'sites' => $sites,
        ]);

    }

    public function ProblemReportList(){
        $problemReports = Report::with('internship.employer', 'student')->get();

        return Inertia::render('Reporting/admin/internshipReportList', [
            'problemReports' => $problemReports,
        ]);
    }

    public function ProblemReportDetails($id){
        $report = Report::with('internship.employer', 'student')->find($id);

        return Inertia::render('Reporting/admin/internshipReportDetails', [
            'report' => $report,
        ]);
    }

    public function updateReportStatus(Request $request, $id)
    {
        $report = Report::findOrFail($id);
    
        $request->validate([
            'reportStatus' => 'required|string|max:255',
            'comment' => 'required|string',
            'actionTaken' => 'required|string',
        ]);
    
        if ($request->input('actionTaken') == 'Archived') {
            $request->validate([
                'reasonArchived' => 'required|string',
            ]);
            $report->update([
                'reasonArchived' => $request->input('reasonArchived'),
            ]);
        }
    
        $report->update([
            'reportStatus' => $request->input('reportStatus'),
            'comment' => $request->input('comment'),
            'actionTaken' => $request->input('actionTaken'),
        ]);
    
        return redirect()->route('admin.problemreports')->with('success', 'Report status updated successfully.');
    }
    

    public function EmployerRequestList(){
        $employers = Employer::all();

        return Inertia::render('Reporting/admin/registrationRequestList', [
            'employers' => $employers,
        ]);
    }

    public function EmployerRequestDetails($id){
        $employer = Employer::find($id);

        $contactPerson = ContactPerson::where('employerID', $employer->id)->first();

        return Inertia::render('Reporting/admin/registrationRequestDetails', [
            'employer' => $employer,
            'contactPerson' => $contactPerson,
        ]);
    }
    
    public function updateRegistrationStatus(Request $request, $id)
    {
        $employer = Employer::find($id);

        $employer->registrationStatus = $request->input('registrationStatus');

        if($request->input('registrationStatus') == 'Inquiry'){
           $employer->inquiryComment = $request->input('inquiryComment');
        }

        $employer->save();

        return redirect()->route('admin.employerrequests')->with('success', 'Registration status updated successfully');
    }


    public function updateCompanyRating(Request $request, $id)
    {
        $employer = Employer::find($id);

        $employer->companyRating = $request->input('rating');

        $employer->save();

        return redirect()->route('admin.employers')->with('success', 'Company rating updated successfully');
    }
}
