<template>
    <!-- 所有的内容要被根节点包含起来 -->
    <div id="life">

          生命周期函数的演示    ---{{msg}}

        <br>
        <button @click="setMsg()">执行方法改变msg</button>
        <button @click="getParentFn()">调用父组件app的属性或方法</button>
        <button @click="getBrother()">点我触发兄弟组件header的方法</button>
    </div>

</template>


<script>
    
/*

  生命周期函数/生命周期钩子： 

    组件挂载、以及组件更新、组件销毁、的时候触发的一系列的方法  这些方法就叫做生命周期函数
*/
   import vueEvent from "../model/vueEvent.js"
    export default{

        data(){

            return{

                msg:'我是life组建的msg属性'
            }
        },
        methods:{
            setMsg(){
                this.msg="我是改变后的数据"
            },
            run(){
            	alert("我是life组建的run方法");
            },
            /**
             * 调用父组件的属性和方法
             */
            getParentFn(){
            	this.$parent.msg = this.$parent.msg +"我是通过子组件来动态修改的";
            	this.$parent.run();
            	alert(this.$parent.msg);
            },
            getBrother(){
            	vueEvent.$emit("to-header","我来自life组件");
            }
        },      

        beforeCreate(){
            console.log('实例刚刚被创建1');
        },
        created(){
            console.log('实例已经创建完成2');
        },
        beforeMount(){
            console.log('模板编译之前3');
        },
        mounted(){     /*请求数据，操作dom , 放在这个里面  mounted*/
            console.log('模板编译完成4');
            vueEvent.$on("to-life",function(data){
            	alert("是header组件触发了我，并传值："+data);
            });
        },
        beforeUpdate(){
            console.log('数据更新之前');
        },
        updated(){
            console.log('数据更新完毕');
        },
        beforeDestroy(){   /*页面销毁的时候要保存一些数据，就可以监听这个销毁的生命周期函数*/
            console.log('实例销毁之前');
        },
        destroyed(){
            console.log('实例销毁完成');
        }


    }
</script>