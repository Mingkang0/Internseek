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
        Schema::create('branch', function (Blueprint $table) {
            $table->id();
            $table->string('branchName');
            $table->string('branchAddress1');
            $table->string('branchAddress2');
            $table->string('branchCity');
            $table->string('branchState');
            $table->string('branchPostcode');
            $table->string('branchCountry');
            $table->string('branchPhoneNum');
            $table->string('branchEmail');
            $table->foreignId('employerID')->constrained('employers')->onDelete('cascade'); // FK
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
