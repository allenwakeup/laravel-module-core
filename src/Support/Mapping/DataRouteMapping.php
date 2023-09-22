<?php

namespace Goodcatch\Modules\Core\Support\Mapping;

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
     * Create a new Mapping instance.
     *
     * @param  array  $dataRoute
     * @param  \Illuminate\Contracts\Foundation\Application  $app
     * @return void
     */
    public function __construct($dataRoute, $app)
    {
        $this->app = $app;
        $this->dataRoute = $dataRoute;
    }


    public function has(int $left, int $right)
    {
        return 'yes, it\' has';
    }
}