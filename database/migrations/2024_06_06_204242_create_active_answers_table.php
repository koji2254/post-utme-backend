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
        Schema::create('active_answers', function (Blueprint $table) {
            $table->id();
            $table->string('exams_id');
            $table->string('user_id');
            $table->string('correct_answer');
            $table->string('selected_answer');
            $table->boolean('answer_status')->default(false);
            $table->string('question_id');
            $table->string('subject');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('active_answers');
    }
};
