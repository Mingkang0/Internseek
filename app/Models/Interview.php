<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;

    protected $table = 'interviews';

    protected $fillable = [
        'applicationID',
        'interviewDate',
        'interviewStartTime',
        'interviewEndTime',
        'interviewLocation',
        'interviewMethod',
        'interviewLink',
        'interviewStatus',
    ];

    public function application()
    {
        return $this->belongsTo(InternshipApplication::class, 'applicationID');
    }
}
