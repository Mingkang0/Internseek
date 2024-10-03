<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'branchName',
        'branchAddress1',
        'branchAddress2',
        'branchCity',
        'branchState',
        'branchCountry',
        'branchPhoneNum',
        'branchPostcode',
        'branchEmail',
        'companyID',
    ];

    protected $table='branch';

    public function employer()
    {
        return $this->belongsTo(Employer::class, 'employerID');
    }

    public function site()
    {
        return $this->hasMany(Site::class, 'branchID');
    }
}
