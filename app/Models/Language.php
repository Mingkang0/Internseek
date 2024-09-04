<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;

    protected $fillable = [
        'studentID',
        'languageName',
        'proficiencyLevel',
    ];

    public function student()
    {
        
        return $this->belongsTo(Student::class);
    }
}
