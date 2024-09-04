<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referee extends Model
{
    use HasFactory;

    protected $fillable = [
        'studentID',
        'refereeName',
        'refereePosition',
        'refereeCompany',
        'refereeEmail',
        'refereePhone'
    ];
    
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
