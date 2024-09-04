<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $table = 'educations';

    protected $fillable = [
        'studentID',
        'schoolName',
        'educationLevel',
        'studyField',
        'programName',
        'CGPA',
        'startDate',
        'endDate'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
