<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Core\Repositories\Admin;


use Goodcatch\Modules\Core\Model\Admin\Schedule;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class ScheduleRepository extends BaseRepository
{
    const JOBS_TYPES = [
        'Goodcatch\Modules\Core\Jobs\ExchangeData' => '数据交换',
        'Goodcatch\Modules\Core\Jobs\ExchangePeriodData' => '时间段数据交换',
        'Goodcatch\Modules\Core\Jobs\DoubleCheckData' => '数据校验'

    ];

    public static function getList ($perPage, $condition = [], $keyword = null)
    {
        $data = Schedule::query ()
            ->with (['logs' => function ($query) {
                $query
                    ->whereDate ('created_at', Carbon::today ())
                    ->orderBy ('created_at', 'desc');
            }])
            ->where (function ($query) use ($condition, $keyword) {
                self::buildQuery ($query, $condition);
                if (! empty ($keyword))
                {
                    $query->orWhere('name', 'like', "%$keyword%");
                }
            })
            ->orderBy ('order_', 'desc')
            ->paginate ($perPage);

        $data->transform (function ($item) {
            if (Arr::has (self::JOBS_TYPES, $item->input))
            {
                $item->inputText = 'Queue ' . Arr::get (self::JOBS_TYPES, $item->input, '--');
            }
            $item->schedule_type_text = Arr::get (Schedule::TYPE, $item->schedule_type, '--');
            return $item;
        });

        return $data;
    }

    public static function quick ($condition, $keyword) {
        return Schedule::query ()
            ->select('group_')
            ->distinct()
            ->where (function ($query) use ($condition, $keyword) {
                self::buildQuery ($query, $condition);
                if (! empty ($keyword))
                {
                    $query->orWhere('name', 'like', "%$keyword%");
                }
            })
            ->get()
            ->filter(function (Schedule $schedule) {
                return ! empty($schedule->group);
            })
            ->map(function (Schedule $schedule) {
                return [
                    'label' => isset($schedule->group) ? $schedule->group : '--',
                    'params' => [
                        'group_' => $schedule->group
                    ]
                ];
            })
            ->values();
    }

    public static function add ($data)
    {
        self::transform (self::TRANSFORM_TYPE_JSON, $data, 'payload');
        return Schedule::query ()->create ($data);
    }

    public static function update ($id, $data)
    {
        self::transform (self::TRANSFORM_TYPE_JSON, $data, 'payload');
        return Schedule::find ($id)->update ($data);
    }

    public static function find ($id)
    {
        return Schedule::query ()->find ($id);
    }

    public static function delete ($id)
    {
        return Schedule::destroy ($id);
    }

    public static function groupNames()
    {
        return Schedule::query()->select('group_')->distinct()->pluck('group_')->toArray();
    }

}
