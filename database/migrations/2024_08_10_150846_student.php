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
            $table->string('phoneNum');
            $table->string('ICNumber')->nullable();
            $table->enum('gender', ['Male', 'Female'])->nullable();
            $table->date('dateOfBirth')->nullable();
            $table->string('nationality')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('profilePicture')->nullable();
            $table->string('reset_password_token')->nullable();
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
