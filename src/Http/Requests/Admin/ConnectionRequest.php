<?php

namespace Goodcatch\Modules\Core\Http\Requests\Admin;

use Goodcatch\Modules\Core\Http\Requests\BaseRequest as FormRequest;
use Goodcatch\Modules\Core\Model\Admin\Connection;
use Goodcatch\Modules\Core\Model\Admin\Datasource;
use Goodcatch\Modules\Core\Rules\Database;
use Illuminate\Validation\Rule;

class ConnectionRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules ()
    {
        $rules = [
            'datasource_id' => ['required', Rule::exists(Datasource::class, 'id')],
            'name' => [
                'required',
                'max:50',
                Rule::unique(Connection::class, 'name')->ignore($this->id),
                new Database ()
            ],
            'description' => 'max:255',
            'conn_type' => 'max:50',
            'tns' => 'max:255',
            'driver' => 'required|max:50',
            'host' => 'max:255',
            'port' => ['numeric', function ($port) {return intval($port) >= 1000 && intval($port) <= 65535;}],
            'database' => 'required|max:50',
            'username' => 'max:50',
            'password' => 'max:50',
            'url' => 'max:255',
            'service_name' => 'max:100',
            'unix_socket' => 'max:255',
            'charset' => 'max:50',
            'collation' => 'max:50',
            'prefix' => 'max:20',
            'prefix_schema' => 'max:20',
            'strict' => [
                'required',
                Rule::in ([
                    Connection::STRICT_TRUE,
                    Connection::STRICT_FALSE

                ]),
            ],
            'engine' => 'max:20',
            'schema' => 'max:20',
            'edition' => 'max:50',
            'server_version' => 'max:50',
            'options' => 'json',
            'sslmode' => 'max:20',
            'type' => [
                Rule::in ([
                    Connection::TYPE_DST,
                    Connection::TYPE_SRC
                ]),
            ],
            'group' => 'required|max:50',
            'order' => 'required|numeric',
            'status' => [
                'required',
                Rule::in ([
                    Connection::STATUS_DISABLE,
                    Connection::STATUS_ENABLE,
                ]),
            ],
        ];
        switch ($this->method()) {

            case 'GET':
                $rules = [
                    'name'=>'max:50',
                    'conn_type' => 'max:50',
                    'group' => 'required|max:50',
                    'host' => 'max:255',
                    'description' => 'max:255'
                ];
                break;
        }
        return $rules;
    }
}
