<?php

namespace Goodcatch\Modules\Core\Database\Seeders;

use Illuminate\Database\Seeder;

class DatasourcesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('core_datasources')->delete();

        \DB::table('core_datasources')->insert(array (
            0 =>
                array (
                    'id' => 1,
                    'code' => 'mysql',
                    'name' => 'Mysql 5.7.23',
                    'description' => 'Mysql 5.7.23',
                    'requires' => 'driver:mysql,host:127.0.0.1,port:3306,database,username,password',
                    'options' => 'charset:utf8mb4,collation:utf8mb4_unicode_ci,prefix',
                    'order_' => 1,
                    'status' => 1,
                    'created_at' => '2020-06-01 10:44:33',
                    'updated_at' => '2020-06-01 10:44:33',
                ),
            1 =>
                array (
                    'id' => 2,
                    'code' => 'pgsql',
                    'name' => 'PostgreSQL',
                    'description' => 'PostgreSQL',
                    'requires' => 'driver:pgsql,host:127.0.0.1,port:5432,database,username,password',
                    'options' => 'charset:utf8,prefix,schema:public,sslmode:prefer',
                    'order_' => 1,
                    'status' => 1,
                    'created_at' => '2020-06-01 10:44:33',
                    'updated_at' => '2020-06-01 10:44:33',
                ),
            2 =>
                array (
                    'id' => 3,
                    'code' => 'sqlsrv',
                    'name' => 'Microsoft SQLServer',
                    'description' => 'Microsoft SQLServer',
                    'requires' => 'driver:sqlsrv,host:localhost,port:1433,database,username,password',
                    'options' => 'charset:utf8,prefix',
                    'order_' => 1,
                    'status' => 1,
                    'created_at' => '2020-06-01 10:44:33',
                    'updated_at' => '2020-06-01 10:44:33',
                ),
            3 =>
                array (
                    'id' => 4,
                    'code' => 'sqlite',
                    'name' => 'Sqlite',
                    'description' => 'Sqlite',
                    'requires' => 'driver:sqlite,database:~/sqlite.db',
                    'options' => 'prefix',
                    'order_' => 1,
                    'status' => 1,
                    'created_at' => '2020-06-01 10:44:33',
                    'updated_at' => '2020-06-01 10:44:33',
                ),
        ));
    }
}
