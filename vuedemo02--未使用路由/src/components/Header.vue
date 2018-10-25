<template>
	<div id="header">
		<h2>{{title}}</h2>
		<!--<ul>
			<li v-for="item in newsList">
				{{item}}
			</li>
		</ul>-->
		<button @click="run('由header组件触发')">点我触发父组件的run方法</button>
		<button @click="getParent()">点我触发父组件的数据和方法</button>
		<button @click="getBrother()">点我触发兄弟组件Life的方法</button>
	</div>
</template>

<script>
	import vueEvent from "../model/vueEvent.js"
	export default{
		data(){
			return {
				msg:"我是header组件"
			}
		},
		methods:{
			getParent(){
				alert(this.title);
				
				this.app.run('由header组件getParent触发');
			},
			getBrother(){
				vueEvent.$emit("to-life","我来自header组件");
			}
		},
		mounted(){
			vueEvent.$on("to-header",function(data){
				alert("是life组件触发了我，并传值："+data);
			});
		},
		props:["newsList","title","run","app"]
	}
</script>

<style lang="scss">
	#header{
		background-color: #000;
		color: #fff;
	}
</style>