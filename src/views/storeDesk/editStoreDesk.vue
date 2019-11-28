<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/storeDesk' }">门店桌号管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="桌号" prop="deskNo">
                            <el-input-number v-model="editForm.deskNo" :min="0" :max="1000"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="是否开放">
                            <template>
                                <el-radio v-model="editForm.isOpen" label="1">是</el-radio>
                                <el-radio v-model="editForm.isOpen" label="0">否</el-radio>
                            </template>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import {requestSaveDesk,requestDeskInfo} from '../../api/api';
    export default {
        name: 'edit-user-manage',
        data() {
            /* customerId=sessionStorage.getItem('customerId')*/
            var customerId= sessionStorage.getItem('customerId')
            var id=sessionStorage.getItem('id')
            return {
                pathIds: sessionStorage.getItem('pathIds'),
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                id: id,//主表id
                saveLoading: false,
                formLabelWidth: '100px',
                editForm: {
                    customerId:customerId,//门店ID
                    isOpen:'1',
                    deskNo:'',
                },
                param: {
                    pageNo:1,
                    pageSize:0,
                },
                param2: {
                    id:customerId
                },
                rules: {
                    deskNo: [
                        { required: true, message: '请输入桌号', trigger: 'blur' },
                    ],
                },

            }

        },
        methods: {

            //桌号信息
            requestDeskInfo(){
                let _this = this;
                requestDeskInfo({id:this.id}).then(res => {
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            _this.editForm.deskNo = data.deskNo;
                            _this.editForm.isOpen = data.isOpen+'';
                        }
                    }else{
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            goBack() {
                this.$router.push({ path: '/storeDesk' });
            },
            /*主表*/
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let editFormParam ={
                            id:_this.id,

                            deskNo: _this.editForm.deskNo,
                            isOpen: _this.editForm.isOpen,
                            customerId: _this.editForm.customerId,

                        };
                        requestSaveDesk(editFormParam).then(res => {
                            if(res.status==400){
                                this.$message({
                                    type: 'error',
                                    message: res.msg,
                                    duration:1000,
                                });
                                _this.saveLoading = false;
                                return false;
                            }
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.goBack();
                                    _this.saveLoading = false;

                                }
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },


        },
        beforeMount() {
            if(this.id){
                this.requestDeskInfo();
            }
        }
    }
</script>
<style scoped lang="scss">
    .el-breadcrumb{
        line-height: 4;
        padding-left: 20px;
        background-color: #ffffff;
    }
    .contentBody{
        margin: 20px;
        background-color: #ffffff;
        padding: 20px;
        .el-pagination{
            padding-top: 10px;
        }
        .el-aside{
            width: auto;
            height: 700px;
        }
    }
    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .self-select-width{
        width: 100%;
    }
    .self-cascader-width{
        width: 50%;
    }
</style>
