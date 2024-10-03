<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\InternshipApplication;
use App\Models\Internship;
use App\Models\Company;

class HomeController extends Controller
{
    public function index(){
        $companies = Company::all();
    
        $companiesWithApplicationCount = $companies->map(function ($company) {
            $applicationCount = InternshipApplication::join('internships', 'internship_applications.internshipID', '=', 'internships.id')
                ->join('companies', 'internships.companyID', '=', 'companies.id')
                ->where('companies.id', $company->id)
                ->count();
            $company->applicationCount = $applicationCount;
            return $company;
        })->sortByDesc('applicationCount')->take(3)->values()->all();

        return Inertia::render('Home', [
            'companies' => $companiesWithApplicationCount,
        ]);
    }
}
