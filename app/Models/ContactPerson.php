<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;


class ContactPerson extends Authenticatable
{
    use HasFactory;
    protected $table = 'contact_persons';
    protected $fillable = [
        'firstName', 
        'lastName',
        'phoneNum',
        'email', 
        'password'
    ];

    protected $hidden = ['password', 'remember_token'];
    protected $with = ['employer'];

    public function employer()
    {
        return $this->belongsTo(Employer::class, 'employerID');
    }

}
