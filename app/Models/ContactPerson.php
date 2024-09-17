<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class ContactPerson extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    protected $table = 'contact_persons';
    protected $fillable = [
        'firstName', 
        'lastName',
        'phoneNum',
        'email', 
        'password',
        'department',
        'position',
        'employerID'
    ];



    protected $hidden = ['password', 'remember_token', 'reset_password_token'];
    protected $with = ['employer'];

    public function employer()
    {
        return $this->belongsTo(Employer::class, 'employerID');
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
        return $this->hasMany(Message::class, 'contactPersonID');
    }

    public function getRole()
    {
        return 'employer';
    }
}
