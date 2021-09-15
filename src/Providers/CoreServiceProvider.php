<?php

namespace Goodcatch\Modules\Core\Providers;

use Goodcatch\Modules\Core\Console\Kernel;
use Goodcatch\Modules\Core\Model\Admin\DataMap;
use Goodcatch\Modules\Core\Model\Admin\DataRoute;
use Goodcatch\Modules\Core\Model\Admin\Department;
use Goodcatch\Modules\Core\Model\Admin\Staff;
use Goodcatch\Modules\Core\Observers\DataMapObserver;
use Goodcatch\Modules\Core\Observers\DataRouteObserver;
use Goodcatch\Modules\Core\Observers\DepartmentObserver;
use Goodcatch\Modules\Core\Observers\StaffObserver;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Factory;

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
        Department::observe (DepartmentObserver::class);
        Staff::observe (StaffObserver::class);
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
        ], 'config');
        $this->mergeConfigFrom(
            module_path($this->moduleName, 'config/config.php'), $this->moduleNameLower
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
