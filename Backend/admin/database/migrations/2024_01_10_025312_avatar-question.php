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
        // Schema::create("avatars", function (Blueprint $table){
        //     $table->uuid("id")->primary();
        //     $table->string("name");
        //     $table->string("secure_url");
        //     $table->integer("price");
        //     $table->timestamps();
        // });

        Schema::create("questions", function (Blueprint $table){
            $table->uuid("id")->primary();
            $table->string("image_question");
            $table->string("A");
            $table->string("B");
            $table->string("C");
            $table->string("D");
            $table->string("answer");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::dropIfExists('avatars');
        Schema::dropIfExists('questions');
    }
};
