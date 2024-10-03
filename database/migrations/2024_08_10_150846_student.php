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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('lastName');
            $table->string('phoneNum')->nullable();
            $table->string('ICNumber')->nullable();
            $table->enum('gender', ['Male', 'Female'])->nullable();
            $table->date('dateOfBirth')->nullable();
            $table->string('nationality')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('profilePicture', 500)->nullable(); // Increase size to 500 or more
            $table->string('remember_token')->nullable();
            $table->string('reset_password_token')->nullable();
            $table->string('passportNo')->nullable();
            $table->string('linkedin_id')->nullable(); // LinkedIn ID
            $table->string('linkedin_token', 500)->nullable(); // Increase size to 500 or more
            $table->string('linkedin_public_url')->nullable(); // Increase size to 500 or more
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
