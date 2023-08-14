<?php

namespace Goodcatch\Modules\Core\Http\Controllers;

use Goodcatch\Modules\Base\Http\Controllers\SpaController as Controller;
use Illuminate\Support\Facades\View;

class SpaController extends Controller
{

    public function __construct()
    {
        parent::__construct();

        View::share('goodcatch', 'Goodcatch Modules Core');
    }

    protected function moduleIndex(array $view_content){

        $view_content = array_merge($view_content, [
            'menu_type' => config('core.menu.type'),
            'app_name' => dynamic_config('app_name_core', _trans('core::base.app_name'))
        ]);

        return view('core::index', $view_content);
    }
}
