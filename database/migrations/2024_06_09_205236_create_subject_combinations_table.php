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
        Schema::create('subject_combinations', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('subject_one')->default('');
            $table->string('subject_two')->default('');
            $table->string('subject_three')->default('');
            $table->string('subject_four')->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subject_combinations');
    }
};
