<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InternshipApplication;
use App\Models\Student;
use App\Models\Internship;
use App\Models\Address;
use App\Models\Interview;
use App\Models\AcceptedOffer;
use App\Models\Skill;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Referee;
use App\Models\Bookmark;
use App\Models\Accompishment;
use App\Models\Language;
use Inertia\Inertia;
use App\Models\ContactPerson;
use App\Models\Employer;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class InternshipApplicationController extends Controller
{
    public function applyInternship($id)
    {
        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();
        $internship = Internship::with('employer')->find($id);

        // Check if the student has already applied for this internship
         $existingApplication = InternshipApplication::where('studentID', $user->id)
        ->where('internshipID', $id)
        ->first();


        if($existingApplication) {
            return redirect()->route('internships.index')->with('error', 'You have already applied for this internship');
        }
        
        $student = Student::with('skills', 'languages', 'accomplishments', 'addresses', 'educations', 'experiences', 'referees')->find($user->id);


        return Inertia::render('Application/ApplyInternship/form', [
            'student' => $student,
            'internship' => $internship,
        ]);
    }

    public function store(Request $request, $id)
    {
        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();
        $student = Student::find($user->id);
    
        // Validate the input fields
        $validatedData = $request->validate([
            'documents.coverLetter' => 'required|mimes:pdf',
            'documents.ownResume' => 'nullable|mimes:pdf',
            'documents.transcript' => 'required|mimes:pdf',
            'documents.SAL' => 'required|mimes:pdf',
            'applicationInfo.availability' => 'required',
            'applicationInfo.expectedStartDate' => 'required|date',
            'applicationInfo.expectedEndDate' => 'required|date',
            'applicationInfo.expectedAllowance' => 'required|numeric',
        ]);
    
        // Handle file uploads and store paths
        if($request->hasFile('documents.coverLetter')) {
            $documentPath = $request->file('documents.coverLetter')->store("public/InternshipApplication/documents/coverLetter/{$student->id}");
            $validatedData['documents']['coverLetter'] = basename($documentPath);
        }
    
        if($request->hasFile('documents.ownResume')) {
            $documentPath = $request->file('documents.ownResume')->store("public/InternshipApplication/documents/ownResume/{$student->id}");
            $validatedData['documents']['ownResume'] = basename($documentPath);
        }
    
        if($request->hasFile('documents.transcript')) {
            $documentPath = $request->file('documents.transcript')->store("public/InternshipApplication/documents/transcript/{$student->id}");
            $validatedData['documents']['transcript'] = basename($documentPath);
        }
    
        if($request->hasFile('documents.SAL')) {
            $documentPath = $request->file('documents.SAL')->store("public/InternshipApplication/documents/SAL/{$student->id}");
            $validatedData['documents']['SAL'] = basename($documentPath);
        }
    
        // Add extra details to validatedData
        $validatedData['internshipID'] = $id;
        $validatedData['studentID'] = $student->id;
        $validatedData['applicationStatus'] = 'Reviewing';
    
        // Combine the documents and applicationInfo data
        $applicationData = array_merge($validatedData['documents'], $validatedData['applicationInfo']);
    
        // Add the additional fields like internshipID, studentID, etc. to the merged data
        $applicationData['internshipID'] = $validatedData['internshipID'];
        $applicationData['studentID'] = $validatedData['studentID'];
        $applicationData['applicationStatus'] = $validatedData['applicationStatus'];
    
        // Store the internship application
        InternshipApplication::create($applicationData);

        return redirect()->route('internships.index')->with('success', 'Application submitted successfully');
    }

    public function MyInternships()
    {
        $guard = session('userGuard');
        $student = Auth::guard($guard)->user();
    
        // Retrieve the bookmarked internships with their associated employer information
        $bookmarks = Bookmark::where('studentID', $student->id)
                    ->with(['internship.employer', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->limit(2)
                    ->get();

                    

        $educations = Education::where('studentID', $student->id)->get();

        $studyFields = $educations->pluck('studyField');
                  
        $matchs = Internship::whereIn('studyScope', $studyFields)
                ->with(['employer']) // Eager load the employer relationship
                ->withCount('bookmarks', 'clicks', 'applications')
                ->orderBy('created_at', 'desc')
                ->limit(2)
                ->get();
        

        $appliedInternships = InternshipApplication::where('studentID', $student->id)
                    ->where('applicationStatus', 'Reviewing', 'Unsuccessful')
                    ->with(['internship.employer', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->limit(2)
                    ->get();

        
        $interviews = Interview::whereHas('application', function ($query) use ($student) {
                     $query->where('studentID', $student->id);
                    })->with(['application.internship.employer'])
                        ->orderBy('created_at', 'desc')
                        ->limit(2)
                        ->get();

        $approvedInternships = InternshipApplication::where('studentID', $student->id)
                    ->where('applicationStatus', 'Approved')
                    ->with(['internship.employer', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->limit(2)
                    ->get();
        
        $shortlistedInternships = InternshipApplication::where('studentID', $student->id)
                    ->where('applicationStatus', 'Shortlisted')
                    ->with(['internship.employer', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->limit(2)
                    ->get();

        return Inertia::render('Application/my-internships/page', [
          'bookmarks' => $bookmarks,
          'matchs' => $matchs,
          'appliedInternships' => $appliedInternships,
          'interviews' => $interviews,
          'approvedInternships' => $approvedInternships,
          'shortlistedInternships' => $shortlistedInternships,
      ]);
    }

    public function preInternships(){
        $guard = session('userGuard');
        $student = Auth::guard($guard)->user();
    
        // Retrieve the bookmarked internships with their associated employer information
        $bookmarks = Bookmark::where('studentID', $student->id)
                    ->with(['internship.employer', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->get();

                    

        $educations = Education::where('studentID', $student->id)->get();

        $studyFields = $educations->pluck('studyField');
                  
        $matchs = Internship::whereIn('studyScope', $studyFields)
                ->with(['employer']) // Eager load the employer relationship
                ->withCount('bookmarks', 'clicks', 'applications')
                ->orderBy('created_at', 'desc')
                ->get();

        return Inertia::render('Application/my-internships/pre-internships/page', [
            'bookmarks' => $bookmarks,
            'matchs' => $matchs,
        ]);
    }

    public function processInternships()
    {
        $guard = session('userGuard');
        $student = Auth::guard($guard)->user();


        $appliedInternships = InternshipApplication::where('studentID', $student->id)
                    ->where('applicationStatus', 'Reviewing', 'Unsuccessful')
                    ->with(['internship.employer', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->get();

        
        $interviews = Interview::whereHas('application', function ($query) use ($student) {
                     $query->where('studentID', $student->id);
                    })->with(['application.internship.employer'])
                        ->orderBy('created_at', 'desc')
                        ->get();

        $approvedInternships = InternshipApplication::where('studentID', $student->id)
                    ->where('applicationStatus', 'Approved')
                    ->with(['internship.employer', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->get();
        
        $shortlistedInternships = InternshipApplication::where('studentID', $student->id)
                    ->where('applicationStatus', 'Shortlisted')
                    ->with(['internship.employer', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->get();
    
        

        return Inertia::render('Application/my-internships/process-internships/page', [
            'appliedInternships' => $appliedInternships,
            'interviews' => $interviews,
            'approvedInternships' => $approvedInternships,
            'shortlistedInternships' => $shortlistedInternships,
        ]);
    }

    public function cancelApplication($id)
    {
        $guard = session('userGuard');
        $student = Auth::guard($guard)->user();
    
        // Find the application using the provided applicationID
        $application = InternshipApplication::where('studentID', $student->id)
                    ->where('id', $id)
                    ->first();
    
        // Check if the application exists
        if ($application) {
            // Delete the application
            $application->delete();
    
            // Redirect back with a success message
            return redirect()->back()->with('success', 'Application cancelled successfully');
        } else {
            // Redirect back with an error message
            return redirect()->back()->with('error', 'Application not found');
        }
    }

    public function ApplicantsList(){
        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();

        
        if ($user instanceof ContactPerson) {
            if($user->employerID) {
                $employer = Employer::find($user->employerID);

            $internship = Internship::where('employerID', $employer->id)->get();

            $applications = InternshipApplication::whereIn('internshipID', $internship->pluck('id'))
                ->where('applicationStatus', 'Reviewing')
                ->with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                ->with(['internship']) 
                ->get();
                

                return Inertia::render('Application/internshipApplication/list', [
                    'applications' => $applications,
                ]);
            }
            else {
                return redirect()->route('employer.dashboard')->with('error', 'Employer not found');
            }
        }
        else {
            return redirect()->route('login')->with('error', 'You are not authorized to view this page');
        }
    }

    public function showUpdateStatus(Request $request, $id)
    {


        $application = InternshipApplication::with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                    ->with(['internship'])
                    ->find($id);

        return Inertia::render('Application/internshipApplication/updateStatus', [
            'application' => $application,
        ]);
    }

    public function updateApplicationStatus(Request $request, $id)
    {
        $application = InternshipApplication::find($id);

        $contactPerson = Auth::guard('employer')->user();

        $validatedData = $request->validate([
            'applicationStatus' => 'required|string',
        ]);

    
        if($validatedData['applicationStatus'] == 'Unsuccessful' || $validatedData['applicationStatus'] == 'Reviewing') {
            $application->applicationStatus = $validatedData['applicationStatus'];
            $application->contactPersonID = $contactPerson->id;

            $application->save();

            return redirect()->route('applications.list')->with('success', 'Application status updated successfully');
        }

        if($validatedData['applicationStatus'] == 'Interview') {
           $validatedData = $request->validate([
                'meetingDate' => 'required|date',
                'startTime' => 'required',
                'endTime' => 'required',
                'location' => 'nullable|string',
                'meetingMethod' => 'required|string',
                'meetingLink' => 'nullable|string',
            ]);

            if($validatedData['startTime'] >= $validatedData['endTime']) {
                return redirect()->back()->with('error', 'Start time must be less than end time');
            }

            $interview = new Interview();
            $interview->applicationID = $id;
            $interview->interviewDate = $validatedData['meetingDate'];
            $interview->interviewStartTime = $validatedData['startTime'];
            $interview->interviewEndTime = $validatedData['endTime'];
            $interview->interviewMethod = $validatedData['meetingMethod'];

            if($validatedData['location']) {
                $interview->interviewLocation = $validatedData['location'];
            }

            if($validatedData['meetingLink']) {
                $interview->interviewLink = $validatedData['meetingLink'];
            }
            $application->applicationStatus = 'Interview';
            $application->contactPersonID = $contactPerson->id;
            $application->save();
            $interview->save();

            return redirect()->route('employer.applicantslist')->with('success', 'Application status updated successfully');
        }

    }


    public function updateInterviewStatus(Request $request, $id){

        $validatedData = $request->validate([
            'interviewStatus' => 'required|string',
        ]);
        

    
        $interview = Interview::find($id);

        $interview->interviewStatus = $validatedData['interviewStatus'];

        $interview->save();

        return redirect()->back()->with('success', 'Interview status updated successfully');

    }


    public function InterviewApplicantList(){

        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();

        if($user instanceof ContactPerson) {
            if($user->employerID) {
                $employer = Employer::find($user->employerID);

                $internship = Internship::where('employerID', $employer->id)->get();

                $applications = InternshipApplication::whereIn('internshipID', $internship->pluck('id'))
                    ->where('applicationStatus', 'Interview')
                    ->with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                    ->with(['internship', 'interview']) 
                    ->get();

    
                return Inertia::render('Application/internshipApplication/Need-to-Interview/list', [
                    'applications' => $applications,
                ]);
            }
            else {
                return redirect()->route('employer.dashboard')->with('error', 'Employer not found');
            }
        }
        else {
            return redirect()->route('login')->with('error', 'You are not authorized to view this page');
        }

    }


    public function updateInterviewDetails(Request $request, $id)
    {
        $validatedData = $request->validate([
            'interviewDate' => 'required|date',
            'interviewStartTime' => 'required',
            'interviewEndTime' => 'required',
            'interviewLocation' => 'nullable|string',
            'interviewMethod' => 'required|string',
            'interviewLink' => 'nullable|string',
        ]);

        if($validatedData['interviewStartTime'] >= $validatedData['interviewEndTime']) {
            return redirect()->back()->with('error', 'Start time must be less than end time');
        }

        $interview = Interview::find($id);

        $interview->interviewDate = $validatedData['interviewDate'];
        $interview->interviewStartTime = $validatedData['interviewStartTime'];
        $interview->interviewEndTime = $validatedData['interviewEndTime'];
        $interview->interviewMethod = $validatedData['interviewMethod'];

        if($validatedData['interviewLocation']) {
            $interview->interviewLocation = $validatedData['interviewLocation'];
        }

        if($validatedData['interviewLink']) {
            $interview->interviewLink = $validatedData['interviewLink'];
        }

        $validatedData['interviewStatus'] = null;

        $interview->interviewStatus = $validatedData['interviewStatus'];

        $interview->save();

        return redirect()->back()->with('success', 'Interview details updated successfully');

    }

    public function showUpdateInterviewResult(Request $request, $id)
    {
        $application = InternshipApplication::with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                    ->with(['internship'])
                    ->find($id);

        return Inertia::render('Application/internshipApplication/Need-to-Interview/updateInterviewResult', [
            'application' => $application,
        ]);
    }

    public function updateInterviewResult(Request $request, $id)
    {
        // Initial validation
        $validatedData = $request->validate([
            'applicationStatus' => 'required|string',
        ]);
    
        $contactPerson = Auth::guard('employer')->user();
        $application = InternshipApplication::find($id);
    
        // Update application status
        $application->applicationStatus = $validatedData['applicationStatus'];
        $application->contactPersonID = $contactPerson->id;
    
        // Handle Interview Status
        if ($validatedData['applicationStatus'] == 'Interview') {
            // Delete any existing interview data
            Interview::where('applicationID', $id)->delete();
    
            // Additional validation for Interview-specific fields
            $interviewData = $request->validate([
                'interviewDate' => 'required|date',
                'interviewStartTime' => 'required',
                'interviewEndTime' => 'required',
                'interviewLocation' => 'nullable|string',
                'interviewMethod' => 'required|string',
                'interviewLink' => 'nullable|string',
            ]);
    
            // Check for valid interview times
            if ($interviewData['interviewStartTime'] >= $interviewData['interviewEndTime']) {
                return redirect()->back()->with('error', 'Start time must be less than end time');
            }
    
            // Save new interview record
            $interview = new Interview();
            $interview->applicationID = $id;
            $interview->interviewDate = $interviewData['interviewDate'];
            $interview->interviewStartTime = $interviewData['interviewStartTime'];
            $interview->interviewEndTime = $interviewData['interviewEndTime'];
            $interview->interviewMethod = $interviewData['interviewMethod'];
    
            if (isset($interviewData['interviewLocation'])) {
                $interview->interviewLocation = $interviewData['interviewLocation'];
            }
    
            if (isset($interviewData['interviewLink'])) {
                $interview->interviewLink = $interviewData['interviewLink'];
            }
    
            $interview->save();
        }
    
        // Handle Approved Status
        if ($validatedData['applicationStatus'] == 'Approved') {
            // Validation for Approved-specific fields
            $approvedData = $request->validate([
                'offerLetter' => 'required|mimes:pdf',
                'actualAllowance' => 'required|numeric',
            ]);
    
            // Handle file upload
            $documentPath = $request->file('offerLetter')->store("public/InternshipApplication/documents/offerLetter/{$application->studentID}");
            $application->offerLetter = basename($documentPath);
            $application->actualAllowance = $approvedData['actualAllowance'];
        }
    
        $application->save();
    
        return redirect()->route('employer.interviewapplicantslist')->with('success', 'Interview Result updated successfully');
    }
    

    public function showUpdateShortlistedResult($id){
        $application = InternshipApplication::with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                    ->with(['internship'])
                    ->find($id);
    
        return Inertia::render('Application/internshipApplication/ApprovedOrShortlisted/updateShortlistedResult', [
            'application' => $application,
        ]);
    }

    public function updateShortlistedResult(Request $request, $id){

        $validatedData = $request->validate([
            'applicationStatus' => 'required|string',
        ]);

        $application = InternshipApplication::find($id);

        if($validatedData['applicationStatus'] == 'Approved') {
            $extraData = $request->validate([
                'offerLetter' => 'required|mimes:pdf',
                'actualAllowance' => 'required|numeric',
            ]);

            $documentPath = $request->file('offerLetter')->store("public/InternshipApplication/documents/offerLetter/{$application->studentID}");
            $application->offerLetter = basename($documentPath);
            $application->actualAllowance = $extraData['actualAllowance'];
        }

        $application->applicationStatus = $validatedData['applicationStatus'];

        $application->save();

        return redirect()->route('employer.shortlistedapprovedapplicants')->with('success', 'Shortlisted Result updated successfully');
    }


    public function updateOfferStatus(Request $request, $id)
    {

        // Validate the incoming request data
        $validatedData = $request->validate([
            'applicationStatus' => 'required|string',
        ]);


        // Find the application using the provided applicationID
        $application = InternshipApplication::find($id);

    
        // Update the application status
        $application->applicationStatus = $validatedData['applicationStatus'];
    
        // Save the updated application status
        $application->save();
    
        // Check if the application status is 'Accepted'
        if ($validatedData['applicationStatus'] == 'Accepted') {
            // Create a new AcceptedOffer entry
            $acceptedOffer = new AcceptedOffer();
    
            // Link the accepted offer to the application
            $acceptedOffer->applicationID = $application->id;
    
            // Save the accepted offer
            $acceptedOffer->save();
        }

        if ($validatedData['applicationStatus'] == 'Rejected') {
            
            $extraData = $request->validate([
                'reasonRejected' => 'required|string',
            ]);
            $application->reasonRejected = $extraData['reasonRejected'];
            
            $application->save();

        }
    
        // Redirect back with a success message
        if ($validatedData['applicationStatus'] == 'Accepted') {
            return redirect()->back()->with('success', 'You have accepted the offer');
        } else {
            return redirect()->back()->with('success', 'You have rejected the offer');
        }
    }

    public function acceptedOffers(){
        $guard = session('userGuard');
        $student = Auth::guard($guard)->user();

        $acceptedOffers = AcceptedOffer::whereHas('application', function ($query) use ($student) {
            $query->where('studentID', $student->id);
           })->with(['application.internship.employer'])
               ->orderBy('created_at', 'desc')
               ->get();

        return Inertia::render('Application/IndustrialTraining/acceptedOffers', [
            'acceptedOffers' => $acceptedOffers,
        ]);
    }


    public function acceptedApplicants(){
        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();

        if ($user instanceof ContactPerson) {
            if($user->employerID) {
                $employer = Employer::find($user->employerID);

                $internship = Internship::where('employerID', $employer->id)->get();

                $applications = InternshipApplication::whereIn('internshipID', $internship->pluck('id'))
                    ->where('applicationStatus', 'Accepted')
                    ->with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                    ->with(['internship', 'acceptedOffer'])
                    ->get();

    
                return Inertia::render('Application/internshipApplication/Accepted/list', [
                    'applications' => $applications,
                ]);
            }
            else {
                return redirect()->route('employer.dashboard')->with('error', 'Employer not found');
            }
        }
        else {
            return redirect()->route('login')->with('error', 'You are not authorized to view this page');
        }
    }


    public function rejectedApplicants(){
        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();

        if ($user instanceof ContactPerson) {
            if($user->employerID) {
                $employer = Employer::find($user->employerID);

                $internship = Internship::where('employerID', $employer->id)->get();

                $applications = InternshipApplication::whereIn('internshipID', $internship->pluck('id'))
                    ->where('applicationStatus', 'Rejected')
                    ->with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                    ->with(['internship'])
                    ->get();

    
                return Inertia::render('Application/internshipApplication/Rejected/list', [
                    'applications' => $applications,
                ]);
            }
            else {
                return redirect()->route('employer.dashboard')->with('error', 'Employer not found');
            }
        }
        else {
            return redirect()->route('login')->with('error', 'You are not authorized to view this page');
        }
    }

    public function approvedOrShortlistedApplicants()
    {
        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();

        if ($user instanceof ContactPerson) {
            if($user->employerID) {
                $employer = Employer::find($user->employerID);

                $internship = Internship::where('employerID', $employer->id)->get();

                $applications = InternshipApplication::whereIn('internshipID', $internship->pluck('id'))
                    ->whereIn('applicationStatus', ['Approved', 'Shortlisted'])
                    ->with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                    ->with(['internship'])
                    ->get();

    
                return Inertia::render('Application/internshipApplication/ApprovedOrShortlisted/list', [
                    'applications' => $applications,
                ]);
            }
            else {
                return redirect()->route('employer.dashboard')->with('error', 'Employer not found');
            }
        }
        else {
            return redirect()->route('login')->with('error', 'You are not authorized to view this page');
        }
    }
    

    public function cancelAcceptedOffer($id, Request $request)
    {
        $guard = session('userGuard');
        $student = Auth::guard($guard)->user();

        $validatedData = $request->validate([
            'reasonRejected' => 'required|string',
        ]);
    
        // Find the application using the provided applicationID
        $application = InternshipApplication::where('studentID', $student->id)
                    ->where('id', $id)
                    ->first();

        $acceptedOffer = AcceptedOffer::where('applicationID', $id)->first();
    
        // Check if the application exists
        if ($application && $acceptedOffer) {
            // Delete the application
            $application->applicationStatus = 'Rejected';

            $application->reasonRejected = $validatedData['reasonRejected'];

            $application->save();

            $acceptedOffer->delete();
    
            // Redirect back with a success message
            return redirect()->back()->with('success', 'Accepted Offer cancelled successfully');
        } else {
            // Redirect back with an error message
            return redirect()->back()->with('error', 'Accepted Offer not found');
        }
    }

    public function showUpdateAcceptedOfferDetails(Request $request, $id)
    {
        $acceptedOffer = AcceptedOffer::with(['application.student', 'application.internship'])->find($id);


        return Inertia::render('Application/internshipApplication/Accepted/updateDetails', [
            'acceptedOffer' => $acceptedOffer,
        ]);
    }

    public function updateAcceptedOfferDetails(Request $request, $id, $applicationID)
    {
        $application = InternshipApplication::find($applicationID);

        $acceptedOffer = AcceptedOffer::find($id);

        $allowance = $application->actualAllowance;

        $validatedData = $request->validate([
            'startTime' => 'required',
            'endTime' => 'required',
            'supervisorName' => 'required|string',
            'supervisorEmail' => 'required|email',
            'supervisorPhone' => 'required|string',
            'supervisorPosition' => 'required|string',
            'supervisorDepartment' => 'required|string',
            'workingDays' => 'required|string',
            'startDate' => 'required|date',
            'endDate' => 'required|date',
        ]);
        
        $acceptedOffer->startTime = $validatedData['startTime'];
        $acceptedOffer->endTime = $validatedData['endTime'];
        $acceptedOffer->allowance = $allowance;
        $acceptedOffer->supervisorName = $validatedData['supervisorName'];
        $acceptedOffer->supervisorEmail = $validatedData['supervisorEmail'];
        $acceptedOffer->supervisorPhone = $validatedData['supervisorPhone'];
        $acceptedOffer->supervisorPosition = $validatedData['supervisorPosition'];
        $acceptedOffer->supervisorDepartment = $validatedData['supervisorDepartment'];
        $acceptedOffer->workingDays = $validatedData['workingDays'];
        $acceptedOffer->startDate = $validatedData['startDate'];
        $acceptedOffer->endDate = $validatedData['endDate'];

        $acceptedOffer->save();

        return redirect()->route('employer.acceptedapplicants')->with('success', 'Accepted Offer details updated successfully');
    }


    
}