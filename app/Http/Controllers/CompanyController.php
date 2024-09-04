<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employer;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
        // Fetch internships with their associated employers
        $employers = Employer::where('registrationStatus', 'Approved')->get();

        // Return the data to the Inertia view
        return Inertia::render('Companies/list', [
            'employers' => $employers
        ]);
    }

    public function show($id)
    {
        // Fetch the internship with the associated employer
        $employer = Employer::find($id);

        // Return the data to the Inertia view
        return Inertia::render('Companies/details', [
            'employer' => $employer
        ]);
    }

    

}
