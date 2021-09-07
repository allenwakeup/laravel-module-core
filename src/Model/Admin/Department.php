<?php


namespace Goodcatch\Modules\Core\Model\Admin;


class Department extends Model
{
    const STATUS_ENABLE = 1;
    const STATUS_DISABLE = 0;

    protected $guarded = [];


    public function parent()
    {
        return $this->belongsTo('Goodcatch\Modules\Core\Model\Admin\Department', 'pid');
    }

    public function refParent()
    {
        return $this->belongsTo('Goodcatch\Modules\Core\Model\Admin\Department', 'rid');
    }

    public function children()
    {
        return $this->hasMany('Goodcatch\Modules\Core\Model\Admin\Department', 'pid');
    }

}