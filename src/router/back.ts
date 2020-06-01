/*
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-13 22:40:44
 * @LastEditTime: 2020-06-01 22:21:27
 * @Description: 后台管理路由
 * @FilePath: \axiang-blog-vue-typescript\src\router\back.ts
 */
// eslint-disable-next-line no-unused-vars
import { RouteConfig } from 'vue-router'
import Layout from 'components/BackLayout/index.vue'

const backRouter: RouteConfig[] = [{
    path: '/adminLogin',
    component: () => import('back/BackLogin/index.vue'),
    name: 'AdminLogin',
    meta: {
        title: '后台管理登陆'
    }
}, {
    path: '/admin/home',
    component: Layout,
    redirect: {
        name: 'AdminHome'
    },
    meta: {
        title: '首页',
        icon: 'home'
    },
    children: [{
        path: '/admin/home',
        name: 'AdminHome',
        component: () => import('back/home/index.vue'),
        meta: {
            title: '首页',
            icon: 'home'
        }
    }]
}]

export default backRouter