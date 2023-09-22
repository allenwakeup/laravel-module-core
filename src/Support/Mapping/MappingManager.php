<?php

namespace Goodcatch\Modules\Core\Support\Mapping;

use Illuminate\Support\Str;

class MappingManager
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
            return $this->channels[$channel] = $this->tap($channel, array_key_exists('driver', $route) ? new $route['driver'] ($route, $this->app) : new DataRouteMapping($route, $this->app));
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
