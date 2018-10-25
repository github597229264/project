import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource' //引入vue-resource插件
import ElementUI from 'element-ui'  //引入element-ui 插件

import './assets/css/basic.scss' //引入基础样式
import 'element-ui/lib/theme-chalk/index.css'  //引入element-ui 插件的样式

Vue.use(VueResource);//使用vue-resource插件
Vue.use(ElementUI); //使用element-ui 插件

import router from "./model/router.js"//引入路由模块

new Vue({
  el: '#app',
  router,//挂载路由
  render: h => h(App)
})
