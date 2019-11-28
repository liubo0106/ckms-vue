<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/shopInStock' }">门店商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{id == '' ? '新增': '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <!--主表添加编辑-->
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="排序号" prop="num" >
                            <el-input-number v-model.number="editForm.num" :min="0" :max="999999999" style="width: 216px;"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="菜品分类" :label-width="formLabelWidth" prop="categoryId" style="width: 316px;">
                            <el-select  v-model="editForm.categoryId" placeholder="请选择" @change="changeCategory">
                                <el-option  v-for="item in categoryList" :label="item.name"  :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item  :label="commodityName" :label-width="formLabelWidth" prop="productInfoId">
                            <el-input v-model="editForm.name" autocomplete="off" disabled style="width: 216px;"></el-input>
                            <el-button icon="el-icon-plus" circle @click="handleRowClick" v-if="id==''"></el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="菜品种类"  prop="kind":label-width="formLabelWidth" style="width: 316px;">
                            <el-select  v-model="editForm.kind" placeholder="请选择">
                                <el-option  v-for="item in kindList" :label="item.name"  :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="菜品性质"  prop="nature" :label-width="formLabelWidth" style="width: 316px;">
                            <el-select  v-model="editForm.nature" placeholder="请选择">
                                <el-option label="成品菜" value="0"></el-option>
                                <el-option label="配菜/料" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item  label="是否上架">
                            <template>
                                <el-radio v-model="editForm.isSale" label="1">是</el-radio>
                                <el-radio v-model="editForm.isSale" label="0">否</el-radio>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="是否配料">
                            <template>
                                <el-radio v-model="editForm.isSide" label="1">是</el-radio>
                                <el-radio v-model="editForm.isSide" label="0">否</el-radio>
                            </template>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item  label="是否打折">
                            <template>
                                <el-radio v-model="editForm.isDiscount" :label="0">是</el-radio>
                                <el-radio v-model="editForm.isDiscount" :label="1">否</el-radio>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="价格" >
                            <el-input-number v-model="editForm.price" :min="0" :max="999999999" style="width: 216px;"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="照片" prop="avatarBosKey">
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
                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')" :loading="saveLoading">提交</el-button>
                    <el-button @click="goBack()">返回</el-button>
                </el-form-item>
            </el-form>
            <!--配料明细列表-->
            <div class="contentBody" v-if="editForm.isSide==0 && id">
                <el-form label-width="60px" class="demo-form-inline">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-form-item label-width="0">
                                <el-button icon="el-icon-plus" circle @click="handleClickDetail('', '', 'add')"></el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table :data="tableData" border>
                    <el-table-column align="center" header-align='center' type="index" label="序号" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="showName" label="显示名称"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="serialNo" label="打包编号"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="name" label="打包名称" width="140"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="180"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="num" label="排序号" width="180"></el-table-column>
                    <el-table-column align="center" header-align='center' label="操作" width="260">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleClickDetail(scope.$index, scope.row, 'edit')">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleClickDetail(scope.$index, scope.row, 'delete')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--商品明细弹出层--->
        <el-dialog :title='dialogTreeTitle' :visible.sync="dialogTreeFormVisible" width="80%" top="5vh">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="打包" name="1">
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
                                <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
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
                <el-tab-pane label="原材料" name="2">
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
                                    <el-input v-model="searchTreeForm2.serialNo " :maxlength="200" autocomplete="off" placeholder="编号" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="名称">
                                    <el-input v-model="searchTreeForm2.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                                </el-form-item>
                                <el-form-item label-width="0">
                                    <el-button icon="el-icon-search" circle @click.native.prevent="onSearchTree2" native-type="submit"></el-button>
                                </el-form-item>
                            </el-form>
                            <el-table :data="tableTreeData2" border>
                                <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="serialNo" label="原料编号" width="120"></el-table-column>
                                <el-table-column align="center" header-align='center' prop="name" label="原料名称" ></el-table-column>
                                <el-table-column align="center" header-align='center' prop="stock" label="库存量" width="100"></el-table-column>
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
                <el-tab-pane label="复合调料包" name="3">
                    <el-container>
                        <el-main>
                            <el-form :inline="true" :model="searchTreeForm3" label-width="80px" class="demo-form-inline">
                                <el-form-item label="编号">
                                    <el-input v-model="searchTreeForm3.serialNo " :maxlength="200" autocomplete="off" placeholder="编号" clearable></el-input>
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
                                <el-table-column align="center" header-align='center' prop="standard" label="单位" ></el-table-column>
                                <el-table-column align="center" header-align='center' label="操作" width="80">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="small" @click="handleClickTreeAdd4(scope.$index, scope.row)">添加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                    background
                                    @current-change="handleCurrentChangeTree2"
                                    :current-page.sync="paramTree3.pageNo"
                                    :page-size="paramTree3.pageSize"
                                    layout="total,prev, pager, next"
                                    :total="totalTreeNum3">
                            </el-pagination>
                        </el-main>
                    </el-container>
                </el-tab-pane>
            </el-tabs>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTreeFormVisible = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--配料单明细添加弹出层-->
        <el-dialog :title='dialogTreeTitle2' :visible.sync="dialogTreeFormVisible2" width="80%" top="5vh">
            <el-container>
                <el-main>
                    <el-table :data="tableTreeData3" border>
                        <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="serialNo" label="打包编号" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="打包名称" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="safeStock" label="数量" width="160">
                            <template slot-scope="scope">
                                <el-input-number style="width:130px" v-model="tableTreeData3[scope.$index].number" :min="0"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" header-align='center' label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleClickTreeAdd3(scope.$index, scope.row)">添加</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            @current-change="handleCurrentChangeTree"
                            :current-page.sync="paramTree3.pageNo"
                            :page-size="paramTree3.pageSize"
                            layout="total,prev, pager, next"
                            :total="totalTreeNum3">
                    </el-pagination>
                </el-main>
            </el-container>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTreeFormVisible2 = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--配料明细编辑弹出层-->
        <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible" style="width: 800px;left: 25%;">
            <el-form :model="dialogForm" :rules="rules" ref="dialogForm">
                <el-form-item label="排序号" :label-width="formLabelWidth" >
                    <el-input-number v-model="dialogForm.num" :min="0" :max="999999999" style="width: 216px"></el-input-number>
                </el-form-item>
                <el-form-item label="打包编号" :label-width="formLabelWidth" style="width: 316px">
                    <el-input placeholder='请输入' v-model="dialogForm.serialNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="打包名称" :label-width="formLabelWidth" style="width: 316px">
                    <el-input placeholder='请输入' v-model="dialogForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="显示名称" :label-width="formLabelWidth" style="width: 316px">
                    <el-input placeholder='请输入' v-model="dialogForm.showName"></el-input>
                </el-form-item>
                <el-form-item label="数量" :label-width="formLabelWidth" >
                    <el-input-number v-model="dialogForm.number" :min="0" :max="999999999" style="width: 216px"></el-input-number>
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
    import {
        requestDeleteDosing,
        requestGoodsInfo,
        requestGoodsInfoPid,
        requestMenuListByInPid,
        requestSaveDosing,
        requestSaveGoods,
        requestSaveSalesDetailList,
        requestSearchDosing,
        requestSearchGoods,
        requestSearchGroup,
        requestSearchProduct,
        requestSearchProductList,
        requestSearchCompound,
        requestUploadFile
    } from '../../api/api';

    export default {
        name: 'edit-user-manage',
        data() {
            //校验商品是否重复添加
            var validateUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择商品'));
                } else {
                    if(this.oldProductInfoId === value){
                        callback();
                    }else{
                        requestGoodsInfoPid({pid:value}).then(res=>{
                            let data = res.data;
                            if (res.status == 200) {
                                callback();
                            }else{
                                callback(new Error(res.msg));
                            }
                        });
                    }
                }
            };
            var customerId= sessionStorage.getItem('customerId')
            var id=sessionStorage.getItem('id')
            return {
                kindList:[{name:'炒锅涮锅',value:1},{name:'烧烤',value:2},{name:'凉菜',value:3},{name:'其他',value:0}],
                oldProductInfoId:'',
                pathIds: sessionStorage.getItem('pathIds'),
                headers: {'sessionId': sessionStorage.getItem('sessionId')},
                id: id,//主表id
                saveLoading: false,
                formLabelWidth: '100px',
                editForm: {
                    customerId:customerId,//门店ID
                    num:0,
                    type:'1',
                    productInfoId:'',
                    price:0,
                    isSale:'1',
                    isSide:'0',
                    isDiscount:1,//0打折
                    remark:'',
                    name:'',
                    serialNo:'',
                    standard:'',
                    categoryId:'',
                   // showName:'',
                    kind:'',
                    nature:''

                },
                param: {
                    pageNo:1,
                    pageSize:0,
                    isLook:"1",
                },
                param3: {
                    pid:"0",
                },
                //roductList:[],
                //groupList:[],
                categoryList:[],
                rules: {
                    num: [
                        { required: true, message: '请输入排序号', trigger: 'blur' },
                    ],
                    productInfoId: [
                        { required: true, message: '请选择商品', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字', trigger: 'blur' },
                        { validator: validateUserName, trigger: 'blur' }
                    ],
                    kind:[
                        { required: true, message: '请选择菜品种类', trigger: 'blur' },
                    ],
                    nature:[
                        {required: true, message: '请选择菜品性质', trigger: 'blur'}
                    ]
                },
                //上传图片
                imageUrl: '',
                upLoadAction: requestUploadFile,
                avatarBosKey: '',
                commodityName:'名称',//商品名称
                //商品明细弹出层
                dialogTreeTitle:'新增门店商品',
                dialogTreeFormVisible:false,
                activeName:'1',
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
                    isDelete:1,
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
                    isLook:"1",
                },
                totalTreeNum2:0,
                orgTreeData2: [],
                searchTreeForm3: {
                    name: '',
                    serialNo:''
                },
                tableTreeData3: null,
                paramTree3: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    deptId:'',
                    checkChild:'all',
                    serialNo:'',
                    packCategoryId:'',
                },
                totalTreeNum3:0,
                orgTreeData3: [],
                //配料弹出层
                dialogTreeFormVisible2:false,
                dialogTreeTitle2:'新增配料明细',
                tableData: null,//配料单明细列表
                tableTreeData3:null,//配料单
                totalTreeNum3:0,
                paramTree3: {
                    pageNo:1,
                    pageSize:10,
                    name:'',
                    isSale:'',
                    isSide:'1',
                    customerId:customerId,//门店ID
                },
                tableTreeData4:{
                    num:0,
                    showName:''
                },
                //配料编辑弹出层
                dialogTitle:'',
                dialogFormVisible:false,
                dialogForm:{
                    parentId:'',
                    goodsId:'',
                    type:'',
                    productInfoId:'',
                    serialNo:'',
                    name:'',
                    standard:'',
                    num:'',
                    showName:'',
                    number:'',
                    id:''
                },

            }

        },
        methods: {
            //选择原料弹出层
            handleRowClick(){
                this.getTreeAjaxPage();
                this.getTreeAjaxList();
                this.dialogTreeFormVisible = true;
            },
            indexMethod(index) {
                return (this.paramTree3.pageNo - 1) * this.paramTree3.pageSize + index + 1;
            },
            //面板切换
            handleClick(tab, event) {
                if(tab.name == '1'){
                    this.getTreeAjaxPage();
                    this.getTreeAjaxList();
                }else if(tab.name == '2'){
                    this.getTreeAjaxPage2();
                    this.getTreeAjaxList2();
                }else if(tab.name == '3'){
                    this.getTreeAjaxPage3();
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
                this.paramTree3.pageNo = val;
                this.getAjaxDosingList();
            },
            getTreeAjaxPage(){
                let _this = this;
                requestSaveSalesDetailList(_this.paramTree).then(res => {
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
                let _this = this;
                console.log(row)
                this.editForm.standard = row.standard;
                this.editForm.number = this.tableTreeData[index].number;
                this.editForm.name = row.name;
                this.editForm.productInfoId = row.id;
                this.editForm.type=_this.activeName;
                this.editForm.serialNo=row.serialNo;
                this.dialogTreeFormVisible = false;
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
                this.paramTree3.pageNo = val;
                this.getTreeAjaxPage();
            },
            getTreeAjaxPage2(){
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
                let _this = this;
                this.editForm.standard = row.standard;
                this.editForm.number = this.tableTreeData2[index].number;
                this.editForm.name = row.name;
                this.editForm.productInfoId = row.id;
                this.editForm.type=_this.activeName;
                this.editForm.serialNo=row.serialNo;
                this.dialogTreeFormVisible = false;
            },
            handleClickTreeAdd4(index,row){
                let _this = this;
                this.editForm.standard = row.standard;
                this.editForm.number = this.tableTreeData3[index].number;
                this.editForm.name = row.name;
                this.editForm.productInfoId = row.id;
                this.editForm.type=0;
                this.editForm.serialNo=row.serialNo;
                this.dialogTreeFormVisible = false;
            },

            getTreeAjaxPage3(){
                let _this = this;
                requestSearchCompound(_this.paramTree3).then(res => {
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
            //配料点击事件
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
                        requestDeleteDosing(deleteParam).then(res => {
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
                    this.getAjaxDosingList();//查询配料明细
                    //添加
                    this.dialogTreeFormVisible2 = true;
                }else if(doType == 'edit'){
                    //编辑
                    _this.addOrg('edit',row);
                }
            },
            //查询配料明细
            getAjaxDosingList(bool){
                let _this = this;
                requestSearchGoods(_this.paramTree3).then(res => {
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
            //添加配料明细
            handleClickTreeAdd3(index,row) {
                let _this = this;
                let addParam = {};
                addParam = {
                    parentId:_this.id,
                    goodsId:row.id,
                    type:row.type,
                    productInfoId:row.productInfoId,
                    serialNo:row.serialNo,
                    name:row.name,
                    standard:row.standard,
                    //num:this.tableTreeData3[index].num,
                    showName:this.tableTreeData3[index].name,
                    number:this.tableTreeData3[index].number,


                };
                requestSaveDosing(addParam).then(res => {
                    if (res.status == 200) {
                        _this.$message({
                            type: 'success',
                            message: '操作成功!',
                            duration: 300,
                            onClose: function () {
                                _this.saveLoading = false;//关闭提交按钮loding
                                _this.getAjaxList();
                            }
                        });
                    } else {
                        _this.saveLoading = false;
                        _this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                });
            },
            //查询配料明细列表
            getAjaxList(){
                let _this = this;
                requestSearchDosing({parentId:_this.id}).then(res => {
                    _this.tableData = [];
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.tableData = data;
                    }else{
                        _this.tableData = [];
                    }
                });
            },
            //菜品分类
            changeCategory(val){
                let tn = {};
                tn = this.categoryList.find((item)=>{
                    return item.id === val;
                });
            },

            //请求菜品分类
            getAjaxCategory(){
                let _this = this;
                requestMenuListByInPid(_this.param3).then(res => {
                    if (res.status == 200) {
                        let data = res.data;
                        if(data && data.length>0){
                            _this.categoryList = data;
                        }else{
                            _this.categoryList = [];
                        }
                    }
                });
            },
            //门店商品信息详情
            requestGoodsInfo(){
                let _this = this;
                requestGoodsInfo({id:this.id}).then(res => {
                    if(res.status == 200){
                        let data = res.data;
                        if (data) {
                            _this.editForm.name = data.name;
                            _this.editForm.num = data.num;
                            _this.editForm.type = data.type+'';
                            _this.editForm.productInfoId = data.productInfoId;
                            _this.editForm.serialNo = data.serialNo;
                            _this.editForm.standard = data.standard;
                            _this.editForm.price = data.price;
                            _this.editForm.kind = data.kind;
                            _this.imageUrl = data.pictureUrl;
                            _this.editForm.isSale = data.isSale+'';
                            _this.editForm.isSide = data.isSide+'';
                            _this.editForm.isDiscount = data.isDiscount;
                            _this.oldProductInfoId = data.productInfoId;
                            _this.editForm.categoryId = data.categoryId;
                        }
                        if(data.nature==1){
                             _this.editForm.nature="1";
                        }
                        if(data.nature==0){
                             _this.editForm.nature="0";
                        }
                    }else{
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            //显示明细添加编辑页面弹出层
            addOrg(type,row){
                this.dialogFormVisible = true;
                if(type == 'add'){

                }else{
                    this.disabled = !this.disabled
                    this.dialogTitle='编辑配料明细',
                        //编辑
                    this.dialogForm.parentId = row.parentId;
                    this.dialogForm.goodsId = row.goodsId;
                    this.dialogForm.type = row.type;
                    this.dialogForm.productInfoId = row.productInfoId;
                    this.dialogForm.serialNo = row.serialNo;
                    this.dialogForm.name = row.name;
                    this.dialogForm.standard = row.standard;
                    this.dialogForm.num = row.num;
                    this.dialogForm.showName = row.showName;
                    this.dialogForm.number = row.number;
                    this.dialogForm.id = row.id;
                    //console.log(row.id)

                }
            },
            //添加编辑点击确认数据回显
            dialogFormAdd(formName){
                let _this = this;
                let addParam = {};
                addParam ={
                    goodsId:_this.dialogForm.goodsId,
                    type:_this.dialogForm.type,
                    productInfoId:_this.dialogForm.productInfoId,
                    serialNo:_this.dialogForm.serialNo,
                    name:_this.dialogForm.name,
                    standard:_this.dialogForm.standard,
                    num:_this.dialogForm.num,
                    showName:this.dialogForm.showName,
                    parentId:this.dialogForm.parentId,
                    number:_this.dialogForm.number,
                    id:_this.dialogForm.id,

                };
                //表单校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //防止重复提交
                        _this.saveLoading = true;
                        //表单提交方法更
                        requestSaveDosing(addParam).then(res => {
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
            goBack() {
                this.$router.push({ path: '/shopInStock' });
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
            /*主表*/
            submitForm(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.saveLoading = true;
                        let editFormParam ={
                            id:_this.id,
                            num: _this.editForm.num,
                            type: _this.editForm.type,
                            productInfoId: _this.editForm.productInfoId,
                            price: _this.editForm.price,
                            isSale: _this.editForm.isSale,
                            isSide: _this.editForm.isSide,
                            isDiscount: _this.editForm.isDiscount,
                            remark: _this.editForm.remark,
                            name: _this.editForm.name,
                            serialNo: _this.editForm.serialNo,
                            standard: _this.editForm.standard,
                            picture: _this.avatarBosKey,
                            customerId: _this.editForm.customerId,
                            categoryId: _this.editForm.categoryId,
                            kind: _this.editForm.kind,
                            nature:_this.editForm.nature,
                        };
                        requestSaveGoods(editFormParam).then(res => {
                            console.log(res)

                            if(res.status==200){
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.id=res.data.id;
                                        //_this.goBack();
                                        _this.requestGoodsInfo()
                                        _this.saveLoading = false;
                                    }
                                });
                            }else{
                                this.$message({
                                    type: 'info',
                                    message: res.msg
                                });
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },


        },
        beforeMount() {
            this.getAjaxCategory();


            if(this.id){
                this.requestGoodsInfo();
                this.getAjaxList();//查询配料明细
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
