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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->longText('question_value');
            $table->string('question_id');
            $table->string('subject_id');
            $table->string('subject');
            $table->string('family_id')->default('');
            $table->string('question_type')->default('');
            $table->string('question_status')->default('');
            $table->longText('question_options')->default('');
            $table->string('question_img_url')->default('');
            $table->boolean('question_jointed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
