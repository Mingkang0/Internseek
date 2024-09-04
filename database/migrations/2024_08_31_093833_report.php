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
        Schema::create('report', function (Blueprint $table) {
            $table->id();
            $table->string('problemDesc');
            $table->timestamps();
            $table->foreignId('studentID')->constrained('students')->onDelete('cascade');
            $table->foreignId('internshipID')->constrained('internships')->onDelete('cascade');
            $table->enum('reportStatus',['Reviewing', 'Solving', 'Resolved']);
            $table->string('comment')->nullable();
            $table->string('reasonArchived')->nullable();
            $table->string('actionTaken')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report');
    }
};
