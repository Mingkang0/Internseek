<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'studentID',
        'companyName',
        'jobTitle',
        'startDate',
        'endDate',
        'jobDescription',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'studentID');
    }
}
