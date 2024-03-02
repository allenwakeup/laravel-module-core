<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Core\Model\Admin;

class Connection extends Model
{
    const STATUS_ENABLE = 1;
    const STATUS_DISABLE = 0;

    const STRICT_TRUE = 1;
    const STRICT_FALSE = 0;

    const TYPE_SRC = 'SRC'; // 来源数据库
    const TYPE_DST = 'DST'; // 目标数据库

    const TYPE = [
        self::TYPE_SRC => '来源',
        self::TYPE_DST => '目标'
    ];

    protected $guarded = [];

    protected $casts = [
        'options' => 'array'
    ];

    /**
     * 搜索字段
     *
     * @var array
     */
    public static $searchField = [


        'name' => [
            'searchType'    => 'like'
        ],
        'description' =>
            [
                'searchType'    => 'like'
            ],
        'group_' =>
            [
                'searchType'    => 'like'
            ],
        'host' =>
            [
                'searchType'    => 'like'
            ],
        'conn_type' =>[
            'searchType'    => '='
        ],
    ];

    public function datasource ()
    {
        return $this->belongsTo ('Goodcatch\Modules\Core\Model\Admin\Datasource');
    }

    public function data_routes ()
    {
        return $this->hasMany ('Goodcatch\Modules\Core\Model\Admin\DataRoute');
    }

    public function getConnectionNameAttribute ()
    {
        return $this->type . '_' . $this->name;
    }

    public function scopeOfEnabled ($query)
    {
        return $query->where ('status', self::STATUS_ENABLE);
    }

    public function getDatabaseAttribute() {
        return $this->attributes['database_'];
    }

    public function setDatabaseAttribute($val) {
        $this->attributes['database_'] = $val;
    }


    public function getPasswordAttribute() {
        return $this->attributes['password_'];
    }

    public function setPasswordAttribute($val) {
        $this->attributes['password_'] = $val;
    }

    public function getSchemaAttribute() {
        return $this->attributes['schema_'];
    }

    public function setSchemaAttribute($val) {
        $this->attributes['schema_'] = $val;
    }
    public function getGroupAttribute() {
        return $this->attributes['group_'];
    }

    public function setGroupAttribute($val) {
        $this->attributes['group_'] = $val;
    }

    public function getOptionsAttribute ($value)
    {
        $value = json_decode ($value, true);
        if (! isset ($value))
        {
            $value = [];
        }
        return $value;
    }

}
