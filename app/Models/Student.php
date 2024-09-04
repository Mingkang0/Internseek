<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Student extends Authenticatable
{
    use HasFactory;
    
    protected $fillable = 
    [
    'firstName', 
    'lastName',
    'email', 
    'phoneNum',
    'password',
    'ICNumber',
    'gender',
    'nationality',
    'dateOfBirth',
    'profilePicture',
    ];
    
    protected $hidden = ['password', 'remember_token'];

    public function sentMessages()
    {
        return $this->morphMany(Message::class, 'sender');
    }

    public function receivedMessages()
    {
        return $this->morphMany(Message::class, 'receiver');
    }

    public function Skills()
    {
        return $this->hasMany(Skill::class, 'studentID');
    }

    public function Languages()
    {
        return $this->hasMany(Language::class, 'studentID');
    }

    public function Accomplishments()
    {
        return $this->hasMany(Accomplishment::class, 'studentID');
    }

    public function Addresses()
    {
        return $this->hasMany(Address::class, 'studentID');
    }

    public function Educations()
    {
        return $this->hasMany(Education::class, 'studentID');
    }

    public function Experiences()
    {
        return $this->hasMany(Experience::class, 'studentID');
    }

    public function Referees(){
        return $this->hasMany(Referee::class, 'studentID');
    }

    public function Report(){
        return $this->hasMany(Report::class, 'studentID');
    }

}