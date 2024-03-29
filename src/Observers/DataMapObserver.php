<?php


namespace Goodcatch\Modules\Core\Observers;

use Goodcatch\Modules\Base\Traits\PermissionSeedsTrait;
use Goodcatch\Modules\Core\Model\Admin\DataMap;
use Goodcatch\Modules\Core\Repositories\Admin\DataMapRepository;


/**
 * 更新缓存中的菜单
 *
 * Class DataMapObserver
 * @package Goodcatch\Modules\Core\Observers
 */
class DataMapObserver
{

    use PermissionSeedsTrait;

    const PERMISSION_SERVICE_ALIAS = 'MenuService';

    const MODULE_NAME = '核心模块';
    const MODULE_ALIAS = 'core';
    const MENU_NAME = '数据映射';


    // creating, created, updating, updated, saving
    // saved, deleting, deleted, restoring, restored
    public function created (DataMap $item)
    {

        module_tap (self::PERMISSION_SERVICE_ALIAS, function ($permission_service) use ($item) {
            $menu_type = config('core.menu.type');
            $permission_service->setSeedsMenus([
                [
                    'name' => self::MODULE_NAME,
                    'icon' => 'icon-gc-' . self::MODULE_ALIAS,
                    'is_type' => $menu_type,
                    'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS, 'index'),
                    'children' => [
                        [
                            'name' => self::MENU_NAME,
                            'icon' => 'icon-gc-data-maps',
                            'is_type' => $menu_type,
                            'children' => [
                                [
                                    'name' => $item->dataRoute->menu,
                                    'icon' => 'icon-gc-data-maps',
                                    'is_type' => $menu_type,
                                    'children' => [
                                        [
                                            'name' => $item->title,
                                            'icon' => 'icon-gc-data-maps',
                                            'is_type' => $menu_type,
                                            'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS, "data_maps_{$item->id}/{$item->id}/assignment"),
                                        ]
                                    ]

                                ]
                            ],
                        ]

                    ]
                ]
            ])->setSeedsPermissionGroups([
                // 数据映射
                $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '数据映射') => [
                    self::MODULE_ALIAS . "::admin.data_maps.{$item->id}" => [
                        'index' => [
                            'name' => '列表',
                            'content' => "数据映射{$item->left}列表展示"
                        ],
                        'source' => [
                            'name' => '未分配列表',
                            'content' => "数据映射{$item->left}未分配列表展示"
                        ],
                        'target' => [
                            'name' => '已分配列表',
                            'content' => "数据映射{$item->left}已分配列表展示"],
                        'store' => [
                            'name' => '添加',
                            'content' => "添加{$item->left}到{$item->right}的数据映射"],
                        'show' => [
                            'name' => '详情', 'content' => "数据映射{$item->left}-{$item->right}详情"],
                        'destroy' => [
                            'name' => '删除',
                            'content' => "删除{$item->left}到{$item->right}的数据映射"
                        ]
                    ]
                ]
            ])->run();

            $permission_service->flush();

            DataMapRepository::flushCache();
        });

    }

    public function deleting (DataMap $item)
    {
        module_tap (self::PERMISSION_SERVICE_ALIAS, function ($permission_service) use ($item) {

            $permission_service->remove([
                $this->getSeedsModuleApiUri(self::MODULE_ALIAS, "data_maps_{$item->id}/{$item->id}/assignment")
            ], [
                self::MODULE_ALIAS . "::admin.data_maps.{$item->id}.assignment.index",
                self::MODULE_ALIAS . "::admin.data_maps.{$item->id}.assignment.source",
                self::MODULE_ALIAS . "::admin.data_maps.{$item->id}.assignment.target",
                self::MODULE_ALIAS . "::admin.data_maps.{$item->id}.assignment.store",
                self::MODULE_ALIAS . "::admin.data_maps.{$item->id}.assignment.show",
                self::MODULE_ALIAS . "::admin.data_maps.{$item->id}.assignment.destroy",
            ]);

            $permission_service->flush();

            DataMapRepository::flushCache();
        });

    }

}
