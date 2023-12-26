<?php

namespace Goodcatch\Modules\Core\Support\Mapping;

use Goodcatch\Modules\Core\Model\Admin\Eloquent;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class MappingManager
{

    const KEY_NAME_PATH = '_p';

    /**
     * The application instance.
     *
     * @var \Illuminate\Contracts\Foundation\Application
     */
    protected $app;

    /**
     * The array of resolved channels.
     *
     * @var array
     */
    protected $channels = [];

    /**
     * Create a new Log manager instance.
     *
     * @param  \Illuminate\Contracts\Foundation\Application  $app
     * @return void
     */
    public function __construct($app)
    {
        $this->app = $app;
    }

    /**
     * 判断是否存在数据映射
     *
     * @param $left
     * @param $right
     * @param array $config
     * @return mixed
     */
    public function isMapping($left, $right, array $config) {
        $from = Arr::get($config, 'from');
        $to = Arr::get($config, 'to');
        $syncTableName = 'sync_' . $config['name'];
        return ! empty(DB::select("select * from {$syncTableName} t1, {$syncTableName}_pivot t2 where t1.pivot_id = t2.pivot and t1.{$from} = :{$from} and t2.{$to} = :{$to}", [
            $from => $left,
            $to => $right
        ]));
    }

    /**
     * 查找已映射的数据
     *
     * @param mixed $id Eloquent or primary key
     * @param string $from 映射的起点
     * @param string $to 映射的终点
     * @return mixed|null
     */
    public function findMapping($id, string $from, string $to) {
        $definedDataMappings = $this->app['config']->get('core.data_mapping.defined');
        $leftDefinitions = collect(Arr::get($definedDataMappings, $from, []));
        if($leftDefinitions->isNotEmpty()) {
            $leftTable = Arr::get($leftDefinitions->first(), 'payload.leftTable');
            $parentKey = Arr::get($leftDefinitions->first(), 'payload.parentKey');
            if($id instanceof Eloquent) {
                $leftModel = $id;
            } else {
                $leftModel = (new Eloquent)->setDataMapTable ($leftTable)->firstWhere ($parentKey, $id);
            }
            if(empty($leftModel->getAttribute(self::KEY_NAME_PATH))) {
                $leftModel->setAttribute(self::KEY_NAME_PATH, [ $from ]);
            }

            if(!is_null($leftModel)) {
                // 当前左边已映射的右边模型
                return $leftDefinitions->reduce(function ($model, $mapDefinition) use ($from, $to, $leftModel, $leftTable, $definedDataMappings) {
                    $rightTable = Arr::get($mapDefinition, 'payload.rightTable');

                    if(in_array($rightTable, $leftModel->getAttribute(self::KEY_NAME_PATH)) || $from === $to) {
                        return $model;
                    }

                    // 设置当前关联数据
                    $records = $leftModel->setDataMapTable($leftTable)
                        ->getDataMapping($rightTable)
                        ->get()
                        ->map(function ($record) {
                            return new Eloquent($record->toArray());
                        });

                    $records = tap($records, function ($items) use ($from, $to, $leftModel, $rightTable, $definedDataMappings) {

                        // 递归右边模型
                        if(Arr::has($definedDataMappings, $rightTable)) {
                            $recursiveRightTable = Arr::get($definedDataMappings, $rightTable . '.payload.rightTable');
                            $items->transform(function (Eloquent $eloquent) use ($to, $leftModel, $rightTable, $recursiveRightTable) {

                                $path = $leftModel->getAttribute(self::KEY_NAME_PATH);
                                $path [] = $rightTable;
                                $eloquent->setAttribute(self::KEY_NAME_PATH, $path);

                                $recursiveData = $this->findMapping($eloquent, $rightTable, $to);
                                if(!is_null($recursiveData)) {
                                    $eloquent->setRelation($recursiveRightTable, $recursiveData);
                                }
                                return $eloquent;
                            });
                        }

                    });

                    return $model->setRelation ($rightTable, $records);
                }, $leftModel);
            }

        }
        return null;
    }

    public function getDefaultChannel()
    {
        return $this->app['config']['core_mapping.default'];
    }

    /**
     * Get a log channel instance.
     *
     * @param  string|null  $channel
     * @return mixed
     */
    public function channel($channel = null)
    {
        return $this->channels[$channel] ?? with($this->configurationFor($channel), function ($route) use ($channel) {
            return $this->channels[$channel] = $this->tap($channel, array_key_exists('driver', $route)
                ? new $route['driver'] ($route, $this->app, $this)
                : new DataRouteMapping($route, $this->app, $this));
        });
    }


    /**
     * Apply the configured taps for the logger.
     *
     * @param  string  $name
     * @param  mixed $mapping
     * @return mixed
     */
    protected function tap($name, $mapping)
    {
        foreach ($this->configurationFor($name)['tap'] ?? [] as $tap) {
            [$class, $arguments] = $this->parseTap($tap);

            $this->app->make($class)->__invoke($mapping, ...explode(',', $arguments));
        }

        return $mapping;
    }

    /**
     * Parse the given tap class string into a class name and arguments string.
     *
     * @param  string  $tap
     * @return array
     */
    protected function parseTap($tap)
    {
        return Str::contains($tap, ':') ? explode(':', $tap, 2) : [$tap, ''];
    }


    /**
     * Get the log connection configuration.
     *
     * @param $name
     * @return array
     */
    protected function configurationFor($name = null)
    {
        if(empty($name)) {
            $name = $this->getDefaultChannel();
        }
        $key = "core_mapping.channels.{$name}";
        if($this->app['config']->has($key)) {
            return array_merge($this->app['config'][$key], ['name' => $name]);
        }
        return ['name' => $name];
    }


    /**
     * Get all of the resolved log channels.
     *
     * @return array
     */
    public function getChannels()
    {
        return $this->channels;
    }

    /**
     * Dynamically call the default driver instance.
     *
     * @param  string  $method
     * @param  array  $parameters
     * @return mixed
     */
    public function __call($method, $parameters)
    {
        return $this->channel()->$method(...$parameters);
    }
}
