/*
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-13 22:40:36
 * @LastEditTime: 2020-08-08 17:45:56
 * @LastEditors: Please set LastEditors
 * @Description: 博客路由
 * @FilePath: \axiang-blog-vue-typescript\src\router\front.ts
 */
// eslint-disable-next-line no-unused-vars
import { RouteConfig } from 'vue-router'
import Layout from 'components/FrontLayout/index.vue'

const frontRouter: Array<RouteConfig> = [{
    path: '/home',
    component: () => import('frontViews/home/index.vue'),
    name: 'Home',
    meta: {
        title: '主页'
    }
}, {
    path: '/article/:type',
    component: Layout,
    redirect: {
        name: 'Article'
    },
    children: [{
        path: '/article/:type',
        name: 'Article',
        props: true,
        component: () => import('frontViews/article/index.vue'),
        meta: {
            title: '文章'
        }
    }]
}]

export default frontRouter