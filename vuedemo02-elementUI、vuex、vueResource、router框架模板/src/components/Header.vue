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

		<button @click="incCount()">增加数量</button>
		<br><br>
		<br><br>
		<ul>
			<li v-for="item in list">
				{{item.title}}
			</li>
		</ul>
	</div>
</template>

<script>
	import vueEvent from "../model/vueEvent.js"
	import store from '../vuex/store.js' //
	export default {
		store,
		data() {
			return {
				msg: "我是header组件",
				list: []
			}
		},
		methods: {
			incCount(){ //改变vuex store里面的数据
				 //触发 mutations 改变 state里面的数据
				this.$store.commit("incCount");
				
				//触发 actions里面的方法  
				this.$store.dispatch("incMutationsCount");
				
				//触发 getters里面的方法
				this.$store.getters.computedCount();
			},
			getParent() {
				alert(this.title);
				this.app.run('由header组件getParent触发');
			},
			getBrother() {
				vueEvent.$emit("to-life", "我来自header组件");
			},
			requestData() {
				var api = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
				this.$http.get(api)
					.then(
						(response) => {
							this.list = response.body.result;
							//数据放在store中
							this.$store.commit("addList", response.body.result);
						},
						function(error) {
							console.log(error);
						}
					);
			}
		},
		mounted() {
			var listData = this.$store.state.list;
			if(listData.length > 0) {
				this.list = listData;
			} else {
				this.requestData();
			}

			//定义监听当前实例上的自定义事件。事件可以由vm.$emit触发。
			//回调函数会接收所有传入事件触发函数的额外参数。
			vueEvent.$on("to-header", function(data) {
				alert("是life组件触发了我，并传值：" + data);
			});
		},
		props: ["newsList", "title", "run", "app"]
	}
</script>

<style lang="scss">
	#header {
		background-color: #000;
		color: #fff;
	}
</style>