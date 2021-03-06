<?php

namespace Goodcatch\Modules\Core\Jobs;

use Goodcatch\Modules\Core\Model\Admin\Connection;
use Goodcatch\Modules\Core\Model\Admin\Schedule;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Traits\ForwardsCalls;

class DoubleCheckData extends ExchangeData
{

    use ForwardsCalls, Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    const SQL                                   = 'sql';
    const BINDING                               = 'binding';
    const BINDING_NAME                          = 'name';
    const BINDING_FORMAT                        = 'format';
    const DOUBLE_CHECK                          = 'double_check';

    /**
     * array of columns to sort
     * Note that would mass up row number
     */
    const SORT                                  = 'sort';

    /**
     * no message to send just leave it empty
     */
    const SEND_MSG                              = 'send_msg';
    /**
     * no message to send just leave it empty
     */
    const SEND_MSG_EVEN_NO_DIFF                 = 'send_msg_even_no_diff';

    /**
    /**
     * fire other schedule if differences presents, depends on @see DOUBLE_CHECK
     */
    const TRIGGER_SCHEDULES                     = 'trigger_schedules';

    /**
     * options for @see SEND_MSG
     */
    const SEND_MSG_WHEN_DIFF_ONLY               = 'WHEN_DIFF_ONLY';
    const SEND_MSG_WHEN_DIFF_VALUES             = 'WHEN_DIFF_VALUES';

    /**
     * the way of message
     */
    const MSG_TYPE                              = 'msg_type';
    /**
     * options for @see MSG_TYPE
     */
    const MSG_TYPE_EMAIL                        = 'EMAIL';

    /**
     * array to send email
     */
    const MSG_TYPE_EMAIL_ADDRESS                = 'email_address';

    private $double_check;

    private $send_notification = false;

    private $send_msg_even_no_diff = false;

    /**
     * Create a new job instance.
     *
     * @param $payload array job data including job configuration
     */
    public function __construct ($payload)
    {
        parent::__construct ($payload);

        $this->double_check = Arr::get ($this->payload, self::DOUBLE_CHECK, []);

        $this->send_notification = ! empty ($this->double_check);

        $this->send_msg_even_no_diff = Arr::get ($this->double_check, self::SEND_MSG_EVEN_NO_DIFF, false);

    }

