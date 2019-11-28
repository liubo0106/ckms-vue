<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{userId == '' ? '添加用户': '编辑用户'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder='请输入' v-model="editForm.username" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="15"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input placeholder='请输入' v-model="editForm.phone" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="身份标识" prop="flag">
                    <el-radio-group v-model="editForm.flag">
                        <el-radio label="cka">中央厨房</el-radio>
                        <el-radio label="store">门店</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="店长" prop="isManager">
                    <el-radio-group v-model="editForm.isManager ">
                        <el-radio label=0>否</el-radio>
                        <el-radio label=1>是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="报损单管理员" prop="isLossManager">
                    <el-radio-group v-model="editForm.isLossManager ">
                        <el-radio label=0>否</el-radio>
                        <el-radio label=1>是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="角色分配" prop="checkedRole">
                    <template>
                        <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
                        <el-checkbox-group v-model="editForm.checkedRole" @change="handleCheckedRolesChange">
                            <el-checkbox name="checkedRole" v-for="role in roleList" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-form-item>
                <el-form-item label="头像" prop="avatarBosKey">
                    <template>
                        <el-upload
                                class="avatar-uploader"
                                :action="upLoadAction"
                                :headers = 'headers'
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                    </template>
                </el-form-item>
                <el-form-item label="所属门店" >
                    <el-select v-model="editForm.customerId" placeholder="请选择" @change="changeProduct">
                        <el-option v-for="item in customerList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工作单位">
                    <el-input placeholder='请输入' v-model="editForm.workUnit" :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item label="职位">
                    <el-input placeholder='请输入' v-model="editForm.post" :maxlength="200"></el-input>
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
    import { requestUserInfo, requestAllRole, requestSaveUser, requestUploadFile,requestVerifyUserName,requestOnlyUser,requestSearchClient} from '../../api/api';
    export default {
        name: 'edit-user-manage',
        data() {
            // var validatePhone = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入手机号'));
            //     } else {
            //         let myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            //         if (!myreg.test(value)) {
            //             callback(new Error('请输入正确的手机号'));
            //         } else {
            //             callback();
            //         }
            //     }
            // };
            var validateUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    if(this.oldName === value){
                        callback();
                    }else{
                        requestOnlyUser({username:value}).then(res=>{

                            let data = res.data;
                            if (res.status == 200) {
                                if(data){
                                    callback();
                                }else{
                                    callback(new Error('输入的用户名已存在，请重新输入！'));
                                }
                            }else{
                                callback(new Error('系统异常！'));
                            }
                        });
                    }
                }
            };
            return {
                oldName:'',
                saveLoading: false,
                userId: '',
                editForm: {
                    username: '',
                    name: '',
                    phone: '',
                    checkedRole: [],//默认选中角色
                    workUnit: '',
                    post: '',
                    customerId:'',//门店Id
                    flag: 'cka',
                    isManager:'0',
                    isLossManager:'0',
                },
                checkAll: false,
                roleIdList: [],//角色id
                roleList: null,//后台角色列表
                isIndeterminate: true,//全选按钮状态
                customerList:[],//所属门店
                param: {
                    pageSize:0,
                    status:1
                },
                rules: {
                    checkedRole:[
                        { type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }
                    ],
                    username: [
                        { min: 1, max: 50, message: '长度在 1 到 50 个字', trigger: 'blur' },
                        { validator:validateUserName,trigger:'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 1 到 15 个字', trigger: 'blur' }
                    ],
                    // phone: [
                    //     { required: true, message: '请输入手机号', trigger: 'blur' },
                    //     { validator: validatePhone, trigger: 'blur' }
                    // ],
                    deptArray: [
                        { type: 'array', required: true, message: '请选择', trigger: 'change' }
                    ]
                },
                imageUrl: '',
                upLoadAction: requestUploadFile,
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                avatarBosKey: ''
            }
        },
        methods: {
            getAjaxUserInfo(){
                let _this = this;
                requestUserInfo({id:this.userId}).then(res => {
                    let data = res.data;
                    if (data) {
                        _this.oldName = data.username;
                        _this.editForm.username = data.username;
                        _this.editForm.name = data.name;
                        _this.editForm.phone = data.phone;
                        _this.editForm.checkedRole = data.roleIdList;
                        _this.imageUrl = data.avatarUrl;
                        _this.avatarBosKey = data.avatar;
                        _this.editForm.workUnit = data.workUnit;
                        _this.editForm.post = data.post;
                        _this.editForm.isManager = data.isManager+'';
                        _this.editForm.customerId = data.customerId;
                        _this.editForm.isLossManager=String(data.isLossManager);
                        if(data.flag){
                            _this.editForm.flag = data.flag;
                        }
                    } else {
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            getAjaxAllRole(){
                let _this = this;
                requestAllRole().then(res => {
                    let data = res.data;
                    if (data && data.length>0) {
                        _this.roleList = data;
                        _this.roleList.forEach((p)=>{
                            _this.roleIdList.push(p.id);
                        });
                    } else {
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            handleCheckAllChange(val) {
                this.editForm.checkedRole = val ? this.roleIdList : [];
                this.isIndeterminate = false;
            },
            handleCheckedRolesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.roleIdList.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleIdList.length;
            },
            //原料名称
            changeProduct(val){
                let tn = {};
                tn = this.customerList.find((item)=>{
                    return item.id === val;
                });
            },
            //请求门店信息
            getAjaxProduct(){
                let _this = this;
                requestSearchClient(_this.param).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.customerList = data;
                        }else{
                            _this.customerList = [];
                        }
                    }
                });

            },
            goBack() {
                this.$router.push({ path: '/user' });
            },
            beforeAvatarUpload(file) {
                const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') ;
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleAvatarSuccess(res, file) {
                let data = res.data;
                this.avatarBosKey = data.key;
                if(this.avatarBosKey){
                    this.imageUrl = data.thumbnailUrl;
                }else{
                    this.$message.error('上传失败!');
                }
            },
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let pp = _this.editForm.deptArray;
                        _this.editForm.username = _this.editForm.username.replace(/^\s+|\s+$/g,"");
                        let editFormParam ={
                            username: _this.editForm.username,
                            phone: _this.editForm.phone,
                            name: _this.editForm.name,
                            id : _this.userId,
                            roleIdList: _this.editForm.checkedRole,
                            workUnit: _this.editForm.workUnit,
                            post: _this.editForm.post,
                            avatar: _this.avatarBosKey,
                            customerId: _this.editForm.customerId,//门店
                            flag: _this.editForm.flag,
                            isManager: _this.editForm.isManager,
                            isLossManager:_this.editForm.isLossManager,
                        };
                        requestSaveUser(editFormParam).then(res => {

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
            let id = sessionStorage.getItem('userId');
            this.userId = id;
            if(id){
                this.getAjaxUserInfo();
            }
            this.getAjaxAllRole();
            this.getAjaxProduct();
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
