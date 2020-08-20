import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from "./store"
import { formatTime } from './common/js/util'

import './plugins/element.js'
import './plugins/fontawesome'
import './plugins/md.js'
import { Component } from 'vue-property-decorator'
import store from './store'

Vue.config.productionTip = false

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
])

Vue.filter('formatTime', formatTime)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
