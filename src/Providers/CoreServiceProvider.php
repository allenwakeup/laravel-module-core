<?php

namespace Goodcatch\Modules\Core\Providers;

use Goodcatch\Modules\Core\Console\Kernel;
use Goodcatch\Modules\Core\Model\Admin\DataMap;
use Goodcatch\Modules\Core\Model\Admin\DataRoute;
use Goodcatch\Modules\Core\Observers\DataMapObserver;
use Goodcatch\Modules\Core\Observers\DataRouteObserver;
use Illuminate\Support\ServiceProvider;

class CoreServiceProvider extends ServiceProvider
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
    public function boot()
    {
        $this->registerTranslations();
        $this->registerConfig();
        $this->registerViews();
        $this->loadMigrationsFrom(module_path($this->moduleName, 'database/migrations'));


        DataMap::observe (DataMapObserver::class);
        DataRoute::observe (DataRouteObserver::class);
    }

    /**
     * Register the service provider.
     *
     * @return void
     * @throws \Exception
     */
    public function register()
    {


        $this->app->register(RouteServiceProvider::class);
        $this->app->register(ResourcesServiceProvider::class);
        $this->app->register(DatabaseServiceProvider::class);
        $this->app->register(DataMapServiceProvider::class);

        $this->app->singleton('console.core', function ($app, $params) {
            return new Kernel($app, ...$params);
        });

    }


    /**
     * Register config.
     *
     * @return void
     */
    protected function registerConfig()
    {
        $this->publishes([
            module_path($this->moduleName, 'config/config.php') => config_path($this->moduleNameLower . '.php'),
            module_path($this->moduleName, 'config/mapping.php') => config_path($this->moduleNameLower . '_mapping.php'),
        ], 'config');
        $this->mergeConfigFrom(
            module_path($this->moduleName, 'config/config.php'), $this->moduleNameLower
        );
        $this->mergeConfigFrom(
            module_path($this->moduleName, 'config/mapping.php'), $this->moduleNameLower . '_mapping'
        );
    }

    /**
     * Register views.
     *
     * @return void
     */
    public function registerViews()
    {
        $this->loadViewsFrom(
            [module_path($this->moduleNameLower, 'resources/views')],
            $this->moduleNameLower
        );
    }
    
    /**
     * Register translations.
     *
     * @return void
     */
    public function registerTranslations()
    {
        $langPath = resource_path('lang/modules/' . $this->moduleNameLower);

        if (is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, $this->moduleNameLower);
        } else {
            $this->loadTranslationsFrom(module_path($this->moduleName, 'resources/lang'), $this->moduleNameLower);
        }
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [];
    }

}
