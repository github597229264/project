import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//state在vuex中用于存储数据
var state={
	count:1,
	list:[]
};
//mutations里面放的是方法,方法主要用于改变state里面的数据
var mutations={
	incCount(){
		++state.count;
	},
    addList(state,data){
        state.list = data;
    }
};
//优点类似计算属性,改变state里面的count数据的时候会触发 getters里面的方法 获取新的值 (基本用不到)
var getters = {
	computedCount:(state)=>{
		return state.count*2;
	}
}
//Action 基本没有用
//Action 类似于 mutation，不同在于：
//Action 提交的是 mutation，而不是直接变更状态。
//Action 可以包含任意异步操作。
var actions ={
	//因此可以调用 context.commit 提交一个 mutation
	incMutationsCount(context){
		//执行 mutations 里面的incCount方法 改变state里面的数据
		context.commit('incCount');
	}
}
const store = new Vuex.Store({
	state:state,
	mutations:mutations,
	getters:getters,
	actions:actions
});
export default store;