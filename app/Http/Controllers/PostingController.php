<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Internship;
use App\Models\Employer;
use App\Models\Bookmark;
use App\Models\Click;
use App\Models\Company;
use App\Models\Branch;
use App\Models\Site;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class PostingController extends Controller
{
    public function index()
    {
        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();

        if ($user instanceof Employer) {
            if($user->companyID) {
                $company = Company::find($user->companyID);
                // Fetch internships with their associated employers
                $internships = Internship::where('companyID', $company->id)
                ->withCount('bookmarks', 'clicks')
                ->with('createdBy', 'lastEditedBy')
                ->get();
    
                // Return the data to the Inertia view
                return Inertia::render('ManageInternshipPosting/employer/postingList', [
                'internships' => $internships,
            ]);
            } 
            else 
            {
                return redirect()->route('employer.dashboard').with('error', 'Employer not found');
            }
        }
        else {
            return redirect()->route('login')->with('error', 'You are not authorized to view this page');
        }
        
    }

    public function create()
    {
        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();
        if ($user instanceof Employer) {
            $company = Company::find($user->companyID);

            $branch = Branch::with('site') 
                    -> where('companyID', $company->id)->get();
            return Inertia::render('ManageInternshipPosting/employer/createPosting', [
                'branch' => $branch,
            ]);
        } else {
            return redirect()->route('login')->with('error', 'You are not authorized to view this page');
        }
        return Inertia::render('ManageInternshipPosting/employer/createPosting');
    }

    public function show($id)
    {

        // Fetch the internship with the associated employer
        $internship = Internship::with(['company', 'branch', 'site'])->find($id);

        // Get the click count for this internship
        $clickCount = $this->getClickCount($id);

        // Get the bookmark count for this internship
        $bookmarkCount = $this->getBookmarkCount($id);

        $internship->load('createdBy', 'lastEditedBy');

        $report = Report::where('internshipID', $internship->id)
                ->orWhere('actionTaken', 'Archived')
                ->get();

        // Return the data to the Inertia view
        return Inertia::render('ManageInternshipPosting/employer/viewPosting', [
            'internship' => $internship,
            'clickCount' => $clickCount,
            'bookmarkCount' => $bookmarkCount,
            'report' => $report,
        ]);
    }

    private function getBookmarkCount($internshipId)
    {
        return Bookmark::where('internshipID', $internshipId)->count();
    }

    private function getClickCount($internshipId)
    {
        return Click::where('internshipID', $internshipId)->count();
    }

    public function edit($id)
    {

        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();

        if ($user instanceof Employer) {
            $company = Company::find($user->companyID);
            $branch = Branch::with('site') 
                    -> where('companyID', $company->id)->get();

            $internship = Internship::with(['company', 'branch', 'site'])->find($id);


            $internship->load('createdBy', 'lastEditedBy');
    
    

            return Inertia::render('ManageInternshipPosting/employer/editPosting', [
                'internship' => $internship,
                'branch' => $branch,
            ]);

        } else {
            return redirect()->route('login')->with('error', 'You are not authorized to view this page');
        }

    }

    public function store(Request $request)
    {
        // Get the authenticated employer based on the guard
        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();

        if ($user instanceof Employer) {
            $company = Company::find($user->companyID);

            
            // Validate the incoming request
            $validatedData = $request->validate([
            'internshipTitle' => 'required|string',
            'internshipAllowance' => 'required|numeric',
            'internshipDescription' => 'required|string',
            'internshipRequirement' => 'required|string',
            'internshipResponsibility' => 'required|string',
            'startPostingDate' => 'required|date',
            'endPostingDate' => 'required|date',
            'internshipDuration' => 'required|numeric',
            'workingHour' => 'required|numeric',
            'studyScope' => 'required|string',
            'workingMethod' => 'required|string',
            'branchID' => 'nullable|numeric',
            'siteID' => 'nullable|numeric',
            ]);


            // Convert dates to Carbon instances in the local timezone
            $startPostingDate = Carbon::createFromFormat('Y-m-d', $validatedData['startPostingDate'], 'Asia/Kuala_Lumpur');
            $endPostingDate = Carbon::createFromFormat('Y-m-d', $validatedData['endPostingDate'], 'Asia/Kuala_Lumpur');
            // Check if the dates are valid

            $now = Carbon::now('Asia/Kuala_Lumpur');

            if ($startPostingDate->isToday() || $startPostingDate->isPast()) {
            $postingStatus = 'Published';
            } else {
            $postingStatus = 'Unpublished';
            }


            // Add the employer ID and posting status to the validated data
            $validatedData['companyID'] = $company->id;
            $validatedData['createdBy'] = $user->id;
            $validatedData['lastEditedBy'] = $user->id;
            $validatedData['postingStatus'] = $postingStatus;            

            // Create a new internship posting
            $internship = Internship::create($validatedData);

            // Redirect back to the internships listing with a success message
            return redirect()->route('employer.postedinternships')
                ->with('success', 'Internship posted successfully!')
                ->with('message', 'Your internship has been posted successfully.');

        } else {
            return redirect()->route('login')->with('error', 'You are not authorized to view this page');
        }

    }

    public function delete($id)
    {
        $internship = Internship::find($id);
    
        // Delete associated applications and their related data
        foreach ($internship->applications as $application) {
            $application->interview()->delete();
            $application->acceptedOffer()->delete();
            $application->delete();
        }
    
        // Delete other associated data
        $internship->bookmarks()->delete();
        $internship->clicks()->delete();
        $internship->reports()->delete();
    
        // Now, delete the internship
        $internship->delete();
    
        return redirect()->route('employer.postedinternships')
            ->with('success', 'Internship deleted successfully!')
            ->with('message', 'Your internship has been deleted successfully.');
    }
    
    public function update(Request $request, $id){
        $internship = Internship::find($id);

        $validatedData = $request->validate([
            'internshipTitle' => 'required|string',
            'internshipAllowance' => 'required|numeric',
            'internshipDescription' => 'required|string',
            'internshipRequirement' => 'required|string',
            'internshipResponsibility' => 'required|string',
            'startPostingDate' => 'required|date',
            'endPostingDate' => 'required|date',
            'internshipDuration' => 'required|numeric',
            'workingHour' => 'required|numeric',
            'studyScope' => 'required|string',
            'workingMethod' => 'required|string',
            'branchID' => 'nullable|numeric',
            'siteID' => 'nullable|numeric',
        ]);

        // Convert dates to Carbon instances in the local timezone
        $startPostingDate = Carbon::createFromFormat('Y-m-d', $validatedData['startPostingDate'], 'Asia/Kuala_Lumpur');
        $endPostingDate = Carbon::createFromFormat('Y-m-d', $validatedData['endPostingDate'], 'Asia/Kuala_Lumpur');
        // Check if the dates are valid

        $now = Carbon::now('Asia/Kuala_Lumpur');

        if ($startPostingDate->isToday() || $startPostingDate->isPast()) {
        $postingStatus = 'Published';
        } else {
        $postingStatus = 'Unpublished';
        }

        $validatedData['postingStatus'] = $postingStatus;
        $validatedData['lastEditedBy'] = Auth::guard('employer')->user()->id;

        $internship->update($validatedData);

        return redirect()->route('employer.postedinternships')
            ->with('success', 'Internship updated successfully!')
            ->with('message', 'Your internship has been updated successfully.');
    }

}