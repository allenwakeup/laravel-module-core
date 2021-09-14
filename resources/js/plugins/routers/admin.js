export default [
    // 核心模块
    {
        path:"/Admin/goodcatch/m/core/index",name:"goodcatch_m_core_index",component:()=>import("@/views/Admin/index"),children:[
            {path:"/Admin/goodcatch/m/core/index",name:"goodcatch_m_core_default",component:()=>import("@/views/Admin/default")}, // 打开默认页面

            // 地区
            {path:"/Admin/goodcatch/m/core/areas",name:"goodcatch_m_core_admin_areas",component:()=>import("@/views/Admin/areas/index")},
            {path:"/Admin/goodcatch/m/core/areas/form/:id?",name:"goodcatch_m_core_admin_areas_form",component:()=>import("@/views/Admin/areas/form")},

            // 部门
            {path:"/Admin/goodcatch/m/core/departments",name:"goodcatch_m_core_admin_departments",component:()=>import("@/views/Admin/departments/index")},
            {path:"/Admin/goodcatch/m/core/departments/form/:id?",name:"goodcatch_m_core_admin_departments_form",component:()=>import("@/views/Admin/departments/form")},

            // 员工
            {path:"/Admin/goodcatch/m/core/staff",name:"goodcatch_m_core_admin_staff",component:()=>import("@/views/Admin/staff/index")},
            {path:"/Admin/goodcatch/m/core/staff/form/:id?",name:"goodcatch_m_core_admin_staff_form",component:()=>import("@/views/Admin/staff/form")},

            // 数据源
            {path:"/Admin/goodcatch/m/core/datasources",name:"goodcatch_m_core_admin_datasources",component:()=>import("@/views/Admin/datasources/index")},
            {path:"/Admin/goodcatch/m/core/datasources/form/:id?",name:"goodcatch_m_core_admin_datasources_form",component:()=>import("@/views/Admin/datasources/form")},

            // 数据库信息
            {path:"/Admin/goodcatch/m/core/databases",name:"goodcatch_m_core_admin_databases",component:()=>import("@/views/Admin/databases/index")},

            // 数据路径
            {path:"/Admin/goodcatch/m/core/data_routes",name:"goodcatch_m_core_admin_data_routes",component:()=>import("@/views/Admin/data_routes/index")},
            {path:"/Admin/goodcatch/m/core/data_routes/form/:id?",name:"goodcatch_m_core_admin_data_routes_form",component:()=>import("@/views/Admin/data_routes/form")},

            // 数据映射
            {path:"/Admin/goodcatch/m/core/data_maps",name:"goodcatch_m_core_admin_data_maps",component:()=>import("@/views/Admin/data_maps/index")},
            {path:"/Admin/goodcatch/m/core/data_maps/form/:id?",name:"goodcatch_m_core_admin_data_maps_form",component:()=>import("@/views/Admin/data_maps/form")},
            {
                path:"/Admin/goodcatch/m/core/data_maps_:data_maps_id/:id/assignment",
                name:"goodcatch_m_core_admin_data_maps_assignment",
                component:() => import ("@/views/Admin/data_maps/assignment"),
                props: true
            },

            // 连接
            {path:"/Admin/goodcatch/m/core/connections",name:"goodcatch_m_core_admin_connections",component:()=>import("@/views/Admin/connections/index")},
            {path:"/Admin/goodcatch/m/core/connections/form/:id?",name:"goodcatch_m_core_admin_connections_form",component:()=>import("@/views/Admin/connections/form")},

            // 计划与任务
            {path:"/Admin/goodcatch/m/core/schedules",name:"goodcatch_m_core_admin_schedules",component:()=>import("@/views/Admin/schedules/index")},
            {path:"/Admin/goodcatch/m/core/schedules/form/:id?",name:"goodcatch_m_core_admin_schedules_form",component:()=>import("@/views/Admin/schedules/form")},
        ]
    }
];
