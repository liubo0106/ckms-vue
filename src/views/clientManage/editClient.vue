<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>门店管理</el-breadcrumb-item>
            <!--<el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>-->
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="140px" class="demo-ruleForm">
                <el-form-item label="门店名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input placeholder='请输入' v-model="editForm.contact" :maxlength="15"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input placeholder='请输入' v-model="editForm.phone" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input placeholder='请输入' v-model="editForm.address" :maxlength="50"></el-input>
                </el-form-item>
                <!--<el-form-item label="门店编号标识" >-->
                    <!--<el-input placeholder='请输入' v-model="editForm.storeNo" :maxlength="50"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="微信小程序appid" >-->
                    <!--<el-input placeholder='请输入' v-model="editForm.appid" :maxlength="50"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="微信小程序secret" >-->
                    <!--<el-input placeholder='请输入' v-model="editForm.secret" :maxlength="50"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="微信支付商户号" >-->
                    <!--<el-input placeholder='请输入' v-model="editForm.mchId" :maxlength="50"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="微信支付商户密钥" >-->
                    <!--<el-input placeholder='请输入' v-model="editForm.mchKey" :maxlength="50"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestClientInfo, requestSaveClient,} from '../../api/api';
    export default {
        name: 'edit-user-manage',
        data() {
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    let myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                    if (!myreg.test(value)) {
                        callback(new Error('请输入正确的手机号'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                id: '',
                saveLoading: false,
                editForm: {
                    name: '',
                    phone: '',
                    contact: '',
                    address: '',
                   /* storeNo: '',
                    appid: '',
                    secret: '',
                    mchId: '',
                    mchKey: '',*/
                },
                checkAll: false,

                rules: {

                     name: [
                         { required: true, message: '请输入门店名称', trigger: 'blur' },

                     ],
                    phone: [
                        { required: true, message: '请输入电话', trigger: 'blur' },
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    contact: [
                        { required: true, message: '请输入联系人', trigger: 'blur' },

                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ],

                },

                headers: {'sessionId': sessionStorage.getItem('sessionId')},
            }
        },
        methods: {
            requestClientInfo(){
                let _this = this;
                requestClientInfo({id:this.id}).then(res => {
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            _this.editForm.name = data.name;
                            _this.editForm.phone = data.phone;
                            _this.editForm.contact = data.contact;
                            _this.editForm.address = data.address;
                            /*_this.editForm.storeNo = data.storeNo;
                            _this.editForm.appid = data.appid;
                            _this.editForm.secret = data.secret;
                            _this.editForm.mchId = data.mchId;
                            _this.editForm.mchKey = data.mchKey;*/
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
                this.$router.push({ path: '/clientManage' });
            },
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let editFormParam ={
                            name: _this.editForm.name,
                            phone: _this.editForm.phone,
                            contact: _this.editForm.contact,
                            address: _this.editForm.address,
                           /* storeNo: _this.editForm.storeNo,
                            appid: _this.editForm.appid,
                            secret: _this.editForm.secret,
                            mchId: _this.editForm.mchId,
                            mchKey: _this.editForm.mchKey,*/
                            id : _this.id,
                            status:0

                        };
                        requestSaveClient(editFormParam).then(res => {
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
            }
        },
        beforeMount() {
            let id = sessionStorage.getItem('id');
            if(id){
                this.id=id;
                this.requestClientInfo();
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