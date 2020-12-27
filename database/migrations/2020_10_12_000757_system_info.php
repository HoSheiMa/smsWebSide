<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SystemInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('SystemInfo');
        Schema::create('SystemInfo', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('key');
            $table->longText('value')->default('{}');
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

        Schema::dropIfExists('SystemInfo');
    }
}
