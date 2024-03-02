<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Core\Model\Admin;

use Illuminate\Support\Arr;

class DataRoute extends Model
{
    protected $guarded = [];

    /**
     * 搜索字段
     *
     * @var array
     */
    public static $searchField = [
        'name' => [
            'searchType'    => 'like'
        ],
        'short' =>
            [
                'searchType'    => 'like'
            ],

        'from_' =>
            [
                'searchType'    => 'like'
            ],
        'table_from' =>
            [
                'searchType'    => 'like'
            ],

        'table_to' =>
            [
                'searchType'    => 'like'
            ],

        'to_' =>
            [
                'searchType'    => 'like'
            ],

    ];

    public function getTitleAttribute ()
    {
        return "定义从{$this->from}到{$this->to}的数据路径";
    }

    public function getMenuAttribute ()
    {
        return "{$this->from}与{$this->to}";
    }

    public function getOutputAttribute ($value)
    {
        return 'sync_' . $value;
    }

    public function getOutputOriginAttribute ()
    {
        return Arr::get ($this->attributes, 'output');
    }

    public function dataMaps ()
    {
        return $this->hasMany('Goodcatch\Modules\Core\Model\Admin\DataMap');
    }

    public function connection ()
    {
        return $this->belongsTo ('Goodcatch\Modules\Core\Model\Admin\Connection');
    }

    public function getFromAttribute() {
        return $this->attributes['from_'];
    }

    public function setFromAttribute($val) {
        $this->attributes['from_'] = $val;
    }
    public function getToAttribute() {
        return $this->attributes['to_'];
    }

    public function setToAttribute($val) {
        $this->attributes['to_'] = $val;
    }
}
