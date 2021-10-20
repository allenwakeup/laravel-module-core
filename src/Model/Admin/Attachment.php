<?php
/**
 * @author  Allen <ali@goodcatch.cn>
 */

namespace Goodcatch\Modules\Core\Model\Admin;

use Goodcatch\Modules\Core\Model\Model;

class Attachment extends Model
{
    const STATUS_ENABLE = 1;
    const STATUS_DISABLE = 0;

    protected $guarded = [];

    /**
     * 搜索字段
     *
     * @var array
     */
    public static $searchField = [
        'name' => [
            'searchType'    => 'like'
        ],
        'size' => [
            'searchType'    => '='
        ],
        'ext_name' => [
            'searchType'    => 'like'
        ],
        'path' => [
            'searchType'    => 'like'
        ]
    ];

    /**
     * Get all of the owning attachable models.
     */
    public function attachable()
    {
        return $this->morphTo();
    }

}
