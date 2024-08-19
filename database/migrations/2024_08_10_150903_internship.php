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
        Schema::create('internships', function (Blueprint $table) {
            $table->id();
            $table->string('internshipTitle');
            $table->text('internshipDescription');
            $table->text('internshipRequirement');
            $table->text('internshipResponsibility');
            $table->integer('internshipDuration');
            $table->integer('internshipAllowance');
            $table->date('startPostingDate');
            $table->date('endPostingDate');
            $table->integer('workingHour');
            $table->enum ('postingStatus', ['Archived', 'Published', 'Unpublished', 'Expired']);
            $table->enum ('workingMethod', ['Remote', 'Onsite', 'OnOffice' ,'Hybrid']);
            $table->enum ('studyScope', ['Software Engineering', 'Computer System & Networking', 'Cybersecurity', 'Graphic Design & Multimedia', 'Artificial Intelligence', 'Data Engineering']);
            $table->unsignedInteger('employerID');
            $table->timestamps();

            $table->foreign('employerID')->references('id')->on('employers');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void 
    {
        Schema::dropIfExists('internships');
    }
};