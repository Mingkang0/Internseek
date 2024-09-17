<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InternshipApplication extends Model
{
    use HasFactory;

    protected $table = 'internship_applications';

    protected $fillable = [
        'internshipID',
        'studentID',
        'contactPersonID',
        'applicationStatus',
        'coverLetter',
        'ownResume',
        'transcript',
        'SAL',
        'availability',
        'expectedStartDate',
        'expectedEndDate',
        'expectedAllowance',
        'offerLetter',
        'actualAllowance',
        'reasonRejected'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'studentID');
    }

    public function internship()
    {
        return $this->belongsTo(Internship::class, 'internshipID');
    }

    public function interview()
    {
        return $this->hasOne(Interview::class, 'applicationID');
    }

    public function acceptedOffer()
    {
        return $this->hasOne(AcceptedOffer::class, 'applicationID');
    }
}
