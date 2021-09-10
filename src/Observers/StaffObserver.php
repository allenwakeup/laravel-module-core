<?php


namespace Goodcatch\Modules\Core\Observers;


use Goodcatch\Modules\Core\Model\Admin\Staff;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;


/**
 * 更新员工层级信息
 *
 * Class StaffObserver
 * @package Goodcatch\Modules\Core\Observers
 */
class StaffObserver
{


    // creating, created, updating, updated, saving
    // saved, deleting, deleted, restoring, restored
    public function created (Staff $item)
    {
        
        $this->updatePathAndLevel($item);

    }

    public function updated (Staff $item)
    {
        $this->updatePathAndLevel($item);

    }

    /**
     * 更新部门的路径
     * @param $item
     */
    private function updatePathAndLevel(Staff $item){
        $table = $item->getTable();
        $department = $item->department;
        $id = $item->id;
        if($item->pid > 0){

            $path = $item->id;
            $path_text = $item->name;
            $level = 1;
            $item = $item->parent;

            while(! is_null($item)){
                $path = $item->id . ',' . $path;
                $path_text = $item->name . ',' . $path_text;
                $level ++;
                $item = $item->parent;
            }

            DB::table($table)->where('id', $id)->update([
                'path_text'=>$path_text,
                'path'=>$path,
                'level'=>$level
            ]);
        }

        if(isset($department) && $department->id > 0){
            $departments = $department->name;
            $department = $department->parent;
            while(! is_null($department)){
                $departments = $department->name . ',' . $departments;
                $department = $department->parent;
            }
            DB::table($table)->where('id', $id)->update([
                'departments'=>$departments,
            ]);
        }
    }
}
