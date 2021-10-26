<?php

namespace Goodcatch\Modules\Core\Database\Seeders;

use Goodcatch\Modules\Base\Traits\PermissionSeedsTrait;
use Illuminate\Database\Seeder;

class PermissionTableSeeder extends Seeder
{
    use PermissionSeedsTrait;

    const MODULE_NAME = '核心模块';
    const MODULE_ALIAS = 'core';

    const MODULE_API_PREFIX = 'core';

    public function getSeedsMenus (){
        $menu_type = config('core.menu.type');
        return [
            [
                'name' => self::MODULE_NAME,
                'icon' => 'icon-gc-' . self::MODULE_ALIAS,
                'is_type' => $menu_type,
                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS, 'index'),
                'children' => [
                    [
                        'name' => '附件管理',
                        'icon' => 'icon-gc-attachments',
                        'is_type' => $menu_type,
                        'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS,'areas'),
                    ],
                    [
                        'name' => '主数据',
                        'icon' => 'icon-gc-data',
                        'is_type' => $menu_type,
                        'children' => [
                            [
                                'name' => '地区管理',
                                'icon' => 'icon-gc-areas',
                                'is_type' => $menu_type,
                                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS,'areas'),
                            ],
                            [
                                'name' => '部门管理',
                                'icon' => 'icon-gc-departments',
                                'is_type' => $menu_type,
                                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS,'departments'),
                            ],
                            [
                                'name' => '员工管理',
                                'icon' => 'icon-gc-staff',
                                'is_type' => $menu_type,
                                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS,'staff'),
                            ],
                        ]
                    ],
                    [
                        'name' => '数据源管理',
                        'icon' => 'icon-gc-datasource',
                        'children' => [
                            [
                                'name' => '数据库信息',
                                'icon' => 'icon-gc-databases',
                                'is_type' => $menu_type,
                                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS,'databases'),
                            ],
                            [
                                'name' => '数据源',
                                'icon' => 'icon-gc-datasources',
                                'is_type' => $menu_type,
                                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS,'datasources'),
                            ],
                            [
                                'name' => '连接管理',
                                'icon' => 'icon-gc-connections',
                                'is_type' => $menu_type,
                                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS,'connections'),
                            ],
                            [
                                'name' => '数据路径',
                                'icon' => 'icon-gc-data-routes',
                                'is_type' => $menu_type,
                                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS,'data_routes'),
                            ],
                            [
                                'name' => '数据映射',
                                'icon' => 'icon-gc-data-maps',
                                'is_type' => $menu_type,
                                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS,'data_maps'),
                            ]
                        ]
                    ],
                    [
                        'name' => '服务管理',
                        'icon' => 'icon-gc-service',
                        'is_type' => $menu_type,
                        'children' => [
                            [
                                'name' => '计划与任务',
                                'icon' => 'icon-gc-schedules',
                                'is_type' => $menu_type,
                                'link' => $this->getSeedsModuleApiUri(self::MODULE_ALIAS,'schedules'),
                            ]
                        ]
                    ]
                ]
            ]
        ];
    }

    public function getSeedsPermissionGroups (){
        return [
            // 附件管理
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '附件管理') => [
                self::MODULE_API_PREFIX . '::admin.attachments' => [
                    'download' => ['name' => '下载附件', 'content' => '下载附件']
                ]
            ],
            // 主数据
            // 地区管理
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '地区管理') => [
                self::MODULE_API_PREFIX . '::admin.areas'
            ],
            // 部门管理
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '部门管理') => [
                self::MODULE_API_PREFIX . '::admin.departments'
            ],
            // 员工管理
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '员工管理') => [
                self::MODULE_API_PREFIX . '::admin.staff'
            ],
            // 数据源管理
            // 数据库信息
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '数据库信息') => [
                self::MODULE_API_PREFIX . '::admin.databases' => [
                    'index' => ['name' => '列表', 'content' => '列表展示']
                ]
            ],
            //数据源
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '数据源管理') => [
                self::MODULE_API_PREFIX . '::admin.datasources'
            ],
            // 连接管理
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '连接管理') => [
                self::MODULE_API_PREFIX . '::admin.connections' => array_merge($this->api_actions, [
                    'test' => ['name' => '测试', 'content' => '测试连接']
                ])
            ],
            // 数据路径
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '数据路径') => [
                self::MODULE_API_PREFIX . '::admin.data_routes'
            ],
            // 数据映射
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '数据映射') => [
                self::MODULE_API_PREFIX . '::admin.data_maps'
            ],
            // 服务管理
            // 计划与任务
            $this->getSeedsModuleMenuGroupName(self::MODULE_ALIAS, '计划与任务') => [
                self::MODULE_API_PREFIX . '::admin.schedules' => array_merge($this->api_actions, [
                    'logs' => ['name' => '日志列表', 'content' => '任务执行日志展示']
                ])
            ]

        ];
    }
}
