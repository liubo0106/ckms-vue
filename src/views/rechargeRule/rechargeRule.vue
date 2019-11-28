<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>充值规则管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :model="searchForm" ref="ruleForm" class="demo-form-inline">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label-width="80px" label="充值金额" prop="money">
                            <el-input v-model="searchForm.money" :maxlength="200" autocomplete="off" placeholder="充值金额" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                            <el-button icon="el-icon-plus" circle @click="handleClick('', '', 'add')"></el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" border row-key="id">
                <el-table-column align="center" header-align='center' type="index" label="行号" width="80" sortable></el-table-column>
                <el-table-column align="center" header-align='center' prop="money" label="充值金额" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="give" label="赠送金额" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="discount" label="折扣" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="createTime" label="创建时间" width="180"></el-table-column>
                <el-table-column align="center" header-align='center' prop="createUser" label="操作员"></el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-edit" style="background-color: #24cbc1;color: #fff;border: none;" size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button icon="el-icon-delete" style="background-color: #fe8d29;color: #fff;border: none;" size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible" style="width: 656px;left:34%;">
            <el-form :model="editForm" :rules="rules" ref="editForm">
                <el-form-item label="充值金额" prop="money" :label-width="formLabelWidth">
                    <el-input-number v-model="editForm.money" :min="1" :max="99999"></el-input-number>
                </el-form-item>
                <el-form-item label="赠送金额" prop="give" :label-width="formLabelWidth">
                    <el-input-number v-model="editForm.give" :min="0" :max="99999"></el-input-number>
                </el-form-item>
                <el-form-item label="折扣" prop="discount" :label-width="formLabelWidth" style="width: 282px">
                    <el-input-number v-model="editForm.discount" :precision="1" :min="0.1" :max="10" :step="0.1"></el-input-number>
                </el-form-item>
                <el-form-item label="备注" prop="remark" :label-width="formLabelWidth" style="width: 282px">
                    <el-input type="textarea" :rows="2" v-model="editForm.remark"  autocomplete="off" clearable :maxlength="200"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" style="background-color: #35B178;border-color:#35B178;" @click="dialogFormAdd('editForm')" :loading="saveLoading">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestSearchrechargeRule,requestSaverechargeRule, requestrechargeRuleInfo,requestDeleterechargeRule } from '../../api/api';
    export default {
        data() {
            return {
                loading: false,
                doType:'add',
                saveLoading: false,
                dialogTitle:'新增',
                tableData: [],
                param: {

                    money:'',
                },
                editForm:{
                    id:'',
                    money:0,
                    give:0,
                    discount:0,
                    remark:'',
                },
                searchForm:{
                    money:'',

                },
                dialogFormVisible: false,
                formLabelWidth: '80px',
                rules: {
                    money: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                },
            }
        },
        methods: {
            handleClick(index, row, doType) {
                let _this = this;
                if(doType == 'delete'){
                    _this.$confirm('真的删除该行数据么, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        let deleteParam ={
                            id: row.id
                        };
                        requestDeleterechargeRule(deleteParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                                duration:300,
                                onClose:function(){
                                    _this.loading=false;
                                    _this.dialogFormVisible = false;
                                    _this.getAjaxList();
                                }
                            });
                        });
                    }).catch(() => {
                        _this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else if(doType == 'add'){
                    this.showEdit('add',row);
                }else if(doType == 'edit'){
                    this.showEdit('edit',row);
                }
            },
            //弹出框show
            showEdit(type,row){
                if(type == 'add'){
                    this.doType = 'add';
                    this.dialogTitle = '新增';
                    this.editForm.id = '';
                    this.editForm.money = '';
                    this.editForm.give = '';
                    this.editForm.discount = '';
                    this.editForm.remark = '';

                }else if(type == 'edit'){
                    this.doType = 'edit';
                    this.dialogTitle = '编辑';
                    this.editForm.id = row.id;
                    this.editForm.money = row.money;
                    this.editForm.give = row.give;
                    this.editForm.discount = row.discount;
                    this.editForm.remark = row.remark;

                }
                this.dialogFormVisible = true;

            },
            //新增分类
            dialogFormAdd(formName){
                let _this = this;
                let addParam ={
                    id:  this.editForm.id,
                    money:  this.editForm.money,
                    give:  this.editForm.give,
                    discount:  this.editForm.discount,
                    remark: this.editForm.remark,
                };
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        requestSaverechargeRule(addParam).then(res => {
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
                                duration:1000,
                                onClose:function(){
                                    _this.saveLoading = false;
                                    _this.dialogFormVisible = false;
                                    _this.getAjaxList();
                                }
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            onSearch() {
                this.param.money = this.searchForm.money;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                requestSearchrechargeRule(_this.param).then(res => {
                    let data = res.data.items;
                    if (res.status == 200) {
                        if(data && data.length>0){
                            _this.tableData = data;
                        }else{
                            _this.tableData = [];
                        }
                    } else {
                        _this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            }
        },
        beforeMount() {
            this.getAjaxList();
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
    }
    .min-width-select{
        width: 110px;
    }
</style>
