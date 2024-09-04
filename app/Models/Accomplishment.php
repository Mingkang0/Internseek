<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accomplishment extends Model
{
    use HasFactory;

    protected $fillable = [
        'studentID',
        'accomplishmentName',
        'accomplishmentDescription',
        'accomplishmentYear'
    ];
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
