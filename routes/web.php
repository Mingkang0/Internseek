<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostingController;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route:: get('/login', [LoginController::class, 'showLogin'])->name('login');

Route::post('/login/{userRole}', [LoginController::class, 'login'])->name('login.post');

Route::post('/logout', [LoginController::class, 'logout'])->name('logout');


Route::get('/internships', [InternshipController::class, 'index'])->name('internships.index');

Route::get('/internships/{id}', [InternshipController::class, 'show'])->name('internships.show');

Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');

Route::get('/companies/{id}', [CompanyController::class, 'show'])->name('companies.show');

Route::group(['middleware' => 'auth:student'], function () {
    Route::post('/internships/{id}/bookmark', [InternshipController::class, 'bookmark'])->name('internships.bookmark');
});

Route::group(['middleware' => 'auth:admin'], function () {
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Dashboard/Admin');
    })->name('admin.dashboard');
});

Route::group(['middleware' => ['auth:employer']], function () {
    Route::get('/employer/dashboard', function () {
        return Inertia::render('Dashboard/Employer');
    })->name('employer.dashboard');

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