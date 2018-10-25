<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
					<el-form-item label="标题" prop="title">
						<el-input v-model="filters.title" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="作者" prop="author">
						<el-input v-model="filters.author" placeholder="请输入作者"></el-input>
					</el-form-item>
					<el-form-item label="推荐者" prop="presenter">
						<el-input v-model="filters.presenter" placeholder="请输入推荐者"></el-input>
					</el-form-item>
					<el-form-item label="状态" prop="status">
						<el-select v-model="filters.status" placeholder="请选择文章状态">
							<el-option label="等待发布" value="1"></el-option>
							<el-option label="定时发布" value="2"></el-option>
							<el-option label="发布中" value="3"></el-option>
							<el-option label="已过期" value="4"></el-option>
							<el-option label="已删除" value="5"></el-option>
							<el-option label="未知状态" value="6"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="日期" prop="date">
					 	<el-date-picker v-model="value6"  type="daterange"  range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getArticles">查询</el-button>
					</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table highlight-current-row v-loading="listLoading"  :data="articles"  style="width: 100%;">
			<el-table-column type="index" label="编号" width="70">
				<template slot-scope="scope">
					 <span class="demonstration" :farmatter="farmatIndex(scope)">{{ scope.$index }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="presenter" label="推荐者" width="150" sortable>
			</el-table-column>
			<el-table-column prop="title" label="文章标题" width="300" sortable>
			</el-table-column>
			<el-table-column prop="author" label="作者" width="150" sortable>
			</el-table-column>

			<el-table-column prop="addDate" label="添加日期" width="150" sortable>
			</el-table-column>
			<el-table-column prop="publishDate" label="发布日期" width="150" sortable>
			</el-table-column>
			<el-table-column prop="status" label="状态"   sortable>
				<template slot-scope="scope">
		        	<el-tag  v-if="scope.row.status === 1" :type="'warning'">等待发布</el-tag>
		        	<el-tag  v-else-if="scope.row.status === 2" :type="'danger'">定时发布</el-tag>
					<el-tag  v-else-if="scope.row.status === 3" :type="'success'">发布中</el-tag>
		        	<el-tag  v-else-if="scope.row.status === 4" :type="'primary'">已过期</el-tag>
		        	<el-tag  v-else-if="scope.row.status === 5" :type="'unknown'">已删除</el-tag>
		        	<el-tag  v-else  :type="'info'">未知状态</el-tag>
		      	</template>
			</el-table-column>
			<el-table-column label="操作" width="270">
			    <template slot-scope="scope">
 					<el-button size="small"   @click="handleDetail(scope.$index, scope.row)">详情</el-button>
	                <el-button v-show="scope.row.status === 1 || scope.row.status === 2 || scope.row.status === 3" size="small" @click="handleEdit(scope.$index, scope.row)" >编辑</el-button> 
	                <el-button v-show="scope.row.status === 1 || scope.row.status === 2 || scope.row.status === 3" size="small" @click="handlePublish(scope.$index, scope.row)" >发布</el-button> 
	                <el-button v-show="scope.row.status !== 3 && scope.row.status !== 5" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			    </template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"  :page-sizes="[10,15, 20, 30]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total=parseInt(total) style="float:right;">
			</el-pagination>
		</el-col>
		<el-dialog title="文章发布" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
			<el-form-item label="发布方式" :label-width="formLabelWidth">
				<el-radio-group v-model="infoForm.resource">
					<el-radio label="立即发布"></el-radio>
					<el-radio label="定时发布"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="活动日期" :label-width="formLabelWidth">
				<el-date-picker type="date" placeholder="选择日期" v-model="infoForm.date1" ></el-date-picker>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
	</section>
</template>
<style>
	/*未知状态*/
	.el-tag--unknown {
	    background-color: rgba(0,0,0,0);
	    border-color: rgba(131,145,165,.2);
	    color: #8391A5;
	}
</style>
<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getArticleListPage } from '../../api/api';

	export default {
		data() {
			return {
				value6:[],
				filters: {
					presenter: '',
					status: ''
				},
				articles: [],
				total: 0,
				page: 1,//当前页
				pagesize: 15,
				listLoading: false,
				dialogFormVisible: false//dialog的显示状态控制
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
				this.getArticles();
			},
			//获取用户列表
			getArticles() {
				let para = {
					page: this.page,
					pagesize: this.pagesize,
					presenter: this.filters.presenter,
					status: this.filters.status,
				};
				this.listLoading = true;
				//NProgress.start();
				getArticleListPage(para).then((res) => {
					this.total = res.data.total;
					this.articles = res.data.articles;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			handleSizeChange(val) {
				this.pagesize = val;
				this.getArticles();
			},
			handleCommand:function(command){
				var h=0;
			},
			/**
			 * 打开详情页
			 * @param {Object} index 数据序号
			 * @param {Object} row 数据对象
			 */
			handleDetail: function(index,row){
				this.$router.push(
					{
						name:'添加文章',
//						path:'/recommend/recommend-detail/:id',
						params:{
							id:row.id
						}
					}
				);
			},
			/**
			 * 打开编辑页
			 * @param {Object} index 数据序号
			 * @param {Object} row 数据对象
			 */
			handleEdit: function(index,row){
				this.$router.push(
					{
						name:'添加文章',
//						path:'/recommend/recommend-detail/:id',
						params:{
							id:row.id
						}
					}
				);
			},
			/**
			 * 删除文章
			 * @param {Object} index 数据序号
			 * @param {Object} row 数据对象
			 */
			handleDelete:function(index,row){
				this.$confirm('确定删除文章：[ '+row.title+' ]?', '文章删除操作', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$message({
		            type: 'success',
		            message: '删除操作成功!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			},
			/**
			 * 发布文章
			 * @param {Object} index 数据序号
			 * @param {Object} row 数据对象
			 */
			handlePublish:function(index,row){
				this.data.dialogFormVisible = true;
			}
		},
		mounted() {
			this.getArticles();
		}
	}
</script>

<style scoped>

</style>