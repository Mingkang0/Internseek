<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site', function (Blueprint $table) {
            $table->id();
            $table->string('siteName');
            $table->string('siteAddress1');
            $table->string('siteAddress2');
            $table->string('siteCity');
            $table->string('siteState');
            $table->string('sitePostcode');
            $table->string('siteCountry');
            $table->string('sitePhone');
            $table->string('siteEmail');
            $table->string('siteFax');
            $table->string('siteWebsite');
            $table->timestamps();
            $table->foreignId('branch_id')->constrained('branch')->onDelete('cascade');
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
