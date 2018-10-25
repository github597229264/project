import Vue from 'vue'

//1. 引入路由插件并use
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//2. 引入组件
import Life from "../components/Life.vue"
import Header from "../components/Header.vue"
import LifeDetail from "../components/Life/LifeDetail.vue"
import LifeList from "../components/Life/LifeList.vue"

//3. 配置路由
const routes = [
  { path: '/header', component: Header,name:"header" },
  { 
  	path: '/life', 
  	component: Life,
  	name:'life',
  	children:[//嵌套路由
		  //{ path: '/lifeDetail/:id', component: LifeDetail,name:"lifeDetailName" },//post方式 一个参数传值
		  //{ path: '/lifeDetail/:id/post/:username', component: LifeDetail },//post方式 两个参数传值
		  { path: 'lifeDetail/:id/post/:username/post/:age', component: LifeDetail,name:"lifeDetail"  },//post方式  三个参数传值
		  //{ path: '/lifeDetail', component: LifeDetail,name:"lifeDetailName"  },//post方式  三个参数传值，此处没有在path中声明参数
		  //{ path: '/lifeDetail', component: LifeDetail },//get 方式传值  		
		  {path:'lifeList',component:LifeList,name:"lifeList"}
  	]
  },
  { path: '*', redirect: '/life' }//默认加载的组件
]

//4. 实例化VueRouter 
const router = new VueRouter({
	//mode:"history",//hash模式改为history模式  默认是hash模式
	routes:routes //key：value ， value对应  配置路由的别名 routes
});

//<router-view></router-view> //放在app.vue
export default router;