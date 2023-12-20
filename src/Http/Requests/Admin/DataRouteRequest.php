<?php

namespace Goodcatch\Modules\Core\Http\Requests\Admin;

use Goodcatch\Modules\Core\Http\Requests\BaseRequest as FormRequest;
use Goodcatch\Modules\Core\Model\Admin\DataRoute;
use Illuminate\Validation\Rule;

class DataRouteRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules ()
    {

        $rules = [
            'alias' => 'max:50',
            'short' => 'max:20',
            'description' => 'max:255',
            'from' => 'max:50',
            'table_from' => 'max:100',
            'to' => 'max:50',
            'table_to' => 'max:100',
            'output' => 'max:100',
            'connection_id' => 'exists:core_connections,id'
        ];
        switch ($this->method()) {

            case 'POST':
                $rules['name'] = ['required', 'max:50', Rule::unique(DataRoute::class, 'name')];
                break;
            case 'PUT':
                $rules['name'] = ['required', 'max:50', Rule::unique(DataRoute::class, 'name')->ignore($this->id)];
                break;
            case 'GET':
                $rules = [
                    'name'=>'max:50',
                    'short' => 'max:20',
                ];
                break;
        }
        return $rules;
    }
}
