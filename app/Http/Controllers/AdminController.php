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
use App\Models\Company;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Mail;
use App\Notifications\CompanyRegistrationStatus;
use Illuminate\Notifications\Notifiable;
use App\Notifications\InternshipPostingArchived;

class AdminController extends Controller
{
    public function showProfile(){
        $user = Auth::guard('admin')->user();

        $admin = Admin::findOrfail($user->id);

        return Inertia::render('ManageUserProfile/admin/profileDetails', [
            'admin' => $admin,
        ]);

    }

    public function updateProfile(Request $request, $id){
        
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'phoneNum' => 'required|string|max:15',
            'ICNumber' => 'required|string|max:12',
            'gender' => 'required|string|max:6',
        ]);

        $admin = Admin::findOrFail($id);

        $admin->update([
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
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
        $internships = Internship::with('company')->get();


        return Inertia::render('ManageAnalyticsandReporting/admin/internshipList', [
            'internships' => $internships,
        ]);
    }

    public function internshipDetails($id){
        $internship = Internship::with(['company', 'site', 'branch'])->find($id);
        
        return Inertia::render('ManageAnalyticsandReporting/admin/internshipDetails', [
            'internship' => $internship,
        ]);
    }

    public function internseekerList(){
        $internseekers = Student::all();

        return Inertia::render('ManageAnalyticsandReporting/admin/internseekerList', [
            'internseekers' => $internseekers,
        ]);
    }

    public function internseekerDetails($id){
        $internseeker = Student::find($id);
        $address = Address::where('studentID', $internseeker->id)->get();

        return Inertia::render('ManageAnalyticsandReporting/admin/internseekerDetails', [
            'internseeker' => $internseeker,
            'addresses' => $address,
        ]);
    }

    public function companyList(){
        $companies = Company::where('registrationStatus', 'Approved')->get();

        return Inertia::render('ManageAnalyticsandReporting/admin/companyList', [
            'companies' => $companies
        ]);
    }

    public function companyDetails($id){
        $company = Company::find($id);

        $employers = Employer::where('companyID', $company->id)->get();

        $branches = Branch::where('companyID', $company->id)->get();

        if ($branches->isEmpty()) {
            // No branches exist for this employer, so there will be no sites.
            $sites = collect(); // Initialize as an empty collection
        } else {
            // Branches exist, so retrieve the corresponding sites.
            $branchIds = $branches->pluck('id'); // Extract branch IDs
            $sites = Site::whereIn('branchID', $branchIds)->get();
        }

        return Inertia::render('ManageAnalyticsandReporting/admin/companyDetails', [
            'company' => $company,
            'employers' => $employers,
            'branches' => $branches,
            'sites' => $sites,
        ]);

    }

    public function ProblemReportList(){
        $problemReports = Report::with('internship.company', 'student')->get();

        return Inertia::render('ManageInternshipPosting/admin/internshipReportList', [
            'problemReports' => $problemReports,
        ]);
    }

    public function ProblemReportDetails($id){
        $report = Report::with('internship.company','internship.branch', 'internship.site' , 'student')->find($id);

        return Inertia::render('ManageInternshipPosting/admin/internshipReportDetails', [
            'report' => $report,
        ]);
    }

    public function updateReportStatus(Request $request, $id)
    {
        $report = Report::findOrFail($id);

        $internship = Internship::find($report->internshipID);
    
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

            $internship->update([
                'postingStatus' => 'Archived',
            ]);

            Notification::sendNow($internship->company, new InternshipPostingArchived($data = [
                'message' => 'Your internship posting has been archived.',
            ]));
        }

        if ($request->input('actionTaken') == 'Unarchived') {
            if($internship->startPostingDate <= date('Y-m-d') && $internship->endPostingDate >= date('Y-m-d')){
                $internship->update([
                    'postingStatus' => 'Published',
                ]);
            } else if($internship->endPostingDate < date('Y-m-d')){
                $internship->update([
                    'postingStatus' => 'Expired',
                ]);
            } else if ($internship->startPostingDate > date('Y-m-d')){
                $internship->update([
                    'postingStatus' => 'Unpublished',
                ]);
            }
        }
    
        $report->update([
            'reportStatus' => $request->input('reportStatus'),
            'comment' => $request->input('comment'),
            'actionTaken' => $request->input('actionTaken'),
        ]);
    
        return redirect()->route('admin.problemreports')->with('success', 'Report status updated successfully.');
    }
    

    public function CompanyRequestList(){
        $companies = Company::all();

        return Inertia::render('ManageCompanyRegistration/admin/registrationRequestList', [
            'companies' => $companies,
        ]);
    }

    public function CompanyRequestDetails($id){

        $company = Company::find($id);

        $employer = Employer::where('companyID', $company->id)->first();
        

        return Inertia::render('ManageCompanyRegistration/admin/registrationRequestDetails', [
            'employer' => $employer,
            'company' => $company,
        ]);
    }
    
    public function updateRegistrationStatus(Request $request, $id)
    {
        $company = Company::find($id);

        $request->validate([
            'registrationStatus' =>'required|string',
        ]);

        $company->registrationStatus = $request->input('registrationStatus');

        if($request->input('registrationStatus') == 'Inquiry'){
            $request->validate([
                'inquiryComment' => 'required|string',
            ]);
            $company->inquiryComment = $request->input('inquiryComment');
        }

        $message = '';

        switch(request('registrationStatus')){
            case 'Approved':
                $message = 'Your registration request has been approved.';
                break;

            case 'Inquiry':
                $message = 'Your registration request is under inquiry. Please modify the necessary details.';
                break;

            default:
                $message = 'Your registration request has been updated.';
                break;
        }

        $employer = Employer::where('companyID', $company->id)->first();

        Notification::sendNow([$company,$employer], new CompanyRegistrationStatus($data = [
            'message' => $message,
            'registrationStatus' => $request->input('registrationStatus'),
            'inquiryComment' => $request->input('inquiryComment'),
        ]));


        $company->save();

        return redirect()->route('admin.employerrequests')->with('success', 'Registration status updated successfully');
    }


    public function updateCompanyRating(Request $request, $id)
    {
        $company = Company::find($id);

        $request->validate([
            'rating' =>'required|string',
        ]);

        $company->companyRating = $request->input('rating');

        $company->save();

        return redirect()->route('admin.companies')->with('success', 'Company rating updated successfully');
    }
}
