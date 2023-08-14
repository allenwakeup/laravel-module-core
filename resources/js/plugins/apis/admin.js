import { moduleUrl } from '@this/plugins/function'

// resources/views/index.blade.php 文件里面定义的全局变量 baseUrl
// 内容大概是 http://xxxxx.com/api/
const window_base_url = (window.baseUrl || '');
// http://xxxxx.com/api 这里去掉最后一个 / 用来与 moduleUrl 的路径进行拼接
const baseUrl = window_base_url.endsWith('/') ? window_base_url.substring(0, window_base_url.length - 1) : window_base_url;

export default {

    /**
     * 模块化接口
     */

    "adminAttachments": baseUrl + moduleUrl('attachments'), // 附件
    "adminDatasources": baseUrl + moduleUrl('datasources'), // 数据源
    "adminDatabases": baseUrl + moduleUrl('databases'), // 数据库信息
    "adminConnections": baseUrl + moduleUrl('connections'), // 连接
    "adminDataRoutes": baseUrl + moduleUrl('data_routes'), // 数据路径
    "adminDataMaps": baseUrl + moduleUrl('data_maps'), // 数据映射
    "adminTestConnection": baseUrl + moduleUrl('connections/test'), // 测试连接
    "adminSchedules": baseUrl + moduleUrl('schedules'), // 计划与任务
};
