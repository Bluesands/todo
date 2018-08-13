import Vue from 'vue'
import App from './app.vue'
import router from './config/router'

import './assets/styles/global.stylus'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  router,
  render: h => h(App)
}).$mount(root)
