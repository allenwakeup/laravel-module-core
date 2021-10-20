<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Core\Repositories\Admin;


use Goodcatch\Modules\Laravel\Traits\Searchable;
use Illuminate\Support\Arr;

class BaseRepository
{

    use Searchable;

    const TRANSFORM_TYPE_JSON                       = 'json';

    protected static function transform ($type, array &$array, $field)
    {
        if (! empty (Arr::get ($array, $field, '')))
        {
            switch ($type)
            {
                case self::TRANSFORM_TYPE_JSON :
                    Arr::set ($array, $field, json_decode (Arr::get ($array, $field), true));
                    break;
            }
        }
    }

    // 递归无线树状结构 多元数组
    protected static function tree ($data, $pid = 0, $lev = 0){
        $arr = [];
        foreach($data as $v){

            if($v ['pid'] === $pid){
                $v ['lev'] = $lev;
                $v ['children'] = self::tree ($data, $v ['id'], $lev + 1);
                if(count ($v ['children']) <= 0){
                    unset ($v ['children']);
                }
                $arr [] = $v;
            }
        }
        return $arr;
    }


}
