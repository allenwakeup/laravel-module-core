<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Core\Http\Controllers\Admin;


use Goodcatch\Modules\Core\Http\Requests\Admin\StaffRequest;
use Goodcatch\Modules\Core\Http\Resources\Admin\StaffResource\StaffCollection;
use Goodcatch\Modules\Core\Repositories\Admin\StaffRepository;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Illuminate\View\View;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param StaffRequest $request
     * @return \Illuminate\Http\Response
     */
    public function index(StaffRequest $request)
    {
        $action = $request->get ('action');
        $data_type = $request->get ('data_type');
        $condition = $request->validated();

        if (isset ($condition ['pid'])) {
            $condition ['pid'] = ['=', $condition ['pid']];
        } else {
            if ($action !== 'search') {
                $condition['pid'] = ['=', 0];
            }
        }

        if ($data_type === 'tree')
        {
            if (!empty ($request->keyword) && is_numeric ($request->keyword))
            {
                $data = StaffRepository::tree2 (intval ($request->keyword));
            } else {
                $data = StaffRepository::tree2 (0);
            }
        } else if ($data_type === 'select') {
            $data = StaffRepository::selectTree ($request->pid ?? 0);
        }
        else {
            $data = StaffRepository::list(
                $request->per_page??30,
                $request->validated(),
                $request->keyword
            );
        }
        if($data instanceof Collection){
            return $this->success($data);
        }
        return $this->success(new StaffCollection($data, __('base.success')));
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->success(StaffRepository::find($id), __('base.success'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StaffRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StaffRequest $request)
    {
        try{
            return $this->success(StaffRepository::add(array_merge(['pid' => 0], $request->validated())), __('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . (Str::contains ($e->getMessage (), 'Duplicate entry') ? '当前数据已存在' : '其它错误'));
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param StaffRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update (StaffRequest $request, $id)
    {
        $data = $request->validated();



        try {
            $res = StaffRepository::update ($id, array_merge(['pid' => 0], $data));
                        return $this->success($res, __('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . (Str::contains ($e->getMessage (), 'Duplicate entry') ? '当前数据已存在' : '其它错误'));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $idArray = array_filter(explode(',',$id),function($item){
            return is_numeric($item);
        });

        try{
            return $this->success(StaffRepository::delete($idArray), __('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . $e->getMessage());
        }
    }
}