<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Company extends Model
{
    use HasFactory;
    use Notifiable;

    protected $table = 'companies';

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


    // Override to use `companyEmail` for notifications
    public function routeNotificationForMail()
    {
       return $this->companyEmail;
    }

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

    public function employers()
    {
        return $this->hasMany(Employer::class, 'companyID');
    }

    public function branches()
    {
        return $this->hasMany(Branch::class, 'employerID');
    }

}
