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
        Schema::create('custom_exams', function (Blueprint $table) {
            $table->id();
            $table->string('exams_id');
            $table->string('user_id');
            $table->string('subject_one')->default('');
            $table->string('subject_two')->default('');
            $table->string('subject_three')->default('');
            $table->string('subject_four')->default('');
            $table->integer('qty_one')->default(0);
            $table->integer('qty_two')->default(0);
            $table->integer('qty_three')->default(0);
            $table->integer('qty_four')->default(0);
            $table->integer('allocated_time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_exams');
    }
};
