<template>
	<el-form ref="infoForm" :model="infoForm" label-width="80px" @submit.prevent="onSubmit">
		<el-row :gutter="20">
			<el-col :span="10">
				<div class="grid-content bg-purple">
					<el-form-item label="文章标题">
						<el-input v-model="infoForm.name"></el-input>
					</el-form-item>
					<el-form-item label="作者" :span="10">
						<el-input v-model="infoForm.name"></el-input>
					</el-form-item>
					<el-form-item label="推荐者">
						<el-input v-model="infoForm.name"></el-input>
					</el-form-item>
					<el-form-item label="文章状态">
						<el-select v-model="infoForm.region" placeholder="请选择活动区域">
							<el-option label="等待发布" value="1"></el-option>
							<el-option label="定时发布" value="2"></el-option>
							<el-option label="发布中" value="3"></el-option>
							<el-option label="已过期" value="4"></el-option>
							<el-option label="已删除" value="5"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发布方式">
						<el-radio-group v-model="infoForm.resource">
							<el-radio label="立即发布"></el-radio>
							<el-radio label="定时发布"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="活动日期">
						<el-date-picker type="date" placeholder="选择日期" v-model="infoForm.date1" ></el-date-picker>
					</el-form-item>
				</div>
			</el-col>
			<el-col :span="14">
				<div class="grid-content bg-purple">
					<div class="editor-container">
						<UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
					</div>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-form-item>
				<el-button type="primary">立即创建</el-button>
				<el-button @click.native.prevent>取消</el-button>
			</el-form-item>
		</el-row>
	</el-form>
</template>


<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #ffffff;
  }
  .bg-purple {
    background: #ffffff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-form{
  	margin:20px;width:80%;min-width:600px;
  }
</style>
<script>
import UE from '../../components/ue.vue';
export default {
	components: {UE},
    data() {
      return {
      	defaultMsg: '这里是UE测试',
      	config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        infoForm: {
          name: '',
          region: '',
          date1:'',
          date2:'',
          delivery:true,
          type:1,
          resource:'',
          desc:'',
          a_content:'',
          editorOption: {}
        },
        //表单验证
//      rules: {
//        a_title: [
//          {required: true, message: '请输入标题', trigger: 'blur'}
//        ],
//        a_content: [
//          {required: true, message: '请输入详细内容', trigger: 'blur'}
//        ]
//      }
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      //初始化
    },
    methods: {
      onEditorReady(editor) {
      },
      onSubmit() {
        //提交
		//this.$refs.infoForm.validate，这是表单验证
        this.$refs.infoForm.validate((valid) => {
          if(valid) {
            this.$post('m/add/about/us',this.infoForm).then(res => {
              if(res.errCode == 200) {
                this.$message({
                  message: res.errMsg,
                  type: 'success'
                });
                this.$router.push('/aboutus/aboutlist');
              } else {
                this.$message({
                  message: res.errMsg,
                  type:'error'
                });
              }
            });
          }
        });
      },
      /**
       * 获取UE内容
       */
 	  getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      }
    }
  }
</script>