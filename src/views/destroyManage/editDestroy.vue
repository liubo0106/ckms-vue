<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/destroy' }">报损单管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <div style="display: flex">
                    <el-form-item label="报损单名称" prop="name">
                        <el-input placeholder='请输入' v-model="editForm.name" :maxlength="15"></el-input>
                    </el-form-item>

                    <el-form-item label="报损日期" style="width: 316px" prop="dateTime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="editForm.dateTime"  value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="总量"  label-width="80px" style="width: 316px">
                        <el-input placeholder='请输入' v-model="editForm.totalNumber" :maxlength="200" disabled></el-input>
                    </el-form-item>

                </div>
                <el-form-item label="报损类别" prop="options">
                    <el-select v-model="editForm.options" placeholder="请选择报损类别" @change="tabType()" disabled v-if="disable==0">
                        <el-option label="厨房报损" value="0"></el-option>
                        <el-option label="库房报损" value="1"></el-option>
                    </el-select>
                    <el-select v-model="editForm.options" placeholder="请选择报损类别" @change="tabType()" v-else>
                        <el-option label="厨房报损" value="0"></el-option>
                        <el-option label="库房报损" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" placeholder='请输入' v-model="editForm.remark" :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
            </el-form>
            <!--报损单明细-->
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
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="standard" label="单位"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="140"></el-table-column>
                    <!--<el-table-column align="center" header-align='center' prop="price" label="单价" width="140"></el-table-column>-->
                    <el-table-column align="center" header-align='center' label="操作" width="260">
                        <template slot-scope="scope" >
                            <el-button size="mini" type="danger" @click="handleClickDetail(scope.$index, scope.row, 'delete')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :title='dialogTreeTitle' :visible.sync="dialogTreeFormVisible" width="80%" top="5vh">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="打包" name="1" v-if="allType== 1">
                    <el-container>
                        <el-aside>
                            <el-tree :highlight-current="true" node-key="id"
                                     default-expand-all
                                     :data="orgTreeData" :props="defaultProps" @node-click="handleNodeClick"
                                     :expand-on-click-node="false"></el-tree>
                        </el-aside>
                        <el-main>
                            <el-form :inline="true" :model="searchTreeForm" label-width="80px" class="demo-form-inline">
                                <el-form-item label="编号">
                                    <el-input v-model="searchTreeForm.serialNo " :maxlength="200" autocomplete="off" placeholder="编号" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="名称">
                                    <el-input v-model="searchTreeForm.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                                </el-form-item>
                                <el-form-item label-width="0">
                                    <el-button icon="el-icon-search" circle @click.native.prevent="onSearchTree" native-type="submit"></el-button>
                                </el-form-item>
                            </el-form>
                            <el-table :data="tableTreeData" border>
                                <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="serialNo" label="编号" width="120"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="name" label="名称" ></el-table-column>
                                <el-table-column align="center" header-align='center' prop="price" label="出售单价" width="100">
                                    <template slot-scope="scope">
                                        ￥{{scope.row.price}}
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:130px" v-model="tableTreeData[scope.$index].number" :max="tableTreeData[scope.$index].stock" :min="0"></el-input-number>
                                    </template>
                                </el-table-column>
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
                </el-tab-pane>
                <el-tab-pane label="原材料" name="2" >
                    <el-container>
                        <el-aside>
                            <el-tree :highlight-current="true" node-key="id"
                                     default-expand-all
                                     :data="orgTreeData2" :props="defaultProps" @node-click="handleNodeClick2"
                                     :expand-on-click-node="false"></el-tree>
                        </el-aside>
                        <el-main>
                            <el-form :inline="true" :model="searchTreeForm2" label-width="80px" class="demo-form-inline">
                                <el-form-item label="编号">
                                    <el-input v-model="searchTreeForm2.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="名称">
                                    <el-input v-model="searchTreeForm2.name" :maxlength="200" autocomplete="off" placeholder="原料名称" clearable></el-input>
                                </el-form-item>
                                <el-form-item label-width="0">
                                    <el-button icon="el-icon-search" circle @click.native.prevent="onSearchTree2" native-type="submit"></el-button>
                                </el-form-item>
                            </el-form>
                            <el-table :data="tableTreeData2" border>
                                <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号" width="120"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="name" label="原料名称" ></el-table-column>
                                <el-table-column align="center" header-align='center' prop="price" label="出售单价" width="100">
                                    <template slot-scope="scope">
                                        ￥{{scope.row.price}}
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="100"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                                    <template slot-scope="scope">
                                        <el-input-number style="width:130px" v-model="tableTreeData2[scope.$index].number" :max="tableTreeData2[scope.$index].stock" :min="0"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                                <el-table-column align="center" header-align='center' label="操作" width="80">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="small" @click="handleClickTreeAdd2(scope.$index, scope.row)">添加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                    background
                                    @current-change="handleCurrentChangeTree2"
                                    :current-page.sync="paramTree2.pageNo"
                                    :page-size="paramTree2.pageSize"
                                    layout="total,prev, pager, next"
                                    :total="totalTreeNum2">
                            </el-pagination>
                        </el-main>
                    </el-container>
                </el-tab-pane>
                <el-tab-pane label="固定资产" name="3" v-if="allType == 1">
                    <el-form :inline="true" :model="searchTreeForm3" label-width="80px" class="demo-form-inline">
                        <el-form-item label="编号">
                            <el-input v-model="searchTreeForm3.serialNo " :maxlength="200" autocomplete="off" placeholder="原料编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="searchTreeForm3.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearchTree3" native-type="submit"></el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableTreeData3" border>
                        <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="编号" width="120"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="名称" ></el-table-column>
                        <!--<el-table-column align="center" header-align='center' prop="price" label="出售单价" width="100">
                            <template slot-scope="scope">
                                ￥{{scope.row.price}}
                            </template>
                        </el-table-column>-->
                        <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                            <template slot-scope="scope">
                                <el-input-number style="width:130px" v-model="tableTreeData3[scope.$index].number" :max="tableTreeData3[scope.$index].stock" :min="0"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleClickTreeAdd3(scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            @current-change="handleCurrentChangeTree3"
                            :current-page.sync="paramTree3.pageNo"
                            :page-size="paramTree3.pageSize"
                            layout="total,prev, pager, next"
                            :total="totalTreeNum3">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="易耗品" name="4" v-if="allType== 1">
                    <el-form :inline="true" :model="searchTreeForm4" label-width="80px" class="demo-form-inline">
                        <el-form-item label="编号">
                            <el-input v-model="searchTreeForm4.serialNo " :maxlength="200" autocomplete="off" placeholder="编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="searchTreeForm4.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearchTree4" native-type="submit"></el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableTreeData4" border>
                        <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="编号" width="120"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="名称" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="price" label="出售单价" width="100">
                            <template slot-scope="scope">
                                ￥{{scope.row.price}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="safeStock" label="安全库存量" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="number" label="数量" width="160">
                            <template slot-scope="scope">
                                <el-input-number style="width:130px" v-model="tableTreeData4[scope.$index].number" :max="tableTreeData4[scope.$index].stock" :min="0"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' prop="standard" label="单位" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleClickTreeAdd4(scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            @current-change="handleCurrentChangeTree4"
                            :current-page.sync="paramTree4.pageNo"
                            :page-size="paramTree4.pageSize"
                            layout="total,prev, pager, next"
                            :total="totalTreeNum4">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTreeFormVisible = false">关闭</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestSearchAssets,requestDestroyInfo,requestSaveDestroy,requestListByDestroyPid,requestDeleteDestroyDetail,requestSearchProductList ,requestSaveDestroyDetail,requestSearchProduct ,requestSearchGroup,requestSearchGroupList,requestSearchKitchenRawList,requestStatusDestroy} from '../../api/api';
    export default {
        name: 'edit-out-stock-order',
        data() {
            return {
                activeName:'1',
                tableData: null,//采购单明细列表
                typeBool:false,
                logisticsInfo:false,//物流信息
                //采购单弹出层
                formLabelWidth: '80px',
                dialogTreeFormVisible:false,
                dialogTreeTitle:'新增报损单明细',
                dialogForm:{
                    standard:'',
                    number:'',
                    price:'',
                    id:'',
                    name:'',
                    serialNo:'',
                    productInfoId:'',
                    type:'1',
                    remark:''
                },
                id: '',//主表id
                saveLoading: false,
                editForm: {
                    name: '',
                    dateTime: '',
                    totalNumber: '',
                    totalPrice: '',
                    remark: '',
                    logisticsNo:'',
                    customerId:'',
                    company:'',
                    options:1,
                },
                //表单校验
                rules: {
                    name: [
                        { required: true, message: '请输入报损单名称', trigger: 'blur' },
                    ],
                    dateTime: [
                        { required: true, message: '请选择报损日期', trigger: 'blur' },
                    ],
                    options: [
                        { required: true, message: '请选报损类型', trigger: 'change' }
                    ],
                },
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                LogisticsList:[],
                customerList:[],
                groupList:[],
                param: {
                    pageSize:-1
                },
                param2: {
                    pid:''
                },
                productList:[],
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
                    packCategoryId:'',
                    isDelete:1
                },
                totalTreeNum:0,
                orgTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                searchTreeForm2: {
                    name: '',
                    serialNo:''
                },
                tableTreeData2: null,
                paramTree2: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    deptId:'',
                    checkChild:'all',
                    serialNo:'',
                    categoryId:'',
                    isDelete:1,

                },
                totalTreeNum2:0,
                orgTreeData2: [],
                searchTreeForm3: {
                    name: '',
                    serialNo:''
                },
                tableTreeData3: [],
                paramTree3: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    serialNo:'',
                    type: '1',
                    isDelete:1,
                },
                totalTreeNum3:0,
                searchTreeForm4: {
                    name: '',
                    serialNo:''
                },
                tableTreeData4: null,
                paramTree4: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    serialNo:'',
                    type: '2',
                    isDelete:1,
                },
                totalTreeNum4:0,
                allType:'',
                disable:'',
            }
        },
        mounted(){
            this.initorderType();
        },
        methods: {
            initorderType(){

                if(this.editForm.options==0){
                    this.editForm.options='厨房报损';
                    this.allType=0;
                    this.disable=1;
                }
                if(this.editForm.options==1){
                    this.editForm.options='库房报损';
                    this.allType=1;
                    this.disable=1;
                }
            },
            tabType(){
                if(this.editForm.options==0){
                    this.allType=0;
                }
                if(this.editForm.options==1){
                    this.allType=1;
                }
            },
            handleClick(tab, event) {
                if(tab.name == '1'){
                    this.getTreeAjaxPage();
                    this.getTreeAjaxList();
                }else if(tab.name == '2'){
                    this.getTreeAjaxPage2();
                    this.getTreeAjaxList2();
                }else if(tab.name == '3'){
                    this.getTreeAjaxPage3();
                }else if(tab.name == '4'){
                    this.getTreeAjaxPage4();
                }
            },
            //点击树节点
            handleNodeClick(data) {
                this.searchTreeForm.name = '';
                this.searchTreeForm.serialNo = '';
                this.paramTree.serialNo = '';
                this.paramTree.name = '';
                this.paramTree.packCategoryId = '';
                if(data.id=="0"){

                }else{
                    this.paramTree.packCategoryId = data.id;
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
                requestSearchGroupList(_this.paramTree).then(res => {
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
                requestSearchGroup({}).then(res => {
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
                if(this.tableTreeData[index].number > 0){
                    let _this = this;
                    let addParam = {};
                    addParam ={
                        id: '',
                        standard:row.standard,
                        number:this.tableTreeData[index].number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        type:_this.activeName,
                        wasteOrderId:_this.id,
                        productInfoId:row.id
                    };
                    requestSaveDestroyDetail(addParam).then(res => {
                        if(res.status == 200){
                            _this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.saveLoading = false;//关闭提交按钮loding
                                    _this.getAjaxList(1);
                                    //_this.requestGetData();
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
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
            },
            handleNodeClick2(data) {
                this.searchTreeForm2.name = '';
                this.searchTreeForm2.serialNo = '';
                this.paramTree2.name = '';
                this.paramTree2.serialNo = '';
                this.paramTree2.categoryId = '';
                if(data.id=="0"){

                }else{
                    this.paramTree2.categoryId = data.id;
                }
                this.paramTree2.pageNo = 1;
                this.getTreeAjaxPage2();
            },
            onSearchTree2() {
                this.paramTree2.pageNo =1;
                this.paramTree2.serialNo = this.searchTreeForm2.serialNo;
                this.paramTree2.name = this.searchTreeForm2.name;
                this.getTreeAjaxPage2();
            },
            handleCurrentChangeTree2(val) {
                this.paramTree2.pageNo = val;
                this.getTreeAjaxPage2();
            },
            getTreeAjaxPage2(){
                let _this = this;
                this.tableTreeData2=[];
                if(this.editForm.options==0){
                    requestSearchKitchenRawList(_this.paramTree2).then(res => {
                        if (res.status == 200) {
                            let data = res.data.items;
                            if(data && data.length>0){
                                _this.tableTreeData2 = data;
                                _this.totalTreeNum2 = parseInt(res.data.totalNum);
                            }else{
                                _this.tableTreeData2 = [];
                                _this.totalTreeNum2 = 0;
                            }
                        }
                    });
                }
                if(this.editForm.options==1 || this.editForm.options=='库房报损'){
                    let _this = this;
                    requestSearchProductList(_this.paramTree2).then(res => {
                        if (res.status == 200) {
                            let data = res.data.items;
                            if(data && data.length>0){
                                _this.tableTreeData2 = data;
                                _this.totalTreeNum2 = parseInt(res.data.totalNum);
                            }else{
                                _this.tableTreeData2 = [];
                                _this.totalTreeNum2 = 0;
                            }
                        }
                    });
                }

            },
            getTreeAjaxList2(){
                let _this = this;
                requestSearchProduct({}).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.orgTreeData2 = data;
                        }else{
                            _this.orgTreeData2 = [];
                        }
                    }
                });
            },
            handleClickTreeAdd2(index,row){
                if(this.tableTreeData2[index].number > 0){
                    let _this = this;
                    let addParam = {};
                    addParam ={
                        id: '',
                        standard:row.standard,
                        number:this.tableTreeData2[index].number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        type:_this.activeName,
                        wasteOrderId:_this.id,
                        productInfoId:row.id
                    };
                    requestSaveDestroyDetail(addParam).then(res => {
                        if(res.status == 200){

                            _this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.saveLoading = false;//关闭提交按钮loding
                                    _this.getAjaxList(1);

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
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
            },
            onSearchTree3() {
                this.paramTree3.pageNo =1;
                this.paramTree3.serialNo = this.searchTreeForm3.serialNo;
                this.paramTree3.name = this.searchTreeForm3.name;
                this.paramTree3.type = this.searchTreeForm3.type;
                this.getTreeAjaxPage3();
            },
            handleCurrentChangeTree3(val) {
                this.paramTree3.pageNo = val;
                this.getTreeAjaxPage3();
            },
            getTreeAjaxPage3(){
                let _this = this;
                requestSearchAssets(_this.paramTree3).then(res => {
                    if (res.status == 200) {

                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableTreeData3 = data;
                            _this.totalTreeNum3 = parseInt(res.data.totalNum);
                        }else{
                            _this.tableTreeData3 = [];
                            _this.totalTreeNum3 = 0;
                        }
                    }
                });
            },
            handleClickTreeAdd3(index,row){
                if(this.tableTreeData3[index].number >0){
                    let _this = this;
                    let addParam = {};
                    addParam ={
                        id: '',
                        standard:row.standard,
                        number:this.tableTreeData3[index].number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        type:_this.activeName,
                        wasteOrderId:_this.id,
                        productInfoId:row.id
                    };
                    requestSaveDestroyDetail(addParam).then(res => {
                        if(res.status == 200){
                            _this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.saveLoading = false;//关闭提交按钮loding
                                    _this.getAjaxList(1);
                                    if(this.editForm.options==0){
                                        this.dialogTreeFormVisible=false;
                                    }
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
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
            },
            onSearchTree4() {
                this.paramTree4.pageNo =1;
                this.paramTree4.serialNo = this.searchTreeForm4.serialNo;
                this.paramTree4.name = this.searchTreeForm4.name;
                this.paramTree4.type = this.searchTreeForm4.type;
                this.getTreeAjaxPage4();
            },
            handleCurrentChangeTree4(val) {
                this.paramTree4.pageNo = val;
                this.getTreeAjaxPage4();
            },
            getTreeAjaxPage4(){
                let _this = this;
                requestSearchAssets(_this.paramTree4).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableTreeData4 = data;
                            _this.totalTreeNum4 = parseInt(res.data.totalNum);
                        }else{
                            _this.tableTreeData4 = [];
                            _this.totalTreeNum4 = 0;
                        }
                    }
                });
            },
            handleClickTreeAdd4(index,row){
                if(this.tableTreeData4[index].number > 0){
                    let _this = this;
                    let addParam = {};
                    addParam ={
                        id: '',
                        standard:row.standard,
                        number:this.tableTreeData4[index].number,
                        price:row.price,
                        name:row.name,
                        serialNo:row.serialNo,
                        type:_this.activeName,
                        wasteOrderId:_this.id,
                        productInfoId:row.id
                    };
                    requestSaveDestroyDetail(addParam).then(res => {
                        if(res.status == 200){
                            _this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    _this.saveLoading = false;//关闭提交按钮loding
                                    _this.getAjaxList(1);
                                    if(this.editForm.options==0){
                                        this.dialogTreeFormVisible=false;
                                    }
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
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择数量！'
                    });
                }
            },
            //默认显示今天
            getdatatime(){
                let nowDate = new Date();
                let year = nowDate.getFullYear();
                let month = nowDate.getMonth() + 1;
                let newMonth = month>9?month:"0"+month;  //月
                let day = nowDate.getDate();
                let newDay =day>9?day:"0"+day; //日
                this.editForm.dateTime= year + '-' + newMonth + '-' + newDay;
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
                        requestDeleteDestroyDetail(deleteParam).then(res => {
                            if(res.status == 200){
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.getAjaxList(1);
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
                    if(this.editForm.options==0){
                        this.activeName='2';
                        this.getTreeAjaxPage2();
                        this.getTreeAjaxList2();
                        this.dialogTreeFormVisible = true;
                    }
                    else{
                        this.activeName='1';
                        this.getTreeAjaxPage();
                        this.getTreeAjaxList();
                        this.dialogTreeFormVisible = true;
                    }

                }
            },
            //查询明细列表
            getAjaxList(bool){
                let _this = this;
                requestListByDestroyPid(_this.param2).then(res => {
                    _this.tableData = [];
                    let data = res.data;
                    if(res.data.orderType!=''){
                        this.disable=0;
                    }else{
                        this.disable=1;
                    }
                    if(data && data.length>0){
                        _this.tableData = data;
                        //如果是新增明细后的刷新，再次提交表单
                        if(bool == 1){
                            _this.requestGetData();
                        }
                    }else{
                        _this.tableData = [];
                    }
                });
            },
            //入库单详情
            requestClientInfo(){
                let _this = this;
                requestDestroyInfo({id:this.id}).then(res => {
                    this.logisticsInfo=true;//物流信息
                    if(res.status == 200){
                        let data = res.data;
                        if(data.orderType==0){
                            this.allType=0;
                        }
                        if (data) {
                            _this.editForm.name = data.name;
                            _this.editForm.dateTime = data.dateTime;
                            _this.editForm.totalNumber = data.totalNumber;
                            _this.editForm.totalPrice = data.totalPrice;
                            _this.editForm.remark = data.remark;
                            _this.editForm.logisticsNo = data.logisticsNo;
                            _this.editForm.type=data.type+"";
                            _this.editForm.customerId = data.customerId;
                            _this.editForm.options=data.orderType;
                        }

                    }else{
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            requestGetData(){
                let _this = this;
                requestDestroyInfo({id:this.id}).then(res => {
                        this.logisticsInfo=true;//物流信息
                        if(res.status == 200){
                            let data = res.data;
                            if (data) {
                                _this.editForm.name = data.name;
                                _this.editForm.dateTime = data.dateTime;
                                _this.editForm.totalNumber = data.totalNumber;
                                _this.editForm.totalPrice = data.totalPrice;
                                _this.editForm.remark = data.remark;
                                _this.editForm.logisticsNo = data.logisticsNo;
                                _this.editForm.type=data.type+"";
                                _this.editForm.customerId = data.customerId;
                            }

                        }else{
                            this.$message({
                                message: '请求异常',
                                type: 'error'
                            });
                        }
            })
            },

            goBack() {
                this.$router.push({ path: '/destroy' });
            },
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let editFormParam ={
                            id: _this.id,
                            name: _this.editForm.name,
                            dateTime: _this.editForm.dateTime,
                            totalNumber: _this.editForm.totalNumber,
                            totalPrice : _this.editForm.totalPrice,
                            remark : _this.editForm.remark,
                            logisticsNo : _this.editForm.logisticsNo,
                            customerId : _this.editForm.customerId,
                            orderType:_this.editForm.options,
                        };
                        requestSaveDestroy(editFormParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '操作成功!',
                                duration:300,
                                onClose:function(){
                                    sessionStorage.setItem('destroyId',res.data.id);
                                    _this.id=res.data.id;
                                    _this.param2.pid=res.data.id;
                                    _this.requestClientInfo();
                                    _this.getAjaxList(2);
                                    _this.saveLoading = false;
                                    _this.typeBool = true;
                                }
                            });
                        });
                        const check=sessionStorage.getItem('check');
                        let sParam ={
                            id: _this.id,
                            status:0,
                        };
                        if(check==1){
                            requestStatusDestroy(sParam).then(res => {

                            });
                        }

                    } else {
                        return false;
                    }
                });
            }
        },
        beforeMount() {
            //采购单编辑
            let id = sessionStorage.getItem('destroyId');
            if(id){
                this.id=id;
                this.param2.pid=id;
                this.typeBool = true;
                this.requestClientInfo();
                this.getAjaxList(2);
            }
            this.getdatatime();
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
