<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcceptedOffer extends Model
{
    use HasFactory;

    protected $table = 'accepted_offers';

    protected $fillable = [
        'applicationID',
        'startTime',
        'endTime',
        'allowance',
        'supervisorName',
        'supervisorEmail',
        'supervisorPhone',
        'supervisorPosition',
        'supervisorDepartment',
        'workingDays',
        'startDate',
        'endDate',
    ];

    
    public function application()
    {
        return $this->belongsTo(InternshipApplication::class, 'applicationID');
    }
}
