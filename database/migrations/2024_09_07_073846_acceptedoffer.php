<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('accepted_offers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('applicationID');
            $table->foreign('applicationID')->references('id')->on('internship_applications');
            $table->string('startTime')->nullable();
            $table->string('endTime')->nullable();
            $table->string('allowance')->nullable();
            $table->string('supervisorName')->nullable();
            $table->string('supervisorEmail')->nullable();
            $table->string('supervisorPhone')->nullable();
            $table->string('supervisorPosition')->nullable();
            $table->string('supervisorDepartment')->nullable();
            $table->string('workingDays')->nullable();
            $table->string('startDate')->nullable();
            $table->string('endDate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accepted_offers');
    }
};
