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
        Schema::create('internship_applications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('internshipID');
            $table->unsignedBigInteger('studentID');
            $table->unsignedBigInteger('employerID')->nullable();
            $table->foreign('internshipID')->references('id')->on('internships');
            $table->foreign('studentID')->references('id')->on('students');
            $table->foreign('employerID')->references('id')->on('employers');
            $table->string('applicationStatus')->default('Reviewing');
            $table->string('coverLetter');
            $table->string('ownResume')->nullable();
            $table->string('transcript');
            $table->string('SAL');
            $table->string('availability');
            $table->string('expectedStartDate');
            $table->string('expectedEndDate');
            $table->string('expectedAllowance');
            $table->string('offerLetter')->nullable();
            $table->string('actualAllowance')->nullable();
            $table->string('reasonRejected')->nullable();
            $table->tinyInteger('technicalRating')->nullable();
            $table->tinyInteger('softRating')->nullable();
            $table->tinyInteger('performanceRating')->nullable();
            $table->tinyInteger('overallRating')->nullable();
            $table->string('interviewComment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internship_applications');
    }
};
