<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Internship;

class Bookmark extends Model
{
    use HasFactory;

    protected $fillable = [
        'studentID',
        'internshipID',
    ];

    public function internship()
    {
        return $this->belongsTo(Internship::class);
    }   
}
