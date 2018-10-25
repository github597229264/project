<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
					<el-form-item label="标题" prop="name">
						<el-input v-model="filters.title" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="作者" prop="author">
						<el-input v-model="filters.author" placeholder="请输入作者"></el-input>
					</el-form-item>
					<el-form-item label="推荐者" prop="presenter">
						<el-input v-model="filters.presenter" placeholder="请输入推荐者"></el-input>
					</el-form-item>
					<el-form-item label="状态" prop="status">
						<el-select v-model="filters.status" placeholder="请选择状态">
							<el-option label="未审核" value="1"></el-option>
							<el-option label="通过未启用" value="2"></el-option>
							<el-option label="通过已启用" value="3"></el-option>
							<el-option label="审核不通过" value="4"></el-option>
							<el-option label="未知状态" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="注册日期" prop="date">
					 	<el-date-picker v-model="value6"  type="daterange"  range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getRecommends">查询</el-button>
					</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table highlight-current-row v-loading="listLoading"  :data="recommends" >
			<el-table-column type="index" label="编号" width="70">
				<template slot-scope="scope">
					 <span class="demonstration" :farmatter="farmatIndex(scope)">{{ scope.$index }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="presenter" label="推荐者" width="150" sortable>
			</el-table-column>
			<el-table-column prop="title" label="推荐文章" width="300" sortable>
			</el-table-column>
			<el-table-column prop="author" label="作者" width="150" sortable>
			</el-table-column>
			<el-table-column prop="recommendDate" label="推荐日期" width="150" sortable>
			</el-table-column>
			<el-table-column prop="publishDate" label="发布日期" width="150" sortable>
			</el-table-column>
			<el-table-column prop="status" label="状态"   sortable>
				<template slot-scope="scope">
		        	<el-tag  v-if="scope.row.status === 1" :type="'danger'">未审核</el-tag>
		        	<el-tag  v-else-if="scope.row.status === 2" :type="'warning'">通过未启用</el-tag>
					<el-tag  v-else-if="scope.row.status === 3" :type="'success'">通过已启用</el-tag>
		        	<el-tag  v-else-if="scope.row.status === 4" :type="'primary'">审核不通过</el-tag>
		        	<el-tag  v-else :type="'info'">未知状态</el-tag>
		      	</template>
			</el-table-column>
			<el-table-column  label="操作" width="200">
			      <template slot-scope="scope">
			        <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
			        <el-button type="text" size="small">编辑</el-button>-->
 					<!--<el-button size="small" type="primary" icon="edit" @click="handleEdit(scope.$index, scope.row)" v-show="scope.row.sex==0"></el-button>-->
 					<el-button size="small"   @click="handleDetail(scope.$index, scope.row)">详情</el-button>
	                <el-button v-if="scope.row.status === 1" size="small" @click="handleAuditing(scope.$index, scope.row)" >审核</el-button> 
	                <el-button v-if="scope.row.status === 2" size="small" @click="handleEnabled(scope.$index, scope.row)">启用</el-button>
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
	import { getRecommendListPage } from '../../api/api';

	export default {
		data() {
			return {
				value6:[],
				filters: {
					presenter: '',
					title:'',
					author:'',
					status: ''
				},
				recommends: [],
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
				this.getRecommends();
			},
			//获取用户列表
			getRecommends() {
				let para = {
					page: this.page,
					pagesize: this.pagesize,
					presenter: this.filters.presenter,
					status: this.filters.status,
					title:this.filters.title,
					author:this.filters.author
				};
				this.listLoading = true;
				//NProgress.start();
				getRecommendListPage(para).then((res) => {
					this.total = res.data.total;
					this.recommends = res.data.recommends;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			handleSizeChange(val) {
				this.pagesize = val;
				this.getRecommends();
			},
			/**
			 * 打开详情页
			 * @param {Object} index 数据序号
			 * @param {Object} row 数据对象
			 */
			handleDetail: function(index,row){
				this.$router.push(
					{
						name:'推荐文章详情',
//						path:'/recommend/recommend-detail/:id',
						params:{
							id:row.id
						}
					}
				);
			},
			/**
			 * 审核 文章
			 * @param {Object} index 数据序号
			 * @param {Object} row 数据对象
			 */
			handleAuditing: function(index,row){
		        this.$prompt('请输入审核通过/不通过的原因', '审核推荐文章', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          inputPattern:  /\s+/g,
		          inputErrorMessage: '请输入审核备注'
		        }).then(({ value }) => {
//		          this.$message({
//		            type: 'success',
//		            message: '你的邮箱是: ' + value
//		          });
//					this.listLoading = true;
//					let para = { id: row.id };
//					removeUser(para).then((res) => {
//						this.listLoading = false;
//						this.$message({
//							message: '删除成功',
//							type: 'success'
//						});
//						this.getUsers();
//					});
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '取消输入'
		          });       
		        });
			},
			/**
			 * 启用文章
			 * @param {Object} index 数据序号
			 * @param {Object} row 数据对象
			 */
			handleEnabled:function(index,row){
				this.$confirm('确定启用文章：[ '+row.title+' ]?', '推荐文章启用操作', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$message({
		            type: 'success',
		            message: '启用操作成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消启用'
		          });          
		        });
			}
		},
		mounted() {
			this.getRecommends();
		}
	}
</script>

<style scoped>

</style>