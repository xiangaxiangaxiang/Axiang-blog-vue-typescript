import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from "./store"

import './plugins/element.js'
import './plugins/fontawesome'
import './plugins/md.js'
import { Component } from 'vue-property-decorator'

Vue.config.productionTip = false

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
])


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
