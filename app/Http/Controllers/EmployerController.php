<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employer;
use Inertia\Inertia;
use App\Models\Branch;
use App\Models\Site;
use App\Models\ContactPerson;
use Illuminate\Support\Facades\Auth;

class EmployerController extends Controller
{
    public function branchDetails()
    {
        $branches = Branch::with('site')->get();
        $guard = Auth::guard('employer');
        $user = $guard->user();
        $employerID = $user->employerID;

        return Inertia::render('Profile/employer/branchDetails', [
            'branches' => $branches,
            'employerID' => $employerID
        ]);
    }

    public function storeBranch(Request $request, $id)
    {
            $validatedData = $request->validate([
                'branchName' => 'required|string|max:255',
                'branchAddress1' => 'required|string|max:255',
                'branchAddress2' => 'required|string|max:255',
                'branchCity' => 'required|string|max:255',
                'branchPostcode' => 'required|string|max:255',
                'branchState' => 'required|string|max:255',
                'branchCountry' => 'required|string|max:255',
                'branchPhoneNum' => 'required|string|max:15',
                'branchEmail' => 'required|email|max:255',
            ]);
    
            // Create a new branch using the validated data
            $branch = Branch::create([
                'branchName' => $validatedData['branchName'],
                'branchAddress1' => $validatedData['branchAddress1'],
                'branchAddress2' => $validatedData['branchAddress2'],
                'branchCity' => $validatedData['branchCity'],
                'branchState' => $validatedData['branchState'],
                'branchCountry' => $validatedData['branchCountry'],
                'branchPhoneNum' => $validatedData['branchPhoneNum'],
                'branchPostcode' => $validatedData['branchPostcode'],
                'branchEmail' => $validatedData['branchEmail'],
                'employerID' => $id,
            ]);
    
        return redirect()->back()->with('success', 'Branch added successfully.');
    }

    public function storeSite(Request $request, $id)
    {
        $validatedData = $request->validate([
            'siteName' => 'required|string|max:255',
            'siteAddress1' => 'required|string|max:255',
            'siteAddress2' => 'required|string|max:255',
            'siteCity' => 'required|string|max:255',
            'sitePostcode' => 'required|string|max:255',
            'siteState' => 'required|string|max:255',
            'siteCountry' => 'required|string|max:255',
            'sitePhone' => 'required|string|max:15',
            'siteEmail' => 'required|email|max:255',
        ]);

        // Create a new site using the validated data
        $site = Site::create([
            'siteName' => $validatedData['siteName'],
            'siteAddress1' => $validatedData['siteAddress1'],
            'siteAddress2' => $validatedData['siteAddress2'],
            'siteCity' => $validatedData['siteCity'],
            'siteState' => $validatedData['siteState'],
            'siteCountry' => $validatedData['siteCountry'],
            'sitePhone' => $validatedData['sitePhone'],
            'sitePostcode' => $validatedData['sitePostcode'],
            'siteEmail' => $validatedData['siteEmail'],
            'branchID' => $id,
        ]);

        return redirect()->back()->with('success', 'Site added successfully.');
    }
    

    public function updateBranch(Request $request, $id){
        $validatedData = $request->validate([
            'branchName' => 'required|string|max:255',
            'branchAddress1' => 'required|string|max:255',
            'branchAddress2' => 'required|string|max:255',
            'branchCity' => 'required|string|max:255',
            'branchPostcode' => 'required|string|max:255',
            'branchState' => 'required|string|max:255',
            'branchCountry' => 'required|string|max:255',
            'branchPhoneNum' => 'required|string|max:15',
            'branchEmail' => 'required|email|max:255',
        ]);

        $branch = Branch::findOrFail($id);

        $branch->update([
            'branchName' => $validatedData['branchName'],
            'branchAddress1' => $validatedData['branchAddress1'],
            'branchAddress2' => $validatedData['branchAddress2'],
            'branchCity' => $validatedData['branchCity'],
            'branchState' => $validatedData['branchState'],
            'branchCountry' => $validatedData['branchCountry'],
            'branchPhoneNum' => $validatedData['branchPhoneNum'],
            'branchPostcode' => $validatedData['branchPostcode'],
            'branchEmail' => $validatedData['branchEmail'],
        ]);

        return redirect()->back()->with('success', 'Branch updated successfully.');
    }

