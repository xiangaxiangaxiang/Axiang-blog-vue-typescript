import Vue from 'vue'
import VueRouter from 'vue-router'
import frontRouter from './front'
import backRouter from './back'

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: {
        name: 'Article'
    }
}, ...frontRouter, ...backRouter]

function createRouter() {
    const router = new VueRouter({
        // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
        scrollBehavior: (to, from, savedPosition) => {
            if (savedPosition) {
            return savedPosition
            }
            return { x: 0, y: 0 }
        },
        base: process.env.BASE_URL,
        mode: 'history',
        routes
    })

    router.beforeEach((to, from, next) => {
        document.title = to.meta.title
        next()
    })

    return router
}

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
     // eslint-disable-next-line
    (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
