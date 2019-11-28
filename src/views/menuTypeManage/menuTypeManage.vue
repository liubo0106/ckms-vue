<template>
    <section>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>菜品分类管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-container>
                <!--左边树-->
                <el-aside style="width: 240px">
                    <el-tree default-expand-all :data="orgTreeData" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                        </span>
                    </el-tree>
                </el-aside>
                <!--右边表格-->
                <el-main>
                    <!--头部搜索-->
                    <el-form :model="searchForm" label-width="80px" class="demo-form-inline" label-position="left">
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-form-item label="分类名称">
                                    <el-input v-model="searchForm.content" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>
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
                    <!--表格-->
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="分类名称"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="num" label="排序号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' label="操作" width="180">
                            <template slot-scope="scope">
                                <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit" size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                                <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页-->
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="param.pageNo"
                            :page-sizes="[15, 30, 45, 60]"
                            :page-size="param.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalNum">
                    </el-pagination>
                </el-main>
            </el-container>
        </div>
        <!--添加编辑弹出层-->
        <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible">
            <el-form :model="dialogForm" :rules="rules" ref="dialogForm">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="排序号" :label-width="formLabelWidth" prop="num" >
                            <el-input-number v-model.number="dialogForm.num" :min="0" :max="999999999" ></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label="分类名称" :label-width="formLabelWidth"prop="name">
                            <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--特殊部门树-->
                <el-form-item label="上级分类" :label-width="formLabelWidth" prop="deptArray">
                    <template >
                        <el-cascader
                                style="width: 100%"
                                filterable
                                :clearable = 'true'
                                :props="props"
                                placeholder = '请选择'
                                v-model="dialogForm.deptArray"
                                change-on-select
                                :options="orgTreeData">
                        </el-cascader>
                    </template>
                </el-form-item>

                <!--备注-->
                <el-form-item label="备注" :label-width="formLabelWidth" style="width:100%">
                    <el-input type="textarea" v-model="dialogForm.remark" :maxlength="200" autocomplete="off" max></el-input>
                </el-form-item>
            </el-form>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormAdd('dialogForm')" :loading="saveLoading">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestSearchMenuType, requestDeleteMenuType, requestSearchDeptPageMenuType, requestSaveMenuType} from '../../api/api';

    export default {
        name: 'user-manage',
        data() {
            var customerId= sessionStorage.getItem('customerId')
            /*定义变量*/
            return {
                loading: false,
                props: {
                    value: 'id',
                    label: 'name',
                    children:'children'
                },
                saveLoading:false,
                tableData: null,
                param: {
                    name:"",
                    parentId:"",
                    pageNo:1,
                    pageSize:10,
                    customerId:customerId,//门店ID
                },
                searchForm:{
                    name:""
                },
                totalNum:0,
                orgTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                formLabelWidth: '100px',
                dialogFormVisible:false,
                dialogTitle:'新增原料分类',
                dialogForm:{
                    deptArray:[],
                    name:'',
                    num:0,
                    remark:'',
                    code:'',
                    id:'',
                    customerId:customerId,//门店ID
                },
                oldCategory:'',
                /*校验规则*/
                rules: {
                    num: [
                        { required: true, message: '请输入排序号', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字', trigger: 'blur' }
                    ],
//                    code: [
//                        { required: true, message: '请输入', trigger: 'blur' },
//                        { min: 1, max: 20, message: '长度在 1 到 20 个字', trigger: 'blur' }
//                    ],
                    deptArray: [
                        { type: 'array', required: true, message: '请选择上级分类', trigger: 'change' }
                    ]
                },
                option:{},
                myChart:null
            }
        },
        /*方法*/
        methods: {
            /*序号*/
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            //点击树节点
            handleNodeClick(data) {
                this.searchForm.name = '';
                this.param.name = '';
                this.param.parentId = data.id;
                this.param.pageNo = 1;
                this.getPidAjaxList();
            },
            handleSizeChange(val){
                let _this = this;
                _this.param.pageSize=val;
                requestSearchDeptPageMenuType(_this.param).then(res => {
                    if(res.status == 200){
                        let data = res.data.items;
                        if (data) {
                            if(data && data.length>0){
                                _this.tableData = data;
                                _this.totalNum = parseInt(res.data.totalNum);
                            }else{
                                _this.tableData = [];
                                _this.totalNum = 0;
                            }
                        }
                    }else{
                        _this.$message({
                            type: 'error',
                            message: '系统异常!'
                        });
                    }
                });
            },
            /*点击按钮事件*/
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
                        requestDeleteMenuType(deleteParam).then(res => {
                            if(res.status == 200){
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.loading=false;
                                        _this.getTreeAjaxList();
                                        _this.getPidAjaxList();
                                    }
                                });
                            }else{
                                _this.$message({
                                    type: 'error',
                                    message: res.msg
                                });
                            }
                        });
                    }).catch(() => {
                        _this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else if(doType == 'add'){
                    //添加
                    _this.addOrg('add',row);

                }else if(doType == 'edit'){
                    //编辑
                    _this.addOrg('edit',row);
                }else if(doType == 'editTree'){
                    //点击树编辑
                    _this.addOrg('editTree',row);
                }
            },
            //显示添加编辑页面弹出层
            addOrg(type,row){
                this.dialogFormVisible = true;
                if(type == 'add'){
                    //清除以前数据
                    this.dialogForm.deptArray =[];
                    this.dialogForm.deptArray.push('0');
                    this.dialogForm.name = '';
                    this.dialogForm.id = '';
                    this.dialogForm.num = 0;
                    this.dialogForm.remark = '';
                    this.dialogTitle = '新增菜品分类';
//                    this.dialogForm.code = '';
                }else{
                    //编辑
                  /*  let pathArray = [];
                    if(row.deptArray){
                        pathArray = row.deptArray.split(',');
                    }*/
                    this.dialogForm.deptArray =[];
                    this.dialogForm.deptArray.push(row.parentId);
                    this.oldCategory=row.id;
                    this.dialogTitle = '编辑菜品分类';
                    this.dialogForm.name = row.name;
                    this.dialogForm.id = row.id;
                    this.dialogForm.num = row.num;
                    this.dialogForm.remark = row.remark;
//                    this.dialogForm.code = row.code;

                }
            },
            //添加编辑点击确认数据回显
            dialogFormAdd(formName){
                let _this = this;
                let addParam = {};
                let pp = this.dialogForm.deptArray;
                if(this.dialogForm.id){

                    addParam ={
                        id: this.dialogForm.id,
                        name: this.dialogForm.name,
                        code: this.dialogForm.code,
                        remark: this.dialogForm.remark,
                        num: this.dialogForm.num,
                        parentId: pp.length>0 ? pp[pp.length-1].toString() : '',
                        deptArray: pp.length>0 ? pp.toString() : ''
                    };
                }else{

                    addParam ={
                        id: this.dialogForm.id,
                        name: this.dialogForm.name,
                        code: this.dialogForm.code,
                        remark: this.dialogForm.remark,
                        num: this.dialogForm.num,

                        parentId: pp.length>0 ? pp[pp.length-1].toString() : '',
                        deptArray: pp.length>0 ? pp.toString() : ''


                    };


                }
                //表单校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       if( pp[pp.length-1].toString() == this.oldCategory ){
                           _this.$message({
                               type: 'error',
                               message: '请勿重复选择！'
                           });
                       }else{
                           //防止重复提交
                           _this.saveLoading = true;
                           //表单提交方法更
                           requestSaveMenuType(addParam).then(res => {
                               if(res.status == 200){
                                   _this.$message({
                                       type: 'success',
                                       message: '操作成功!',
                                       duration:300,
                                       onClose:function(){
                                           _this.saveLoading = false;//关闭提交按钮loding
                                           _this.dialogFormVisible = false;//关闭弹出层
                                           _this.getTreeAjaxList();
                                           _this.getPidAjaxList();
                                       }
                                   });
                               }else{
                                   _this.saveLoading = false;
                                   _this.$message({
                                       type: 'error',
                                       message: res.msg
                                   });
                               }
                           });
                       }

                    } else {
                        return false;
                    }
                });
            },
            //搜索查询按钮方法
            onSearch() {
                this.param.name = this.searchForm.content;
                this.param.pageNo =1;
                this.getPidAjaxList();
            },
            //点击页码事件
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getPidAjaxList();
            },
            //获取左侧树方法
            getTreeAjaxList(){
                let _this = this;
                requestSearchMenuType({}).then(res => {
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            if(data && data.length>0){
                                _this.orgTreeData = data;
                            }else{
                                _this.orgTreeData = [];
                            }
                        }
                    }else{
                        _this.$message({
                            type: 'error',
                            message: '系统异常!'
                        });
                    }
                });
            },
            //搜索方法
            getPidAjaxList(){
                let _this = this;
                requestSearchDeptPageMenuType(_this.param).then(res => {
                    if(res.status == 200){
                        let data = res.data.items;
                        if (data) {
                            if(data && data.length>0){
                                _this.tableData = data;
                                _this.totalNum = parseInt(res.data.totalNum);
                            }else{
                                _this.tableData = [];
                                _this.totalNum = 0;
                            }
                        }
                    }else{
                        _this.$message({
                            type: 'error',
                            message: '系统异常!'
                        });
                    }
                });
            }
        },
        //初始化方法
        beforeMount() {
            this.getTreeAjaxList();
            this.getPidAjaxList();

        },
        //页面元素加载完成后
        mounted(){

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
            width: 400px;
            height: 700px;
            overflow: auto;
        }
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>
