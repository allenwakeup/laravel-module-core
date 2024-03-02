<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Core\Model\Admin;

use Illuminate\Support\Arr;

class Schedule extends Model
{
    const STATUS_ENABLE = 1;
    const STATUS_DISABLE = 0;

    const ONCE_ENABLE = 1;
    const ONCE_DISABLE = 0;

    const TYPE_COMMAND = 1;
    const TYPE_EXEC = 2;
    const TYPE_JOB = 3;

    const TYPE = [
        self::TYPE_COMMAND => 'Command',
        self::TYPE_EXEC => 'Exec',
        self::TYPE_JOB => 'Job'
    ];

    const OVER_LAPPING_ENABLE = 1;
    const OVER_LAPPING_DISABLE = 0;

    const ONE_SERVER_ENABLE = 1;
    const ONE_SERVER_DISABLE = 0;

    const BACKGROUND_ENABLE = 1;
    const BACKGROUND_DISABLE = 0;

    const MAINTENANCE_ENABLE = 1;
    const MAINTENANCE_DISABLE = 0;

    protected $casts = [
        'payload' => 'array'
    ];

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
        'description' =>
        [
            'searchType'    => 'like'
        ],
        'group' =>[
            'searchType'    => 'like'
        ],

    ];


    public function getPayloadAttribute ($value)
    {
        $value = json_decode ($value, true);
        if (is_null ($value) || is_string($value))
        {
            $value = [];
        }
        if (! Arr::has ($value, 'job.config'))
        {
            Arr::set ($value, 'job.config', [
                'deleteWhenMissingModels' => false,
                'queue' => 'default',
                'connection' => 'redis',
                'timeout' => 120,
                'tries' => 3,
                'retry_until' => 5 // retry job in seconds
            ]);
        }

        if (! Arr::has ($value, 'job.config.scheduleLogId') || strcmp(Arr::get ($this->attributes, 'id'), Arr::get ($value, 'job.config.scheduleLogId') !== 0))
        {
            Arr::set ($value, 'job.config.scheduleLogId', Arr::get ($this->attributes, 'id', 0));
        }
        if (! Arr::has ($value, 'job.config.scheduleLogName') || strcmp(Arr::get ($this->attributes, 'name'), Arr::get ($value, 'job.config.scheduleLogName') !== 0)) {
            Arr::set($value, 'job.config.scheduleLogName', Arr::get($this->attributes, 'name', ''));
        }
        return $value;
    }

    public function scopeOfEnabled ($query) {
        return $query->where ('status', self::STATUS_ENABLE);
    }
    public function scopeOfJob ($query) {
        return $query->where ('schedule_type', self::TYPE_JOB);
    }

    public function scopeOfOrdered ($query) {
        return $query->orderBy ('order_', 'asc');
    }

    public function getGroupAttribute() {
        return $this->attributes['group_'];
    }

    public function setGroupAttribute($val) {
        $this->attributes['group_'] = $val;
    }

    public function logs ()
    {
        return $this->hasMany ('Goodcatch\Modules\Core\Model\Admin\ScheduleLog', 'schedule_id', 'id');
    }
}