    public function handle ()
    {
        if ($this->send_notification)
        {
            Log::info ('????????????', [get_class ($this), Arr::get ($this->source, self::JOB_NAME, '????????????')]);

            if (! isset ($this->source) || ! isset ($this->target))
            {
                $this->jLog ("?????????????????????????????????????????????", true);

                Log::info ('required configurations for both source and target');

                return false;
            }

            // ?????????????????????????????????????????????
            $source = $this->makeQuery ($this->source);
            $target = $this->makeQuery ($this->target, Connection::TYPE_DST);
            if (! isset ($source) || ! isset ($target))
            {
                Log::info ('required connections for both source and target');

                $this->jLog ("?????????????????????????????????????????????????????????????????????", true);

                return false;
            }

            $source_data_coll = \collect ($this->loadBindingData ($source, $this->source));

            $source_data_coll_count = $source_data_coll->count ();

            $target_data_coll = \collect ($this->loadBindingData ($target, $this->target));

            $target_data_coll_count = $target_data_coll->count ();

            $max_count_of_data = max ($source_data_coll_count, $target_data_coll_count);
            $min_count_of_data = min ($source_data_coll_count, $target_data_coll_count);

            $diff_count = $max_count_of_data - min ($source_data_coll_count, $target_data_coll_count);

            $result = [
                'title' => $this->scheduleLogName,
                'created_at' => Carbon::now ()->toDateTimeString (),
                'count' => [
                    'source' => $source_data_coll_count,
                    'target' => $target_data_coll_count,
                    'diff' => $diff_count
                ]
            ];

            // ?????????????????????
            $send_msg_strategy = Arr::get ($this->double_check, self::SEND_MSG);

            // ??????????????????
            if (strcmp ($send_msg_strategy, self::SEND_MSG_WHEN_DIFF_ONLY) === 0)
            {
                if ($this->send_msg_even_no_diff || $diff_count > 0)
                {
                    Log::info ("???????????? {$diff_count}");

                    $this->jLog ("???????????? {$diff_count}");

                    $this->sendMsg ($result);

                    if ($diff_count > 0)
                    {
                        // ??????????????????
                        $this->trigger ();
                    }
                }
            }
            // ??????????????????
            else if (strcmp ($send_msg_strategy, self::SEND_MSG_WHEN_DIFF_VALUES) === 0 && $max_count_of_data > 0)
            {

                // ??????????????????????????????
                $source_data_coll = $this->sort ($source_data_coll);
                $target_data_coll = $this->sort ($target_data_coll);

                if ($max_count_of_data === $min_count_of_data)
                {
                    $diff_details = $source_data_coll
                        ->reduce (function ($arr_diff, $left) use ($target_data_coll) {
                            $right = \collect ($target_data_coll->get (sizeof($arr_diff)))->all ();
                            $diff = \collect ($left)
                                ->diffAssoc ($right);
                            $arr_diff [] = $diff->count () > 0 ?
                                $diff
                                    ->keys ()
                                    ->reduce (function ($arr, $reduce) use ($right) {
                                        $arr [$reduce] = '* ' . Arr::get ($arr, $reduce) . ' / ' . Arr::get ($right, $reduce);
                                        return $arr;
                                    }, \collect ($left)->all ())
                                : [];
                            return $arr_diff;
                        }, []);
                } else {
                    $to_sort_diffs = \collect ([
                        $source_data_coll_count => $source_data_coll,
                        $target_data_coll_count => $target_data_coll
                    ]);

                    $to_be_diff = $to_sort_diffs
                        ->sortKeys ()
                        ->first ();

                    $primary_keys = Arr::get ($this->double_check, self::PRIMARY_KEY, []);

                    $jump_position = 0;

                    $diff_details = $to_sort_diffs
                        ->sortKeysDesc ()
                        ->first ()
                        ->reduce (function ($arr_diff, $left) use ($to_be_diff, &$jump_position, $diff_count, $primary_keys) {
                            $right_coll = \collect ($to_be_diff->get (sizeof($arr_diff) - $jump_position));
                            $left_coll = \collect ($left);
                            $diff = $left_coll->diffAssoc ($right_coll);

                            $diff_size = $diff->count ();

                            $row_primary_keys_matched = true;
                            if (! empty ($primary_keys))
                            {
                                foreach ($primary_keys as $key)
                                {
                                    if ($left_coll->get ($key) !== $right_coll->get ($key))
                                    {
                                        $row_primary_keys_matched = ! $row_primary_keys_matched;
                                        break;
                                    }
                                }
                            }

                            if ($diff_count > 0 && $diff_size > 0 && ! $row_primary_keys_matched)
                            {
                                $jump_position = min ($jump_position + 1, $diff_count);
                            }

                            $arr_diff [] = $diff_size > 0 ?
                                $diff
                                    ->keys ()
                                    ->reduce (function ($arr, $reduce) use ($right_coll) {
                                        $arr [$reduce] = '* ' . Arr::get ($arr, $reduce) . ' / ' . $right_coll->get ($reduce);
                                        return $arr;
                                    }, $left_coll->all ())
                                : [];

                            return $arr_diff;
                        }, [])
                    ;
                }

                if (sizeof ($diff_details) > 0)
                {
                    $diff_details = \collect ($diff_details)
                        ->filter (function ($item) { return ! empty ($item);})
                        ->map (function ($item, $key) { return array_merge (['__row_num' => $key], $item); })
                        ->values ()
                        ->all ();
                }

                $diff_details_size = sizeof ($diff_details);

                if ($this->send_msg_even_no_diff || $diff_details_size > 0)
                {
                    $result ['details'] = $diff_details;

                    $this->sendMsg ($result);

                    if ($diff_details_size > 0)
                    {
                        // ??????????????????
                        $this->trigger ();
                    }
                }

                Log::info ("????????????????????? {$diff_details_size}");

                $this->jLog ("????????????????????? {$diff_details_size}");

            } else {

                Log::info ("????????????????????? {$send_msg_strategy}");

                $this->jLog ("????????????????????? {$send_msg_strategy}");

            }

        } else {

            Log::info ('?????????????????????');

            $this->jLog ('?????????????????????');
        }

        $this->writeLogs ();
    }

    /**
     * @param $inputOrOutput
     * @param string $directory
     * @return ConnectionInterface|null
     */
    protected function makeQuery ($inputOrOutput, $directory = Connection::TYPE_SRC)
    {

        $connection_name = $directory . '_' . Arr::get ($inputOrOutput, self::CONNECTION);
        if (! $this->checkConnection ($connection_name))
        {
            Log::warning ('no connection found for name ' . $connection_name);
            return null;
        }

        return DB::connection ($connection_name);
    }

    protected function loadBindingData (ConnectionInterface $connect, array $options)
    {
        return empty (Arr::get ($options, self::BINDING, []))
            ? $connect->select (Arr::get ($options, self::SQL))
            : $connect->select (
                Arr::get ($options, self::SQL),
                \collect (Arr::get ($options, self::BINDING))
                    ->reduce (function ($arr, $bind) {
                        if (is_array ($bind))
                        {
                            $name = Arr::get ($bind, self::BINDING_NAME);
                            $format = Arr::get ($bind, self::BINDING_FORMAT, null);
                            $arr [$name] = $this->transDT ($name, $format);
                        } else if (is_string($bind)) {
                            $arr [$bind] = $this->transDT ($bind);
                        }

                        return $arr;
                    }, []));
    }