    public function updateSite(Request $request, $id){
        $validatedData = $request->validate([
            'siteName' => 'required|string|max:255',
            'siteAddress1' => 'required|string|max:255',
            'siteAddress2' => 'required|string|max:255',
            'siteCity' => 'required|string|max:255',
            'sitePostcode' => 'required|string|max:255',
            'siteState' => 'required|string|max:255',
            'siteCountry' => 'required|string|max:255',
            'sitePhone' => 'required|string|max:15',
            'siteEmail' => 'required|email|max:255',
        ]);

        $site = Site::findOrFail($id);

        $site->update([
            'siteName' => $validatedData['siteName'],
            'siteAddress1' => $validatedData['siteAddress1'],
            'siteAddress2' => $validatedData['siteAddress2'],
            'siteCity' => $validatedData['siteCity'],
            'siteState' => $validatedData['siteState'],
            'siteCountry' => $validatedData['siteCountry'],
            'sitePhone' => $validatedData['sitePhone'],
            'sitePostcode' => $validatedData['sitePostcode'],
            'siteEmail' => $validatedData['siteEmail'],
        ]);

        return redirect()->back()->with('success', 'Site updated successfully.');
    }

    public function deleteSite($id){
        $site = Site::findOrFail($id);
        $site->delete();

        return redirect()->back()->with('success', 'Site deleted successfully.');
    }

    public function deleteBranch($id){
        $branch = Branch::findOrFail($id);
        $branch->delete();

        $site = Site::where('branchID', $id);
        $site->delete();

        return redirect()->back()->with('success', 'Branch deleted successfully.');
    }

    public function companyDetails()
    {
        $branches = Branch::with('site')->get();
        $guard = Auth::guard('employer');
        $user = $guard->user();
        $employerID = $user->employerID;
        $employer = Employer::find($employerID);

        return Inertia::render('Profile/employer/profileDetails', [
            'employer' => $employer,
        ]);
    }

    public function updateCompanyDetails(Request $request, $id)
    {
        try {
        // Validate the request data
        $validatedData = $request->validate([
            'companyName' => 'required|string|max:255',
            'companyAddress1' => 'required|string|max:255',
            'companyAddress2' => 'required|string|max:255',
            'companyCity' => 'required|string|max:255',
            'companyPostalCode' => 'required|string|max:255',
            'companyState' => 'required|string|max:255',
            'companyCountry' => 'required|string|max:255',
            'companyEmail' => 'required|email|max:255',
            'companyWebsite' => 'required|string|max:255',
            'companyPhone' => 'required|string|max:15',
            'companySector' => 'required|string|max:255',
            'companySize' => 'required|string|max:255',
            'companyType' => 'required|string|max:255',
            'mission' => 'required|string|max:255',
            'vision' => 'required|string|max:255',
            'companyDescription' => 'required|string|max:255',
            'businessRegNum' => 'required|string|max:255',
            'businessRegDate' => 'required|date',
            'documentName' => 'nullable|mimes:pdf,doc,docx',
            'companyLogo' => 'nullable|mimes:png,svg,jpg,jpeg|max:2048',
            'documentType' => 'nullable|string|max:255',
        ]);
    
     
            $employer = Employer::findOrFail($id);
    
            // Handle file uploads
            if ($request->hasFile('documentName')) {
                $documentPath = $request->file('documentName')->store('public/company/businessRegDocuments');
                $validatedData['documentName'] = basename($documentPath);
            }
    
            if ($request->hasFile('companyLogo')) {
                $logoPath = $request->file('companyLogo')->store('public/company/companyLogo');
                $validatedData['companyLogo'] = basename($logoPath);
            }
    
            // Update or create the employer record
            $employer = Employer::updateOrCreate(
            ['id' => $id], // Attributes to find the record
            $validatedData // Attributes to update or create
            );
    
            return redirect()->back()->with('success', 'Company details updated successfully.');
        } catch (\Exception $e) {
            dd($e);
            return redirect()->back()->withErrors(['error' => 'An error occurred while updating the company details.']);
        }
    }
    
}