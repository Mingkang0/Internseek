<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class Student extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    
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
    'passportNo',
    'linkedin_id',
    'linkedin_token',
    'linkedin_public_url',
    ];
    
    protected $hidden = ['password', 'remember_token', 'reset_password_token'];

    public function sentMessages()
    {
        return $this->morphMany(Message::class, 'sender');
    }

    public function receivedMessages()
    {
        return $this->morphMany(Message::class, 'receiver');
    }

    public function skills()
    {
        return $this->hasMany(Skill::class, 'studentID');
    }

    public function languages()
    {
        return $this->hasMany(Language::class, 'studentID');
    }

    public function accomplishments()
    {
        return $this->hasMany(Accomplishment::class, 'studentID');
    }

    public function addresses()
    {
        return $this->hasMany(Address::class, 'studentID');
    }

    public function educations()
    {
        return $this->hasMany(Education::class, 'studentID');
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class, 'studentID');
    }

    public function referees(){
        return $this->hasMany(Referee::class, 'studentID');
    }

    public function report(){
        return $this->hasMany(Report::class, 'studentID');
    }

    public function bookmarks(){
        return $this->hasMany(Bookmark::class, 'studentID');
    }

    public function clicks(){
        return $this->hasMany(Click::class, 'studentID');
    }

    public function internshipApplications()
    {
        return $this->hasMany(InternshipApplication::class, 'studentID');
    }   

    public function getRole()
    {
        return 'student';
    }

    
}