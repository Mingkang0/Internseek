<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $table='report';

    protected $fillable = [
        'studentID',
        'internshipID',
        'problemDesc',
        'reportStatus',
        'comment',
        'reasonArchived',
        'actionTaken',
    ];

    // Report.php
    public function internship()
    {
        return $this->belongsTo(Internship::class, 'internshipID');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'studentID');
    }

}