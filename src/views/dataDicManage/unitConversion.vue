<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>单位换算配置管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form ref="ruleForm" class="demo-form-inline">
                <el-form-item label-width="0" style="text-align: right">
                    <el-button type="success" @click="handleClick('', '', 'add')">添加</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    :data="tableData"
                    style="width: 100%;margin-bottom: 20px;"
                    border
                    row-key="id">
                <el-table-column
                        align="center"
                        header-align='center'
                        type="index"
                        label="行号"
                        width="80"
                        sortable>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="unitFrom" label="原单位" width="180"></el-table-column>
                <el-table-column align="center" header-align='center' prop="unitTo" label="目标单位"></el-table-column>
                <el-table-column align="center" header-align='center' prop="ratio" label="单位换算比例" width="180"></el-table-column>
                <el-table-column align="center" header-align='center' prop="remark" label="备注"></el-table-column>
                <el-table-column align="center" header-align='center' prop="createTime" label="创建时间" width="180"></el-table-column>
                <el-table-column align="center" header-align='center' label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit" size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="editForm" :rules="rules" ref="editForm">
                <el-form-item label="原单位" prop="unitFrom" :label-width="formLabelWidth">
                    <el-input v-model="editForm.unitFrom"  autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="目标单位" prop="unitTo" :label-width="formLabelWidth">
                    <el-input v-model="editForm.unitTo"  autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="单位换算比例" prop="ratio" :label-width="formLabelWidth">
                    <el-input-number v-model="editForm.ratio" :min="0.001"></el-input-number>
                </el-form-item>
                <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="2" v-model="editForm.remark"  autocomplete="off" clearable></el-input>
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
    import {requestUnitConversionPage, requestUnitConversionSave} from '../../api/api';

    export default {
        data() {
            return {
                doType:'add',
                saveLoading: false,
                dialogTitle:'新增',
                tableData: [],
                param: {
                    pageSize:0
                },
                editForm:{
                    id:'',
                    unitFrom:'',
                    unitTo:'',
                    remark:'',
                    ratio:0
                },
                dialogFormVisible: false,
                formLabelWidth: '100px',
                rules: {
                    unitFrom: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    unitTo: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ]
                }
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
                        let deleteParam ={
                            id: row.id
                        };
                        requestDeleteDataDic(deleteParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                                duration:300,
                                onClose:function(){
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
                    this.editForm.unitFrom = '';
                    this.editForm.unitTo = '';
                    this.editForm.ratio = 0;
                    this.editForm.id = '';
                    this.editForm.remark = '';
                }else if(type == 'edit'){
                    this.doType = 'edit';
                    this.dialogTitle = '编辑';
                    this.editForm.unitFrom = row.unitFrom;
                    this.editForm.unitTo = row.unitTo;
                    this.editForm.id = row.id;
                    this.editForm.remark = row.remark;
                    this.editForm.ratio = row.ratio;
                }
                this.dialogFormVisible = true;
            },
            //新增分类
            dialogFormAdd(formName){
                let _this = this;
                let addParam ={
                    id:  this.editForm.id,
                    unitFrom: this.editForm.unitFrom,
                    unitTo: this.editForm.unitTo,
                    ratio: this.editForm.ratio,
                    remark: this.editForm.remark
                };
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        requestUnitConversionSave(addParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
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
            getAjaxList(){
                let _this = this;
                requestUnitConversionPage(_this.param).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
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