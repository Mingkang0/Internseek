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
use App\Http\Controllers\StudentController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\InternshipApplicationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\HomeController;
use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Artisan;

use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/linkstorage', function () {
    try {
        Artisan::call('storage:link');
        return 'Storage link created successfully!';
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});


Route::get('/register/student', [RegistrationController::class, 'createStudent'])->name('register.student');

Route::post('/create/student', [RegistrationController::class, 'storeStudent'])->name('register.student.post');

Route::get('/register/employer', [RegistrationController::class, 'createEmployer'])->name('register.employer');

Route::post('/create/employer', [RegistrationController::class, 'storeEmployer'])->name('register.employer.post');


Route::get('/login/student', [LoginController::class, 'studentLogin'])->name('login.student');

Route::get('/login/employer', [LoginController::class, 'employerLogin'])->name('login.employer');

Route::get('/login/admin', [LoginController::class, 'adminLogin'])->name('login.admin');

Route::post('/login/student/post', [LoginController::class, 'login'])->name('login.student.post');

Route::post('/login/employer/post', [LoginController::class, 'login'])->name('login.employer.post');

Route::post('/login/admin/post', [LoginController::class, 'login'])->name('login.admin.post');

Route::get('/auth/linkedin', [LoginController::class, 'redirectToLinkedIn'])->name('linkedin.login');

Route::get('linkedin/callback', [LoginController::class, 'handleLinkedInCallback']);

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/forgot-password/student', [ForgotPasswordController::class, 'showStudentForgotPassword'])->name('forgot-password.student');

Route::get('/forgot-password/employer', [ForgotPasswordController::class, 'showEmployerForgotPassword'])->name('forgot-password.employer');

Route::get('/forgot-password/admin', [ForgotPasswordController::class, 'showAdminForgotPassword'])->name('forgot-password.admin');

Route::post('/forgot-password/{role}', [ForgotPasswordController::class, 'forgotPassword'])->name('forgot-password');

Route::get('/reset-password/{token}/{role}', [ForgotPasswordController::class, 'showResetPassword'])->name('reset-password.show');

Route::post('/reset-password/{token}/{role}', [ForgotPasswordController::class, 'resetPassword'])->name('reset-password');

Route::get('/internships', [InternshipController::class, 'index'])->name('internships.index');

Route::get('/internships/{id}', [InternshipController::class, 'show'])->name('internships.show');

Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');

Route::get('/companies/{id}', [CompanyController::class, 'show'])->name('companies.show');

Route::middleware('IsStudent')->group(function () {
    Route::post('/internships/{id}/bookmark', [InternshipController::class, 'bookmark'])->name('internships.bookmark');

    Route::post('report-internship/{id}', [InternshipController::class, 'ReportInternship'])->name('internships.report');

    Route::get('/student/my-report', [InternshipController::class, 'ReportList'])->name('my-report');

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

    Route::get('/student/settings', [StudentController::class, 'settings'])->name('student.settings');

    Route::post('/student/change-password', [StudentController::class, 'changePassword'])->name('student.change-password');

    Route::get('/student/applyInternship/{id}', [InternshipApplicationController::class, 'applyInternship'])->name('student.applyinternship');

    Route::post('/student/storeInternshipApplication/{id}', [InternshipApplicationController::class, 'store'])->name('student.storeinternshipapplication');

    Route::get('/student/my-internships', [InternshipApplicationController::class, 'MyInternships'])->name('student.myinternships');

    Route::post('/student/update-interview-status/{id}', [InternshipApplicationController::class, 'updateInterviewStatus'])->name('student.updateinterviewstatus');

    Route::post('/internship-application/{id}/cancel', [InternshipApplicationController::class, 'cancelApplication'])->name('student.cancelapplication');

    Route::post('/student/update-offer-status/{id}', [InternshipApplicationController::class, 'updateOfferStatus'])->name('student.updateofferstatus');

    Route::get('/student/my-industrial-training/acceptedOffers', [InternshipApplicationController::class, 'acceptedOffers'])->name('student.acceptedoffers');

    Route::post('/cancel-accepted-offer/{id}', [InternshipApplicationController::class, 'cancelAcceptedOffer'])->name('student.cancelacceptedoffer');

    Route::get('/student/pre-internships', [InternshipApplicationController::class, 'preInternships'])->name('student.preinternships');

    Route::get('/student/process-internships', [InternshipApplicationController::class, 'processInternships'])->name('student.processinternships');

    Route::post('/internships/{id}/delete/bookmark', [InternshipController::class, 'deleteBookmark'])->name('internships.deletebookmark');

    Route::post('/student/notifications/markAsRead', [NotificationController::class, 'markAllAsRead'])->name('student.notifications.markAllAsRead');

    Route::get('/student/notifications', [NotificationController::class, 'index'])->name('student.notifications');

    Route::post('/student/delete-all-notifications', [NotificationController::class, 'deleteAllNotifications'])->name('student.notifications.deleteall');

    Route::post('/student/linkedin/store/{id}', [StudentController::class, 'storeLinkedIn'])->name('student.linkedin.store');

    Route::get('/student/messages/{id}', [MessageController::class, 'showChatBox'])
    ->name('messages.show');

    Route::post('/student/messages/markAsRead/{id}', [MessageController::class, 'markAsRead'])
    ->name('messages.markAsRead');

    Route::post('/student/messages/send', [MessageController::class, 'sendMessage'])
    ->name('messages.send');

    Route::get('/student/receivedMessages/list', [MessageController::class, 'getMessages'])
    ->name('receivedMessages.list');
});


