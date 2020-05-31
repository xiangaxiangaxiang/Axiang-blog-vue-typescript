import Vue from 'vue'
import VueRouter from 'vue-router'
import frontRouter from './front'
import backRouter from './back'

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: {
        name: 'AdminHome'
    }
}, ...frontRouter, ...backRouter]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

export default router;
