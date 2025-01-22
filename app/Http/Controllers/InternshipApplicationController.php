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
use App\Models\Company;
use App\Models\Employer;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Notifications\Notifiable;
use App\Notifications\UpdateApplicationStatus;
use App\Notifications\UpdateOfferDetails;

class InternshipApplicationController extends Controller
{
    public function applyInternship($id)
    {
        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();
        $internship = Internship::with('company')->find($id);

        // Check if the student has already applied for this internship
         $existingApplication = InternshipApplication::where('studentID', $user->id)
        ->where('internshipID', $id)
        ->first();


        if($existingApplication) {
            return redirect()->route('internships.index')->with('error', 'You have already applied for this internship');
        }
        
        $student = Student::with('skills', 'languages', 'accomplishments', 'addresses', 'educations', 'experiences', 'referees')->find($user->id);


        return Inertia::render('ManageInternshipApplication/ApplyInternship/form', [
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
    
        // Handle file uploads and set permissions for student ID directory
        if ($request->hasFile('documents.coverLetter')) {
            $directory = storage_path("app/public/InternshipApplication/documents/coverLetter/{$student->id}");
        
            // Ensure the directory exists and set it to 777
            if (!is_dir($directory)) {
                mkdir($directory, 0777, true); // Create directory with 777 permissions
            } else {
                chmod($directory, 0777); // Ensure the directory has 777 permissions
            }
        
            $documentPath = $request->file('documents.coverLetter')->store("public/InternshipApplication/documents/coverLetter/{$student->id}");
            chmod(storage_path("app/{$documentPath}"), 0666); // Set file permissions to 644
            $validatedData['documents']['coverLetter'] = basename($documentPath);
        }
        
        if ($request->hasFile('documents.ownResume')) {
            $directory = storage_path("app/public/InternshipApplication/documents/ownResume/{$student->id}");
        
            if (!is_dir($directory)) {
                mkdir($directory, 0777, true);
            } else {
                chmod($directory, 0777);
            }
        
            $documentPath = $request->file('documents.ownResume')->store("public/InternshipApplication/documents/ownResume/{$student->id}");
            chmod(storage_path("app/{$documentPath}"), 0666);
            $validatedData['documents']['ownResume'] = basename($documentPath);
        }
        
        if ($request->hasFile('documents.transcript')) {
            $directory = storage_path("app/public/InternshipApplication/documents/transcript/{$student->id}");
        
            if (!is_dir($directory)) {
                mkdir($directory, 0777, true);
            } else {
                chmod($directory, 0777);
            }
        
            $documentPath = $request->file('documents.transcript')->store("public/InternshipApplication/documents/transcript/{$student->id}");
            chmod(storage_path("app/{$documentPath}"), 0666);
            $validatedData['documents']['transcript'] = basename($documentPath);
        }
        
        if ($request->hasFile('documents.SAL')) {
            $directory = storage_path("app/public/InternshipApplication/documents/SAL/{$student->id}");
        
            if (!is_dir($directory)) {
                mkdir($directory, 0777, true);
            } else {
                chmod($directory, 0777);
            }
        
            $documentPath = $request->file('documents.SAL')->store("public/InternshipApplication/documents/SAL/{$student->id}");
            chmod(storage_path("app/{$documentPath}"), 0666);
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
    
        $company = Internship::find($id)->company;
        $internship = Internship::find($id);

        Notification::sendNow($company, new UpdateApplicationStatus($data = [
            'message' => "You have received a new application for {$internship->internshipTitle}",
        ]));
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
                    ->with(['internship.company', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->limit(2)
                    ->get();

                    

        $educations = Education::where('studentID', $student->id)->get();

        $studyFields = $educations->pluck('studyField');
                  
        $matchs = Internship::whereIn('studyScope', $studyFields)
                ->with(['company']) // Eager load the employer relationship
                ->where('postingStatus', 'Published')
                ->withCount('bookmarks', 'clicks', 'applications')
                ->orderBy('created_at', 'desc')
                ->limit(2)
                ->get();
        

        $appliedInternships = InternshipApplication::where('studentID', $student->id)
                    ->where('applicationStatus', 'Reviewing')
                    ->orWhere('applicationStatus', 'Unsuccessful')
                    ->where('studentID', $student->id)  
                    ->with(['internship.company', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->limit(2)
                    ->get();

        
        $interviews = Interview::whereHas('application', function ($query) use ($student) {
                     $query->where('studentID', $student->id);
                    })->with(['application.internship.company'])
                        ->orderBy('created_at', 'desc')
                        ->limit(2)
                        ->get();

        $approvedInternships = InternshipApplication::where('studentID', $student->id)
                    ->where('applicationStatus', 'Approved')
                    ->where('studentID', $student->id)  
                    ->with(['internship.company', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->limit(2)
                    ->get();
        
        $shortlistedInternships = InternshipApplication::where('studentID', $student->id)
                    ->where('applicationStatus', 'Shortlisted')
                    ->where('studentID', $student->id)  
                    ->with(['internship.company', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->limit(2)
                    ->get();

        return Inertia::render('ManageInternshipApplication/my-internships/page', [
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
                    ->with(['internship.company', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->get();

                    

        $educations = Education::where('studentID', $student->id)->get();

        $studyFields = $educations->pluck('studyField');
                  
        $matchs = Internship::whereIn('studyScope', $studyFields)
                ->with(['company']) // Eager load the employer relationship
                ->where('postingStatus', 'Published')
                ->withCount('bookmarks', 'clicks', 'applications')
                ->orderBy('created_at', 'desc')
                ->get();

        return Inertia::render('ManageAnalyticsandReporting/student/my-internships/pre-internships/page', [
            'bookmarks' => $bookmarks,
            'matchs' => $matchs,
        ]);
    }

    public function processInternships()
    {
        $guard = session('userGuard');
        $student = Auth::guard($guard)->user();


        $appliedInternships = InternshipApplication::where('studentID', $student->id)
                    ->where('applicationStatus', 'Reviewing')
                    ->orWhere('applicationStatus', 'Unsuccessful')
                    ->where('studentID', $student->id)  
                    ->with(['internship.company', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->get();

        
        $interviews = Interview::whereHas('application', function ($query) use ($student) {
                     $query->where('studentID', $student->id);
                    })->with(['application.internship.company'])
                        ->orderBy('created_at', 'desc')
                        ->get();

        $approvedInternships = InternshipApplication::where('studentID', $student->id)
                    ->where('applicationStatus', 'Approved')
                    ->where('studentID', $student->id)  
                    ->with(['internship.company', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->get();
        
        $shortlistedInternships = InternshipApplication::where('studentID', $student->id)
                    ->where('applicationStatus', 'Shortlisted')
                    ->where('studentID', $student->id)
                    ->with(['internship.company', 'internship.bookmarks', 'internship.clicks', 'internship.applications']) // Eager load the internship, employer, bookmarks, and clicks relationships
                    ->orderBy('created_at', 'desc')
                    ->get();
    
        

        return Inertia::render('ManageInternshipApplication/my-internships/process-internships/page', [
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
            
            Notification::sendNow($application->internship->company, new UpdateApplicationStatus($data = [
                'message' => "The student ({$student->firstName} {$student->lastName}) has cancelled their application for {$application->internship->internshipTitle}",
            ]));

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

        
        if ($user instanceof Employer) {
            if($user->companyID) {
                $company = Company::find($user->companyID);

            $internship = Internship::where('companyID', $company->id)->get();

            $applications = InternshipApplication::whereIn('internshipID', $internship->pluck('id'))
                ->where('applicationStatus', 'Reviewing')
                ->with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                ->with(['internship']) 
                ->get();
                
                return Inertia::render('ManageInternshipApplication/internshipApplication/list', [
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

        return Inertia::render('ManageInternshipApplication/internshipApplication/updateStatus', [
            'application' => $application,
        ]);
    }

    public function updateApplicationStatus(Request $request, $id)
    {
        $application = InternshipApplication::find($id);

        $employer = Auth::guard('employer')->user();

        $validatedData = $request->validate([
            'applicationStatus' => 'required|string',
        ]);


        if($validatedData['applicationStatus'] == 'Unsuccessful' || $validatedData['applicationStatus'] == 'Reviewing') {
            $application->applicationStatus = $validatedData['applicationStatus'];
            $application->employerID = $employer->id;


            if($validatedData['applicationStatus'] == 'Unsuccessful') {
               Notification::sendNow($application->student, new UpdateApplicationStatus($data = [
                    'message' => "Your application for {$application->internship->internshipTitle} is unsuccessful",
                ]));
            }

            if($validatedData['applicationStatus'] == 'Reviewing') {
                Notification::sendNow($application->student, new UpdateApplicationStatus($data = [
                    'message' => "Your application for {$application->internship->internshipTitle} is under review",
                ]));
            }

            $application->save();

            return redirect()->route('employer.applicantslist')->with('success', 'Application status updated successfully');
        }

        if($validatedData['applicationStatus'] == 'Interview') {
           $extraData = $request->validate([
                'meetingDate' => 'required|date',
                'startTime' => 'required',
                'endTime' => 'required',
                'location' => 'nullable|string',
                'meetingMethod' => 'required|string',
                'meetingLink' => 'nullable|string',
            ]);

            if($extraData['startTime'] >= $extraData['endTime']) {
                return redirect()->back()->with('error', 'Start time must be less than end time');
            }

            $interview = new Interview();
            $interview->applicationID = $id;
            $interview->interviewDate = $extraData['meetingDate'];
            $interview->interviewStartTime = $extraData['startTime'];
            $interview->interviewEndTime = $extraData['endTime'];
            $interview->interviewMethod = $extraData['meetingMethod'];

            if(isset($extraData['location'])) {
                $interview->interviewLocation = $extraData['location'];
            }

            if(isset($extraData['meetingLink'])) {
                $interview->interviewLink = $extraData['meetingLink'];
            }
            $application->applicationStatus = 'Interview';
            $application->employerID = $employer->id;

            Notification::sendNow($application->student, new UpdateApplicationStatus($data = [
                'message' => "Your application for {$application->internship->internshipTitle} has been selected for an interview",
            ]));
            $application->save();
            $interview->save();

            return redirect()->route('employer.applicantslist')->with('success', 'Application status updated successfully');
        }

    }


    public function updateInterviewStatus(Request $request, $id){

        $validatedData = $request->validate([
            'interviewStatus' => 'required|string',
        ]);
        
        $student = Auth::guard('student')->user();

        $interview = Interview::find($id);

        $company = $interview->application->internship->company;

        $interview->interviewStatus = $validatedData['interviewStatus'];

        if($validatedData['interviewStatus']=='Available'){
            Notification::sendNow($company, new UpdateApplicationStatus($data = [
                'message' => "The applicant ({$student->firstName} {$student->lastName}) is available for the interview of the {$interview->application->internship->internshipTitle}",
            ]));
        }
        else {
            Notification::sendNow($company, new UpdateApplicationStatus($data = [
                'message' => "The applicant ({$student->firstName} {$student->lastName}) is not available for the interview of the {$interview->application->internship->internshipTitle}",
            ]));
        }

        $interview->save();

        return redirect()->back()->with('success', 'Interview status updated successfully');

    }


    public function InterviewApplicantList(){

        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();

        if($user instanceof Employer) {
            if($user->companyID) {
                $company = Company::find($user->companyID);

                $internship = Internship::where('companyID', $company->id)->get();

                $applications = InternshipApplication::whereIn('internshipID', $internship->pluck('id'))
                    ->where('applicationStatus', 'Interview')
                    ->with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                    ->with(['internship', 'interview', 'employer']) 
                    ->get();

    
                return Inertia::render('ManageInternshipApplication/internshipApplication/Need-to-Interview/list', [
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

        Notification::sendNow($interview->application->student, new UpdateApplicationStatus($data = [
            'message' => "The interview for {$interview->application->internship->internshipTitle} has been rescheduled",
        ]));

        $interview->save();

        return redirect()->back()->with('success', 'Interview details updated successfully');

    }

    public function showUpdateInterviewResult(Request $request, $id)
    {
        $application = InternshipApplication::with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                    ->with(['internship'])
                    ->find($id);

        return Inertia::render('ManageInternshipApplication/internshipApplication/Need-to-Interview/updateInterviewResult', [
            'application' => $application,
        ]);
    }

    public function updateInterviewResult(Request $request, $id)
    {
        // Initial validation
        $validatedData = $request->validate([
            'applicationStatus' => 'required|string',
            'interviewComment' => 'required|string',
            'overallRating' => 'required|numeric|min:1|max:5',
            'performanceRating' => 'required|numeric|min:1|max:5',
            'softRating' => 'required|numeric|min:1|max:5',
            'technicalRating' => 'required|numeric|min:1|max:5',
        ]);
    
        $employer = Auth::guard('employer')->user();
        $application = InternshipApplication::find($id);
    
        // Update application status
        $application->applicationStatus = $validatedData['applicationStatus'];
        $application->employerID = $employer->id;
        $application->interviewComment = $validatedData['interviewComment'];
        $application->overallRating = $validatedData['overallRating'];
        $application->performanceRating = $validatedData['performanceRating'];
        $application->softRating = $validatedData['softRating'];
        $application->technicalRating = $validatedData['technicalRating'];
    
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
    
            Notification::sendNow($application->student, new UpdateApplicationStatus($data = [
                'message' => "Unfortunately, your application for {$application->internship->internshipTitle} requires an additional interview",
            ]));
            $interview->save();
        }
    
        // Handle Approved Status
        if ($validatedData['applicationStatus'] == 'Approved') {
            // Validation for Approved-specific fields
            $approvedData = $request->validate([
                'offerLetter' => 'required|mimes:pdf',
                'actualAllowance' => 'required|numeric',
            ]);
    
            $directory = storage_path("app/public/InternshipApplication/documents/offerLetter/{$application->studentID}");
            $documentPath = $request->file('offerLetter')->store("public/InternshipApplication/documents/offerLetter/{$application->studentID}");
            
            // Ensure the directory exists and has the correct permissions
            if (!is_dir($directory)) {
                mkdir($directory, 0777, true); // Create directory with full permissions
            } else {
                chmod($directory, 0777); // Update directory permissions if it already exists
            }
            
            // Update file permissions to ensure it is accessible
            chmod(storage_path("app/{$documentPath}"), 0666); // Set file permissions to 644
            
            $application->offerLetter = basename($documentPath);
            $application->actualAllowance = $approvedData['actualAllowance'];
        }
    
        if($validatedData['applicationStatus'] == 'Shortlisted') {
            Notification::sendNow($application->student, new UpdateApplicationStatus($data = [
                'message' => "Your application for {$application->internship->internshipTitle} has been entered into the shortlist",
            ]));
        }
        if($validatedData['applicationStatus'] == 'Approved') {
            Notification::sendNow($application->student, new UpdateApplicationStatus($data = [
                'message' => "Congratulations! Your application for {$application->internship->internshipTitle} has been approved",
            ]));
        }

        if($validatedData['applicationStatus'] == 'Unsuccessful') {
            Notification::sendNow($application->student, new UpdateApplicationStatus($data = [
                'message' => "Unfortunately, Your application for {$application->internship->internshipTitle} is unsuccessful",
            ]));
        }
        $application->save();
    
        return redirect()->route('employer.interviewapplicantslist')->with('success', 'Interview Result updated successfully');
    }
    

    public function showUpdateShortlistedResult($id){
        $application = InternshipApplication::with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                    ->with(['internship'])
                    ->find($id);
    
        return Inertia::render('ManageInternshipApplication/internshipApplication/ApprovedOrShortlisted/updateShortlistedResult', [
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

                $directory = storage_path("app/public/InternshipApplication/documents/offerLetter/{$application->studentID}");
                $documentPath = $request->file('offerLetter')->store("public/InternshipApplication/documents/offerLetter/{$application->studentID}");
                
                // Ensure the directory exists and has the correct permissions
                if (!is_dir($directory)) {
                    mkdir($directory, 0777, true); // Create directory with full permissions
                } else {
                    chmod($directory, 0777); // Update directory permissions if it already exists
                }
                
                // Update file permissions to ensure it is accessible
                chmod(storage_path("app/{$documentPath}"), 0666); // Set file permissions to 644
                
                $application->offerLetter = basename($documentPath);
                $application->actualAllowance = $extraData['actualAllowance'];


            Notification::sendNow($application->student, new UpdateApplicationStatus($data = [
                'message' => "Congratulations! Your application for {$application->internship->internshipTitle} has been approved",
            ]));
        }

        if($validatedData['applicationStatus'] == 'Interview') {
            Interview::where('applicationID', $id)->delete();
            $extraData = $request->validate([
                'interviewDate' => 'required|date',
                'startTime' => 'required',
                'endTime' => 'required',
                'location' => 'nullable|string',
                'interviewMethod' => 'required|string',
                'meetingLink' => 'nullable|string',
            ]);

            if($extraData['startTime'] >= $extraData['endTime']) {
                return redirect()->back()->with('error', 'Start time must be less than end time');
            }

            
            $interview = new Interview();
            $interview->applicationID = $id;
            $interview->interviewDate = $extraData['interviewDate'];
            $interview->interviewStartTime = $extraData['startTime'];
            $interview->interviewEndTime = $extraData['endTime'];
            $interview->interviewMethod = $extraData['interviewMethod'];

            if(isset($extraData['location'])) {
                $interview->interviewLocation = $extraData['location'];
            }

            if(isset($extraData['meetingLink'])) {
                $interview->interviewLink = $extraData['meetingLink'];
            }

            Notification::sendNow($application->student, new UpdateApplicationStatus($data = [
                'message' => "Unfortunately, your application for {$application->internship->internshipTitle} requires an additional interview",
            ]));
            $interview->save();
        }

        $application->applicationStatus = $validatedData['applicationStatus'];
        if($validatedData['applicationStatus'] == 'Shortlisted') {
            Notification::sendNow($application->student, new UpdateApplicationStatus($data = [
                'message' => "Your application for {$application->internship->internshipTitle} has been entered into the shortlist",
            ]));
        }

        if($validatedData['applicationStatus'] == 'Unsuccessful') {
            Notification::sendNow($application->student, new UpdateApplicationStatus($data = [
                'message' => "Your application for {$application->internship->internshipTitle} is unsuccessful",
            ]));
        }

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
            Notification::sendNow($application->internship->company, new UpdateApplicationStatus($data = [
                'message' => "Applicant ({$application->student->firstName} {$application->student->lastName}) has accepted the offer for {$application->internship->internshipTitle}",
            ]));
            $acceptedOffer->save();
        }

        if ($validatedData['applicationStatus'] == 'Rejected') {
            
            $extraData = $request->validate([
                'reasonRejected' => 'required|string',
            ]);
            $application->reasonRejected = $extraData['reasonRejected'];

            Notification::sendNow($application->internship->company, new UpdateApplicationStatus($data = [
                'message' => "Applicant ({$application->student->firstName} {$application->student->lastName}) has rejected the offer for {$application->internship->internshipTitle}",
            ]));
            
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
           })->with(['application.internship.company'])
               ->orderBy('created_at', 'desc')
               ->get();

        return Inertia::render('ManageInternshipApplication/IndustrialTraining/acceptedOffers', [
            'acceptedOffers' => $acceptedOffers,
        ]);
    }


    public function acceptedApplicants(){
        $guard = session('userGuard');
        $user = Auth::guard($guard)->user();

        if ($user instanceof Employer) {
            if($user->companyID) {
                $company = Company::find($user->companyID);

                $internship = Internship::where('companyID', $company->id)->get();

                $applications = InternshipApplication::whereIn('internshipID', $internship->pluck('id'))
                    ->where('applicationStatus', 'Accepted')
                    ->with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                    ->with(['internship', 'acceptedOffer.employer'])
                    ->get();


                return Inertia::render('ManageInternshipApplication/internshipApplication/Accepted/list', [
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

        if ($user instanceof Employer) {
            if($user->companyID) {
                $company = Company::find($user->companyID);

                $internship = Internship::where('companyID', $company->id)->get();

                $applications = InternshipApplication::whereIn('internshipID', $internship->pluck('id'))
                    ->where('applicationStatus', 'Rejected')
                    ->with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                    ->with(['internship'])
                    ->get();

    
                return Inertia::render('ManageInternshipApplication/internshipApplication/Rejected/list', [
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

        if ($user instanceof Employer) {
            if($user->companyID) {
                $company = Company::find($user->companyID);

                $internship = Internship::where('companyID', $company->id)->get();

                $applications = InternshipApplication::whereIn('internshipID', $internship->pluck('id'))
                    ->whereIn('applicationStatus', ['Approved', 'Shortlisted'])
                    ->with(['student', 'student.skills', 'student.languages', 'student.accomplishments', 'student.addresses', 'student.educations', 'student.experiences', 'student.referees'])
                    ->with(['internship','employer'])
                    ->get();

    
                return Inertia::render('ManageInternshipApplication/internshipApplication/ApprovedOrShortlisted/list', [
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

            Notification::sendNow($application->internship->company, new UpdateApplicationStatus($data = [
                'message' => "Applicant ({$application->student->firstName} {$application->student->lastName}) has rejected the previously accepted offer for {$application->internship->internshipTitle}",
            ]));

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


        return Inertia::render('ManageInternshipApplication/internshipApplication/Accepted/updateDetails', [
            'acceptedOffer' => $acceptedOffer,
        ]);
    }

    public function updateAcceptedOfferDetails(Request $request, $id, $applicationID)
    {
        $employer = Auth::guard('employer')->user();
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
        $acceptedOffer->employerID = $employer->id;

        Notification::sendNow($application->student, new updateOfferDetails($data = [
            'message' => "Your accepted offer details for {$application->internship->internshipTitle} has been added. Please review the details",
        ]));

        $acceptedOffer->save();

        return redirect()->route('employer.acceptedapplicants')->with('success', 'Accepted Offer details updated successfully');
    }


    public function myReport(){
        $user=Auth::guard('employer')->user();

        for ($i = 1; $i <= 12; $i++) { 
            $applications = InternshipApplication::whereHas('internship', function ($query) use ($user, $i) {
                $query->where('companyID', $user->companyID)
                      ->whereMonth('startPostingDate', $i); // Use $i directly as the month
            })->count();
        
            $applicationsData[] = $applications; // Push application count for each month
        }

    // Count of rejected internship applications
    $rejectedCount = InternshipApplication::whereHas('internship', function($query) use ($user) {
        $query->where('companyID', $user->companyID);
    })
    ->where('applicationStatus', 'Rejected')
    ->count(); // Get count of Rejected applications

    // Count of accepted internship applications
    $acceptedCount = InternshipApplication::whereHas('internship', function($query) use ($user) {
        $query->where('companyID', $user->companyID);
    })
    ->where('applicationStatus', 'Accepted')
    ->count(); // Get count of Accepted applications

    

        return Inertia::render('ManageAnalyticsandReporting/employer/myReport', [
            'applicationsData' => $applicationsData,
            'rejectedCount' => $rejectedCount,
            'acceptedCount' => $acceptedCount,
        ]);


    }
}