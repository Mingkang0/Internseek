<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    use HasFactory;

    protected $table='site';

    protected $fillable = [
        'siteName',
        'siteAddress1',
        'siteAddress2',
        'siteCity',
        'siteState',
        'siteCountry',
        'sitePhone',
        'sitePostcode',
        'siteEmail',
        'branchID',
    ];
    public function branch()
    {
        return $this->hasMany(Branch::class);
    }
}
