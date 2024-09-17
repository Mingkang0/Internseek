<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Internship;
use Carbon\Carbon;

class UpdateInternshipStatuses extends Command
{
    protected $signature = 'internships:update-statuses';
    protected $description = 'Update the status of internships based on their posting dates';

    public function handle()
    {
        try {
            $now = Carbon::now('Asia/Kuala_Lumpur');
    
            // Update statuses
            Internship::where('endPostingDate', '<', $now)
                ->update(['postingStatus' => 'Expired']);
    
            Internship::where('startPostingDate', '<=', $now)
                ->where('endPostingDate', '>=', $now)
                ->update(['postingStatus' => 'Published']);
    
            Internship::where('startPostingDate', '>', $now)
                ->update(['postingStatus' => 'Unpublished']);
    
            $this->info('Internship statuses updated successfully.');
        } catch (\Exception $e) {
            $this->error('Error updating internship statuses: ' . $e->getMessage());

        }
    }
}