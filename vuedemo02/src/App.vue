<template>
	<!--在vue的模板里面  所有的内容要被一个根节点包含起来-->
	<div id="app">
		<router-link to="/header">Header</router-link>
		<router-link to="/life">Life</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
	import storage from "./model/storage.js"

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
		beforeCreate() {//1.实例刚刚被创建
			
		},
		created() {//2.实例已经创建完成

		},
		beforeMount() {//3.模板编译之前
			
		},
		mounted() {/*请求数据，操作dom , 放在这个里面  mounted*/
			this.getData();
		},
		beforeUpdate() {// 数据更新之前
			
		},
		updated() {//数据更新完毕
			
		},
		beforeDestroy() { /*实例销毁之前  页面销毁的时候要保存一些数据，就可以监听这个销毁的生命周期函数*/
			
		},
		destroyed() {//实例销毁完成
			
		}
	}
</script>

<style lang="scss">

</style>