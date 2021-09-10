<?php

namespace Goodcatch\Modules\Core\Repositories\Admin;

use Goodcatch\Modules\Core\Model\Admin\Staff;

class StaffRepository extends BaseRepository
{
    public static function list ($perPage, $condition = [], $keyword = null)
    {
        return Staff::query()
            ->with (['parent', 'department'])
            ->where(function ($query) use ($condition) {
                self::buildQuery($query, $condition);
                if (! empty ($keyword))
                {
                    self::buildSelect ($query, $condition, $keyword);
                }
            })
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public static function add ($data)
    {
        return Staff::query ()->create ($data);
    }

    public static function update ($id, $data)
    {
        return Staff::find ($id)->update ($data);
    }

    public static function find ($id)
    {
        return Staff::query ()->find ($id);
    }

    public static function delete ($id)
    {
        return Staff::destroy ($id);
    }

    public static function selectTree ($pid = 0)
    {
        return Staff::select('id', 'pid', 'name', 'order')
            ->with ('children')
            ->where('pid', $pid)
            ->get ()
            ->map(function (Staff $model){
                $data = $model->toArray ();
                $data ['isLeaf'] = ($model->children->count () === 0);
                unset($data['children']);
                return $data;
            })->sortBy('order');

    }
//
//    public static function tree($pid = 0, $all = null, $level = 0, $path = [])
//    {
//        if (is_null($all)) {
//            $all = Staff::select('id', 'pid', 'name', 'order')->get();
//        }
//        return $all->where('pid', $pid)
//            ->map(function (Staff $model) use ($all, $level, $path) {
//                $data = [
//                    'id' => $model->id,
//                    'name' => $model->name,
//                    'level' => $level,
//                    'pid' => $model->pid,
//                    'path' => $path,
//                    'order' => $model->order,
//                ];
//
//                $child = $all->where('pid', $model->id);
//                if ($child->isEmpty()) {
//                    return $data;
//                }
//
//                array_push($path, $model->id);
//                $data['children'] = self::tree($model->id, $all, $level + 1, $path);
//                return $data;
//            })->sortBy('order');
//    }
//
//    public static function tree2($pid = 0, $all = null, $level = 0, $path = [])
//    {
//        if (is_null($all)) {
//            $all = Staff::select('id', 'pid', 'name', 'order')->get();
//        }
//        return $all->where('pid', $pid)
//            ->map(function (Staff $model) use ($all, $level, $path) {
//                $data = [
//                    'id' => $model->id,
//                    'name' => $model->name,
//                    'level' => $level,
//                    'pid' => $model->pid,
//                    'path' => $path,
//                    'order' => $model->order,
//                ];
//
//                $child = $all->where('pid', $model->id);
//                if ($child->isEmpty()) {
//                    return $data;
//                }
//
//                array_push($path, $model->id);
//                $data['children'] = self::tree($model->id, $all, $level + 1, $path)->values()->all();
//                return $data;
//            })->sortBy('order');
//    }
}