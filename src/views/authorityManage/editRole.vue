<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/role' }">角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{roleId == '' ? '添加角色': '编辑角色'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="15"></el-input>
                </el-form-item>
                <el-form-item label="角色编码" prop="code">
                    <el-input placeholder='请输入' v-model="editForm.code" :maxlength="15"></el-input>
                </el-form-item>
                <el-form-item>
                    <div slot="label"><span class="red-span">*</span>权限分配</div>
                    <template>
                        <el-tree
                                :check-strictly="true"
                                @check-change="getCheckedKeys"
                                ref="tree"
                                v-model="editForm.checkedMenu"
                                :default-expand-all="true"
                                :data="menuList"
                                show-checkbox
                                node-key="id"
                                :default-checked-keys="editForm.checkedMenu"
                                :props="defaultProps">
                        </el-tree>
                    </template>
                    <div class="el-form-item__error" v-if="validateMenu">
                        请选择权限
                    </div>
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
    import { requestRoleInfo, requestAllMenu, requestSaveRole} from '../../api/api';
    export default {
        name: 'edit-role-manage',
        data() {
            return {
                saveLoading: false,
                roleId: '',
                editForm: {
                    name: '',
                    code: '',
                    checkedMenu: []//默认选中菜单
                },
                menuList: null,//后台菜单列表
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                rules: {
                    code: [
                        { required: true, message: '请输入角色编码', trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 1 到 15 个字', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 1 到 15 个字', trigger: 'blur' }
                    ]
                },
                validateMenu:false
            }
        },
        methods: {
            getAjaxRoleInfo(){
                let _this = this;
                requestRoleInfo({id:this.roleId}).then(res => {
                    let data = res.data;
                    if (data) {
                        _this.editForm.name = data.name;
                        _this.editForm.code = data.code;
                        _this.editForm.checkedMenu = data.menuIdList;
                    } else {
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
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
            goBack() {
                this.$router.push({ path: '/role' });
            },
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.$refs.tree.getCheckedKeys() == ''){
                            this.validateMenu = true;
                            return false;
                        }else{
                            this.validateMenu = false;
                            _this.saveLoading = true;
                            let editFormParam ={
                                code: _this.editForm.code,
                                name: _this.editForm.name,
                                id : _this.roleId,
                                menuIdList: _this.editForm.checkedMenu
                            };
                            requestSaveRole(editFormParam).then(res => {
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
                        }
                    } else {
                        return false;
                    }
                });
            },
            getCheckedKeys(){
                this.editForm.checkedMenu = this.$refs.tree.getCheckedKeys();
                if(this.$refs.tree.getCheckedKeys() == ''){
                    this.validateMenu = true;
                    return false;
                }else{
                    this.validateMenu = false;
                }
            }
        },
        beforeMount() {
            let id = sessionStorage.getItem('roleId');
            this.roleId = id;
            if(id){
                this.getAjaxRoleInfo();
            }
            this.getAjaxAllMenu();
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