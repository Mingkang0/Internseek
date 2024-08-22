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
        Schema::create('contact_persons', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('lastName');
            $table->string('phoneNum');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('position')->nullable();
            $table->string('department')->nullable();
            // First, make the column nullable
            $table->unsignedBigInteger('employerID')->nullable();

            // Then, add the foreign key constraint
            $table->foreign('employerID')
                  ->references('id')->on('employers')
                  ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_persons');
    }
};
