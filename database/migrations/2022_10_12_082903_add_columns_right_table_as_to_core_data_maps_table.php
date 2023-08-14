<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsRightTableAsToCoreDataMapsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('core_data_maps', function (Blueprint $table) {
            $table->string('right_table_as', 100)->after('right_table')->nullable()->comment('右表别名');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('core_data_maps', function (Blueprint $table) {
            $table->dropColumn('right_table_as');
        });
    }
}
