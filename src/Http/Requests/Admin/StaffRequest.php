<?php

namespace Goodcatch\Modules\Core\Http\Requests\Admin;

use Goodcatch\Modules\Core\Http\Requests\BaseRequest as FormRequest;
use Goodcatch\Modules\Core\Model\Admin\Staff;
use Illuminate\Validation\Rule;

class StaffRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules ()
    {
        $rules = [
            'pid' => 'integer|exclude_if:pid,0|exists:core_staff,id|different:id',
            'department_id' => 'integer|exclude_if:pid,0|exists:core_departments,id|different:id',
            'code' => ['max:50', $this->uniqueOrExists (Staff::class, 'code') . ':core_staff'],
            'name' => 'required|max:20',
            'phone' => [
                'required',
                'regex:/^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4(?:[14]0\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/',
                $this->uniqueOrExists (Staff::class, 'phone') . ':core_staff'
            ],
            'email' => [
                'email:rfc,dns',
                $this->uniqueOrExists (Staff::class, 'email') . ':core_staff'
            ],
            'gender' => [
                'required',
                Rule::in([Staff::GENDER_UNKNOWN, Staff::GENDER_MALE, Staff::GENDER_FEMALE, Staff::GENDER_EXT])
            ],
            'hireday' => 'date',
            'birthday' => 'date',
            'workday' => 'date',
            'title' => 'max:20',
            'rank' => 'max:20',
            'type' => 'integer',
            'order' => 'integer|min:0',
            'status' => [
                'required',
                Rule::in ([Staff::STATUS_DISABLE, Staff::STATUS_ENABLE])
            ]
        ];
        switch ($this->method()) {
            case 'GET':
                $rules = [
                    'pid' => 'integer|exclude_if:pid,0|exists:core_staff,id'
                ];
                break;
        }
        return $rules;

    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages ()
    {
        return [
            'pid.different'=>'直接上级不能是自己',
            'name.required' => '名称不能为空',
            'name.max' => '名称长度不能大于50'
        ];
    }
}
