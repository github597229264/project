<template>
	<div id="children">
		<h2>{{msg}}--{{this.title}}</h2>
		<ul>
			<li v-for="item in newsList">
				{{item}}
			</li>
		</ul>
		<br><br>
		<button @click="getParent()">点我触发父组件的数据和方法</button>
		<br><br>
		<button @click="this.run('由children组件触发')">点我触发父组件的run方法</button>
		<br><br>
		<!--<button @click="getBrother()">点我触发兄弟组件Life的方法</button>-->
	</div>
</template>

<script>
	//import vueEvent from "../model/vueEvent.js"
	export default{
  		name: 'children',
		data(){
			return {
				msg:"我是children组件"
			}
		},
		methods:{
			getParent(){
				
				//this.title = "我是子组件修改后的title";
				this.$parent.title = "我是子组件修改后的title";
				this.$parent.msg = this.$parent.msg +"我是通过子组件来动态修改的";
            	this.$parent.run("由children组件用$parent触发");
            	//alert(this.$parent.msg);
			},
			getBrother(){
				vueEvent.$emit("to-life","我来自children组件");
			},
			childrenRun(){
				
				alert("我是子组件children中的run方法");
			}
		},
		mounted(){
			
//			vueEvent.$on("to-children",function(data){
//				alert("是life组件触发了我，并传值："+data);
//			});
		},
		props:["title","newsList","run","parent"]
	}
</script>

<style lang="scss">
	#children{
		background-color: #000;
		color: #fff;
	}
</style>