Route::middleware('IsAdmin')->group(function () {

    Route::get('/admin/dashboard', [DashboardController::class, 'indexAdmin'])->name('admin.dashboard');

    Route::get('/admin/profile', [AdminController::class, 'showProfile'])->name('admin.profile');

    Route::post('/admin/profile/update/{id}', [AdminController::class, 'updateProfile'])->name('admin.profile.update');

    Route::post('/admin/change-password/{id}', [AdminController::class, 'changePassword'])->name('admin.change-password');

    Route::get('/admin/internships', [AdminController::class, 'internshipsList'])->name('admin.internships');

    Route::get('/admin/internships/{id}', [AdminController::class, 'internshipDetails'])->name('admin.internshipdetails');

    Route::get('/admin/internseekers', [AdminController::class, 'internseekerList'])->name('admin.internseekers');

    Route::get('/admin/internseekers/{id}', [AdminController::class, 'internseekerDetails'])->name('admin.internseekerdetails');
    
    Route::get('/admin/employers', [AdminController::class, 'companyList'])->name('admin.companies');

    Route::get('/admin/employers/{id}', [AdminController::class, 'companyDetails'])->name('admin.companydetails');

    Route::get('/admin/problems-reports', [AdminController::class, 'ProblemReportList'])->name('admin.problemreports');

    Route::get('/admin/problems-reports/{id}', [AdminController::class, 'ProblemReportDetails'])->name('admin.problemreportdetails');

    Route::get('/admin/employer-requests', [AdminController::class, 'CompanyRequestList'])->name('admin.employerrequests');

    Route::get('/admin/employer-requests/{id}', [AdminController::class, 'CompanyRequestDetails'])->name('admin.employerrequestdetails');

    Route::post('/update-registration-status/{id}', [AdminController::class, 'updateRegistrationStatus'])->name('admin.updateregistrationstatus');

    Route::post('/admin/problems-reports/update-status/{id}', [AdminController::class, 'updateReportStatus'])->name('admin.updatereportstatus');

    Route::post('/admin/update-companyRating/{id}', [AdminController::class, 'updateCompanyRating'])->name('admin.updatecompanyrating');
});

