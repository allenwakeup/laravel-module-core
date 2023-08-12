import Vue from 'vue'
import Router from 'vue-router'
import admin from './routers/admin' // 后台路由

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        ...admin,
        {path: '/Admin/goodcatch/m/core/*', name: '404', component: () => import('@this/views/Error/404')},
    ]
})
