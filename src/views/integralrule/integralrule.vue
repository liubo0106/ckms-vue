<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>积分规则管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :model="param" ref="ruleForm" class="demo-form-inline">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label-width="80px" label="积分" prop="money">
                            <el-input v-model="param.integral" :maxlength="200" autocomplete="off" placeholder="积分" clearable></el-input>
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
                <el-table-column align="center" header-align='center' type="index" label="行号" sortable></el-table-column>
                <el-table-column align="center" header-align='center' prop="integral" label="积分"></el-table-column>
                <el-table-column align="center" header-align='center' prop="amount" label="金额"></el-table-column>
                <el-table-column align="center" header-align='center' prop="minUseAmount" label="积分使用区间最小金额"></el-table-column>
                <el-table-column align="center" header-align='center' prop="maxUseAmount" label="积分使用区间最大金额"></el-table-column>
                <el-table-column align="center" header-align='center' prop="type" label="规则类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type==1">消费积分</span>
                        <span v-if="scope.row.type==2">积分抵现</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="createTime" label="创建时间"></el-table-column>
                <el-table-column align="center" header-align='center' prop="createUser" label="操作员"></el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-edit" style="background-color: #24cbc1;color: #fff;border: none;" size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button icon="el-icon-delete" style="background-color: #fe8d29;color: #fff;border: none;" size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="editForm"  ref="editForm">
                <el-form-item label="选择规则" :label-width="formLabelWidth">
                    <el-select v-model="editForm.type" :disabled="editForm.edit">
                        <el-option label="消费积分" :value="1"></el-option>
                        <el-option label="积分抵现" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="积分" prop="integral" :label-width="formLabelWidth">
                   <el-input v-model="editForm.integral" style="width: 217px;"></el-input>
                </el-form-item>
                <el-form-item label="金额" prop="give" :label-width="formLabelWidth">
                    <el-input v-model="editForm.amount" style="width: 217px;"></el-input>
                </el-form-item>
                <el-form-item label="积分使用区间最小金额" prop="discount" :label-width="formLabelWidth" v-if="editForm.type==2 || editForm.type=='积分抵现'" >
                    <el-input v-model="editForm.minUseAmount" style="width: 217px;"></el-input>
                </el-form-item>
                <el-form-item label="积分使用区间最大金额" prop="discount" :label-width="formLabelWidth" v-if="editForm.type==2 || editForm.type=='积分抵现'">
                    <el-input v-model="editForm.maxUseAmount" style="width: 217px;"></el-input>
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
    import { requestSearchrechargeRule,requestIntegralrulePage,requestIntegralruleSave,requestDeleteInteg, requestrechargeRuleInfo,requestDeleterechargeRule } from '../../api/api';
    export default {
        data() {
            return {
                loading: false,
                doType:'add',
                saveLoading: false,
                dialogTitle:'新增',
                tableData: [],
                param: {
                    pageSize:15,
                    pageNo:1,
                    integral:'',
                },
                editForm:{
                    id:'',
                    type:'',
                    integral:'',
                    amount:'',
                    minUseAmount:'',
                    maxUseAmount:'',
                    edit:false,
                },
                searchForm:{
                    money:'',

                },
                dialogFormVisible: false,
                formLabelWidth: '160px',
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
                        requestDeleteInteg(deleteParam).then(res => {
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
                    this.editForm.type='';
                    this.editForm.edit=false;
                    this.editForm.integral = '';
                    this.editForm.amount = '';
                    this.editForm.minUseAmount = '';
                    this.editForm.maxUseAmount = '';
                }else if(type == 'edit'){
                    this.doType = 'edit';
                    this.dialogTitle = '编辑';
                    this.editForm.id = row.id;
                    if(row.type==2){
                        this.editForm.type='积分抵现'
                    }else{
                        this.editForm.type='消费积分'
                    }
                    this.editForm.edit=true;
                    this.editForm.integral = row.integral;
                    this.editForm.amount = row.amount;
                    this.editForm.minUseAmount = row.minUseAmount;
                    this.editForm.maxUseAmount = row.maxUseAmount;
                }
                this.dialogFormVisible = true;

            },
            //新增分类
            dialogFormAdd(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        if(this.editForm.type=='积分抵现'){
                            this.editForm.type=2;
                        }
                        if(this.editForm.type=='消费积分'){
                            this.editForm.type=1;
                        }
                        requestIntegralruleSave(this.editForm).then(res => {
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
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                requestIntegralrulePage(_this.param).then(res => {
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
