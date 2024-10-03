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
            $table->unsignedBigInteger('companyID');
            $table->unsignedBigInteger('createdBy');
            $table->unsignedBigInteger('lastEditedBy');
            $table->unsignedBigInteger('branchID')->nullable();
            $table->unsignedBigInteger('siteID')->nullable();
            $table->foreign('branchID')->references('id')->on('branch');
            $table->foreign('siteID')->references('id')->on('site');
            $table->timestamps();
            $table->foreign('companyID')->references('id')->on('companies');
            $table->foreign('createdBy')->references('id')->on('employers');
            $table->foreign('lastEditedBy')->references('id')->on('employers');
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