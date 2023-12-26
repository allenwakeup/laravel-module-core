<?php

namespace Goodcatch\Modules\Core\Support\Mapping;

use Illuminate\Support\Arr;

class DataRouteMapping implements MappingInterface
{
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
    protected $dataRoute = [];

    /**
     * The mapping manager.
     *
     * @var array
     */
    protected $manager = [];

    /**
     * Create a new Mapping instance.
     *
     * @param  array  $dataRoute
     * @param  \Illuminate\Contracts\Foundation\Application  $app
     * @return void
     */
    public function __construct($dataRoute, $app, $manager)
    {
        $this->app = $app;
        $this->dataRoute = $dataRoute;
        $this->manager = $manager;
    }

    /**
     * This is an example implementation for [ has ].
     * Please add configuration for mapping and make sure driver class existed.
     * The driver class should implement Goodcatch\Modules\Core\Support\Mapping\MappingInterface
     *
     * -----------------------
     * E.g.
     *   config/core_mapping.php ->channels->[ mapping name ]->driver => Example::class
     *
     *   if there's no config/core_mapping.php please use [ laravel vendor publish ] to publish with [ config ].
     *
     * -----------------------
     * Note:
     *   Mapping name is the name of Model Goodcatch\Modules\Core\Model\Admin\DataRoute in database.
     *   Thanks!
     * @param int $left
     * @param int $right
     * @return mixed
     */
    public function has(int $left, int $right)
    {
        return $this->manager->isMapping($left, $right, $this->dataRoute);
    }

    /**
     * This is an example implementation for [ find ].
     * Please add configuration for mapping and make sure driver class existed.
     * The driver class should implement Goodcatch\Modules\Core\Support\Mapping\MappingInterface
     *
     * -----------------------
     * E.g.
     *   config/core_mapping.php ->channels->[ mapping name ]->driver => Example::class
     *
     *   if there's no config/core_mapping.php please use [ laravel vendor publish ] to publish with [ config ].
     *
     * -----------------------
     * Note:
     *   Mapping name is the name of Model Goodcatch\Modules\Core\Model\Admin\DataRoute in database.
     *   Thanks!
     * @param int $leftId
     * @return mixed
     */
    public function find(int $leftId)
    {
        $from = Arr::get($this->dataRoute, 'from');
        $to = Arr::get($this->dataRoute, 'to');
        return $this->manager->findMapping($leftId, $from, $to);
    }
}