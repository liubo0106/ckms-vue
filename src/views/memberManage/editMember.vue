<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>会员管理</el-breadcrumb-item>
            <!--<el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>-->
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">


                <el-row>
                    <el-col :span="8">
                        <el-form-item label="姓名" prop="name" style="width: 360px">
                            <el-input placeholder='请输入' v-model="editForm.name" :maxlength="25" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电话" prop="phone" style="width: 360px">
                            <el-input placeholder='请输入' v-model="editForm.phone" :maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="金额" prop="amount" style="width: 360px">
                            <el-input placeholder='请输入' v-model="editForm.amount" :maxlength="25" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="折扣" prop="discount" style="width: 360px">
                            <el-input placeholder='请输入' v-model="editForm.discount" :maxlength="25" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item  label="门店" >
                            <el-select v-model="editForm.customerId" placeholder="请选择" :disabled="disabled2" @change="changeStore" style="width: 260px">
                                <el-option v-for="item in customerList" :label="item.name"   :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="微信号" prop="wechat" style="width: 360px">
                            <el-input placeholder='请输入' v-model="editForm.wechat" :maxlength="55"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
               <!-- <el-form-item label="等级" prop="level">
                    <el-input placeholder='请输入' v-model="editForm.level" :maxlength="50"></el-input>
                </el-form-item>-->

                <el-form-item label="备注" prop="remark">
                    <el-input  type="textarea" placeholder='请输入' v-model="editForm.remark" :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestMemberInfo, requestSaveMember,requestSearchClient} from '../../api/api';
    export default {
        name: 'edit-user-manage',
        data() {
            let customerId= sessionStorage.getItem('customerId')
            let customerName= sessionStorage.getItem('customerName')
            if(customerId=="null"){
                customerId='-'
            }
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
                flag:sessionStorage.getItem('flag'),
                id: '',
                disabled: false,
                disabled2:false,//门店
                saveLoading: false,
                customerList:[],//门店
                editForm: {
                    name: '',
                    phone: '',
                    amount: '',
                    discount: '',
                    level: '',
                    customerName: customerName,
                    wechat: '',
                    remark: '',
                    customerId:customerId,
                },
                ceshi:'',
                checkAll: false,
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入电话', trigger: 'blur' },
                        { validator: validatePhone, trigger: 'blur' }
                    ],

                },
                param: {
                    pageNo:1,
                    pageSize:0,
                    customerId:customerId,
                },
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
            }
        },
        methods: {
            changeStore(val){
                let tn = {};
                tn = this.customerList.find((item)=>{
                    return item.id === val;
                });
                this.editForm.customerName = tn.name;
            },

            requestSupplierInfo(){
                let _this = this;
                requestMemberInfo({id:this.id}).then(res => {
                    if(res.status == 200){
                        this.disabled = !this.disabled
                        let data = res.data;
                        if (data) {
                            _this.editForm.name = data.name;
                            _this.editForm.phone = data.phone;
                            _this.editForm.amount = data.amount;
                            _this.editForm.discount = data.discount;
                            _this.editForm.level = data.level;
                            _this.editForm.customerName = data.customerName;
                            _this.editForm.customerId = data.customerId;
                            _this.editForm.wechat = data.wechat;
                            _this.editForm.remark = data.remark;
                        }
                    }else{
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            //请求门店
            getAjaxSupplier(){
                let _this = this;
                requestSearchClient(_this.param).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.customerList = data;
                    }else{
                        _this.customerList = [];
                    }
                });
            },
            goBack() {
                this.$router.push({ path: '/memberManage' });
            },
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        if(this.flag!='store'){
                            _this.editForm.customerName=_this.editForm.customerName;

                        }
                        let editFormParam ={
                            name: _this.editForm.name,
                            phone: _this.editForm.phone,
                            amount: _this.editForm.amount,
                            discount: _this.editForm.discount,
                            level: _this.editForm.level,
                            customerName: _this.editForm.customerName,
                            customerId: _this.editForm.customerId,
                            wechat: _this.editForm.wechat,
                            remark: _this.editForm.remark,

                        };
                        requestSaveMember(editFormParam).then(res => {
                            if(res.status==400){
                                this.$message({
                                    type:'error',
                                    message:res.msg,
                                    duration:1000,
                                })
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
            }
        },
        beforeMount() {
            let id = sessionStorage.getItem('id');
            if(id){
                this.id=id;
                this.requestSupplierInfo();
            }
            this.getAjaxSupplier();
            if(this.flag=='store'){
                this.disabled2 = true;
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
