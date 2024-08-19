<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        // Register your commands here
        \App\Console\Commands\UpdateInternshipStatuses::class,
    ];

    protected function schedule(Schedule $schedule)
    {
        // Schedule the command to run daily
        $schedule->command('internships:update-statuses')->daily();
    }
}
