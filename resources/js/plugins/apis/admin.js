
const baseUrl = window.baseUrl;

export default {



    /**
     * 后台接口
     */

    "adminLogin" : baseUrl + "Admin/login", // 登录
    "adminLogout" : baseUrl + "Admin/logout", // 登出
    "adminCheckLogin" : baseUrl + "Admin/check_login", // 验证是否登录

    // 菜单处理
    'adminMenus' : baseUrl + 'Admin/menus', // 后台菜单

    /**
     * 模块化接口
     */

    "moduleCoreAttachments": baseUrl + "Admin/goodcatch/m/core/attachments", // 附件
    "moduleCoreAreas": baseUrl + "Admin/goodcatch/m/core/areas", // 地区
    "moduleCoreDepartments": baseUrl + "Admin/goodcatch/m/core/departments", // 部门
    "moduleCoreStaff": baseUrl + "Admin/goodcatch/m/core/staff", // 员工
    "moduleCoreDatasources": baseUrl + "Admin/goodcatch/m/core/datasources", // 数据源
    "moduleCoreDatabases": baseUrl + "Admin/goodcatch/m/core/databases", // 数据库信息
    "moduleCoreConnections": baseUrl + "Admin/goodcatch/m/core/connections", // 连接
    "moduleCoreDataRoutes": baseUrl + "Admin/goodcatch/m/core/data_routes", // 数据路径
    "moduleCoreDataMaps": baseUrl + "Admin/goodcatch/m/core/data_maps", // 数据映射
    "moduleCoreTestConnection": baseUrl + "Admin/goodcatch/m/core/connections/test", // 测试连接
    "moduleCoreSchedules": baseUrl + "Admin/goodcatch/m/core/schedules", // 计划与任务
};
