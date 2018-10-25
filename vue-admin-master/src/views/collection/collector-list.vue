<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
					<el-form-item label="标题" prop="name">
						<el-input v-model="filters.title" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="作者" prop="name">
						<el-input v-model="filters.name" placeholder="请输入作者"></el-input>
					</el-form-item>
					<el-form-item label="注册日期" prop="date">
					 	<el-date-picker v-model="value6"  type="daterange"  range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getUsers">查询</el-button>
					</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table highlight-current-row v-loading="listLoading"  :data="users"  style="width: 100%;">
			<el-table-column type="index" label="编号" width="100">
				<template slot-scope="scope">
					 <span class="demonstration" :farmatter="farmatIndex(scope)">{{ scope.$index }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="昵称" width="150" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100"  sortable>
				<template slot-scope="scope">
		        	<el-tag  v-if="scope.row.sex === 0" :type="'primary'" disable-transitions>女</el-tag>
		        	<el-tag  v-if="scope.row.sex === 1" :type="'success'" disable-transitions>男</el-tag>
		      	</template>
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="100" sortable>
			</el-table-column>
			<el-table-column prop="birth" label="生日" width="120" sortable>
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180" sortable>
			</el-table-column>
			<el-table-column
			      label="操作"
			      width="100">
			      <template slot-scope="scope">
			        <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
			        <el-button type="text" size="small">编辑</el-button>-->
 					<!--<el-button size="small" type="primary" icon="edit" @click="handleEdit(scope.$index, scope.row)" v-show="scope.row.sex==0"></el-button>-->
 					<el-button size="small" type="primary" icon="search" @click="handleEdit(scope.$index, scope.row)"></el-button>
			      </template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"  :page-sizes="[10,15, 20, 30]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total=parseInt(total) style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage } from '../../api/api';

	export default {
		data() {
			return {
				value6:[],
				filters: {
					name: '',
					sex: ''
				},
				users: [],
				total: 0,
				page: 1,//当前页
				pagesize: 15,
				listLoading: false
			}
		},
		methods: {
			/**
			 * 格式化序号
			 * @{Object} scope 传入的对象
			 */
			farmatIndex(scope){
			     return scope.$index =scope.$index + (this.page - 1) * this.pagesize+1;
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					pagesize: this.pagesize,
					name: this.filters.name,
					sex: this.filters.sex,
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			handleSizeChange(val) {
				this.pagesize = val;
				this.getUsers();
			}
		},
		mounted() {
			this.getUsers();
		}
	}
</script>

<style scoped>

</style>