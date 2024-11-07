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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('companyName');
            $table->string('companyEmail')->unique();
            $table->string('businessRegNum');
            $table->date('businessRegDate');
            $table->string('documentType');
            $table->string('documentName');
            $table->string('companyPhone');
            $table->string('companyAddress1');
            $table->string('companyAddress2');
            $table->string('companyPostalCode');
            $table->string('companyCity');
            $table->string('companyState');
            $table->string('companyCountry');
            $table->string('companySector');
            $table->string('companySize');
            $table->string('companyWebsite');
            $table->string('inquiryComment')->nullable();
            $table->string('companyDescription')->nullable();
            $table->enum('companyType', ['SME','MNC','International', 'Government Agency', 'NGO', 'Government Company']);
            $table->string('vision')->nullable();
            $table->string('mission')->nullable();
            $table->enum('companyRating', ['Highly Recommended', 'Recommended', 'Average', 'Shut Down'])->nullable();
            $table->enum('registrationStatus', ['Pending','Inquiry', 'Approved']);
            $table->string('companyLogo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
