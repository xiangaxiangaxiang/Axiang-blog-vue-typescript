/*
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-13 22:40:36
 * @LastEditTime: 2020-05-16 16:14:08
 * @LastEditors: Please set LastEditors
 * @Description: 博客路由
 * @FilePath: \axiang-blog-vue-typescript\src\router\front.ts
 */
// eslint-disable-next-line no-unused-vars
import { RouteConfig } from 'vue-router'

const frontRouter: Array<RouteConfig> = [{
    path: '/home',
    component: () => import('front/home/index.vue'),
    name: 'Home',
    meta: {
        title: '主页'
    }
}]

export default frontRouter