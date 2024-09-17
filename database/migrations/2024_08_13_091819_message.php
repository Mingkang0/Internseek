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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->morphs('sender'); // Creates sender_id and sender_type columns
            $table->morphs('receiver'); // Creates receiver_id and receiver_type columns
            $table->unsignedBigInteger('contactPersonID')->nullable();
            $table->foreign('contactPersonID')->references('id')->on('contact_persons');
            $table->boolean('isEmployerRead')->default(false);
            $table->boolean('isStudentRead')->default(false);
            $table->text('messageDetails');
            $table->string('messageImage')->nullable();
            $table->string('messageDocument')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
