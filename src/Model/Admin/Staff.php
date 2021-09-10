<?php


namespace Goodcatch\Modules\Core\Model\Admin;


class Staff extends Model
{
    const STATUS_ENABLE = 1;
    const STATUS_DISABLE = 0;

    const GENDER_UNKNOWN = 0;
    const GENDER_MALE = 1;
    const GENDER_FEMALE = 2;
    const GENDER_EXT = 3;

    protected $guarded = [];


    public function getDepartmentsAttribute($val){
        return empty($this->attributes['departments']) ? [] : explode(',', $val);
    }

    public function getPathTextAttribute($val){
        return empty($this->attributes['path_text']) ? [] : explode(',', $val);
    }

    public function parent()
    {
        return $this->belongsTo('Goodcatch\Modules\Core\Model\Admin\Staff', 'pid');
    }

    public function department()
    {
        return $this->belongsTo('Goodcatch\Modules\Core\Model\Admin\Department', 'department_id');
    }

    public function children()
    {
        return $this->hasMany('Goodcatch\Modules\Core\Model\Admin\Staff', 'pid');
    }

    /**
     * 下属
     * @return mixed relationship
     */
    public function subordinate()
    {
        return $this->hasMany('Goodcatch\Modules\Core\Model\Admin\Staff', 'pid');
    }

}