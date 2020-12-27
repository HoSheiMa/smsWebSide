<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Codes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('Codes');
        Schema::create('Codes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('pageId')->nullable();
            $table->string('Code')->nullable();
            $table->string('number')->nullable();
            $table->timestamps();
        });;
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Codes');
    }
}
