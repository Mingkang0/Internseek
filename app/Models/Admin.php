<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class Admin extends Authenticatable
{
    use HasFactory;
    use Notifiable;

    protected $fillable = [
        'firstName',
        'lastName',
        'phoneNum',
        'ICNumber',
        'gender',
        'email', 
        'password', 
    ];

    protected $hidden = ['password', 'remember_token', 'reset_password_token'];

    public function getRole()
    {
        return 'admin';
    }
}
