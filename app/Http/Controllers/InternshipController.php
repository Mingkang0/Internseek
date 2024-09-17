<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Internship;
use Inertia\Inertia;
use App\Models\Click;
use App\Models\Bookmark;
use App\Models\Report;
use App\Models\Student;
use App\Models\Education;
use App\Models\InternshipApplication;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class InternshipController extends Controller
{
    public function index()
    {
        // Fetch internships with their associated employers
        $internships = Internship::with('employer')
        ->where('postingStatus', 'Published')
        ->withCount('bookmarks', 'clicks', 'applications')
        ->get();

        // Return the data to the Inertia view
        return Inertia::render('Internships/list', [
            'internships' => $internships,
        ]);
    }

    public function show($id)
    {
        // Fetch the internship with the associated employer
        $internship = Internship::with('employer')->find($id);

        if(Auth::guard('student')->check()) {
            $this->createClicks($id);
        }

        // Get the click count for this internship
        $clickCount = $this->getClickCount($id);

        // Get the bookmark count for this internship
        $bookmarkCount = $this->getBookmarkCount($id);

        // Get the application count for this internship
        $applicationCount = $this->getApplicationCount($id);

        // Return the data to the Inertia view
        return Inertia::render('Internships/details', [
            'internship' => $internship,
            'clickCount' => $clickCount,
            'bookmarkCount' => $bookmarkCount,
            'applicationCount' => $applicationCount,
        ]);
    }

    public function createClicks($id)
    {
        $guard = session('userGuard');
        $student = Auth::guard($guard)->user();
        
        // Check if the student has already clicked on this internship
        $existingClick = Click::where('studentID', $student->id)
        ->where('internshipID', $id)
        ->first();

        if (!$existingClick) {
            // Create a new click record
            Click::create([
                'studentID' => $student->id,
                'internshipID' => $id
            ]);
        }

    }

    public function bookmark($id)
    {
        $guard = session('userGuard');
        $student = Auth::guard($guard)->user();
        
        // Check if the student has already bookmarked this internship
        $existingBookmark = Bookmark::where('studentID', $student->id)
            ->where('internshipID', $id)
            ->first();
        
            if ($existingBookmark) {
                return redirect()->back() -> with([
                    'success' => false,
                    'message' => 'Internship already bookmarked!'
                ])->withInput();
            } else {
                Bookmark::create([
                    'studentID' => $student->id,
                    'internshipID' => $id
                ]);
                
                return redirect()->back() ->with([
                    'success' => true,
                    'message' => 'Internship bookmarked successfully!'
                ])->withInput();
            }
    }

    private function getBookmarkCount($internshipId)
    {
        return Bookmark::where('internshipID', $internshipId)->count();
    }

    private function getApplicationCount($internshipId)
    {
        return InternshipApplication::where('internshipID', $internshipId)->count();
    }

    private function getClickCount($internshipId)
    {
        return Click::where('internshipID', $internshipId)->count();
    }

    public function ReportInternship(Request $request, $id)
    {
        $guard = session('userGuard');
        $student = Auth::guard($guard)->user();
        
        $validateData = $request->validate ([
            'problemDesc' => 'required|string'
        ]);

        // Replace underscores with spaces for display purposes
        $problemDesc = str_replace('_', ' ', $request->problemDesc);

        $reportStatus = 'Reviewing';

        Report::create([
            'problemDesc' => $request->problemDesc,
            'studentID' => $student->id,
            'internshipID' => $id,
            'reportStatus' => $reportStatus,
        ]);

        return redirect()->back()             
            ->with('success', 'Successfully Report Internship!')
            ->with('message', 'You can view the status of your report at My Report page.');
    }

    public function ReportList()
    {
        $guard = session('userGuard');
        $student = Auth::guard($guard)->user();
    
        // Retrieve the reports with their associated internship information
        // Retrieve the reports with their associated internship and employer information
        $reports = Report::where('studentID', $student->id)
                  ->with(['internship.employer']) // Eager load the internship and employer relationships
                  ->get();
  
        return Inertia::render('Internships/reportList', [
          'reports' => $reports,
      ]);
    }


    public function deleteBookmark($id){
        $guard = session('userGuard');
        $student = Auth::guard($guard)->user();
        
        $bookmark = Bookmark::where('studentID', $student->id)
            ->where('internshipID', $id)
            ->first();
        
        if ($bookmark) {
            $bookmark->delete();
            return redirect()->back() ->with([
                'success' => 'Success',
                'message' => 'Bookmark removed successfully!'
            ])->withInput();
        } else {
            return redirect()->back() ->with([
                'success' => 'Failed',
                'message' => 'Bookmark not found!'
            ])->withInput();
        }
    }
}