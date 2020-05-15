import Vue from 'vue'
import VueRouter from 'vue-router'
import frontRouter from './front'
import backRouter from './back'

Vue.use(VueRouter);

const routes = [...frontRouter, ...backRouter]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
