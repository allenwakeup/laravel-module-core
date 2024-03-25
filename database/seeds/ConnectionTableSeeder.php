<?php

namespace Goodcatch\Modules\Core\Database\Seeders;

use Illuminate\Database\Seeder;

class ConnectionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('core_connections')->delete();

        \DB::table('core_connections')->insert(array (
            0 =>
                array (
                    'id' => 1,
                    'datasource_id' => 3,
                    'name' => 'sqlserver_db_in',
                    'description' => '',
                    'conn_type' => '',
                    'tns' => '',
                    'driver' => 'sqlsrv',
                    'host' => '',
                    'port' => 1433,
                    'database_' => '',
                    'username' => '',
                    'password_' => '',
                    'url' => '',
                    'service_name' => '',
                    'unix_socket' => '',
                    'charset' => 'utf8',
                    'collation' => '',
                    'prefix' => '',
                    'prefix_schema' => '',
                    'strict' => 0,
                    'engine' => '',
                    'schema_' => '',
                    'edition' => '',
                    'server_version' => '',
                    'sslmode' => '',
                    'options' => '',
                    'type' => 'SRC',
                    'group_' => 'mssql',
                    'order_' => 0,
                    'status' => 1,
                    'created_at' => '2020-06-16 16:03:26',
                    'updated_at' => '2020-06-16 16:03:26',
                ),
            1 =>
                array (
                    'id' => 2,
                    'datasource_id' => 1,
                    'name' => 'mysql_in',
                    'description' => '',
                    'conn_type' => '',
                    'tns' => '',
                    'driver' => 'mysql',
                    'host' => 'mysql',
                    'port' => 3306,
                    'database_' => '',
                    'username' => '',
                    'password_' => '',
                    'url' => '',
                    'service_name' => '',
                    'unix_socket' => '',
                    'charset' => 'utf8mb4',
                    'collation' => 'utf8mb4_unicode_ci',
                    'prefix' => '',
                    'prefix_schema' => '',
                    'strict' => 0,
                    'engine' => '',
                    'schema_' => '',
                    'edition' => '',
                    'server_version' => '',
                    'sslmode' => '',
                    'options' => '',
                    'type' => 'SRC',
                    'group_' => 'docker',
                    'order_' => 0,
                    'status' => 1,
                    'created_at' => '2020-06-16 16:43:13',
                    'updated_at' => '2020-06-16 16:43:13',
                ),
            2 =>
                array (
                    'id' => 3,
                    'datasource_id' => 1,
                    'name' => 'mysql_out',
                    'description' => '',
                    'conn_type' => '',
                    'tns' => '',
                    'driver' => 'mysql',
                    'host' => 'mysql',
                    'port' => 3306,
                    'database_' => '',
                    'username' => '',
                    'password_' => '',
                    'url' => '',
                    'service_name' => '',
                    'unix_socket' => '',
                    'charset' => 'utf8mb4',
                    'collation' => 'utf8mb4_unicode_ci',
                    'prefix' => '',
                    'prefix_schema' => '',
                    'strict' => 0,
                    'engine' => '',
                    'schema_' => '',
                    'edition' => '',
                    'server_version' => '',
                    'sslmode' => '',
                    'options' => '',
                    'type' => 'DST',
                    'group_' => 'docker',
                    'order_' => 0,
                    'status' => 1,
                    'created_at' => '2020-06-16 16:43:13',
                    'updated_at' => '2020-06-16 16:43:13',
                ),
        ));
    }
}