Route::middleware('IsEmployer')->group(function () {
    Route::get('/employer/dashboard', [DashboardController::class, 'indexEmployer'])->name('employer.dashboard');

    Route::get('/register/existing-company', [RegistrationController::class, 'addExistingCompany'])->name('register.existingcompany');

    Route::get('/search-existing-company', [RegistrationController::class, 'searchExistingCompany'])->name('register.searchexistingcompany');

    Route::get('/register/company', [RegistrationController::class, 'createCompany'])->name('register.company');

    Route::post('/employer/register', [RegistrationController::class, 'handleRegistration'])->name('register.handleRegistration');

    Route::get('/edit/registration-details', [RegistrationController::class, 'editRegistrationDetails'])->name('register.editregistrationdetails');

    Route::post('/update/registration-details/{id}', [RegistrationController::class, 'updateRegistrationDetails'])->name('register.updateregistationdetails');

    Route::post('/add-existing-company/{id}', [RegistrationController::class, 'addExistingCompanyToEmployer'])->name('register.addexistingcompany');

    Route::get('/employer/branch-details', [CompanyController::class, 'branchDetails'])->name('employer.branchdetails');

    Route::post('/employer/branch/store/{id}', [CompanyController::class, 'storeBranch'])->name('employer.storebranch');

    Route::post('/employer/branch/update/{id}', [CompanyController::class, 'updateBranch'])->name('employer.updatebranch');

    Route::post('/employer/branch/delete/{id}', [CompanyController::class, 'deleteBranch'])->name('employer.deletebranch');

    Route::post('/employer/site/store/{id}', [CompanyController::class, 'storeSite'])->name('employer.storesite');

    Route::post('/employer/site/update/{id}', [CompanyController::class, 'updateSite'])->name('employer.updatesite');

    Route::post('/employer/site/delete/{id}', [CompanyController::class, 'deleteSite'])->name('employer.deletesite');

    Route::get('/employer/profileDetails', [CompanyController::class, 'companyDetails'])->name('employer.companydetails');

    Route::post('/employer/profileDetails/update/{id}', [CompanyController::class, 'updateCompanyDetails'])->name('employer.companydetails.update');

    Route::get('/employer-details', [EmployerController::class, 'show'])->name('employer.employerdetails');

    Route::post('/employer-details/{id}/update', [EmployerController::class, 'update'])->name('employer-details.update');

    Route::post('/employer/change-password/{id}', [EmployerController::class, 'changePassword'])->name('employer-change-password');

    Route::get('/internship-postings', [PostingController::class, 'index'])->name('employer.postedinternships');

    Route::get('/internship-postings/create', [PostingController::class, 'create'])->name('employer.createinternship');

    Route::get('/internship-postings/{id}', [PostingController::class, 'show'])->name('employer.viewinternship');

    Route::post('/internship-postings/add', [PostingController::class, 'store'])->name('employer.storeinternship');

    Route::get('/internship-postings/{id}/edit', [PostingController::class, 'edit'])->name('employer.editinternship');

    Route::post('/internship-postings/{id}/update', [PostingController::class, 'update'])->name('employer.updateinternship');
    
    Route::post('/internship-postings/{id}/delete', [PostingController::class, 'delete'])->name('employer.deleteinternship');

    Route::get('/internship-applications/list', [InternshipApplicationController::class, 'ApplicantsList'])->name('employer.applicantslist');
    
    Route::get('/internship-applications/{id}/update-status', [InternshipApplicationController::class, 'showUpdateStatus'])->name('employer.showupdatestatus');

    Route::post('/internship-applications/{id}/update-application-status', [InternshipApplicationController::class, 'updateApplicationStatus'])->name('employer.updateapplicationstatus');

    Route::get('/interviews-applicants/list', [InternshipApplicationController::class, 'InterviewApplicantList'])->name('employer.interviewapplicantslist');

    Route::post('/interviews-applicants/{id}/update-interview-details', [InternshipApplicationController::class, 'updateInterviewDetails'])->name('employer.updateInterviewDetails');

    Route::get('/interviews-applicants/{id}/update-interview-result', [InternshipApplicationController::class, 'showUpdateInterviewResult'])->name('employer.showupdateinterviewresult');

    Route::post('/internship-applications/{id}/update-interview-result', [InternshipApplicationController::class, 'updateInterviewResult'])->name('employer.updateinterviewresult');

    Route::get('/internship-applications/accepted-applicants', [InternshipApplicationController::class, 'acceptedApplicants'])->name('employer.acceptedapplicants');

    Route::get('/accepted-offer/{id}/update-details', [InternshipApplicationController::class, 'showUpdateAcceptedOfferDetails'])->name('employer.showupdateacceptedofferdetails');

    Route::get('/internship-applications/rejected-applicants', [InternshipApplicationController::class, 'rejectedApplicants'])->name('employer.rejectedapplicants');

    Route::get('/internship-applications/shortlisted-approved-applicants', [InternshipApplicationController::class, 'approvedOrShortlistedApplicants'])->name('employer.shortlistedapprovedapplicants');

    Route::post('/internship-applications/{id}/{applicationID}/update-accepted-offer-details', [InternshipApplicationController::class, 'updateAcceptedOfferDetails'])->name('employer.updateofferdetails');

    Route::get('/internship-applcations/{id}/update-shortlisted-result', [InternshipApplicationController::class, 'showUpdateShortlistedResult'])->name('employer.showupdateshortlistedresult');

    Route::post('/internship-applications/{id}/update-shortlisted-results', [InternshipApplicationController::class, 'updateShortlistedResult'])->name('employer.updateshortlistedresult');

    Route::post('/employer/notifications/markAsRead', [NotificationController::class, 'markAllAsRead'])->name('employer.notifications.markAllAsRead');

    Route::get('/employer/notifications', [NotificationController::class, 'index'])->name('employer.notifications');

    Route::post('/employer/delete-all-notifications', [NotificationController::class, 'deleteAllNotifications'])->name('employer.notifications.deleteall');

    Route::get('/employer/my-report', [InternshipApplicationController::class, 'myReport'])->name('employer.myreport');

    Route::get('/employer/admin/userManagement', [CompanyController::class, 'userManagement'])->name('employer.usermanagement');

    Route::post('/employer/admin/update-status/{id}', [CompanyController::class, 'updateUserStatus'])->name('employer.updateuserstatus');


    Route::get('/employer/messages/{id}', [MessageController::class, 'showChatBox'])
    ->name('messages.show');

    Route::post('/employer/messages/markAsRead/{id}', [MessageController::class, 'markAsRead'])
    ->name('messages.markAsRead');

    Route::post('/employer/messages/send', [MessageController::class, 'sendMessage'])
    ->name('messages.send');

    Route::get('/employer/receivedMessages/list', [MessageController::class, 'getMessages'])
    ->name('receivedMessages.list');
});