    protected function sendMsg ($data)
    {

        switch (Arr::get ($this->double_check, self::MSG_TYPE, self::MSG_TYPE_EMAIL))
        {
            case self::MSG_TYPE_EMAIL :
                $this->sendEmail ($data);
                break;
        }
    }

    private function sendEmail (array $data)
    {
        $addrs = Arr::get ($this->double_check, self::MSG_TYPE_EMAIL_ADDRESS, []);
        if (! empty ($addrs))
        {
            $data ['run_at'] = Carbon::now ()->toDateTimeString ();
            Mail::to ($addrs)
                ->queue ((new \App\Modules\Core\Emails\DoubleCheck ($data))
                    ->onQueue ('emails')
                );
        }
    }

    private function sort (Collection $colls)
    {
        $sort = \collect (Arr::get ($this->double_check, self::SORT, []));
        if ($sort->count () > 0)
        {
            $colls = $colls->sort (function ($l, $r) use ($sort) {
                return strcmp (
                   implode ('-', $sort->reduce (function ($arr, $s) use ($l) { $arr [] = md5 (Arr::get (\collect ($l)->all (), $s, $s)); return $arr; }, [])),
                   implode ('-', $sort->reduce (function ($arr, $s) use ($r) { $arr [] = md5 (Arr::get (\collect ($r)->all (), $s, $s)); return $arr; }, []))
                );
            })->values ();
        }
        return $colls;
    }

    /**
     * ????????????
     */
    private function trigger ()
    {
        Log::info ('??????????????????');

        $this->jLog ('??????????????????');

        $schedule_ids = Arr::get ($this->double_check, self::TRIGGER_SCHEDULES, []);

        if (! empty ($schedule_ids) && sizeof ($schedule_ids) > 0)
        {
            $schedules = Schedule::query ()->find ($schedule_ids);

            if (isset ($schedules) && $schedules->count () > 0)
            {
                \collect ($schedule_ids)

                    ->reduce (function ($arr, $schedule_id) use ($schedules) {

                        $arr->add ($schedules->where ('id', $schedule_id)->first ());

                        return $arr;
                    }, \collect ())

                    ->filter (function ($item) {

                        if ($this->scheduleLogId === Arr::get ($item->payload, self::JOB . '.' . self::CONFIG . '.scheduleLogId'))
                        {
                            Log::info ("??????????????????");

                            $this->jLog ("??????????????????");

                            return false;
                        }

                        // ??????????????????
                        if ($item->status !== Schedule::STATUS_ENABLE)
                        {
                            Log::info ("???????????????????????? {$item->id} {$item->name}");

                            $this->jLog ("???????????????????????? {$item->id} {$item->name}");

                            return false;
                        }

                        // ????????????????????????
                        if (strcmp ($item->schedule_type, Schedule::TYPE_JOB) === 0)
                        {
                            $validate_schedule = Arr::get ($item->payload, self::DOUBLE_CHECK . '.' . self::TRIGGER_SCHEDULES, []);

                            $dead_circle = in_array ($this->scheduleLogId, $validate_schedule);

                            if ($dead_circle)
                            {
                                Log::info ("??????????????????????????? {$item->id} {$item->name}");

                                $this->jLog ("??????????????????????????? {$item->id} {$item->name}");
                            }

                            if (empty ($validate_schedule) || ! $dead_circle)
                            {
                                return true;
                            }

                        } else {

                            Log::info ("????????????????????? {$item->id} {$item->name}");

                            $this->jLog ("????????????????????? {$item->id} {$item->name}");
                        }
                        return false;

                    })->each (function ($item, $key) {

                        $job = $this->getJobInstance ($item->input, $item->payload);

                        if (isset ($job))
                        {
                            if (is_null ($item->queue))
                            {

                                dispatch ($job);
                            } else {

                                dispatch ($job->onQueue ($item->queue));
                            }

                            Log::info ("?????? {$item->id} {$item->name}");

                            $this->jLog ("?????? {$item->id} {$item->name}");

                        } else {

                            Log::info ("??????????????????????????? {$item->id} {$item->name}");

                            $this->jLog ("??????????????????????????? {$item->id} {$item->name}");
                        }
                    });
            } else {

                Log::info ("??????????????? " . implode (', ', $schedule_ids));

                $this->jLog ("??????????????? " . implode (', ', $schedule_ids));
            }
        }
    }

    /**
     * Get initial schedule job instance
     *
     * @param $clazz
     * @param $schedule array
     * @return mixed
     */
    private function getJobInstance ($clazz, array $payload)
    {
        $instance = null;
        try {
            $instance = new $clazz ($payload);
        } catch (\Exception $e)
        {
            Log::error ($e->getMessage ());
        }
        return $instance;
    }

}
