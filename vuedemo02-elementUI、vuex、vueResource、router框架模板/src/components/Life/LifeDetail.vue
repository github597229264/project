<template>
	<div id="lifeDetail">
		<h2>我是lifedetail组件</h2>
		<br>
		<h2>我是life组件传递的值:{{msg}}</h2>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				msg:""
			}
		},
		mounted(){
			//this.msg = this.$route.query;//get方式接收
			this.msg = this.$route.params;//post方式接收
		}
	}
</script>

<style>
</style>