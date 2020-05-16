/*
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-13 22:40:44
 * @LastEditTime: 2020-05-16 16:14:22
 * @Description: 后台管理路由
 * @FilePath: \axiang-blog-vue-typescript\src\router\back.ts
 */
// eslint-disable-next-line no-unused-vars
import { RouteConfig } from 'vue-router'

const backRouter: RouteConfig[] = [{
    path: '/adminLogin',
    component: () => import('back/BackLogin/index.vue'),
    name: 'AdminLogin',
    meta: {
        title: '后台管理登陆'
    }
}]

export default backRouter