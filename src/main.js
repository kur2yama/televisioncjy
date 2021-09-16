import Vue from 'vue'
import App from './App.vue'
import VueAliplayerV2  from 'vue-aliplayer-v2'
import '../src/utils/jssdk'
import less from 'less'


Vue.config.productionTip = false

Vue.use(VueAliplayerV2);
Vue.use(less)

new Vue({
  render: h => h(App),
}).$mount('#app')
