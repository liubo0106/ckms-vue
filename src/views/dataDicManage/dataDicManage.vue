<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据字典管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :model="searchForm" ref="ruleForm" class="demo-form-inline">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-form-item label-width="40px" label="类别" prop="type">
                            <el-select v-model="searchForm.type" placeholder="请选择" clearable>
                                <el-option label="规格" value="规格"></el-option>
                                <el-option label="单位" value="单位"></el-option>
                                <el-option label="口味" value="口味"></el-option>
                                <el-option label="折扣" value="折扣"></el-option>
                                <el-option label="资产类别" value="资产类别"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label-width="40px" label="内容" prop="name">
                            <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="内容" clearable></el-input>
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
        <div class="contentBody">
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
                <el-table-column align="center" header-align='center' prop="type" label="类别" width="180">
                </el-table-column>
                <el-table-column align="left" header-align='center' prop="name" label="内容">
                </el-table-column>
                <!--<el-table-column align="center" header-align='center' prop="value" label="属性值" width="180">
                </el-table-column>-->
                <el-table-column align="center" header-align='center' prop="createTime" label="创建时间" width="180"></el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit" size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button icon="el-icon-delete" size="mini" type="danger" style="background-color: #fe8d29;color: #fff;border: none;" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible">
            <el-form :model="editForm" :rules="rules" ref="editForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="序列" prop="num" :label-width="formLabelWidth">
                            <el-input type="age" placeholder='请输入' v-model.number="editForm.num" style="width: 217px" :maxlength="9" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类别" prop="type" :label-width="formLabelWidth">
                            <el-select v-model="editForm.type" placeholder="请选择" clearable>
                                <el-option label="规格" value="规格"></el-option>
                                <el-option label="单位" value="单位"></el-option>
                                <el-option label="口味" value="口味"></el-option>
                                <el-option label="折扣" value="折扣"></el-option>
                                <el-option label="资产类别" value="资产类别"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--<el-form-item label="上级字典" :label-width="formLabelWidth">
                    <el-select v-model="editForm.parentId" placeholder="请选择" clearable>
                        <el-option v-for="item in listParent" :key='item.id' :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="内容" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="editForm.name"  autocomplete="off" clearable></el-input>
                </el-form-item>
                <!--<el-form-item label="属性值" prop="value" :label-width="formLabelWidth">
                    <el-input v-model="editForm.value"  autocomplete="off" clearable></el-input>
                </el-form-item>-->
                <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="2" v-model="editForm.remark"  autocomplete="off" clearable></el-input>
                </el-form-item>
              <!--  <el-form-item label="隶属阶段" prop="cityChangeStatus" :label-width="formLabelWidth" v-if="editForm.type=='模板类型'">
                    <el-radio-group v-model="editForm.cityChangeStatus">
                        <el-radio :label="0">正常</el-radio>
                        <el-radio :label="1">立项阶段</el-radio>
                        <el-radio :label="2">报地阶段</el-radio>
                        <el-radio :label="3">供地阶段</el-radio>
                        <el-radio :label="4">房屋征收阶段</el-radio>
                    </el-radio-group>
                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" style="background-color: #35B178;border-color:#35B178;" @click="dialogFormAdd('editForm')" :loading="saveLoading">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestFindDataDicList,requestDeleteDataDic, requestSaveDataDic,requestFindDataDicTypeAll,requestTreeList } from '../../api/api';
    export default {
        data() {
            return {
                doType:'add',
                saveLoading: false,
                dialogTitle:'新增',
                tableData: [],
                param: {
                    name:'',
                    type:''
                },
                editForm:{
                    id:'',
                    name:'',
                    type:'',
                    parentId:'',
                    num:0,
                    remark:'',
                    value:'',
                    cityChangeStatus:0
                },
                searchForm:{
                    name:'',
                    type:''
                },
                dialogFormVisible: false,
                formLabelWidth: '80px',
                rules: {
                    name: [
                        { required: true, message: '请输入', trigger: 'blur' },
                        { min: 1, max: 200, message: '长度在 1 到 200 个字', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    num: [
                        { required: false, message: '请输入序列', trigger: 'blur' },
                        { type: 'number', message: '序列必须为数字', trigger: 'blur'}
                    ]
                },
                listParent:[]
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
                    this.editForm.name = '';
                    this.editForm.id = '';
                    this.editForm.num = 0;
                    this.editForm.type = '';
                    this.editForm.value = '';
                    this.editForm.remark = '';
                    this.editForm.cityChangeStatus = 0;
                }else if(type == 'edit'){
                    this.doType = 'edit';
                    this.dialogTitle = '编辑';
                    this.editForm.name = row.name;
                    this.editForm.id = row.id;
                    this.editForm.num = row.num;
                    this.editForm.parentId = row.parentId == 0 ? '' : row.parentId;
                    this.editForm.type = row.type;
                    this.editForm.value = row.value;
                    this.editForm.remark = row.remark;
                    if(row.cityChangeStatus){
                        this.editForm.cityChangeStatus = row.cityChangeStatus;
                    }else{
                        this.editForm.cityChangeStatus = 0;
                    }

                }
                this.dialogFormVisible = true;
                requestFindDataDicTypeAll({type:'项目类别',parentId:0}).then(res => {
                    this.listParent = res.data;
                });
            },
            //新增分类
            dialogFormAdd(formName){
                let _this = this;
                let addParam ={
                    type: this.editForm.type,
                    id:  this.editForm.id,
                    name: this.editForm.name,
                    parentId: this.editForm.parentId == '' ? 0 : this.editForm.parentId,
                    num: this.editForm.num,
                    value: this.editForm.value,
                    remark: this.editForm.remark,
                    cityChangeStatus: this.editForm.cityChangeStatus
                };
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        requestSaveDataDic(addParam).then(res => {
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
            onSearch() {
                this.param.name = this.searchForm.name;
                this.param.type = this.searchForm.type;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                requestTreeList(_this.param).then(res => {
                    let data = res.data;
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
