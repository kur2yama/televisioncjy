import Vue from 'vue'
import App from './App.vue'
import VueAliplayerV2  from 'vue-aliplayer-v2'
import '../src/utils/jssdk'
import less from 'less'
import router from './router'


Vue.config.productionTip = false

Vue.use(VueAliplayerV2);
Vue.use(less)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
