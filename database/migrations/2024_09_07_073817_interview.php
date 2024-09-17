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
        Schema::create('interviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('applicationID');
            $table->foreign('applicationID')->references('id')->on('internship_applications');
            $table->string('interviewDate');
            $table->string('interviewStartTime');
            $table->string('interviewEndTime');
            $table->string('interviewLocation')->nullable();
            $table->string('interviewMethod');
            $table->string('interviewLink')->nullable();
            $table->enum('interviewStatus', ['Available', 'Not Available'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interviews');
    }
};
