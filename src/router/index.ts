import Vue from 'vue'
import VueRouter from 'vue-router'
import frontRouter from './front'

Vue.use(VueRouter);

const routes = [...frontRouter]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
