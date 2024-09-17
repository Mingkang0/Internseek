<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Internship extends Model
{
    use HasFactory;

    protected $fillable = [
        'internshipTitle',
        'internshipDescription',
        'internshipRequirement',
        'internshipResponsibility',
        'internshipDuration',
        'internshipAllowance',
        'startPostingDate',
        'endPostingDate',
        'workingHour',
        'postingStatus',
        'workingMethod',
        'studyScope',
        'employerID',
        'createdBy',
        'lastEditedBy',
        'branchID',
        'siteID',
    ];
    
    // Set to true if using timestamps
    public $timestamps = true;

    public function applications()
    {
        return $this->hasMany(InternshipApplication::class, 'internshipID');
    }
    
    // Define the relationship with Employer
    public function employer()
    {
        return $this->belongsTo(Employer::class, 'employerID');
    }

    public function clicks()
    {
        return $this->hasMany(Click::class, 'internshipID');
    }

    public function bookmarks()
    {
        return $this->hasMany(Bookmark::class, 'internshipID');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'internshipID');
    }

    public function createdBy()
    {
        return $this->belongsTo(ContactPerson::class, 'createdBy');
    }

    public function lastEditedBy()
    {
        return $this->belongsTo(ContactPerson::class, 'lastEditedBy');
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branchID');
    }

    public function site()
    {
        return $this->belongsTo(Site::class, 'siteID');
    }
    

}
