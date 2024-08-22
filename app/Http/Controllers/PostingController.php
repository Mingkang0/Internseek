<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Internship;
use App\Models\Employer;
use App\Models\Bookmark;
use App\Models\Click;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class PostingController extends Controller
{
    public function index()
    {
        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();

        if ($user === 'contact_person') {
            if($user->employerID) {
                $employer = Employer::find($user->employerID);
                // Fetch internships with their associated employers
                $internships = Internship::where('employerID', $employer->id)
                ->withCount('bookmarks', 'clicks')
                ->get();
        

                // Return the data to the Inertia view
                return Inertia::render('Posting/postingList', [
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
        return Inertia::render('Posting/createPosting');
    }

    public function show($id)
    {
        // Fetch the internship with the associated employer
        $internship = Internship::with('employer')->find($id);

        // Get the click count for this internship
        $clickCount = $this->getClickCount($id);

        // Get the bookmark count for this internship
        $bookmarkCount = $this->getBookmarkCount($id);

        // Return the data to the Inertia view
        return Inertia::render('Posting/viewPosting', [
            'internship' => $internship,
            'clickCount' => $clickCount,
            'bookmarkCount' => $bookmarkCount,
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
        $internship = Internship::find($id);

        return Inertia::render('Posting/editPosting', [
            'internship' => $internship,
        ]);
    }

    public function store(Request $request)
    {
        // Get the authenticated employer based on the guard
        $guard = session('userGuard');
        $employer = Auth::guard($guard)->user();

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
        $validatedData['employerID'] = $employer->id;
        $validatedData['postingStatus'] = $postingStatus;

        // Create a new internship posting
        $internship = Internship::create($validatedData);

        // Redirect back to the internships listing with a success message
        return redirect()->route('employer.postedinternships')
            ->with('success', 'Internship posted successfully!')
            ->with('message', 'Your internship has been posted successfully.');
    }

    public function delete($id)
    {
        $internship = Internship::find($id);

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

        $internship->update($validatedData);

        return redirect()->route('employer.postedinternships')
            ->with('success', 'Internship updated successfully!')
            ->with('message', 'Your internship has been updated successfully.');
    }

}