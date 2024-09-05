<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Address;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Referee;
use App\Models\Accomplishment;
use App\Models\Language;
use App\Models\Skill;
use App\Models\Internship;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
  public function showProfile()
  {
      $guard = session('guard');
      $student = Auth::guard($guard)->user(); 
  
      // Retrieve all related information using the student ID
      $studentID = $student->id;
  
      $address = Address::where('studentID', $studentID)->get();
      $experience = Experience::where('studentID', $studentID)->get();
      $education = Education::where('studentID', $studentID)->get();
      $referee = Referee::where('studentID', $studentID)->get();
      $accomplishment = Accomplishment::where('studentID', $studentID)->get();
      $languages = Language::where('studentID', $studentID)->get();
      $skill = Skill::where('studentID', $studentID)->get();
    
      return Inertia::render('Profile/student/profileDetails', [
          'student' => $student,
          'address' => $address,
          'experience' => $experience,
          'education' => $education,
          'referee' => $referee,
          'accomplishment' => $accomplishment,
          'languages' => $languages,
          'skill' => $skill,
          'studentID' => $studentID
      ]);
  }


  public function settings(){
    $guard = session('guard');
    $student = Auth::guard($guard)->user();

    return Inertia::render('Profile/student/settings', [
      'student' => $student,
    ]);
  }

  public function changePassword(Request $request){
    $guard = session('guard');
    $student = Auth::guard($guard)->user();

    $request->validate([
      'newPassword' => 'required',
      'confirmPassword' => 'required|same:newPassword',
    ]);

    $currentPassword = $student->password;

    
    // Ensure the new password is not the same as the current password
    if (Hash::check($request->newPassword, $currentPassword)) {
      return redirect()->back()->withErrors(['error' => 'The new password cannot be the same as the current password']);
    }

    if ($request->newPassword !== $request->confirmPassword) {
      return redirect()->back()->withErrors(['error'=>'Passwords do not match']);
    }

    if($request->newPassword === $request->confirmPassword){
      $student->password = bcrypt($request->newPassword);
      $student->save();

      return redirect()->back()->with('success', 'Password changed successfully');
    }
    
  }

  public function updateBasicInfo(Request $request, $studentID)
  {
    $validator = Validator::make($request->all(), [
        'student' => 'required|array',
        'student.firstName' => 'required|string',
        'student.lastName' => 'required|string',
        'student.email' => 'required|email',
        'student.phoneNum' => 'required|string',
        'student.ICNumber' => 'required|string',
        'student.dateOfBirth' => 'required|date',
        'student.gender' => 'required|string',
        'student.nationality' => 'required|string',
        'addresses' => 'required|array',
        'addresses.*.type' => 'required|in:home,training',
        'addresses.*.address1' => 'required|string',
        'addresses.*.address2' => 'required|string',
        'addresses.*.postcode' => 'required|string',
        'addresses.*.city' => 'required|string',
        'addresses.*.state' => 'required|string',
    ]);

    if ($validator->fails()) {
        return redirect()->back()->withErrors($validator)->withInput();
    }
    $validatedData = $validator->validated();

    $studentData = $validatedData['student'];
    $addressesData = $validatedData['addresses'];


    // Update the student information
    $student = Student::findOrFail($studentID);
    Student::updateOrCreate(
        ['id' => $studentID],
        $studentData
    );

    // Update addresses
    foreach ($addressesData as $addressData) {
        Address::updateOrCreate(
            ['studentID' => $student->id, 'type' => $addressData['type']],
            $addressData
        );
    }

    return redirect()->back()->with('success', 'Basic Information updated successfully.');
  }
  public function storeExperience(Request $request, $studentID){

    $request->validate([
      'companyName' => 'required',
      'jobTitle' => 'required',
      'startDate' => 'required',
      'endDate' => 'required',
      'jobDescription' => 'required',
    ]);

    $student = Student::findOrFail($studentID);
    Experience::create([
      'studentID' => $student->id,
      'companyName' => $request->companyName,
      'jobTitle' => $request->jobTitle,
      'startDate' => $request->startDate,
      'endDate' => $request->endDate,
      'jobDescription' => $request->jobDescription,
    ]);

    return redirect()->back()->with('success', 'Experience added successfully');
  }

  public function updateExperience(Request $request, $studentID, $experienceID){
    $request->validate([
      'companyName' => 'required',
      'jobTitle' => 'required',
      'startDate' => 'required',
      'endDate' => 'required',
      'jobDescription' => 'required',
    ]);
    
    $student = Student::findOrFail($studentID);
    $experience = Experience::findOrFail($experienceID);

    $experience->update([
      'companyName' => $request->companyName,
      'jobTitle' => $request->jobTitle,
      'startDate' => $request->startDate,
      'endDate' => $request->endDate,
      'jobDescription' => $request->jobDescription,
    ]);

    return redirect()->back()->with('success', 'Experience updated successfully');
  }

  public function deleteExperience($studentID, $experienceID){
    $experience = Experience::findOrFail($experienceID);
    $experience->delete();

    return redirect()->back()->with('success', 'Experience deleted successfully');
  }

  public function storeSkill(Request $request, $studentID){
    $request->validate([
      'skillDesc' => 'required',
      'proficiencyLevel' => 'required',
    ]);

    $student = Student::findOrFail($studentID);
    Skill::create([
      'studentID' => $student->id,
      'skillDesc' => $request->skillDesc,
      'proficiencyLevel' => $request->proficiencyLevel,
    ]);

    return redirect()->back()->with('success', 'Skill added successfully');
  }

  public function updateSkill(Request $request, $studentID, $skillID){
    $request->validate([
      'skillDesc' => 'required',
      'proficiencyLevel' => 'required',
    ]);

    $student = Student::findOrFail($studentID);
    $skill = Skill::findOrFail($skillID);

    $skill->update([
      'skillDesc' => $request->skillDesc,
      'proficiencyLevel' => $request->proficiencyLevel,
    ]);

    return redirect()->back()->with('success', 'Skill updated successfully');
  }

  public function storeAccomplishment(Request $request, $studentID) { 
    $request->validate([
      'accomplishmentName' => 'required',
      'accomplishmentDescription' => 'required',
      'accomplishmentYear' => 'required',
    ]);

    $student = Student::findOrFail($studentID);
    Accomplishment::create([
      'studentID' => $student->id,
      'accomplishmentName' => $request->accomplishmentName,
      'accomplishmentDescription' => $request->accomplishmentDescription,
      'accomplishmentYear' => $request->accomplishmentYear,
    ]);

    return redirect()->back()->with('success', 'Accomplishment added successfully');
  }

  public function updateAccomplishment(Request $request, $studentID, $accomplishmentID){
    $request->validate([
      'accomplishmentName' => 'required',
      'accomplishmentDescription' => 'required',
      'accomplishmentYear' => 'required',
    ]);

    $student = Student::findOrFail($studentID);
    $accomplishment = Accomplishment::findOrFail($accomplishmentID);

    $accomplishment->update([
      'accomplishmentName' => $request->accomplishmentName,
      'accomplishmentDescription' => $request->accomplishmentDescription,
      'accomplishmentYear' => $request->accomplishmentYear,
    ]);

    return redirect()->back()->with('success', 'Accomplishment updated successfully');
  }

  public function deleteAccomplishment($studentID, $accomplishmentID){
    $accomplishment = Accomplishment::findOrFail($accomplishmentID);
    $accomplishment->delete();

    return redirect()->back()->with('success', 'Accomplishment deleted successfully');
  }

  public function storeReferee(Request $request, $studentID){
    $request->validate([
      'refereeName' => 'required',
      'refereePosition' => 'required',
      'refereeCompany' => 'required',
      'refereeEmail' => 'required',
      'refereePhone' => 'required',
    ]);

    $student = Student::findOrFail($studentID);
    Referee::create([
      'studentID' => $student->id,
      'refereeName' => $request->refereeName,
      'refereeCompany' => $request->refereeCompany,
      'refereePosition' => $request->refereePosition,
      'refereeEmail' => $request->refereeEmail,
      'refereePhone' => $request->refereePhone,
    ]);

    return redirect()->back()->with('success', 'Referee added successfully');
  }

  public function storeEducation(Request $request, $studentID) {
    $request->validate([
      'programName' => 'required',
      'schoolName' => 'required',
      'educationLevel' => 'required',
      'startDate' => 'required',
      'endDate' => 'required',
      'studyField' => 'required',
      'CGPA' => 'required',
    ]);

    $student = Student::findOrFail($studentID);
    Education::create([
      'studentID' => $student->id,
      'programName' => $request->programName,
      'schoolName' => $request->schoolName,
      'educationLevel' => $request->educationLevel,
      'startDate' => $request->startDate,
      'endDate' => $request->endDate,
      'studyField' => $request->studyField,
      'CGPA' => $request->CGPA,
    ]);

    return redirect()->back()->with('success', 'Education added successfully');
  }

  public function updateEducation(Request $request, $studentID, $educationID){
    $request->validate([
      'programName' => 'required',
      'schoolName' => 'required',
      'educationLevel' => 'required',
      'startDate' => 'required',
      'endDate' => 'required',
      'studyField' => 'required',
      'CGPA' => 'required',
    ]);

    $student = Student::findOrFail($studentID);
    $education = Education::findOrFail($educationID);

    $education->update([
      'programName' => $request->programName,
      'schoolName' => $request->schoolName,
      'educationLevel' => $request->educationLevel,
      'startDate' => $request->startDate,
      'endDate' => $request->endDate,
      'studyField' => $request->studyField,
      'CGPA' => $request->CGPA,
    ]);

    return redirect()->back()->with('success', 'Education updated successfully');
  }

  public function deleteEducation($studentID, $educationID){
    $education = Education::findOrFail($educationID);
    $education->delete();

    return redirect()->back()->with('success', 'Education deleted successfully');
  }

  public function updateReferee(Request $request, $studentID, $refereeID){
    $request->validate([
      'refereeName' => 'required',
      'refereePosition' => 'required',
      'refereeCompany' => 'required',
      'refereeEmail' => 'required',
      'refereePhone' => 'required',
    ]);

    $student = Student::findOrFail($studentID);
    $referee = Referee::findOrFail($refereeID);

    $referee->update([
      'refereeName' => $request->refereeName,
      'refereeCompany' => $request->refereeCompany,
      'refereePosition' => $request->refereePosition,
      'refereeEmail' => $request->refereeEmail,
      'refereePhone' => $request->refereePhone,
    ]);

    return redirect()->back()->with('success', 'Referee updated successfully');

  }

  public function deleteReferee($studentID, $refereeID){
    $referee = Referee::findOrFail($refereeID);
    $referee->delete();

    return redirect()->back()->with('success', 'Referee deleted successfully');
  }

  public function deleteSkill($studentID, $skillID){
    $skill = Skill::findOrFail($skillID);
    $skill->delete();

    return redirect()->back()->with('success', 'Skill deleted successfully');
  }

  public function updateLanguages(Request $request, $studentID)
  {
      // Validate the incoming data
      $validatedData = $request->validate([
          'languages' => 'required|array',
          'languages.*.languageName' => 'required|string',
          'languages.*.proficiencyLevel' => 'required|string',
      ]);
  
      // Retrieve the student by ID
      $student = Student::findOrFail($studentID);
  
      // Update or create each language's proficiency level
      foreach ($validatedData['languages'] as $languageData) {
          $language = Language::updateOrCreate(
              [
                  'studentID' => $student->id,
                  'languageName' => $languageData['languageName']
              ],
              [
                  'proficiencyLevel' => $languageData['proficiencyLevel']
              ]
          );
      }
  
      // Optionally, you could flash a success message to the session
      return redirect()->back()->with('success', 'Languages updated successfully.');
  }

  public function updateProfilePicture(Request $request, $studentID)
  {
      // Validate the image
      $request->validate([
          'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
      ]);

      // Retrieve the student
      $student = Student::findOrFail($studentID);

      // Handle the uploaded file
      if ($request->hasFile('image')) {
          // Delete the old profile picture if it exists
          if ($student->profilePicture) {
              Storage::delete($student->profilePicture);
          }

          // Store the new image
          $path = $request->file('image')->store('public/profile/student/profile_pictures');

          // Update the student's profile picture path in the database
          $student->profilePicture = basename($path);
          $student->save();
      }

      return redirect()->back()->with('success', 'Profile picture updated successfully.');
  }

  public function deleteProfilePicture($studentID)
  {
      // Retrieve the student
      $student = Student::findOrFail($studentID);

      // Delete the profile picture if it exists
      if ($student->profilePicture) {
          Storage::delete($student->profilePicture);
          $student->profilePicture = null;
          $student->save();
      }

      return redirect()->back()->with('success', 'Profile picture removed successfully.');
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

  
}