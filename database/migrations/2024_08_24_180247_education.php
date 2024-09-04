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
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('studentID');
            $table->foreign('studentID')
                  ->references('id')->on('students')
                  ->onDelete('cascade');
            $table->string('schoolName');
            $table->string('educationLevel');
            $table->string('programName');
            $table->string('studyField');
            $table->string('CGPA');
            $table->string('startDate');
            $table->string('endDate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('educations');
    }
};
