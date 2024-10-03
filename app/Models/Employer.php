<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class Employer extends Authenticatable
{
    use HasFactory;
    use Notifiable;

    protected $table = 'employers';
    protected $fillable = [
        'firstName', 
        'lastName',
        'phoneNum',
        'email', 
        'password',
        'department',
        'position',
        'companyID',
        'status',
        'userType',
    ];



    protected $hidden = ['password', 'remember_token', 'reset_password_token'];
    protected $with = ['company'];

    public function company()
    {
        return $this->belongsTo(Company::class, 'companyID');
    }

    public function internshipCreated()
    {
        return $this->hasMany(Internship::class, 'createdBy');
    }

    public function internshipEdited()
    {
        return $this->hasMany(Internship::class, 'lastEditedBy');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'employerID');
    }

    public function applicationUpdated()
    {
        return $this->hasMany(InternshipApplication::class, 'employerID');
    }

    public function acceptedOfferDetails()
    {
        return $this->hasManyThrough(AcceptedOffer::class, InternshipApplication::class, 'employerID', 'applicationID');
    }

    public function getRole()
    {
        return 'employer';
    }
}
