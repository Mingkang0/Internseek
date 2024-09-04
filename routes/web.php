<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\CompanyController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostingController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ContactPersonController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\AdminController;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/register/student', [RegistrationController::class, 'createStudent'])->name('register.student');

Route::post('/create/student', [RegistrationController::class, 'storeStudent'])->name('register.student.post');

Route::get('/register/employer', [RegistrationController::class, 'createEmployer'])->name('register.employer');

Route::post('/create/employer', [RegistrationController::class, 'storeEmployer'])->name('register.employer.post');

Route:: get('/login', [LoginController::class, 'showLogin'])->name('login');

Route::post('/login/{userRole}', [LoginController::class, 'login'])->name('login.post');

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');


Route::get('/internships', [InternshipController::class, 'index'])->name('internships.index');

Route::get('/internships/{id}', [InternshipController::class, 'show'])->name('internships.show');

Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');

Route::get('/companies/{id}', [CompanyController::class, 'show'])->name('companies.show');

Route::group(['middleware' => 'auth:student'], function () {
    Route::post('/internships/{id}/bookmark', [InternshipController::class, 'bookmark'])->name('internships.bookmark');

    Route::post('report-internship/{id}', [InternshipController::class, 'ReportInternship'])->name('internships.report');

    Route::get('/student/my-report', [StudentController::class, 'ReportList'])->name('my-report');

    Route::get('/student/profile', [StudentController::class, 'showProfile'])->name('student.profile');

    Route::get('/student/settings', [StudentController::class, 'settings'])->name('student.settings');

    Route::post('/student/change-password', [StudentController::class, 'changePassword'])->name('student.change-password');

    Route::post('/languages/update/{id}', [StudentController::class, 'updateLanguages'])->name('student.languages.update');

    Route::post('/experience/store/{id}', [StudentController::class, 'storeExperience'])->name('student.experience.store');

    Route::post('/experience/update/{id}/{experienceID}', [StudentController::class, 'updateExperience'])->name('student.experience.update');

    Route::post('/experience/delete/{id}/{experienceID}', [StudentController::class, 'deleteExperience'])->name('student.experience.delete');

    Route::post('/skills/store/{id}', [StudentController::class, 'storeSkill'])->name('student.skill.store');

    Route::post('/skills/update/{id}/{skillID}', [StudentController::class, 'updateSkill'])->name('student.skill.update');

    Route::post('/skills/delete/{id}/{skillID}', [StudentController::class, 'deleteSkill'])->name('student.skill.delete');

    Route::post('/referee/store/{id}', [StudentController::class, 'storeReferee'])->name('student.referee.store');

    Route::post('/referee/update/{id}/{refereeID}', [StudentController::class, 'updateReferee'])->name('student.referee.update');

    Route::post('/referee/delete/{id}/{refereeID}', [StudentController::class, 'deleteReferee'])->name('student.referee.delete');

    Route::post('/accomplishment/store/{id}', [StudentController::class, 'storeAccomplishment'])->name('student.accomplishment.store');

    Route::post('/accomplishment/update/{id}/{accomplishmentID}', [StudentController::class, 'updateAccomplishment'])->name('student.accomplishment.update');

    Route::post('/accomplishment/delete/{id}/{accomplishmentID}', [StudentController::class, 'deleteAccomplishment'])->name('student.accomplishment.delete');

    Route::post('/education/store/{id}', [StudentController::class, 'storeEducation'])->name('student.education.store');

    Route::post('/education/update/{id}/{educationID}', [StudentController::class, 'updateEducation'])->name('student.education.update');

    Route::post('/education/delete/{id}/{educationID}', [StudentController::class, 'deleteEducation'])->name('student.education.delete');

    Route::post('/basicInfo/update/{id}', [StudentController::class, 'updateBasicInfo'])->name('student.basicinfo.update');

    Route::post('/profile/picture/{studentID}', [StudentController::class, 'updateProfilePicture']);

    Route::post('/profile/picture/delete/{studentID}', [StudentController::class, 'deleteProfilePicture']);
});


