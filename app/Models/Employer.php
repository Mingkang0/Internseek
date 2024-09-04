<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    use HasFactory;

    protected $fillable = [
        'companyName',
        'companyEmail',
        'companyPhone',
        'documentType',
        'documentName',
        'companyAddress1',
        'companyAddress2',
        'companyPostalCode',
        'companyCity',
        'companyState',
        'companyCountry',
        'companySector',
        'companySize',
        'companyWebsite',
        'companyType',
        'businessRegNum',
        'businessRegDate',
        'registrationStatus',
        'companyLogo',
        'mission',
        'vision',
        'companyDescription',
    ];

    protected $hidden = ['password', 'remember_token'];

    public function internships()
    {
        return $this->hasMany(Internship::class, 'employerID');
    }

    public function messages()
    {
        return $this->morphMany(Message::class, 'sender');
    }

    public function receivedMessages()
    {
        return $this->morphMany(Message::class, 'receiver');
    }

    public function contactPersons()
    {
        return $this->hasMany(ContactPerson::class, 'employerID');
    }

    public function branches()
    {
        return $this->hasMany(Branch::class, 'employerID');
    }
}
