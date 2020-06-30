/*
 * @Author: 翔阿翔阿翔
 * @Date: 2020-05-13 22:40:44
 * @LastEditTime: 2020-06-25 16:46:17
 * @Description: 后台管理路由
 * @FilePath: \axiang-blog-vue-typescript\src\router\back.ts
 */
// eslint-disable-next-line no-unused-vars
import { RouteConfig } from 'vue-router'
import Layout from 'components/BackLayout/index.vue'

const backRouter: RouteConfig[] = [{
    path: '/adminLogin',
    component: () => import('back/back-login/index.vue'),
    name: 'AdminLogin',
    meta: {
        title: '后台管理登陆'
    }
}, {
    path: '/edit-article',
    component: () => import('back/edit-article/index.vue'),
    name: 'EditArticle',
    meta: {
        title: '编辑文章'
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
}, {
    path: '/admin/article',
    component: Layout,
    redirect: {
        name: 'ArticleManagement'
    },
    meta: {
        title: '文章管理',
        icon: 'book-open'
    },
    children: [{
        path: '/admin/article/manage',
        name: 'ArticleManagement',
        component: () => import('back/article-lists/index.vue'),
        meta: {
            title: '文章列表',
            icon: 'list-ul'
        }
    }]
}, {
    path: '/admin/user-management',
    component: Layout,
    redirect: {
        name: 'UserManagement'
    },
    meta: {
        title: '用户管理',
        icon: 'users'
    },
    children: [{
        path: '/admin/user-management',
        name: 'UserManagement',
        component: () => import('back/user/index.vue'),
        meta: {
            title: '用户管理',
            icon: 'users'
        }
    }]
}, {
    path: '/admin/comment-management',
    component: Layout,
    redirect: {
        name: 'CommentManagement'
    },
    meta: {
        title: '评论管理',
        icon: 'comment'
    },
    children: [{
        path: '/admin/comment-management',
        name: 'CommentManagement',
        component: () => import('back/comments/index.vue'),
        meta: {
            title: '评论管理',
            icon: 'comment'
        }
    }]
}]

export default backRouter