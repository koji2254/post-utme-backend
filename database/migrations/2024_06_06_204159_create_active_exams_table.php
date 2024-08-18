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
        Schema::create('active_exams', function (Blueprint $table) {
            $table->id();
            $table->string('exams_id');
            $table->string('exams_status');
            $table->string('user_id');
            $table->integer('score');
            $table->string('allocated_time');
            $table->string('number_questions');
            $table->json('questions_set_id');
            $table->string('exam_type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('active_exams');
    }
};
