/*
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-13 22:40:36
 * @LastEditTime: 2020-08-10 22:16:15
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
}, {
    path: '/article-detail/:articleId',
    component: Layout,
    redirect: {
        name: 'ArticleDetail'
    },
    children: [{
        path: '/article-detail/:articleId',
        name: 'ArticleDetail',
        props: true,
        component: () => import('frontViews/article-detail/index.vue'),
        meta: {
            title: '文章详情'
        }
    }]
}, {
    path: '/about',
    component: Layout,
    redirect: {
        name: 'About'
    },
    children: [{
        path: '/about',
        name: 'About',
        component: () => import('frontViews/about/index.vue'),
        meta: {
            title: '关于'
        }
    }]
}]

export default frontRouter
