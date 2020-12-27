<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ShareTofriends extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('ShareTofriends');
        Schema::create('ShareTofriends', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('key');
            $table->string('email')->nullable();
            $table->string('timeZone')->nullable();
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

        Schema::dropIfExists('ShareTofriends');
    }
}
