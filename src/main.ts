import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from "./store"

import './plugins/fontawesome'
import './plugins/md.js'

// eslint-disable-next-line
// @import './common/stylus/index.styl'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
