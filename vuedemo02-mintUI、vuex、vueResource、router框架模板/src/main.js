import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource' //引入vue-resource插件
import Mint from 'mint-ui'  //引入mint-ui 插件

import './assets/css/basic.scss' //引入基础样式
import 'mint-ui/lib/style.css'  //引入mint-ui 插件的样式

Vue.use(VueResource);//使用vue-resource插件
Vue.use(Mint); //使用mint-ui 插件

import router from "./model/router.js"//引入路由模块

new Vue({
  el: '#app',
  router,//挂载路由
  render: h => h(App)
})
