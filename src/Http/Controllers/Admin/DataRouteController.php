<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Core\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Goodcatch\Modules\Core\Http\Requests\Admin\DataRouteRequest;
use Goodcatch\Modules\Core\Http\Resources\Admin\DataRouteResource\DataRouteCollection;
use Goodcatch\Modules\Core\Repositories\Admin\DataRouteRepository;
use Goodcatch\Modules\Core\Model\Admin\DataRoute;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class DataRouteController extends Controller
{
    protected $formNames = ['name', 'alias', 'short', 'from',
        'table_from', 'to', 'table_to', 'output',
        'connection_id', 'description'];

    /**
     * Display a listing of the resource.
     *
     * @param DataRouteRequest $request
     * @return Response
     */
    public function index(DataRouteRequest $request)
    {

        return $this->success(
            new DataRouteCollection(DataRouteRepository::list(
                $request->per_page??30,
                $request->validated(),
                $request->keyword
            )));
    }


    /**
     * Display the specified resource.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $data_route = DataRoute::find($id);

        if (! empty ($request->type))
        {
            $perPage = $request->per_page??30;
            $page = (int) $request->get ('page', 1);

            switch ($request->type)
            {
                case 'from':
                    return DataRouteRepository::from ($data_route, $perPage, $page - 1, $request->keyword);
                    break;
                case 'to':
                    return DataRouteRepository::to ($data_route, $request->left_id);
                    break;
            }
        }

        $data = [];
        if(isset ($data_route)){
            $data = $data_route->toArray();
            $data ['left_data_map'] = $data_route->dataMaps ()->where ('left_table', $data_route->table_from)->get ()->first ();
        }

        return $this->success($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param DataRouteRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(DataRouteRequest $request)
    {
        try{
            return $this->success(DataRouteRepository::add($request->validated()),__('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . (Str::contains ($e->getMessage (), 'Duplicate entry') ? '当前数据映射已存在' : '其它错误') . $e->getMessage ());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param DataRouteRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(DataRouteRequest $request, $id)
    {
        try{
            return $this->success(DataRouteRepository::update($id, $request->validated()),__('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . (Str::contains ($e->getMessage (), 'Duplicate entry') ? '当前数据映射已存在' : '其它错误'));
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
            return $this->success(DataRouteRepository::delete($idArray),__('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . $e->getMessage());
        }
    }

}
