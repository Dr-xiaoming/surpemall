import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
//Vue4 creatApp().config.globalProperties.bus
//vue3.x用 app.config.globalProperties.$bus=bus

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
