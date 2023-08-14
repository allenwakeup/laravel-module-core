import { moduleUrl } from '@this/plugins/function'

export default [
    // 核心模块
    {
        path: moduleUrl('index'), name:"admin_index", meta:{title: '模块首页', key:'home'}, component: () => import("@this/views/Admin/index"),children:[
            {path: moduleUrl('index'), name:"admin_default", meta:{title: '模块首页', key:'admin_default'}, component: () => import("@this/views/Admin/default")}, // 打开默认页面

            // 附件
            {path: moduleUrl('attachments'), name:"admin_attachments", meta:{title: '附件', key:'admin_attachments', form: 'admin_attachments_form'}, component:() => import("@this/views/Admin/attachments/index")},
            {path: moduleUrl('attachments/form/:id?'), name:"admin_attachments_form", meta:{title: '附件编辑', key:'admin_attachments_form'}, component:() => import("@this/views/Admin/attachments/form")},

            // 数据源
            {path: moduleUrl('datasources'), name:"admin_datasources", meta:{title: '数据源', key:'admin_datasources', form: 'admin_datasources_form'}, component: () => import("@this/views/Admin/datasources/index")},
            {path: moduleUrl('datasources/form/:id?'), name:"admin_datasources_form", meta:{title: '数据源编辑', key:'admin_datasources_form'}, component: () => import("@this/views/Admin/datasources/form")},

            // 数据库信息
            {path: moduleUrl('databases'), name:"admin_databases", meta:{title: '数据库', key:'admin_databases'}, component: () => import("@this/views/Admin/databases/index")},

            // 数据路径
            {path: moduleUrl('data_routes'), name:"admin_data_routes", meta:{title: '数据路径', key:'admin_data_routes', form: 'admin_data_routes_form'}, component: () => import("@this/views/Admin/data_routes/index")},
            {path: moduleUrl('data_routes/form/:id?'), name:"admin_data_routes_form", meta:{title: '数据路径编辑', key:'admin_data_routes_form'}, component: () => import("@this/views/Admin/data_routes/form")},

            // 数据映射
            {path: moduleUrl('data_maps'), name:"admin_data_maps", meta:{title: '数据映射', key:'admin_data_maps', form: 'admin_data_maps_form'}, component: () => import("@this/views/Admin/data_maps/index")},
            {path: moduleUrl('data_maps/form/:id?'), name:"admin_data_maps_form", meta:{title: '数据映射编辑', key:'admin_data_maps_form'}, component: () => import("@this/views/Admin/data_maps/form")},
            {
                path: moduleUrl('data_maps_:data_maps_id/:id/assignment'),
                name:"admin_data_maps_assignment",
                meta:{title: '映射数据', key:'admin_data_maps_assignment'},
                component:() => import ("@this/views/Admin/data_maps/assignment"),
                props: true
            },

            // 连接
            {path: moduleUrl('connections'), name:"admin_connections", meta:{title: '连接', key:'admin_connections', form: 'admin_connections_form'}, component: () => import("@this/views/Admin/connections/index")},
            {path: moduleUrl('connections/form/:id?'), name:"admin_connections_form", meta:{title: '连接编辑', key:'admin_connections_form'}, component: () => import("@this/views/Admin/connections/form")},

            // 计划与任务
            {path: moduleUrl('schedules'), name:"admin_schedules", meta:{title: '计划与任务', key:'admin_schedules', form: 'admin_schedules_form'}, component: () => import("@this/views/Admin/schedules/index")},
            {path: moduleUrl('schedules/form/:id?'), name:"admin_schedules_form", meta:{title: '计划与任务编辑', key:'admin_schedules_form'}, component: () => import("@this/views/Admin/schedules/form")},
        ]
    }
];
