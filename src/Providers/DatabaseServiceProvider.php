<?php

namespace Goodcatch\Modules\Core\Providers;

use Goodcatch\Modules\Laravel\Contracts\Database\ModuleDBConnectionService;
use Goodcatch\Modules\Laravel\Database\DBConnectionManager;
use Goodcatch\Modules\Core\Repositories\Admin\ConnectionRepository;
use Illuminate\Support\Arr;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\App;

class DatabaseServiceProvider extends ServiceProvider
{

    /**
     * @var string $moduleName
     */
    protected $moduleName = 'Core';

    /**
     * @var string $moduleNameLower
     */
    protected $moduleNameLower = 'core';

    /**
     * Boot the application events.
     *
     * @return void
     */
    public function boot ()
    {
        if (!App::environment ('testing')) {
            $this->loadConnections ();
        }
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register ()
    {

    }

    protected function loadConnections ()
    {
        $connections = ConnectionRepository::loadFromCache ();

        if (isset ($connections) && count ($connections) > 0)
        {
            $config_repository = $this->app ['config'];

            $installed = $config_repository->get ('database.connections', []);
            foreach ($connections as $name => $config)
            {
                if (! Arr::has ($installed, $name))
                {
                    unset ($config ['name']);
                    unset ($config ['type']);
                    $config_repository->set ('database.connections.' . $name, $config);
                }
            }

        }
    }
}
