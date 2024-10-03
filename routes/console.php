<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\DB;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::command('internships:update-statuses')
    ->daily()
    ->appendOutputTo(storage_path('logs/internship-statuses.log'));


Schedule::call(function () {
    // Clear expired password reset tokens
    DB::table('internships')
        ->where('postingStatus','Published')
        ->where('endPostingDate', '<', now())
        ->update(['postingStatus' => 'Expired']);
})->daily();

