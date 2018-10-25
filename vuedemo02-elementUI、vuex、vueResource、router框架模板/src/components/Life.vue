<template>
	<!-- 所有的内容要被根节点包含起来 -->
	<div id="life">
<!--
		生命周期函数的演示 ---{{msg}}

		<br>
		<button @click="setMsg()">执行方法改变msg</button>
		<button @click="getParentFn()">调用父组件app的属性或方法</button>
		<button @click="getBrother()">点我触发兄弟组件header的方法</button>
		<br><br>
		<router-link v-bind:to="'/LifeDetail?id=2&username=我是post测试&age=25'">
			<button>点我实现get方式动态路由的配置1.1(html内配置)</button>
		</router-link>
		<button @click="getStyleRouter()">点我实现get方式动态路由的配置1.2(js内配置)</button>

		<br><br>

		<router-link v-bind:to="'/LifeDetail/2/post/我是post测试/post/25'">
			<button>点我实现post方式动态路由的配置2.1(html内配置)</button>
		</router-link>

		<button @click="postStyleRouter()">点我实现post方式动态路由的配置2.2(js内配置)</button>
		<br><br>-->
			<!--mint-ui 插件-->
		<mt-button type="default">default</mt-button>
		<mt-button type="primary">primary</mt-button>
		<mt-button type="danger">danger</mt-button>
		<div class="life">    
			<div class="left">
				<ul>
					<li>
						<router-link to="/life/lifeDetail/12/post/我是测试数据/post/25"> 增加用户</router-link>
					</li>
	
					<li>
						<router-link :to="{name:'lifeList'}"> 用户列表</router-link>
					</li>
				</ul>
	
			</div>
	
			<div class="right">
	
				<router-view></router-view>
	
			</div>
		 </div>    
	</div>
</template>
<script>
	/*

	  生命周期函数/生命周期钩子： 

	    组件挂载、以及组件更新、组件销毁的时候触发的一系列的方法  这些方法就叫做生命周期函数
	*/
	import vueEvent from "../model/vueEvent.js"

	export default {
		data() {
			return {
				msg: '我是life组建的msg属性'
			}
		},
		methods: {
			getBrother() {
				//触发$on定义的事件
				vueEvent.$emit("to-header", "我来自life组件");
			},
			setMsg() {
				this.msg = "我是改变后的数据"
			},
			run() {
				alert("我是life组建的run方法");
			},
			/**
			 * 调用父组件的属性和方法
			 */
			getParentFn() {
				this.$parent.msg = this.$parent.msg + "我是通过子组件来动态修改的";
				this.$parent.run();
				alert(this.$parent.msg);
			},

			/**
			 * 动态路由之get方式传值
			 */
			getStyleRouter() {
				this.$router.push({
					path: "/LifeDetail",
					query: {
						id: 1,
						username: "我是get测试",
						age: 25
					}
				});
			},
			/**
			 * 动态路由之post方式传值
			 */
			postStyleRouter() {
				//this.$router.push({path:"/LifeDetail/2/post/我是post测试/post/25",params:{id:2,username:"我是post测试",age:25}});
				this.$router.push({
					name: "lifeDetailName",
					params: {
						id: 2,
						username: "我是post测试",
						age: 25
					}
				});

			},
		},

		beforeCreate() {
			console.log('实例刚刚被创建1');
		},
		created() {
			console.log('实例已经创建完成2');
		},
		beforeMount() {
			console.log('模板编译之前3');
		},
		mounted() { /*请求数据，操作dom , 放在这个里面  mounted*/
//			console.log('模板编译完成4');
//			vueEvent.$on("to-life", function(data) {
//				alert("是header组件触发了我，并传值：" + data);
//			});
		},
		beforeUpdate() {
			console.log('数据更新之前');
		},
		updated() {
			console.log('数据更新完毕');
		},
		beforeDestroy() { /*页面销毁的时候要保存一些数据，就可以监听这个销毁的生命周期函数*/
			console.log('实例销毁之前');
		},
		destroyed() {
			console.log('实例销毁完成');
		}

	}
</script>
<style lang="scss">
	
    .life{

        display:flex;

        .left{

            width:200px;

            min-height:400px;

            border-right:1px solid #eee;

            li{

                line-height:2;
            }
        }

        .right{
            flex:1;
        }
	}
</style>