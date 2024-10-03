<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Internship;
use App\Models\Bookmark;
use App\Models\Click;
use App\Models\Employer;
use App\Models\Company;
use App\Models\Report;
use App\Models\Student;
use App\Models\InternshipApplication;


class DashboardController extends Controller
{
    public function indexEmployer()
    {
        $company = session('company');
        if(!$company) {
            return Inertia::render('Dashboard/Employer', [
               'company' => null,
               'internships' => [],
            ]);
        }

        $internships = Internship::where('companyID', $company->id)
            ->with('company')
            ->withCount('bookmarks', 'clicks','applications')
            ->with('createdBy', 'lastEditedBy')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

            $appliedTotalCount = 0;
            $interviewTotalCount = 0;
            $shortlistedOrApprovedTotalCount = 0;
            $rejectedTotalCount = 0;
            $acceptedTotalCount = 0;

            foreach ($internships as $internship) {
                $appliedCount = InternshipApplication::where('internshipID', $internship->id)
                            ->where('applicationStatus', 'Reviewing')
                            ->count();
            
                $interviewCount = InternshipApplication::where('internshipID', $internship->id)
                            ->where('applicationStatus', 'Interview')
                            ->count();
            
                // Shortlisted or Approved count
                $shortlistedOrApprovedCount = InternshipApplication::where('internshipID', $internship->id)
                                            ->where(function ($query) {
                                            $query->where('applicationStatus', 'Shortlisted')
                                             ->orWhere('applicationStatus', 'Approved');
                                            })
                                            ->count();
            
                $rejectedCount = InternshipApplication::where('internshipID', $internship->id)
                            ->where('applicationStatus', 'Rejected')
                            ->count();
            
                $acceptedCount = InternshipApplication::where('internshipID', $internship->id)
                            ->where('applicationStatus', 'Accepted')
                            ->count();

                            $appliedTotalCount += $appliedCount;
                            $interviewTotalCount += $interviewCount;
                            $shortlistedOrApprovedTotalCount += $shortlistedOrApprovedCount;
                            $rejectedTotalCount += $rejectedCount;
                            $acceptedTotalCount += $acceptedCount;

                            $internshipCounts[] = [
                                'internship_id' => $internship->id,
                                'applied_count' => $appliedCount,
                                'interview_count' => $interviewCount,
                                'shortlisted_or_approved_count' => $shortlistedOrApprovedCount,
                                'rejected_count' => $rejectedCount,
                                'accepted_count' => $acceptedCount,
                            ];
                        }

    
    
        return Inertia::render('Dashboard/Employer', [
            'internships' => $internships,
            'company' => $company,
            'appliedTotalCount' => $appliedTotalCount,
            'interviewTotalCount' => $interviewTotalCount,
            'shortlistedOrApprovedTotalCount' => $shortlistedOrApprovedTotalCount,
            'rejectedTotalCount' => $rejectedTotalCount,
            'acceptedTotalCount' => $acceptedTotalCount,
        ]);
    }


    public function indexAdmin(){

        $internshipCount = Internship::count();

        $companyCount = Company::where('registrationStatus', 'Approved')->count();

        $studentCount = Student::count();

        $company = Company::orderBy('created_at', 'desc')->limit(10)->get();

        $report = Report::with('internship.company')
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();
       
        //Internship Report

        return Inertia::render('Dashboard/Admin', [
            'internshipCount' => $internshipCount,
            'companyCount' => $companyCount,
            'studentCount' => $studentCount,
            'companies' => $company,
            'reports' => $report,
        ]);
    }
}
