<template>
	<!--在vue的模板里面  所有的内容要被一个根节点包含起来-->
	<div id="app">
		<!--<v-header v-bind:newsList="newsList" v-bind:title="title" v-bind:run="run" v-bind:app="this"></v-header>
		<button @click="">点我</button>
		<img src="./assets/logo.png">

		<h1>{{ msg }}</h1>
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
		<input ref="msg" type="text" v-model="msg" />
		<button data-aid="111" @click="getAttr($event)">点我</button>
		<v-life v-if="flag" ref="life"></v-life>
		<button @click="getChildFn()">调用子组建life的属性或方法</button>
		<button @click="flag=!flag">注销挂载life组件</button>
		<ul>
			<li v-for="item in appList">
				{{ item.title }}
			</li>
		</ul>-->
		<v-parent></v-parent>
	</div>
</template>

<script>
	import storage from "./model/storage.js"
	import life from "./components/Life.vue"
	import header from "./components/Header.vue"
	import parent from "./components/Parent.vue"

	export default {
		name: 'app',
		data() { //业务逻辑里面定义的数据
			return {
				msg: '我是父组件app.vue,你好 vue',
				title: "我是父组件app.vue的标题",
				flag: true,
				newsList: [{
						"cate": "国内新闻",
						"list": [{
								"title": "国内新闻11"
							},
							{
								"title": "国内新闻22"
							}
						]
					},
					{
						"cate": "国际新闻",
						"list": [{
								"title": "国际新闻11"
							},
							{
								"title": "国际新闻22"
							}
						]
					}
				],
				appList: []
			}
		},
		methods: {
			getAttr: function(e) {
				this.msg = "测试ref";
				var oInput = this.$refs.msg; //获取DOM节点
				storage.set("newsList", this.newsList);
				console.log(storage.get("newsList"));
				storage.remove("newsList");
				console.log(e.srcElement.dataset.aid + "==" + oInput.value);
			},
			getData: function() {
				var uri = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=2";
				this.$http.get(uri).then(response => {
					this.appList = response.body.result;
					console.log(response);
				}, response => {
					console.log(response);
				});
			},
			run(m) {
				alert("我是app.vue的run方法" + m);
			},
			/**
			 * 获取子组件的属性和方法 
			 */
			getChildFn() {
				this.$refs.life.run();
				alert(this.$refs.life.msg);
			}

		},
		mounted() {
			this.getData();
		},
		components: {
			"v-life": life,
			"v-header": header,
			"v-parent": parent
		}
	}
</script>

<style lang="scss">

</style>