Route::group(['middleware' => 'auth:admin'], function () {

    Route::get('/admin/dashboard', [DashboardController::class, 'indexAdmin'])->name('admin.dashboard');

    Route::get('/admin/profile', [AdminController::class, 'showProfile'])->name('admin.profile');

    Route::post('/admin/profile/update/{id}', [AdminController::class, 'updateProfile'])->name('admin.profile.update');

    Route::post('/admin/change-password/{id}', [AdminController::class, 'changePassword'])->name('admin.change-password');

    Route::get('/admin/internships', [AdminController::class, 'internshipsList'])->name('admin.internships');

    Route::get('/admin/internships/{id}', [AdminController::class, 'internshipDetails'])->name('admin.internshipdetails');

    Route::get('/admin/internseekers', [AdminController::class, 'internseekerList'])->name('admin.internseekers');

    Route::get('/admin/internseekers/{id}', [AdminController::class, 'internseekerDetails'])->name('admin.internseekerdetails');
    
    Route::get('/admin/employers', [AdminController::class, 'employerList'])->name('admin.employers');

    Route::get('/admin/employers/{id}', [AdminController::class, 'employerDetails'])->name('admin.employerdetails');

    Route::get('/admin/problems-reports', [AdminController::class, 'ProblemReportList'])->name('admin.problemreports');

    Route::get('/admin/problems-reports/{id}', [AdminController::class, 'ProblemReportDetails'])->name('admin.problemreportdetails');

    Route::get('/admin/employer-requests', [AdminController::class, 'EmployerRequestList'])->name('admin.employerrequests');

    Route::get('/admin/employer-requests/{id}', [AdminController::class, 'EmployerRequestDetails'])->name('admin.employerrequestdetails');

    Route::post('/update-registration-status/{id}', [AdminController::class, 'updateRegistrationStatus'])->name('admin.updateregistrationstatus');

    Route::post('/admin/problems-reports/update-status/{id}', [AdminController::class, 'updateReportStatus'])->name('admin.updatereportstatus');

    Route::post('/admin/update-companyRating/{id}', [AdminController::class, 'updateCompanyRating'])->name('admin.updatecompanyrating');
});

Route::group(['middleware' => ['auth:employer']], function () {
    Route::get('/employer/dashboard', [DashboardController::class, 'indexEmployer'])->name('employer.dashboard');

    Route::get('/register/existing-employer', [RegistrationController::class, 'addExistingEmployer'])->name('register.existingemployer');

    Route::get('/search-existing-employer', [RegistrationController::class, 'searchExistingEmployer'])->name('register.searchexistingemployer');

    Route::get('/register/company', [RegistrationController::class, 'createCompany'])->name('register.company');

    Route::post('/employer/register', [RegistrationController::class, 'handleRegistration'])->name('register.handleRegistration');

    Route::get('/edit/registration-details', [RegistrationController::class, 'editRegistrationDetails'])->name('register.editregistrationdetails');

    Route::post('/update/registration-details/{id}', [RegistrationController::class, 'updateRegistrationDetails'])->name('register.updateregistationdetails');

    Route::post('/add-existing-employer/{id}', [RegistrationController::class, 'addExistingEmployerToContactPerson'])->name('register.addexistingemployer');

    Route::get('/employer/branch-details', [EmployerController::class, 'branchDetails'])->name('employer.branchdetails');

    Route::post('/employer/branch/store/{id}', [EmployerController::class, 'storeBranch'])->name('employer.storebranch');

    Route::post('/employer/branch/update/{id}', [EmployerController::class, 'updateBranch'])->name('employer.updatebranch');

    Route::post('/employer/branch/delete/{id}', [EmployerController::class, 'deleteBranch'])->name('employer.deletebranch');

    Route::post('/employer/site/store/{id}', [EmployerController::class, 'storeSite'])->name('employer.storesite');

    Route::post('/employer/site/update/{id}', [EmployerController::class, 'updateSite'])->name('employer.updatesite');

    Route::post('/employer/site/delete/{id}', [EmployerController::class, 'deleteSite'])->name('employer.deletesite');

    Route::get('/employer/profileDetails', [EmployerController::class, 'companyDetails'])->name('employer.companydetails');

    Route::post('/employer/profileDetails/update/{id}', [EmployerController::class, 'updateCompanyDetails'])->name('employer.companydetails.update');

    Route::get('/contact-person-details', [ContactPersonController::class, 'show'])->name('employer.contactpersondetails');

    Route::post('/contact-person-details/{id}/update', [ContactPersonController::class, 'update'])->name('contact-person-details.update');

    Route::post('/contact-person/change-password/{id}', [ContactPersonController::class, 'changePassword'])->name('contact-person-change-password');

    Route::get('/internship-postings', [PostingController::class, 'index'])->name('employer.postedinternships');

    Route::get('/internship-postings/create', [PostingController::class, 'create'])->name('employer.createinternship');

    Route::get('/internship-postings/{id}', [PostingController::class, 'show'])->name('employer.viewinternship');

    Route::post('/internship-postings/add', [PostingController::class, 'store'])->name('employer.storeinternship');

    Route::get('/internship-postings/{id}/edit', [PostingController::class, 'edit'])->name('employer.editinternship');

    Route::post('/internship-postings/{id}/update', [PostingController::class, 'update'])->name('employer.updateinternship');
    
    Route::post('/internship-postings/{id}/delete', [PostingController::class, 'delete'])->name('employer.deleteinternship');
    
});


Route::group(['middleware' => ['auth:student,employer']], function () {
    Route::get('/messages/{id}', [MessageController::class, 'showChatBox'])
    ->name('messages.show');

    Route::post('/messages/send', [MessageController::class, 'sendMessage'])
    ->name('messages.send');

    Route::get('/receivedMessages/list', [MessageController::class, 'getMessages'])
    ->name('receivedMessages.list');

});