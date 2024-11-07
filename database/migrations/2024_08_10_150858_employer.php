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
        Schema::create('employers', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('lastName');
            $table->string('phoneNum');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('position')->nullable();
            $table->string('department')->nullable();
            $table->string('status')->nullable();
            $table->string('userType')->nullable();
            // First, make the column nullable
            $table->unsignedBigInteger('companyID')->nullable();
            $table->string('remember_token')->nullable();
            $table->string('reset_password_token')->nullable();

            // Then, add the foreign key constraint
            $table->foreign('companyID')
                  ->references('id')->on('companies')
                  ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employers');
    }
};
