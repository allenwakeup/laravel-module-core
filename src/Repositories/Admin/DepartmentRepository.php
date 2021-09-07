<?php

namespace Goodcatch\Modules\Core\Repositories\Admin;

use Goodcatch\Modules\Core\Model\Admin\Department;

class DepartmentRepository extends BaseRepository
{
    public static function list ($perPage, $condition = [], $keyword = null)
    {
        return Department::query()
            ->with (['parent', 'refParent'])
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
        return Department::query ()->create ($data);
    }

    public static function update ($id, $data)
    {
        return Department::find ($id)->update ($data);
    }

    public static function find ($id)
    {
        return Department::query ()->find ($id);
    }

    public static function delete ($id)
    {
        return Department::destroy ($id);
    }

    public static function selectTree ($pid = 0)
    {
        $data = Department::select('id', 'pid', 'name', 'order')
            ->with ('children')
            ->where('pid', $pid)
            ->get ()
            ->map(function (Department $model){
                $data = $model->toArray ();
                if ($model->children->count () > 0){
                    $data ['children'] = [];
                } else {
                    unset ($data ['children']);
                }
                return $data;
            })->sortBy('order');
        return [
            'code' => 0,
            'msg' => '',
            'count' => $data->count (),
            'data' => $data->all (),
        ];
    }

    public static function tree($pid = 0, $all = null, $level = 0, $path = [])
    {
        if (is_null($all)) {
            $all = Department::select('id', 'pid', 'name', 'order')->get();
        }
        return $all->where('pid', $pid)
            ->map(function (Department $model) use ($all, $level, $path) {
                $data = [
                    'id' => $model->id,
                    'name' => $model->name,
                    'level' => $level,
                    'pid' => $model->pid,
                    'path' => $path,
                    'order' => $model->order,
                ];

                $child = $all->where('pid', $model->id);
                if ($child->isEmpty()) {
                    return $data;
                }

                array_push($path, $model->id);
                $data['children'] = self::tree($model->id, $all, $level + 1, $path);
                return $data;
            })->sortBy('order');
    }

    public static function tree2($pid = 0, $all = null, $level = 0, $path = [])
    {
        if (is_null($all)) {
            $all = Department::select('id', 'pid', 'name', 'order')->get();
        }
        return $all->where('pid', $pid)
            ->map(function (Department $model) use ($all, $level, $path) {
                $data = [
                    'id' => $model->id,
                    'name' => $model->name,
                    'level' => $level,
                    'pid' => $model->pid,
                    'path' => $path,
                    'order' => $model->order,
                ];

                $child = $all->where('pid', $model->id);
                if ($child->isEmpty()) {
                    return $data;
                }

                array_push($path, $model->id);
                $data['children'] = self::tree($model->id, $all, $level + 1, $path)->values()->all();
                return $data;
            })->sortBy('order');
    }
}