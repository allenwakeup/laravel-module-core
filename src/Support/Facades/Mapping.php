<?php

namespace Goodcatch\Modules\Core\Support\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static bool has(int $left, int $right)
 *
 * @see \Illuminate\Log\Logger
 */
class Mapping extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'core.mapping';
    }

}