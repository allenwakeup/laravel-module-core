<?php

namespace Goodcatch\Modules\Core\Http\Resources\Admin\ConnectionResource;

use Goodcatch\Modules\Core\Http\Resources\Admin\DatasourceResource\DatasourceResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ConnectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        return [
            'id'                        => $this->id,
            'datasource_id'             => $this->datasource_id,
            'datasource'                => $this->whenLoaded('datasource', function () {
                return new DatasourceResource($this->datasource);
            }),
            'name'                      => $this->name,
            'description'               => $this->description,
            'conn_type'                 => $this->conn_type,
            'tns'                       => $this->tns,
            'driver'                    => $this->driver,
            'host'                      => $this->host,
            'port'                      => $this->port,
            'database'                  => $this->database,
            'username'                  => $this->username,
            'password'                  => $this->password,
            'url'                       => $this->url,
            'service_name'              => $this->service_name,
            'unix_socket'               => $this->unix_socket,
            'charset'                   => $this->charset,
            'collation'                 => $this->collation,
            'prefix'                    => $this->prefix,
            'prefix_schema'             => $this->prefix_schema,
            'strict'                    => $this->strict,
            'engine'                    => $this->engine,
            'schema'                    => $this->schema,
            'edition'                   => $this->edition,
            'server_version'            => $this->server_version,
            'sslmode'                   => $this->sslmode,
            'options'                   => $this->options,
            'type'                      => $this->type,
            'group'                     => $this->group,
            'order_'                    => $this->order_,
            'status'                    => $this->status,
            'created_at'                => $this->when(isset($this->created_at), function () {
                return $this->created_at->toDateTimeString();
            }),
            'updated_at'                => $this->when(isset($this->updated_at), function () {
                return $this->updated_at->toDateTimeString();
            })
        ];
    }
}
