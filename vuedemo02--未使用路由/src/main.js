import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);//使用vue-resource插件



new Vue({
  el: '#app',
  render: h => h(App)
})
