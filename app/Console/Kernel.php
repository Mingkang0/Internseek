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
        $schedule->command('internships:update-statuses')
                 ->timezone('Asia/Kuala_Lumpur')
                 ->dailyAt('23:59'); // Run daily at 23:59 Malaysia time
    }
}
