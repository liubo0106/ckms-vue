<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/groupManage' }">打包管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="打包编号" prop="serialNo">
                    <el-input placeholder='请输入' v-model="editForm.serialNo" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="打包名称" prop="name">
                    <el-input placeholder='请输入' v-model="editForm.name" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="打包分类" prop="deptArray">
                    <div slot="label"><span class="red-span" v-show="editForm.flag != 'company'" style=" color: #F56C6C;">*</span>打包分类</div>
                    <template>
                        <el-cascader
                                class="self-cascader-width"
                                filterable
                                :clearable = 'true'
                                :props="props"
                                placeholder = '请选择'
                                v-model="editForm.deptArray"
                                change-on-select
                                :options="deptList">
                        </el-cascader>
                    </template>
                </el-form-item>
                <el-form-item label="成本价" prop="price">
                    <el-input-number size="medium" :precision="2" :disabled="true" :value="Price" :min="0" ></el-input-number>
                </el-form-item>
                <el-form-item label="安全库存" prop="safeStock">
                    <el-input-number size="medium" :precision="2" v-model="editForm.safeStock" :min="0" :max="999999999" :step="1" ></el-input-number>
                </el-form-item>
                <el-form-item  label="单位" prop="standard">
                    <el-select v-model="editForm.standard" placeholder="请选择" >
                        <el-option v-for="item in standardDataDicList" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出单倍数" prop="multiple">
                    <el-input-number v-model="editForm.multiple"  :min="1" :max="9999999" label=""></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="background-color: #35B178;border-color:#35B178;" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
            </el-form>
            <!--打包明细-->
            <div class="contentBody" v-if="id">
                <el-form label-width="60px" class="demo-form-inline">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-form-item label-width="0">
                                <el-button icon="el-icon-plus" circle @click="handleClickDetail('', '', 'add')"></el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <!--打包明细列表-->
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="原料名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="costPrice" label="采购单价">
                        <template slot-scope="scope">
                            ￥{{scope.row.costPrice | substr}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" header-align='center' prop="netYield" label="出成率" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="净数量" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleClickDetail(scope.$index, scope.row, 'edit')">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleClickDetail(scope.$index, scope.row, 'delete')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--打包明细添加弹出层-->
        <el-dialog :title='dialogTreeTitle' :visible.sync="dialogTreeFormVisible" width="80%" top="5vh">
            <el-container>
                <el-aside>
                    <el-tree :highlight-current="true" node-key="id"
                             default-expand-all
                             :data="orgTreeData" :props="defaultProps" @node-click="handleNodeClick"
                             :expand-on-click-node="false"></el-tree>
                </el-aside>
                <el-main>
                    <el-form :inline="true" :model="searchTreeForm" label-width="80px" class="demo-form-inline">
                        <el-form-item label="原料编号" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
                            <el-input v-model="searchTreeForm.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="原料名称" style="font-family:MicrosoftYaHeiLight;font-weight:bold;color:rgba(102,102,102,1);">
                            <el-input v-model="searchTreeForm.name" :maxlength="200" autocomplete="off" placeholder="原料名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearchTree" native-type="submit"></el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableTreeData" border>
                        <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号" width="120"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="原料名称" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="costPrice" label="出售单价" width="100">
                            <template slot-scope="scope">
                                ￥{{scope.row.costPrice | substr}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="safeStock" label="净数量" width="160">
                            <template slot-scope="scope">
                                <el-input-number style="width:130px" v-model="tableTreeData[scope.$index].number" :min="0"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleClickTreeAdd(scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            @current-change="handleCurrentChangeTree"
                            :current-page.sync="paramTree.pageNo"
                            :page-size="paramTree.pageSize"
                            layout="total,prev, pager, next"
                            :total="totalTreeNum">
                    </el-pagination>
                </el-main>
            </el-container>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTreeFormVisible = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--打包明细编辑弹出层-->
        <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible" width="25%">
            <el-form :model="dialogForm" :rules="rules" ref="dialogForm">

                <el-form-item label="原料编号" :label-width="formLabelWidth" style="width: 316px">
                    <el-input placeholder='请输入' v-model="dialogForm.serialNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="原料名称" :label-width="formLabelWidth" style="width: 316px">
                    <el-input placeholder='请输入' v-model="dialogForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="单位" :label-width="formLabelWidth" style="width: 316px">
                    <el-input placeholder='请输入' v-model="dialogForm.standard" disabled></el-input>
                </el-form-item>
                <el-form-item label="出售单价" :label-width="formLabelWidth" >
                    <el-input-number v-model="dialogForm.price" :min="0" disabled></el-input-number>
                </el-form-item>
                <el-form-item label="净数量" :label-width="formLabelWidth" >
                    <el-input-number v-model="dialogForm.number" :min="0" :max="999999999"></el-input-number>
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
    import {requestSupplierDataDic,requestGroupInfo, requestSaveGroup, requestSearchProductList,requestSearchGroup, requestSearchProduct,requestListByPidPackDetail, requestSavePackDetail,requestDeletePackDetail} from '../../api/api';
    export default {
        name: 'edit-user-manage',
        data() {

            var validateDeptArray = (rule, value, callback) =>{
                if(this.editForm.flag == 'company'){
                    callback();
                }else{
                    if (value && value.length>0) {
                        callback();
                    } else {
                        callback(new Error('请选择打包分类'));
                    }
                }
            }
            return {
                dialogTreeFormVisible:false,
                dialogTreeTitle:'新增打包明细',
                tableData: null,//采购单明细列表
                dialogTitle:'',
                dialogFormVisible:false,
                //采购单弹出层
                formLabelWidth: '80px',
                dialogForm:{
                    serialNo:'',
                    name:'',
                    standard:'',
                    number:'',
                    price:'',
                    id:'',
                    productInfoId:''
                },
                //主表id
                id: '',
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                productList:[],
                param: {
                    pageSize:-1
                },
                param2: {
                    pid:''
                },
                standardParam: {
                    type:"单位"
                },
                //主表
                pathIds: sessionStorage.getItem('pathIds'),
                props: {
                    checkStrictly:true,
                    value: 'id',
                    label: 'name',
                    children:'children'
                },
                deptList: [],
                deptId: sessionStorage.getItem('deptId'),
                saveLoading: false,
                editForm: {
                    name: '',
                    standard: '',
                    serialNo:'',
                    flag: 'staff',
                    post: '',
                    price: '',
                    deptArray:[],
                    safeStock:0,
                    multiple:1,
                },
                rules: {
                    name: [
                        { required: true, message: '请输入打包名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字', trigger: 'blur' }
                    ],
                    serialNo: [
                        { required: true, message: '请输入打包编号', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字', trigger: 'blur' }
                    ],
                   /* standard: [
                        { required: true, message: '请输入', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 15 个字', trigger: 'blur' }
                    ],*/
                    number: [
                        { required: true, message: '请输入', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 15 个字', trigger: 'blur' }
                    ],
                    deptArray: [
                        { type: 'array', message: '请选择打包分类', trigger: 'change' },
                        { validator: validateDeptArray, trigger: 'blur' }
                    ]
                },
                standardDataDicList:[],
                searchTreeForm: {
                    name: '',
                    serialNo:''
                },
                tableTreeData: null,
                paramTree: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    deptId:'',
                    checkChild:'all',
                    serialNo:'',
                    categoryId:'',
                    isDelete:1,
                },
                totalTreeNum:0,
                orgTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                total:0,
            }
        },
        computed:{
            Price:function () {
                if(this.tableData!=null){
                    var price=0;
                    for(let i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].price!=null){
                            var item = this.tableData[i];
                            price += item.costPrice*(item.number/item.netYield);
                        }

                    }
                    return price
                }

            },

        },
        methods: {
            //点击树节点
            handleNodeClick(data) {
                this.searchTreeForm.name = '';
                this.paramTree.name = '';
                this.paramTree.categoryId = '';
                if(data.id=="0"){

                }else{
                    this.paramTree.categoryId = data.id;
                }
                this.paramTree.pageNo = 1;
                this.getTreeAjaxPage();
            },
            onSearchTree() {
                this.paramTree.pageNo =1;
                this.paramTree.serialNo = this.searchTreeForm.serialNo;
                this.paramTree.name = this.searchTreeForm.name;
                this.getTreeAjaxPage();
            },
            handleCurrentChangeTree(val) {
                this.paramTree.pageNo = val;
                this.getTreeAjaxPage();
            },
            getTreeAjaxPage(){
                let _this = this;
                requestSearchProductList(_this.paramTree).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableTreeData = data;
                            _this.totalTreeNum = parseInt(res.data.totalNum);
                        }else{
                            _this.tableTreeData = [];
                            _this.totalTreeNum = 0;
                        }
                    }
                });
            },
            getTreeAjaxList(){
                let _this = this;
                requestSearchProduct({}).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.orgTreeData = data;
                        }else{
                            _this.orgTreeData = [];
                        }
                    }
                });
            },
            handleClickTreeAdd(index,row){
                let _this = this;
                let addParam = {};
                addParam ={
                    id: '',
                    standard:row.standard,
                    number:this.tableTreeData[index].number,
                    price:row.price,
                    productInfoId:row.id,
                    packInfoId:_this.id,
                    serialNo:row.serialNo,
                    name:row.name
                };
                requestSavePackDetail(addParam).then(res => {
                    if(res.status == 200){
                        _this.$message({
                            type: 'success',
                            message: '操作成功!',
                            duration:300,
                            onClose:function(){
                                _this.saveLoading = false;//关闭提交按钮loding
                                _this.getAjaxList();
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
            },
            //请求单位
            getAjaxStandardDataDic(){
                let _this = this;
                requestSupplierDataDic(_this.standardParam).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.standardDataDicList = data;
                        }else{
                            _this.standardDataDicList = [];
                        }
                    }
                });
            },
            changeProduct(val){
                let tn = {};
                tn = this.productList.find((item)=>{
                    return item.id === val;
                });
                this.dialogForm.standard = tn.standard;
                this.dialogForm.price = tn.price;
            },
            /*点击按钮事件*/
            handleClickDetail(index, row, doType) {
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
                        requestDeletePackDetail(deleteParam).then(res => {
                            if(res.status == 200){
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.getAjaxList();
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
                    this.getTreeAjaxPage();
                    this.getTreeAjaxList();
                    this.dialogTreeFormVisible = true;
                }else if(doType == 'edit'){
                    //编辑
                    _this.addOrg('edit',row);
                }
            },
            //显示明细添加编辑页面弹出层
            addOrg(type,row){
                this.dialogFormVisible = true;
                if(type == 'add'){
                    this.disabled = false
                    this.dialogTitle='新增订单明细',
                        //清除以前数据
                        this.dialogForm.standard ='';
                    this.dialogForm.number = '';
                    this.dialogForm.id = '';
                    this.dialogForm.price = 0;
                    this.dialogForm.productInfoId = '';
                }else{
                    this.disabled = !this.disabled
                    this.dialogTitle='编辑打包明细',
                        //编辑
                     this.dialogForm.standard = row.standard;
                     this.dialogForm.serialNo = row.serialNo;
                     this.dialogForm.name = row.name;
                    this.dialogForm.id = row.id;
                    this.dialogForm.number = row.number;
                    this.dialogForm.price = row.price;
                    this.dialogForm.productInfoId = row.productInfoId;
                }
            },
            //添加编辑点击确认数据回显
            dialogFormAdd(formName){
                let _this = this;
                let addParam = {};
                addParam ={
                    id: this.dialogForm.id,
                    standard:this.dialogForm.standard,
                    number:this.dialogForm.number,
                    price:this.dialogForm.price,
                    productInfoId:this.dialogForm.productInfoId,
                    name:this.dialogForm.name,
                    serialNo:this.dialogForm.serialNo,
                    salesOrderId:_this.id,
                    type:this.dialogForm.type
                };
                //表单校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //防止重复提交
                        _this.saveLoading = true;
                        //表单提交方法更
                        requestSavePackDetail(addParam).then(res => {
                            if(res.status == 200){
                                _this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.saveLoading = false;//关闭提交按钮loding
                                        _this.dialogFormVisible = false;//关闭弹出层
                                        _this.getAjaxList();
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
                    } else {
                        return false;
                    }
                });
            },

            //查询明细列表
            getAjaxList(){
                let _this = this;
                requestListByPidPackDetail(_this.param2).then(res => {
                    _this.tableData = [];
                    let data = res.data;
                    if(data && data.length>0){
                        _this.tableData = data;
                    }else{
                        _this.tableData = [];
                    }
                });
            },
            //请求商品信息
            getAjaxProduct(){
                let _this = this;
                requestSearchProductList(_this.param).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.productList = data;
                        }else{
                            _this.productList = [];
                        }
                    }
                });
            },
            goBack() {
                this.$router.push({ path: '/groupManage' });
            },
            //主表
            //获取商品分类
            getTreeGroupAjaxList(){
                let _this = this;
                requestSearchGroup({}).then(res => {
                    let data = res.data;
                    if (data) {
                        if(data && data.length>0){
                            _this.deptList = data;
                        }else{
                            _this.deptList = [];
                        }
                    }
                });
            },
            getAjaxGroupInfo(){
                let _this = this;
                requestGroupInfo({id:this.id}).then(res => {
                    let data = res.data;
                    if (data) {
                        _this.editForm.name = data.name;
                        _this.editForm.spec = data.spec;
                        _this.editForm.serialNo = data.serialNo;
                        _this.editForm.price = data.price;
                        _this.editForm.standard = data.standard;
                        _this.editForm.safeStock = data.safeStock;
                        _this.editForm.multiple=data.multiple;
                        let ss = data.strArray;
                        if(ss){
                            _this.editForm.deptArray = ss.length>0 ? ss.split(','):[];
                        }
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
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let pp = _this.editForm.deptArray;
                        let editFormParam ={
                            packCategoryId: pp.length>0 ? pp[pp.length-1].toString() : '',
                            name: _this.editForm.name,
                            spec: _this.editForm.spec,
                            serialNo: _this.editForm.serialNo,
                            price: _this.editForm.price,
                            id : _this.id,
                            standard: _this.editForm.standard,
                            safeStock: _this.editForm.safeStock,
                            multiple:_this.editForm.multiple,
                            strArray:pp.length>0 ? pp.toString() : ''
                        };
                        requestSaveGroup(editFormParam).then(res => {
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
                                    sessionStorage.setItem('groupId',res.data.id);
                                    _this.id=res.data.id;
                                    _this.param2.pid=res.data.id;
                                    _this.getAjaxGroupInfo();
                                    _this.getAjaxList();
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
        filters:{
          substr:function (value) {
              if(value !=null){
                  return value.toFixed(4);
              }
          }
        },
        beforeMount() {
            //采购单编辑
            let id = sessionStorage.getItem('groupId');
            if(id){
                this.id=id;
                this.param2.pid=id;
                this.getAjaxGroupInfo();
                //采购单明细
                this.getAjaxList();
                if(this.pathIds && this.pathIds.length>0){
                    this.editForm.deptArray = this.pathIds.length>0 ? this.pathIds.split(','):[];
                }
            }
            this.getAjaxProduct();
            this.getTreeGroupAjaxList();
            this.getAjaxStandardDataDic();
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
            width: auto;
            height: 700px;
        }
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
