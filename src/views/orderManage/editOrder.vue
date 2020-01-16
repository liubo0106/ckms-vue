<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/order' }">顾客订单结算管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{doType == 'add' ? '新增' : '编辑'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">

            <el-row style="margin-bottom: 20px;text-align: right;">
                <div style="font-size: 30px;margin-right: 50%">{{editForm.deskNo}}号桌</div>
                <el-button type="primary"   @click="handleFreeClick('', '', 'order')">点餐</el-button>
            </el-row>
            <el-form :model="editForm" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-table :data="orderDetailList" border style="width: 100%" show-summary :summary-method="getSummaries">
                    <el-table-column align="center" header-align='center' prop="name" label="名称" ></el-table-column>
                    <el-table-column align="center" header-align='center' prop="number" label="数量" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="price" label="单价" width="80"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="flavor" label="口味" width="120"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="remark" label="备注" width="180"></el-table-column>
                    <el-table-column align="center" header-align='center' prop="totalPrice" label="总价"  width="80">
                        <template slot-scope="scope">
                            {{orderDetailList[scope.$index].number*orderDetailList[scope.$index].price}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" header-align='center' label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-delete" size="small" style="background:#e16870;color:rgba(255,255,255,1);border-radius:5px;" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-form-item style="text-align: right">
                    <el-row style="text-align: right;margin-bottom: 2%;margin-top: 10px;">
                        <el-form-item label="备注:" >
                            <el-input  v-model="editForm.remark"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row style="text-align: right">
                        用餐人数:  <el-input-number v-model="editForm.people" :min="1"  @change="diners"></el-input-number>
                        <el-button type="primary" @click="showDetailDialog('editForm')">确认下单</el-button>
                        <el-button type="primary" @click="goBack()">返回</el-button>
                    </el-row>
                </el-form-item>
            </el-form>
        </div>
        <!--菜品列表弹出层-->
        <el-dialog :title='dialogTreeTitle2' :visible.sync="dialogTreeFormVisible2" width="80%" top="5vh">
            <el-container>
             <el-main>
             <el-form :model="editForm" ref="editForm"  label-width="40px" class="demo-ruleForm" v-if="type==0" label-position="left">
                 <el-row :gutter="20">
                     <el-col :span="20">
                         <el-form-item label="搜索" >
                             <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                         </el-form-item>
                     </el-col>
                     <el-col :span="4">
                         <el-form-item label-width="0">
                             <el-button icon="el-icon-search" circle  @click.native.prevent="onSearch(0)" native-type="submit"></el-button>
                         </el-form-item>
                     </el-col>
                 </el-row>
             </el-form>
                 <el-form :model="editForm" ref="editForm" label-width="100px" class="demo-ruleForm" v-else>
                     <el-row :gutter="20">
                         <el-col :span="20">
                             <el-form-item label="搜索">
                                 <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="名称" clearable></el-input>
                             </el-form-item>
                         </el-col>
                         <el-col :span="4">
                             <el-form-item label-width="0">
                                 <el-button icon="el-icon-search"  circle  @click.native.prevent="onSearch(1)" native-type="submit"></el-button>
                             </el-form-item>
                         </el-col>
                     </el-row>
                 </el-form>
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClickData"  >
                <el-tab-pane label="单品" name="1">
                    <el-container>
                        <el-aside style="width:150px">
                            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="true"></el-tree>
                            <el-tree default-expand-all :data="orgTreeData" :props="defaultProps" @node-click="handleNodeClick" >
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                    <span>{{ data.name }}</span>
                                </span>
                            </el-tree>
                        </el-aside>
                        <el-main>
                            <el-form :model="editForm" ref="editForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="" label-width="0px">
                                    <el-table :data="goodsList" border stripe  v-loading="goodsLoading" >
                                        <el-table-column label="序号" type="index" :index="indexMethod" align="center" header-align="center"></el-table-column>
                                        <el-table-column label="名称" prop="name" align="center" header-align='center'></el-table-column>
                                        <el-table-column label="库存量" prop="stock" align="center" header-align='center' width="80px"></el-table-column>
                                        <el-table-column label="数量" prop="number" align="center" header-align='center'>
                                            <el-form-item slot-scope="scope">
                                                <el-input-number style="width:130px" v-model="goodsList[scope.$index].number" :min="0" :max="goodsList[scope.$index].stock" :disabled="scope.row.isSale ==0 || scope.row.stock == 0"></el-input-number>
                                            </el-form-item>
                                        </el-table-column>
                                        <el-table-column label="单价(元)" prop="price" align="center" header-align='center'>
                                            <!-- <template slot-scope="scope">
                                                 ￥{{scope.row.price}}
                                             </template>-->
                                            <el-form-item slot-scope="scope">
                                                <el-input-number style="width:130px" v-model="goodsList[scope.$index].price" :min="0"  disabled ></el-input-number>
                                            </el-form-item>
                                        </el-table-column>
                                        <el-table-column label="状态" prop="stockName" align="center" header-align='center' width="80px"></el-table-column>
                                        <!--<el-table-column label="口味" prop="flavor" align="center" header-align='center' width="180px">
                                            <el-form-item slot-scope="scope">
                                                <el-select v-model="goodsList[scope.$index].flavor" placeholder="请选择" clearable  @change="handleClickTaste()" style="width: 150px" :disabled="scope.row.isSale ==0 || scope.row.stock == 0">
                                                    <el-option :label="f.name" :value="f.name"  v-for='f in flavorList'></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-table-column>-->
                                        <el-table-column label="单品备注" prop="remark" align="center" header-align='center'>
                                            <el-form-item slot-scope="scope">
                                                <el-input v-model="goodsList[scope.$index].remark" :disabled="scope.row.isSale ==0 || scope.row.stock == 0"></el-input>
                                            </el-form-item>
                                        </el-table-column>
                                        <el-table-column align="center" header-align='center' label="操作" width="80">
                                            <template slot-scope="scope">
                                                <el-button type="primary" size="small"  @click="handleClickTree(scope.$index, scope.row)">添加</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <div style="margin-top: 10px">
                                    <el-pagination
                                            @size-change="handleSizeChangeGoods"
                                            @current-change="handleCurrentChangeGoods"
                                            :current-page="param.pageNo"
                                            :page-sizes="[10, 20, 30, 40]"
                                            :page-size="param.pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="totalNum">
                                    </el-pagination>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </el-main>
                    </el-container>

                </el-tab-pane>
                <el-tab-pane label="套餐" name="2">
                    <el-form :model="editForm" ref="editForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="" label-width="0px">
                            <el-table :data="restaurantData" stripe height="400">
                                <el-table-column label="名称" prop="name" align="center" header-align='center'></el-table-column>
                                <el-table-column label="数量" prop="number" align="center" header-align='center'>
                                    <el-form-item slot-scope="scope">
                                        <el-input-number style="width:130px" v-model="restaurantData[scope.$index].number" :min="0"></el-input-number>
                                    </el-form-item>
                                </el-table-column>
                                <el-table-column label="单价(元)" prop="price" align="center" header-align='center'>
                                    <!-- <template slot-scope="scope">
                                         ￥{{scope.row.price}}
                                     </template>-->
                                    <el-form-item slot-scope="scope">
                                        <el-input-number style="width:130px" v-model="restaurantData[scope.$index].price" :min="0"  disabled></el-input-number>
                                    </el-form-item>
                                </el-table-column>
                                <el-table-column label="套餐备注" prop="remark" align="center" header-align='center'>
                                    <el-form-item slot-scope="scope">
                                        <el-input v-model="restaurantData[scope.$index].remark"></el-input>
                                    </el-form-item>
                                </el-table-column>
                                <el-table-column align="center" header-align='center' label="操作" width="220">
                                    <template slot-scope="scope">
                                        <el-button type="primary" size="small"  @click="handleClickTree(scope.$index, scope.row,2)">添加</el-button>
                                        <el-button type="primary" size="small"  @click="handClickDetail(scope.$index, scope.row)">详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
             </el-main>
            </el-container>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTreeFormVisible2 = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--订单明细-->
        <div class="contentBody"  v-if="doType == 'edit'">
            <el-collapse v-model="activeName">
                <el-collapse-item v-for="(sd,index) in storeDeskOrdersList" :name="sd.id" v-bind:key="index">
                    <template slot="title">
                        <el-button type="primary" v-if="sd.status==1" style="margin-right: 5px" @click="handleClickPrint(sd.id)" :loading="sd.id == saveLoadingId" size="small">出票</el-button>
                        <el-button v-if="sd.status==1" :loading="deleteOrderShow"  @click="deleteOrder(sd.id)" size="small" style="margin-right:10px;">取消订单</el-button>
                        <el-button type="success" v-if="sd.status==0" style="margin-right: 20px" @click="handleClickEnsure(sd.id)" :loading="sd.id == saveLoadingId" size="small">确认</el-button>
                        
                        订单号：{{sd.orderNo}}，用餐人数：{{sd.people}}，状态：{{sd.statusName}}，消费总额：{{sd.totalPrice}}，备注：{{sd.remark}}
                    </template>
                    <el-table :data="sd.detailList" max-height="400">
                        <!--<el-table-column label='商品图' prop="pictureUrl" align="center" header-align='center'>
                            <template slot-scope="scope">
                                <el-image
                                        style="width: 50px; height: 50px"
                                        :src="scope.row.pictureUrl"
                                        fit="fill"></el-image>
                            </template>
                        </el-table-column>-->
                        <el-table-column label="名称" prop="name" align="center" header-align='center'></el-table-column>
                        <el-table-column label="数量" prop="number" align="center" header-align='center'></el-table-column>
                        <el-table-column label="单价" prop="price" align="center" header-align='center'></el-table-column>
                        <el-table-column prop="totalPrice" label="总价" align="center" header-align='center'>
                            <template slot-scope="scope">
                                {{scope.row.number*scope.row.price}}
                            </template>
                        </el-table-column>
                        <el-table-column label="口味" prop="flavor" align="center" header-align='center'></el-table-column>
                        <el-table-column label="单品备注" prop="remark" align="center" header-align='center'></el-table-column>
                        <el-table-column label="操作"  align="center" header-align='center' width="240">
                            <template slot-scope="scope">
                                <el-button  v-if="isManager==1 && sd.status==1 && scope.row.number > 0" size="mini" type="danger" @click="handleFreeClick(scope.$index, scope.row, 'retreat')">退菜</el-button>
                                <el-button  v-if="isManager==1 && sd.status==0" size="mini" type="danger" @click="handleFreeClick(scope.$index, scope.row, 'delete')">删除</el-button>
                                <el-button v-if="scope.row.isFree==1 && scope.row.number>0" type="warning" size="small" @click="handleFreeClick(scope.$index, scope.row, 'isFree')">赠送</el-button>
                                <el-button  v-if="scope.row.isFree==0" size="small" @click="handleFreeClick(scope.$index, scope.row, 'isClose')">取消赠送</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
            </el-collapse>
        </div>
        <el-dialog title="提交订单" :visible.sync="dialogOrderVisible">
            <el-table :data="orderDetailList" height="400"  show-summary :summary-method="getSummaries">
                <el-table-column label="名称" prop="name" align="center" header-align='center'></el-table-column>
                <el-table-column label="数量" prop="number" align="center" header-align='center'>
                    <template slot-scope="scope">
                        x{{orderDetailList[scope.$index].number}}
                    </template>
                </el-table-column>

                <el-table-column label="单价" prop="price" align="center" header-align='center'></el-table-column>
                <el-table-column label="口味" prop="flavor" align="center" header-align='center'></el-table-column>
                <el-table-column label="备注" prop="remark" align="center" header-align='center'></el-table-column>
                <el-table-column prop="totalPrice" label="总价" align="center" header-align='center'>
                    <template slot-scope="scope">
                        {{orderDetailList[scope.$index].number*orderDetailList[scope.$index].price}}
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button round @click="dialogOrderVisible = false">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button>
                <el-button type="warning" round @click="addDialogOrderForm" :loading="saveLoading">提交订单</el-button>
            </div>
        </el-dialog>
        <!--口味添加弹出层-->
        <el-dialog title='添加口味' :visible.sync="dialogTasteVisible" style="width: 800px;left: 25%;">
            <el-form :rules="rules">
                <el-form-item label="口味" :label-width="formLabelWidth" style="width: 316px">
                    <el-select v-model="goodsId"   placeholder="请选择" @change="changeTaste" prop="goodsId" >
                        <el-option v-for="item in tasteList" :label="item.showName" :value="item.goodsId"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
             <!--   <el-button @click="dialogTasteVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="handleClickTaste('','','taste')">确 定</el-button>
            </div>
        </el-dialog>
        <!--退菜弹出层-->
        <el-dialog :title='dialogTitle' :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="dialogForm" label-width="100px" :rules="rules" ref="dialogForm">
                <el-radio-group v-model="dialogForm.type">
                    <el-form-item label="类型">
                        <el-row>
                            <el-col :span="6">
                                <el-radio label="1">菜品问题</el-radio>
                                <el-radio label="2">时间问题</el-radio>
                            </el-col>
                            <el-col :span="6">
                                <el-radio label="3">服务问题</el-radio>
                                <el-radio label="4">其他</el-radio>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input-number size="medium" :precision="2" v-model="dialogForm.number" :min="0" :max="dialogForm.maxNumber" ></el-input-number>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input  type="textarea" placeholder='请输入' v-model="dialogForm.reason" :maxlength="200" ></el-input>
                    </el-form-item>
                </el-radio-group>
            </el-form>
            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormAdd('dialogForm')" :loading="saveLoading">确 定</el-button>
            </div>
        </el-dialog>
        <!--  套餐详情弹出层-->
        <el-dialog title="套餐详情" :visible.sync="dialogTableVisibleData" >
            <el-table :data="tableDataDetail">
                <el-table-column type="index" label="序号" width="150" align="center" header-align='center'></el-table-column>
                <el-table-column property="name" label="菜品名称" width="200" align="center" header-align='center'></el-table-column>
                <el-table-column property="serialNo" label="菜品编号" width="200" align="center" header-align='center'></el-table-column>
                <el-table-column property="price" label="单价" width="200" align="center" header-align='center'></el-table-column>
                <el-table-column property="number" label="数量" width="100" align="center" header-align='center'></el-table-column>
            </el-table>
        </el-dialog>
        <!--套餐口味选择层-->
         <el-dialog title="选择口味" :visible.sync="dialogTableVisibleData2" >
            <el-table :data="tableDataDetailFlover">
                <el-table-column type="index" label="序号" width="150" align="center" header-align='center'></el-table-column>
                <el-table-column  label="菜品名称" prop="name" width="200" align="center" header-align='center'></el-table-column>
                <el-table-column  label="单价" width="200" prop="price" align="center" header-align='center'></el-table-column>
                <el-table-column  label="数量" width="100" prop="number" align="center" header-align='center'></el-table-column>
                <el-table-column  label="口味选择" width="200" prop="goodsDetailList" align="center" header-align='center'>
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.flavor" placeholder="请选择口味">
                            <el-option
                                    v-for="item in scope.row.goodsDetailList"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>

            </el-table>
                <div style="margin-top: 20px;text-align: right;">
                    <el-button plain @click="dialogClose">取消</el-button>
                    <el-button type="primary" @click="endData">确认</el-button>
                </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    import {
        requestCopyOrder,
        requestPrintBill,
        requestSaveStoreOrde,
        requestSaveStoreOrdeFree,
        requestSearchDosing,
        requestSearchGoods,
        requestStatusStoreOrde,
        requestStoreDeskOrders,
        requestStoreOrderCheckStock,
        requestStoreOrderDetailDelete,
        requestStoreOrderDetailSave,
        requestRestaurantDetail,
        requestRestaurantSearchDosing,
        requestTreeList,
        requestSearchMenuType,
        requestRestaurantFlavor,
        requestDeleteOrder,
    } from '../../api/api';

    export default {
        name: 'edit-user-manage',
        data() {

            let customerId= sessionStorage.getItem('customerId')
            if(customerId=="null"){
                customerId='-'
            }
            return {
                searchForm: {
                    name: ''
                },
                flover:'',
                activeName2: '1',
                isManager:'',//门店店长
                loading: false,
                name:'',
                totalNum:0,
                formLabelWidth: '100px',
                dialogOrderVisible:false,
                dialogTableVisibleData2:false,
                doType:sessionStorage.getItem('doType'),
                param: {
                    customerId:sessionStorage.getItem('customerId'),//门店ID
                    pageNo:1,
                    pageSize:10,
                    isSide:0,
                    isDelete:1,
                    name:'',
                    categoryId:'',
                    kind:'',
                    status:1,
                },
                orgTreeData: [],
                saveLoading: false,
                editForm: {
                    customerId:sessionStorage.getItem('customerId'),//门店ID
                    orderNo:'',//订单号
                    deskId:'',//门店桌台id
                    deskNo:'',//桌号
                    people:1,//用餐人数
                    status:0,//0待确认、1已确认、2已结账
                    remark:'',//备注
                    customerName:sessionStorage.getItem('customerName'),//门店名称
                    // storeOrderId:'',//顾客订单id
                    // type:'',//商品类型：1打包、2原材料
                    // goodsId:'',//店铺商品id
                    // name:'',//商品名称
                    // number:1,//数量
                    // price:0//单价
                },
                goodsList:[],
                oldGoodsList:[],//用于将goodsList值暂时存储
                oldGoodsListData:[],
                oldrestaurantData:[],
                orderList:[],
                storeDeskOrdersList:[],//订单列表
                orderDetailList:[],
                flavorList:[],//口味列表
                deleteOrderShow:false,
                dialogTableVisibleData:false,

                //列表
                tableData:null,
                tableDataDetail:[],
                //菜品列表弹出层
                dialogTreeTitle2:'点餐',
                dialogTreeFormVisible2:false,
                //口味弹出层
                dialogTasteVisible:false,
                tasteList:[],//口味数据数组
                tasteDetail:{},//选择口味添加时临时对象
                goodsId:'',
                showName:'',
                restaurantData:[],
                isTaste:true,
                rules: {
                    goodsId: [
                        { required: true, message: '请选择口味', trigger: 'blur' },
                    ],
                },
                tableDataDetailFlover:[],
                activeName: 'first',
                saveLoadingId:'',
                goodsLoading:true,
                //退菜
                dialogTitle:'退菜',
                dialogFormVisible:false,
                dialogForm:{
                    type:'1',//类型
                    number:'',//数量
                    maxNumber:'',//最大退菜数量
                    reason:'',//备注
                    customerId:customerId,//门店id
                    orderId:'',//顾客订单id storeOrderId
                    orderDetailId:'',//顾客订单明细id
                    storeGoodsId:'',//退菜商品id
                    name:'',//菜品名称
                },
                type:0,
                data: [{
                    label: '菜品种类',
                    children: [{
                        kind:1,
                        label: '炒锅涮锅',
                    },{
                        kind:2,
                        label:'烧烤',
                    },{
                        kind:3,
                        label:'凉菜',
                    },{
                        kind:0,
                        label:'其它',
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
        }
        },
        methods: {
            //取消订单
            deleteOrder(id){
                this.deleteOrderShow=true;
                requestDeleteOrder({orderId:id}).then((res)=>{
                    if(res.status==200){
                        this.$message({
                            type:'success',
                            message:res.msg,
                        })
                        this.deleteOrderShow=false;
                        this.getStoreDeskOrderList();
                        this.activeName= [id];
                    }else{
                        this.$message({
                            type:'error',
                            message:res.message,
                        })
                        this.deleteOrderShow=false;
                        this.activeName=[id];
                    }
                })
            },
            //搜索方法
            handleClickData(tab, event) {
                if(tab.name==1){
                    this.type=0;
                }
                if(tab.name==2){
                    this.type=1;

                }
            },
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
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            handleNodeClick(val){
                console.log(val);
                this.param.kind=val.kind;
                this.param.categoryId=val.id;
                this.getAjaxGoodsList();
            },
            diners(val){

            },
            handClickDetail(index,row){
                let _this = this;
                this.dialogTableVisibleData=true;
                const id=row.id;
                requestRestaurantSearchDosing({setMealId:id}).then(res => {
                    _this.tableDataDetail = [];
                    let data = res.data.items;

                    if(data && data.length>0){
                        _this.tableDataDetail = data;
                    }else{
                        _this.tableDataDetail = [];
                    }
                });
            },
            //获取套餐列表
            getRestaurant(){
                this.param.isSale=1;
                requestRestaurantDetail(this.param).then((res)=>{
                    if(res.status==200){
                        this.restaurantData=res.data.items;
                    }
                })
            },
            onSearch(type) {
                if(type==0){
                    this.param.name=this.searchForm.name;
                    this.getAjaxGoodsList();
                }else{
                    this.searchForm.name=this.searchForm.name.toLowerCase()
                    if(this.searchForm.name=='' && this.oldrestaurantData.length > 0){
                        this.restaurantData = this.oldrestaurantData;
                    }else{
                        if(this.oldrestaurantData.length == 0){
                            this.oldrestaurantData = this.restaurantData;
                        }
                        //搜索
                        let fn={};
                        fn= this.oldrestaurantData.filter(data => {

                            return Object.keys(data).some(key => {

                                return String(data[key]).toLowerCase().indexOf(this.searchForm.name) > -1
                            })
                        })


                        this.restaurantData=fn
                    }
                }

            },
            //免费
            handleFreeClick(index, row, doType) {
                let _this = this;
                if(doType == 'isFree'){

                        this.$confirm('是否免费?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let deleteParam ={
                                id: row.id,
                                isFree:0
                            };
                            requestSaveStoreOrdeFree(deleteParam).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.param.pageNo =1;
                                        _this.getStoreDeskOrderList();
                                    }
                                });
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });

                }else if(doType == 'isClose'){

                        this.$confirm('是否取消免费?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let deleteParam ={
                                id: row.id,
                                isFree:1
                            };
                            requestSaveStoreOrdeFree(deleteParam).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.param.pageNo =1;
                                        _this.getStoreDeskOrderList();
                                    }
                                });
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });

                }else if(doType == 'order'){
                    //点餐
                    this.dialogTreeFormVisible2 = true;
                    if(this.goodsList.length==0){
                        this.getAjaxGoodsList();
                        this.getRestaurant();
                        this.getTreeAjaxList();
                    }
                }else if(doType == 'delete'){
                    this.$confirm('真的删除该行数据么, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        let deleteParam ={
                            id: row.id
                        };
                        requestStoreOrderDetailDelete(deleteParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                                duration:300,
                                onClose:function(){
                                    _this.loading=false;
                                    _this.param.pageNo =1;
                                    _this.getStoreDeskOrderList();
                                }
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else if(doType=='retreat'){

                    this.dialogForm.number=row.number//数量
                    this.dialogForm.orderId=row.storeOrderId//顾客订单id
                    this.dialogForm.orderDetailId=row.id//顾客订单明细id
                    this.dialogForm.storeGoodsId=row.goodsId//退菜商品id
                    this.dialogForm.name=row.name//退菜商品名称
                    this.dialogForm.maxNumber=row.number//退菜商品名称
                    this.dialogFormVisible=true;

                }
            },
            //退菜
            dialogFormAdd(formName){
                let _this = this;
                let addParam = {};
                addParam ={
                    type:this.dialogForm.type,//类型
                    number:this.dialogForm.number,//数量
                    reason:this.dialogForm.reason,//备注
                    customerId:this.dialogForm.customerId,//门店id
                    orderId:this.dialogForm.orderId,//顾客订单id storeOrderId
                    orderDetailId:this.dialogForm.orderDetailId,//顾客订单明细id
                    storeGoodsId:this.dialogForm.storeGoodsId,//退菜商品id
                    name:this.dialogForm.name//退菜商品名称
                };
                //表单校验
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //防止重复提交
                        _this.saveLoading = true;
                        //表单提交方法更
                        requestStoreOrderDetailSave(addParam).then(res => {
                            if(res.status == 200){
                                _this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.saveLoading = false;//关闭提交按钮loding
                                        _this.dialogFormVisible = false;//关闭弹出层
                                        _this.getStoreDeskOrderList();
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

                    }
                });
            },
            //点餐列表
            handleClick(index, row, doType) {
                let _this = this;
                if(doType == 'delete'){
                    this.$confirm('真的删除该行数据么, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        for(let i=0;i<this.orderDetailList.length;i++){
                            if(this.orderDetailList[i].productInfoId==row.productInfoId){
                                this.orderDetailList.splice(i, 1)
                                this.loading=false;
                            }
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            getFlavorAjaxList(){
                let _this = this;
                requestTreeList({type:'口味'}).then(res => {
                    let data = res.data;
                    if (res.status == 200) {
                        if(data && data.length>0){
                            _this.flavorList = data;
                        }else{
                            _this.flavorList = [];
                        }
                    } else {
                        _this.$message({
                            message: '请求异常',
                            duration:'2000',
                            type: 'error'
                        });
                    }
                });
            },
            handleClickPrint(id){
                let _this = this;
                _this.saveLoadingId = id;
                requestPrintBill({id:id}).then(res => {
                    if (res.status == 200) {
                        _this.saveLoadingId = '';
                    } else {
                        _this.saveLoadingId = '';
                        _this.$message({
                            message: '请求异常',
                            duration:'2000',
                            type: 'error'
                        });
                    }
                });
            },
            //确认
            handleClickEnsure(id){
                let _this = this;
                _this.saveLoadingId = id;
                this.$confirm('真的确认该订单么, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading=true;
                    let deleteParam ={
                        id:id,
                        status:1
                    };
                    requestStatusStoreOrde(deleteParam).then(res => {
                        this.$message({
                            type: 'success',
                            message: '操作成功!',
                            duration:300,
                            onClose:function(){
                                _this.saveLoadingId = '';
                                _this.getStoreDeskOrderList()
                            }
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },

            //确认下单
            showDetailDialog(){
                this.dialogOrderVisible = true;
            },
            dialogClose(){
                this.dialogTableVisibleData2=false;
            },
            endData(){
                for(let i=0;i<this.tableDataDetailFlover.length;i++){
                    if(this.tableDataDetailFlover[i].goodsDetailList!=undefined){
                        if(this.tableDataDetailFlover[i].flavor==''){
                            this.$message({
                                type:'error',
                                message:'请选择口味',
                            })
                            return false;
                        }
                    }
                }
                for(let i=0;i<this.tableDataDetailFlover.length;i++){
                    this.tasteDetail.setMealDetailList.push(this.tableDataDetailFlover[i]);
                }
                this.orderDetailList.push( this.tasteDetail);
                this.dialogTableVisibleData2=false;

            },
            //添加事件
            handleClickTree(index,row,type){
                if(type==2){
                    this.tasteDetail={
                        type:row.type,//商品类型：1打包、2原材料
                        goodsId:row.id,//店铺商品id
                        name:row.name,//商品名称
                        number:row.number,//数量
                        price:row.price,//单价
                        productInfoId:row.productInfoId,//商品Id
                        remark: row.remark,//备注
                        kind: 999,//种类
                        isDiscount: row.isDiscount ,//0打折 1不打折
                        isFree:1,//是否免费0免费1收费
                        setMealDetailList:[],
                    }
                    if(this.tasteDetail.number==0){
                        this.$message({
                            type:"error",
                            message:"请选择添加数量！"
                        })
                        return false;
                    }
					// this.orderDetailList.push( this.tasteDetail);
                    this.dialogTableVisibleData2=true;
                    requestRestaurantFlavor({setMealId:row.id}).then((res)=>{
                        if(res.status==200){
                            this.tableDataDetailFlover=res.data;
                            this.tableDataDetailFlover.forEach((item)=>{
                                this.$set(item,'flavor','');
                            })
                        }
                        console.log(this.tableDataDetailFlover);
                    })

                }else{
                    if(this.goodsList[index].number > 0){
                        let _this = this;
                        requestSearchDosing({parentId:row.id}).then(res => {
                            _this.tasteList = [];
                            let data = res.data.items;
                            if(data && data.length>0){
                                _this.tasteList = data;
                                //点击添加向商品临时数组中存值
                                this.tasteDetail={
                                    type:row.type,//商品类型：1打包、2原材料
                                    goodsId:row.id,//店铺商品id
                                    name:row.name,//商品名称
                                    number:row.number,//数量
                                    price:row.price,//单价
                                    remark: row.remark,//备注
                                    productInfoId:row.productInfoId,//商品Id
                                    kind: row.kind,//种类
                                    isDiscount: row.isDiscount ,//0打折 1不打折
                                    isFree:1,//是否免费0免费1收费
                                }
                                //口味弹出层
                                this.dialogTasteVisible=true;

                            }else{
                                _this.tasteList = [];
                                //点击添加向商品临时数组中存值
                                this.tasteDetail={
                                    type:row.type,//商品类型：1打包、2原材料
                                    goodsId:row.id,//店铺商品id
                                    name:row.name,//商品名称
                                    number:row.number,//数量
                                    price:row.price,//单价
                                    productInfoId:row.productInfoId,//商品Id
                                    remark: row.remark,//备注
                                    kind: row.kind,//种类
                                    isDiscount: row.isDiscount ,//0打折 1不打折
                                    isFree:1,//是否免费0免费1收费
                                }
                                this.orderDetailList.push( this.tasteDetail);
                                this.dialogTasteVisible=false;
                            }

                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: '请选择数量！'
                        });
                    }
                }


            },
            //口味确定按钮把用户选择的商品添加到列表数组中
            handleClickTaste(){
                if(this.showName){
                    this.tasteDetail.flavor=this.showName;
                    this.tasteDetail.sideGoodsId=this.goodsId;
                    this.orderDetailList.push( this.tasteDetail);
                    this.goodsId='',
                    this.showName='',
                    this.dialogTasteVisible=false;
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择口味！'
                    });
                }


            },
            //口味选择
            changeTaste(val){
                let tn = {};
                tn = this.tasteList.find((item)=>{
                    return item.goodsId === val;
                });
                this.showName=tn.showName;
                this.goodsId=tn.goodsId;
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                let values = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    if(index === 5){
                        if(column.property == 'totalPrice'){
                            values = data.map(item => Number(item.price*item.number));
                        }
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                            sums[index] += ' 元';
                        } else {
                            sums[index] = '0元';
                        }
                    }
                });
                return sums;
            },
            handleSizeChangeGoods(val){
              this.param.pageSize=val;
              this.getAjaxGoodsList();
            },
            handleCurrentChangeGoods(val){
                this.param.pageNo=val;
                this.getAjaxGoodsList();
            },
            getAjaxGoodsList(){
                let _this = this;
                requestSearchGoods(_this.param).then(res => {
                    if(res.status == 200){
                        let data = res.data.items;
                        if (data && data.length>0) {
                            this.goodsList = data;
                            this.oldGoodsListData=data;
                            this.totalNum=parseInt(res.data.totalNum);
                        }
                        this.goodsLoading=false;
                    }else{
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },


            goBack() {
                this.$router.push({ path: '/order' });
            },
            getStoreDeskOrderList(){
                this.storeDeskOrdersList = [];
                this.activeName = [];
                requestStoreDeskOrders({id:this.editForm.deskId}).then(res => {
                    this.loading = false;
                    if(res.status == 200){
                        let data = res.data.orders;
                        if (data && data.length>0) {
                            this.storeDeskOrdersList = data;
                            this.storeDeskOrdersList.forEach(item=>{
                                this.activeName.push(item.id);
                            })
                        }
                        //门店店长
                        this.isManager=res.data.isManager;
                    }else{
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            //提交订单
            addDialogOrderForm(formName){
                if(this.orderDetailList.length>0){
                    this.saveLoading=true
                    this.loading=true;
                    requestStoreOrderCheckStock(this.orderDetailList).then(res => {
                        if(res.status == 200){
                            var y = String(this.editForm.people).indexOf(".") + 1;//获取小数点的位置
                            var count = String(this.editForm.people).length - y;//获取小数点后的个数
                            if(y > 0) {
                                this.$message({
                                    type:'error',
                                    message:'用餐人数请不要输入小数',
                                    duration:1000,
                                });
                                this.saveLoading=false;
                                this.loading=false;
                                return false;
                            }
                            let param = {
                                customerId: this.editForm.customerId,//门店ID
                                orderNo:'',//订单号
                                deskId:this.editForm.deskId,//门店桌台id
                                deskNo:this.editForm.deskNo,//桌号
                                people:this.editForm.people,//用餐人数
                                remark:this.editForm.remark,//备注
                                customerName:this.editForm.customerName,//门店名称
                                status:1,//0待确认、1已确认、2已结账
                                detailList:this.orderDetailList,

                            }
                            if(this.storeDeskOrdersList.length>0){
                                param.orderNo=this.storeDeskOrdersList[0].orderNo;
                            }
                            requestSaveStoreOrde(param).then(res => {
                                if(res.status == 200){
                                    this.saveLoading=false;
                                    this.loading=false;
                                    this.doType = 'edit';
                                    sessionStorage.setItem('doType','edit');
                                    this.dialogOrderVisible = false;
                                    this.getStoreDeskOrderList();
                                    this.getAjaxGoodsList();
                                    this.orderDetailList=[];

                                }else{
                                    this.$message({
                                        message: '请求异常',
                                        duration:'2000',
                                        type: 'error'
                                    });
                                }
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data
                            });
                            this.saveLoading=false;
                            this.loading=false;
                        }
                    });
                }else{
                    this.$message({
                        message: '请先添加订单!',
                        duration:'2000',
                        type: 'error'
                    });
                }

            },
            addGreensFun(){
                let _this = this;
                let oldDeskId = localStorage.getItem('oldDeskId');
                let newDeskId = localStorage.getItem('newDeskId');
                let newDeskNo = localStorage.getItem('newDeskNo');
                _this.editForm.deskId=newDeskId;//门店桌台id
                _this.editForm.deskNo=newDeskNo;//门店桌台id
                 if(oldDeskId){
                     requestCopyOrder({id:oldDeskId}).then(res => {
                         if(res.status == 200){
                             this.$message({
                                 type: 'success',
                                 message: '转桌成功!',
                                 duration:300,
                                 onClose:function(){
                                     if(res.data){
                                         _this.orderDetailList = res.data;
                                     }
                                 }
                             });
                         }else{
                             _this.$message({
                                 type: 'error',
                                 message: res.msg
                             });
                         }
                     });
                 }
                localStorage.removeItem('oldDeskId');
                localStorage.removeItem('newDeskId');
                localStorage.removeItem('newDeskNo');
            },

        },

        beforeMount() {
            let deskId = sessionStorage.getItem('deskId');
            let deskNo = sessionStorage.getItem('deskNo');
            if (deskId && deskNo) {
                this.editForm.deskId = deskId;
                this.editForm.deskNo = deskNo;
                if(this.doType == 'edit'){
                    this.getStoreDeskOrderList();
                }
            }

            if(localStorage.getItem('oldDeskId') != null){
                this.addGreensFun();//添加复制的菜品
            }
            this.getFlavorAjaxList();

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
