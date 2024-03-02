<?php

namespace Goodcatch\Modules\Core\Http\Resources\Admin\AttachmentResource;

use Illuminate\Http\Resources\Json\JsonResource;

class AttachmentResource extends JsonResource
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
            'attachable_type'           => $this->attachable_type,
            'attachable_id'             => $this->attachable_id,
            'name'                      => $this->name,
            'size'                      => $this->size,
            'ext'                       => $this->ext,
            'ext_name'                  => $this->ext_name,
            'path'                      => $this->path,
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
