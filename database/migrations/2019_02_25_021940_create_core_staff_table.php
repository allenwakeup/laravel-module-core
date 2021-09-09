<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoreStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('core_staff', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('pid')->nullable(false)->default(0)->comment('上级');
            $table->unsignedInteger('user_id')->nullable()->default(0)->comment('关联用户');
            $table->unsignedInteger('admin_user_id')->nullable()->default(0)->comment('关联管理用户');
            $table->unsignedInteger('department_id')->nullable()->default(0)->comment('用户所在部门，默认部门id 0');
            $table->string('departments', 255)->default('')->comment('部门层级');
            $table->string('code', 50)->nullable()->comment('员工号');
            $table->string('name', 10)->comment('姓名');
            $table->string('gender', 10)->comment('性别 0 未知');
            $table->string('phone', 20)->nullable()->comment('移动电话');
            $table->string('email', 50)->nullable()->comment('电子邮件');
            $table->string('hireday', 20)->nullable()->comment('雇用日期');
            $table->string('birthday', 20)->nullable()->comment('生日');
            $table->string('workday', 20)->nullable()->comment('开始工作日');
            $table->string('title')->nullable()->comment('岗位名称');
            $table->string('rank')->nullable()->comment('级别名称');
            $table->string('path', 255)->default('')->comment('路径');
            $table->string('path_text', 255)->default('')->comment('路径名称');
            $table->unsignedInteger('level')->default(0)->comment('分级');
            $table->unsignedInteger('type')->default(0)->comment('类型');
            $table->string('category', 50)->default('')->comment('类别');
            $table->unsignedInteger('order')->default(0)->comment('排序');
            $table->tinyInteger('status')->default(1);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('core_staff');
    }
}
