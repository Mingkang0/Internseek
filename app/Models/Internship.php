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
    ];
    
    // Set to true if using timestamps
    public $timestamps = true;
    
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

}
