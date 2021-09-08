<?php

namespace Goodcatch\Modules\Core\Http\Requests\Admin;

use Goodcatch\Modules\Core\Http\Requests\BaseRequest as FormRequest;
use Goodcatch\Modules\Core\Model\Admin\Department;
use Illuminate\Validation\Rule;

class DepartmentRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules ()
    {
        /*
         * 'pid', 'rid', 'code',
        'name', 'alias', 'description',
        'type', 'category', 'order', 'status'
         */

        return [
            'pid' => 'integer|exclude_if:pid,0|exists:core_departments,id',
            'code' => ['max:50', $this->uniqueOrExists (Department::class, 'code') . ':core_departments'],
            'name' => ['required', 'max:50', $this->uniqueOrExists (Department::class, 'name') . ':core_departments'],
            'alias' => 'max:50',
            'description' => 'max:255',
            'type' => 'integer',
            'order' => 'integer',
            'status' => [
                'required',
                Rule::in ([Department::STATUS_DISABLE, Department::STATUS_ENABLE])
            ]
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages ()
    {
        return [
            'name.required' => '名称不能为空',
            'name.max' => '名称长度不能大于50',
        ];
    }
}
