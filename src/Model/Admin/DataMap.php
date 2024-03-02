<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Core\Model\Admin;

class DataMap extends Model
{
    const STATUS_ENABLE = 1;
    const STATUS_DISABLE = 0;

    const RELATIONSHIPS = [
        'morphToMany' => '多对多（多态）',
        'morphTo' => '一对多（多态）',
        'morphOne' => '一对一 (多态)',
        'morphMany' => '一对多（多态）',
        'hasOneThrough' => '远程一对一',
        'hasOne' => '一对一',
        'hasManyThrough' => '远程一对多',
        'hasMany' => '一对多',
        'belongsToMany' => '多对多',
        'belongsTo' => '一对多 (反向)'
    ];

    protected $guarded = [];

    /**
     * 搜索字段
     *
     * @var array
     */
    public static $searchField = [

        'left_table' => [
            'searchType'    => 'like'
        ],
        'right_table' =>
            [
                'searchType'    => 'like'
            ],

    ];

    public function scopeOfEnabled ($query)
    {
        return $query->where ('status', self::STATUS_ENABLE);
    }

    public function getTitleAttribute ()
    {
        return "为{$this->left}分配{$this->right}";
    }

    public function dataRoute ()
    {
        return $this->belongsTo('Goodcatch\Modules\Core\Model\Admin\DataRoute');
    }

    public function getTableAttribute() {
        return $this->attributes['table_'];
    }

    public function setTableAttribute($val) {
        $this->attributes['table_'] = $val;
    }

}
