<?php

namespace Goodcatch\Modules\Core\Http\Resources\Admin\DatasourceResource;

use Illuminate\Http\Resources\Json\JsonResource;

class DatasourceResource extends JsonResource
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
            'code'                      => $this->code,
            'name'                      => $this->name,
            'description'               => $this->description,
            'requires'                  => $this->requires,
            'options'                   => $this->options,
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
