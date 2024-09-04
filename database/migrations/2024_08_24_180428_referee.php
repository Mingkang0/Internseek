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
        Schema::create('referees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('studentID');
            $table->foreign('studentID')
                  ->references('id')->on('students')
                  ->onDelete('cascade');
            $table->string('refereeName');
            $table->string('refereePosition');
            $table->string('refereeCompany');
            $table->string('refereeEmail');
            $table->string('refereePhone');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referees');
    }
};
