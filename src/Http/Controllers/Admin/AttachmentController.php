<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Core\Http\Controllers\Admin;

use Goodcatch\Modules\Core\Handlers\AttachmentUploadHandler;
use App\Http\Controllers\Controller;
use Goodcatch\Modules\Core\Http\Requests\Admin\AttachmentRequest;
use Goodcatch\Modules\Core\Http\Resources\Admin\AttachmentResource\AttachmentCollection;
use Goodcatch\Modules\Core\Http\Resources\Admin\AttachmentResource\AttachmentResource;
use Goodcatch\Modules\Core\Repositories\Admin\AttachmentRepository;
use Illuminate\Database\QueryException;
use Illuminate\Support\Str;

class AttachmentController extends Controller
{

    /**
     * 附件管理-附件列表
     * @param AttachmentRequest $request
     * @return
     */
    public function index(AttachmentRequest $request)
    {
        $conditions = $request->validated();

        return $this->success(
            new AttachmentCollection(AttachmentRepository::list(
                $request->per_page??30,
                $conditions
            )));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param AttachmentRequest $request
     * @param AttachmentUploadHandler $uploader
     * @return \Illuminate\Http\Response
     */
    public function store(AttachmentRequest $request, AttachmentUploadHandler $uploader)
    {

        try {
            $data = AttachmentRepository::add(array_merge($request->validated(), $uploader->save($request->file, $request->attachable, 'app')));
            return $this->success(new AttachmentResource($data), __('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . (Str::contains ($e->getMessage (), 'Duplicate entry') ? '当前数据已存在' : '其它错误'));
        }

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->success(new AttachmentResource(AttachmentRepository::find($id)));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param AttachmentRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(AttachmentRequest $request,$id)
    {
        try{
            return $this->success(AttachmentRepository::update($id, $request->validated()), __('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . (Str::contains ($e->getMessage (), 'Duplicate entry') ? '当前数据更新失败' : '其它错误'));
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
            return $this->success(AttachmentRepository::delete($idArray), __('base.success'));
        } catch (QueryException $e) {
            return $this->error(__('base.error') . $e->getMessage());
        }
    }

    /**
     * 附件管理-下载附件
     *
     * @param AttachmentRequest $request
     * @param int $id
     * @return array
     */
    public function download(AttachmentRequest $request, $id)
    {
        $attachment = AttachmentRepository::find($id);
        if (! is_null ($attachment))
        {
            $file = storage_path() . $attachment->path;
            if (file_exists($file) && is_readable($file)) {
                return response()->download($file);
            } else {
                return $this->error(__('base.error') . '附件文件不存在或不可读取');
            }
        }
        return $this->error(__('base.error') . '未知错误');
    }

}
