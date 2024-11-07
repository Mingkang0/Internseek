<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = 'messages'; 

    public function employer()
    {
        return $this->belongsTo(Employer::class, 'employerID');
    }


    public function sender(): MorphTo
    {
        return $this->morphTo();
    }

    // Define the polymorphic relationship for the receiver
    public function receiver(): MorphTo
    {
        return $this->morphTo();
    }

}
