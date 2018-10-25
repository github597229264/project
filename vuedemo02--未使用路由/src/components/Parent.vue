<template>
	<!--在vue的模板里面  所有的内容要被一个根节点包含起来-->
  <div id="parent">
    
     <button @click="">点我</button>
    
    <h1>{{ title }}</h1>
    <details v-for="news in newsList">
	    <summary>{{ news.cate }}</summary>
    	<p>
	    	<ol>
		    	<li v-for="o in news.list">
		    		{{ o.title }}
		    	</li>
		    </ol>
		</p>
	</details>
	<br><br>
	<!--在父组件Parent.vue中引入组件Children.vue并绑定动态属性-->
	<v-children v-bind:title="title" v-bind:newsList="newsList"  v-bind:run="run" v-bind:parent="this"></v-children>
	<!--以上的简写形式-->
	<!--<v-children :title="title" :newsList="newsList"  :run="run" :parent="this"></v-children>-->
	
	<!--<v-children ref="children"></v-children>
	<br><br>
	<button @click="getChildren()">点我调用子组件childRen的属性和方法</button>-->
  </div>
</template>
<script>
//import storage from "../model/storage.js"
// 引入子组件 Children.vue
import children from "./Children.vue"
export default {
  name: 'parent',
  data () { //业务逻辑里面定义的数据
    return {
      msg: '我是父组件parent.vue,你好 vue',
      title:"我是父组件parent.vue的标题",
      flag:true,
      newsList:[
      	{
      		"cate":"国内新闻",
      		"list":[
      			{"title":"国内新闻11"},
      			{"title":"国内新闻22"}
      		]
      	},
		{
      		"cate":"国际新闻",
      		"list":[
      			{"title":"国际新闻11"},
      			{"title":"国际新闻22"}
      		]
      	}
      ],
      parentList:[]
    }
  },
  methods:{
  	 /**
  	 * 获取子组件的属性和方法 
  	 */
  	getChildren(){
  		console.log(this.$refs.children.msg);//调用子组件children中msg属性
  		this.$refs.children.childrenRun();//调用子组件children中childrenRun方法
  	},
  	run(m){
  		alert("我是parent.vue的run方法"+m);
  	},
  	getAttr:function(e){
		this.msg ="测试ref";
		var oInput = this.$refs.msg; //获取DOM节点
		storage.set("newsList",this.newsList);
		console.log(storage.get("newsList"));
		storage.remove("newsList");
		console.log(e.srcElement.dataset.aid+"=="+oInput.value);
  	},
  	getData:function(){
  		var uri = "http://www.phonegap100.com/parentapi.php?a=getPortalList&catid=20&page=2";
  		this.$http.get(uri).then(response =>{
  			this.parentList = response.body.result;
  			console.log(response);
  		},response =>{
  			console.log(response);
  		});
  	}
  	
  },
  mounted(){
  	this.getData();
  },
  components:{
  	"v-children":children//声明子组件
  }
}
</script>

<style lang="scss">

</style>
