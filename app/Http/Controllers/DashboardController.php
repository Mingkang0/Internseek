<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Internship;
use App\Models\Bookmark;
use App\Models\Click;
use App\Models\Employer;
use App\Models\ContactPerson;
use App\Models\Report;
use App\Models\Student;


class DashboardController extends Controller
{
    public function indexEmployer()
    {
        $employer = session('employer');
        if(!$employer) {
            return Inertia::render('Dashboard/Employer', [
               'employer' => null,
               'internships' => [],
            ]);
        }

        $internships = Internship::where('employerID', $employer->id)
            ->with('employer')
            ->withCount('bookmarks', 'clicks')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('Dashboard/Employer', [
            'internships' => $internships,
            'employer' => $employer,
        ]);
    }


    public function indexAdmin(){

        $internshipCount = Internship::count();

        $employerCount = Employer::count();

        $studentCount = Student::count();

        $employer = Employer::orderBy('created_at', 'desc')->limit(5)->get();

        $report = Report::with('internship.employer')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();

       
        //Internship Report

        return Inertia::render('Dashboard/Admin', [
            'internshipCount' => $internshipCount,
            'employerCount' => $employerCount,
            'studentCount' => $studentCount,
            'employers' => $employer,
            'reports' => $report,
        ]);
    }
}
