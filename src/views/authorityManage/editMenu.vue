<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/menu' }">菜单管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{menuId == '' ? '添加菜单': '编辑菜单'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="父节点">
                    <template>
                        <el-cascader
                                :clearable = 'true'
                                :props="props"
                                placeholder = '请选择父节点'
                                v-model="editForm.parentId"
                                change-on-select
                                :options="menuList"
                                :show-all-levels="false">
                        </el-cascader>
                    </template>
                </el-form-item>
                <el-form-item label="菜单名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="15"></el-input>
                </el-form-item>
                <el-form-item label="前台路由" prop="path">
                    <el-input placeholder='请输入/path' v-model="editForm.path" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="菜单编码" prop="code">
                    <el-input placeholder='请输入' v-model="editForm.code" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="URL" prop="url">
                    <el-input placeholder='请输入' v-model="editForm.url" :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon">
                    <el-input placeholder='请输入' v-model="editForm.icon" :maxlength="200">
                        <template slot="append">
                            <el-button type="text" @click="goCopy">去复制</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="序列" prop="num">
                    <el-input type="age" placeholder='请输入' v-model.number="editForm.num" :maxlength="2"></el-input>
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
    import { requestMenuInfo, requestAllMenu, requestSaveMenu} from '../../api/api';
    export default {
        name: 'edit-menu-manage',
        data() {
            return {
                saveLoading: false,
                menuId: '',
                editForm: {
                    num: 0,
                    url: '',
                    name: '',
                    parentId: [],
                    icon: '',
                    path: '',
                    code: ''
                },
                menuList: [],//后台菜单列表
                props: {
                    value: 'id',
                    label: 'name'
                },
                rules: {
                    code: [
                        { required: true, message: '请输入菜单编码', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 1 到 15 个字', trigger: 'blur' }
                    ],
                    num: [
                        { required: true, message: '请输入序列', trigger: 'blur' },
                        { type: 'number', message: '序列必须为数字', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            getAjaxMenuInfo(){
                let _this = this;
                requestMenuInfo({id:this.menuId}).then(res => {
                    let data = res.data;
                    if (data) {
                        _this.editForm.name = data.name;
                        _this.editForm.code = data.code;
                        _this.editForm.num = data.num;
                        _this.editForm.url = data.url;
                        _this.editForm.path = data.path;
                        _this.editForm.icon = data.icon;
                        //回显时碰到一个问题需要后台协调，新增数组字段，来支持回显
                        _this.editForm.parentId.push(data.parentId);
                    } else {
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                }).then(res =>{
                    _this.getAjaxAllMenu();
                });
            },
            getAjaxAllMenu(){
                let _this = this;
                requestAllMenu().then(res => {
                    let data = res.data;
                    if (data && data.length>0) {
                        _this.menuList = data;
                    } else {
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            goCopy() {
                window.open('https://element.faas.ele.me/#/zh-CN/component/icon');
            },
            goBack() {
                this.$router.push({ path: '/menu' });
            },
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let pp = _this.editForm.parentId;
                        let editFormParam ={
                            code: _this.editForm.code,
                            name: _this.editForm.name,
                            id : _this.menuId,
                            num: _this.editForm.num,
                            url: _this.editForm.url,
                            parentId: pp.length>0 ? pp[pp.length-1].toString() : 0,
                            icon: _this.editForm.icon,
                            path: _this.editForm.path,
                            type: 'M'
                        };
                        requestSaveMenu(editFormParam).then(res => {
                            if(res.status == '200'){
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.goBack();
                                        _this.saveLoading = false;
                                    }
                                });
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.msg,
                                    duration:3000,
                                    onClose:function(){
                                        _this.saveLoading = false;
                                    }
                                });
                            }
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        beforeMount() {
            let id = sessionStorage.getItem('menuId');
            this.menuId = id;
            if(id){
                this.getAjaxMenuInfo();
            }else{
                this.getAjaxAllMenu();
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
        .red-span{
            content: '*';
            color: #f56c6c;
            margin-right: 4px;
        }
    }
</style>