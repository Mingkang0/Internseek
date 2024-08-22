<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Internship;
use App\Models\Bookmark;
use App\Models\Click;
use App\Models\Employer;
use App\Models\ContactPerson;


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
            ->withCount('bookmarks', 'clicks')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('Dashboard/Employer', [
            'internships' => $internships,
            'employer' => $employer,
        ]);
    }
}
