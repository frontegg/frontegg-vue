import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fronteggCore from './plugins/fronteggCore'
import fronteggAuth from './plugins/fronteggAuth'
import fronteggAudits from './plugins/fronteggAudits'

Vue.config.productionTip = false
Vue.use(fronteggCore)
Vue.use(fronteggAuth)
Vue.use(fronteggAudits)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
