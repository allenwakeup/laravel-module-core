<?php


namespace Goodcatch\Modules\Core\Observers;


use Goodcatch\Modules\Core\Model\Admin\Department;
use Illuminate\Support\Arr;


/**
 * 更新部门层级信息
 *
 * Class DepartmentObserver
 * @package Goodcatch\Modules\Core\Observers
 */
class DepartmentObserver
{


    // creating, created, updating, updated, saving
    // saved, deleting, deleted, restoring, restored
    public function created (Department $item)
    {
        
        $this->updatePathAndLevel($item);

    }

    public function updated (Department $item)
    {
        $this->updatePathAndLevel($item);

    }

    /**
     * 更新部门的路径
     * @param $item
     */
    private function updatePathAndLevel($item){
        if($item->pid > 0){
            $path = $item->id;
            $level = 1;
            $item = $item->parent;
            while(! is_null($item) && $item->pid > 0){
                $path = $item->id . ',' . $path;
                $level ++;
                $item = $item->parent;
            }
            Department::query()->where('id', $item->id)->update([
                'path'=>$path,
                'level'=>$level
            ]);
        }




    }

}
