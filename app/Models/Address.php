<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'address1', 'address2', 'type', 'city', 'state', 'postcode', 'studentID'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'studentID');
    }
}
