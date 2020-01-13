<template>
    <section id="storeOrder">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>顾客订单结算管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="contentBody">
                    <div class="boxContent">
                        <div class="zhuotai"  :class="item.status ==1 ? 'self-card self-card-red' : 'self-card self-card-green' && item.isOpen==1? 'self-card self-card-green' : 'self-card self-card-gray'"  v-for="item in tableData" >
                            <div style="text-align: left;padding: 10px;box-sizing: border-box">
                                <el-button  v-if="item.status==1"  @click="handelDoType(item,'zhuantai')">转台</el-button>
                                <el-button  v-if="item.status==1"  @click="handelDoType(item,'fuzhi')">复制菜单</el-button>
                                <el-button  v-if="item.status==1"  type="success" @click="checkOut(item)" style="margin-top: 10px">结算</el-button>
                                <el-button  v-if="item.status==1"  @click="handelDoType(item,'hebin')" style="margin-left: 0;margin-top: 10px;">合并</el-button>
                            </div>
                            <div @click="addOrder(item)" style="height: 190px;">
                                <div class="title"><i class="largeFont">{{item.deskNo}}</i>号桌
                                    <span style="font-weight: 900" v-if="item.paymentStatus == 0">（待付款）</span>
                                    <span style="font-weight: 900" v-if="item.paymentStatus == 1">（顾客支付）</span>
                                    <span style="font-weight: 900" v-if="item.paymentStatus == 2">（门店支付）</span>
                                </div>
                                <div class="title" v-for="ii in item.orders">
                                    用餐人数：{{ii.people}}，状态：{{ii.statusName}}，消费总额：￥{{ii.totalPrice == null ? '' :ii.totalPrice.toFixed(2)}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="contentBody" style="max-height: 700px; overflow-y: auto">
                    待确认订单
                    <el-card class="box-card" v-for="sd in statusList" style="margin-bottom: 20px">
                        <div slot="header" class="clearfix">
                            <span>桌号：{{sd.deskNo}}</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="onClickQueRen(sd)">确认订单</el-button>
                        </div>
                        <div>
                            <p>订单号：{{sd.orderNo}}</p>
                            <p>用餐人数：{{sd.people}}</p>
                            <p>总额(元)：{{sd.totalPrice == null ? '' :sd.totalPrice.toFixed(2)}}</p>
                            <p>备注：{{sd.remark}}</p>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" style="width:840px;left:25%">
            <el-form :model="dialogForm" ref="dialogForm" label-width="120px" :rules="rules">
                <el-form-item label="顾客类型">
                    <el-button  size="mini" :type="buttonPu"   v-model="dialogForm.type"  @click="handleClickDetail('', '', 'add2')">普通结算</el-button>
                    <el-button  size="mini"  :type="buttonHui" v-model="dialogForm.type"  @click="handleClickDetail('', '', 'add')">会员结算</el-button>
                </el-form-item>
                <el-form-item label="应收金额">
                    ￥{{dialogForm.recPrice}}
                </el-form-item>
                <el-form-item label="消费总金额">
                    ￥{{dialogForm.totalPrice}}
                </el-form-item>
                <el-form-item label="不打折金额">
                    ￥{{dialogForm.noDiscountAmount}}
                </el-form-item>
                <el-form-item label="选择折扣" v-if="dialogForm.type==1">
                    <el-select v-model="dialogForm.discount" placeholder="选择折扣" @change="changeCount" >
                        <el-option v-for="ck in checkOutList" :label="ck.name+'折'" :value="ck.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择支付方式" prop="paymentMethod" v-if="dialogForm.type!=2">
                    <el-select v-model="dialogForm.paymentMethod" placeholder="选择支付方式" @change="changePlay">
                         <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会员折扣" prop="name" v-if="dialogForm.type==2">
                    <el-input placeholder='请输入' v-model="dialogForm.discount2" :maxlength="25" disabled style="width: 218px">{{dialogForm.discount2}}</el-input>
                </el-form-item>
                <el-form-item label="会员姓名" prop="name" v-if="dialogForm.type==2">
                    <el-input placeholder='请输入' v-model="dialogForm.name" :maxlength="25" disabled style="width: 218px">{{dialogForm.name}}</el-input>
                </el-form-item>
                <el-form-item label="会员电话" prop="phone" v-if="dialogForm.type==2">
                    <el-input placeholder='请输入' v-model="dialogForm.phone" :maxlength="25" disabled style="width: 218px">{{dialogForm.phone}}</el-input>
                </el-form-item>
                <div v-if="dialogForm.type==2 && couponData.length!=0">
                <el-form-item label="选择优惠卷">
                    <span @click="checkCoupon" style="cursor: pointer;">有可使用优惠卷</span>
                </el-form-item>
                </div>
                <div v-if="dialogForm.type==2">
                <el-form-item v-if="allIntergralrule!=0" label="积分抵扣">
                    <span>共有{{allIntergralrule}}积分,{{IntegralruleData.integral}}积分抵扣{{IntegralruleData.amount}}元</span>
                </el-form-item>
                <el-form-item label="是否使用" v-if="allIntergralrule!=0">
                    <span><el-switch
                            v-model="value"
                            @change="isActive"
                            active-color="#13ce66"
                            inactive-color="#ff4949"></el-switch></span>
                </el-form-item>
                </div>
                <div v-if="dialogForm.type==2">
                <el-form-item label="优惠金额" prop="phone" v-if="dialogForm.coupon!=0">
                    <span style="cursor: pointer;" v-html="dialogForm.coupon"></span>
                </el-form-item>
                <el-form-item label="菜品抵扣金额" v-if="goodsPrice!=0">
                    <span v-html="goodsPrice"></span>
                </el-form-item>
                </div>
                <el-form-item label="实收金额" v-if="dialogForm.type==1">
                    <!--￥{{dialogForm.discountPrice}}-->
                    <el-input-number size="medium" :precision="2" v-model="dialogForm.discountPrice" ref="" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="抹零金额" style="width: 340px" v-if="dialogForm.type==2">
                    <el-input-number v-model="delPrice" :precision="2" @change="handleChange" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="实收金额" v-if="dialogForm.type==2">
                    <span>{{totalPrice}}</span>
                </el-form-item>
                <!--备注-->
                <el-form-item label="备注"  style="width: 340px">
                    <el-input type="textarea" v-model="dialogForm.remark" :maxlength="200" autocomplete="off" max></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="success" :loading="ListLoading" @click="dialogFormSubmit('budget')">预结算</el-button>
                <el-button type="primary" :loading="saveLoading" @click="dialogFormSubmit('dialogForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!--会员弹出层-->
        <el-dialog :title='dialogTreeTitle' :visible.sync="dialogTreeFormVisible" width="80%" top="5vh">
            <el-container>
                <el-main>
                    <el-form :inline="true" :model="searchForm" label-width="80px" class="demo-form-inline">
                        <el-form-item label="搜索">
                            <el-input v-model="searchForm.username" :maxlength="200" autocomplete="off" placeholder="姓名/电话" clearable></el-input>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="tableTreeData2" border>
                        <el-table-column align="center" header-align='center' type="index" label="行号" width="80"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="name" label="姓名" width="120"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="phone" label="电话" ></el-table-column>
                        <el-table-column align="center" header-align='center' prop="amount" label="金额" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="discount" label="折扣" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="customerName" label="注册门店" width="100"></el-table-column>
                        <el-table-column align="center" header-align='center' prop="wechat" label="微信号" width="100"></el-table-column>
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

            <!--取消和确定按钮-->
            <div slot="footer" class="dialog-footer">
                <!--<el-button @click="dialogTreeFormVisible = false">关闭</el-button>-->
                <el-button @click="memberClick()">关闭</el-button>
            </div>
        </el-dialog>
        <!--转台 -->
        <el-dialog title="转台" :visible.sync="dialogZhuanTaiFormVisible" width="30%">
            <el-form :model="dialogZhuanTaiForm" :rules="rules" ref="dialogZhuanTaiForm" label-width="120px">
                <el-form-item label="当前桌号">
                    {{dialogZhuanTaiForm.oldDeskNo}}
                </el-form-item>
                <el-form-item label="选择桌号" prop="deskId">
                    <el-select v-model="dialogZhuanTaiForm.deskId" placeholder="请选择转到哪一桌">
                        <el-option  v-if="dialogZhuanTaiForm.oldDeskId != ck.id" v-for="ck in tableData" :label="'第'+ck.deskNo+'桌'" :value="ck.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogZhuanTaiFormVisible = false">取 消</el-button>
                <el-button type="primary" :loading="saveLoading" @click="dialogZhuanTaiFormSubmit('dialogZhuanTaiForm')">确 定</el-button>
            </div>
        </el-dialog>

        <!--合并桌子-->
        <el-dialog title="合并" :visible.sync="dialogHebinFormVisible" width="30%">
            <el-form :model="dialogZhuanTaiForm" :rules="rules" ref="dialogZhuanTaiForm" label-width="120px">
                <el-form-item label="当前桌号">
                    {{dialogZhuanTaiForm.oldDeskNo}}
                </el-form-item>
                <el-form-item label="选择桌号" prop="deskId">
                    <el-select v-model="dialogZhuanTaiForm.deskId" placeholder="请选合并到哪一桌">
                        <el-option  v-if="dialogZhuanTaiForm.oldDeskId != ck.id" v-for="ck in tableData" :label="'第'+ck.deskNo+'桌'" :value="ck.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogHebinFormVisible = false">取 消</el-button>
                <el-button type="primary" :loading="saveLoading" @click="pushOrder('dialogZhuanTaiForm')">确 定</el-button>
            </div>
        </el-dialog>

        <!--复制菜单 -->
        <el-dialog title="复制菜单" :visible.sync="dialogCopyFormVisible" width="30%">
            <el-form :model="dialogCopyForm" :rules="rules" ref="dialogCopyForm" label-width="120px">
                <el-form-item label="当前桌号">
                    {{dialogCopyForm.oldDeskNo}}
                </el-form-item>
                <el-form-item label="选择桌号" prop="deskId">
                    <el-select v-model="dialogCopyForm.deskId" placeholder="请选择复制到哪一桌">
                        <el-option v-for="ck in tableData" v-if="dialogCopyForm.oldDeskId != ck.id" :label="'第'+ck.deskNo+'桌'" :value="ck.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCopyFormVisible = false">取 消</el-button>
                <el-button type="primary" :loading="saveLoading" @click="dialogCopyFormSubmit('dialogCopyForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!--待确认订单 -->
        <el-dialog title="待确认订单" :visible.sync="dialogIsOkFormVisible" width="50%">
            <el-table :data="orderList">
                <el-table-column label="名称" prop="name" align="center" header-align='center'></el-table-column>
                <el-table-column label="数量" prop="number" align="center" header-align='center'>
                    <template slot-scope="scope">
                        x{{orderList[scope.$index].number}}
                    </template>
                </el-table-column>
                <el-table-column label="单价" prop="price" align="center" header-align='center'></el-table-column>
                <el-table-column prop="totalPrice" label="总价" align="center" header-align='center'>
                    <template slot-scope="scope">
                        {{orderList[scope.$index].number*orderList[scope.$index].price}}
                    </template>
                </el-table-column>
                <el-table-column label="口味" prop="flavor" align="center" header-align='center'>
                    <template slot-scope="scope">
                        {{orderList[scope.$index].flavor}}
                    </template>
                </el-table-column>
                <el-table-column label="单品备注" prop="remark" align="center" header-align='center'>
                    <template slot-scope="scope">
                        {{orderList[scope.$index].remark}}
                    </template>
                </el-table-column>
                <el-table-column label="是否免费"  align="center" header-align='center'>
                    <template slot-scope="scope">
                       {{orderList[scope.$index].isFree==0 ? '是':'否'}}
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogIsOkFormVisible = false">取 消</el-button>
                <el-button type="primary" :loading="saveLoading" @click="dialogIsOkFormSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="选择优惠卷" :visible.sync="dialogCoupon" width="30%">
            <div class="coupon-box">
                <div class="coupon-list" v-for="(item,index) in couponData" v-bind:key='index'>
                    <div class="coupon-left">
                        <span>￥{{item.couponAmount}}</span>
                        <span>抵用卷</span>
                    </div>
                    <div class="coupon-center">
                        <h3>{{item.couponName}}</h3>
                        <p>有效期至:{{item.couponEndTime}}</p>
                    </div>
                    <div class="coupon-right">
                        <div class="check">
                            <el-checkbox :disabled="item.isPrice" @change="checkCoupondata(item,index)">选择</el-checkbox>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <el-button type="primary" @click="confrimCoupon()">确认</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    import {
        requestSearchMember,
        requestSearchStoreOrde,
        requestStatusStoreOrde,
        requestStoreDeskList,
        requestStoreOrdeCheckOrder,
        requestStoreOrdeCheckOut,
        requestStoreOrderDetailListByPid,
        requestTreeList,
        requestTurntable,
        requestCouponInfo,
        requestCopyOrder,
        requestStoreOrderCheckStock,
        requestSaveStoreOrde,
        requestBugetData,
        requestUrl,
        requestCheckOrder,
        requestStoreOrderpaymentCheck,
        requestDrogTwos, requestIntegralruleInfo, requestStoreDeskOrders,
    } from '../../api/api';

    export default {
        name: 'user-manage',
        data() {
            let customerId= sessionStorage.getItem('customerId')
            if(customerId=="null"){
                customerId=''
            }
            return {
                 options: [{
                        value: '2',
                        label: '微信支付'
                        }, {
                        value: '3',
                        label: '支付宝支付'
                        }, {
                        value: '1',
                        label: '现金支付'
                        }, {
                        value: '4',
                        label: '其它支付'
                        }],
                buttonPu:'primary',
                dialogCoupon:false,
                discount:'',
                showCoupon:1,
                buttonHui:'',
                tableData: null,
                dialogHebinFormVisible:false,
                dialogTreeFormVisible:false,//会员弹出层
                dialogTreeTitle:'选择会员',
                param: {
                    customerId:customerId,//门店ID
                },
                statusList:[],
                param2: {
                    status:"0",
                    pageNo:1,
                    pageSize:0
                },
                clientType:"0",//类型
                //会员
                paramTree:{
                    content:"",
                    pageNo:1,
                    pageSize:15,
                    status:1,
                },
                //会员搜索
                searchForm: {
                    username: ''
                },
                totalTreeNum2:0,//会员
                tableTreeData2: null,//会员
                //会员
                paramTree2: {
                    name:"",
                    pageNo:1,
                    pageSize:10,
                    deptId:'',
                    checkChild:'all',
                    serialNo:'',
                    packCategoryId:''
                },
                activeName:'',
                dialogFormTitle:'结算',
                dialogFormVisible:false,
                dialogForm:{
                    discount:'',
                    remark:'',
                    name:'',//会员姓名
                    phone:'',//会员电话
                    memberId:'',//会员ID
                    discount2:'',//会员折扣
                    deskId:'',
                    totalPrice:0,//消费金额
                    discountPrice:0,
                    noDiscountAmount:0,//不参与打折金额
                    recPrice: 0,//应收金额
                    fraction:'',
                    coupon:0,//优惠卷
                    type:1,
                    customerId:customerId,
                    paymentMethod:'',
					orderNo:'',

                },
                smallRemoveZero:0,//最小抹零
                bigRemoveZero:0,//最大抹零
                removeZero:0,//抹零
                saveLoading:false,
                checkOutList:[],
                dialogZhuanTaiFormVisible:false,//转台弹出层
                dialogZhuanTaiForm:{
                    deskId:'',
                    oldDeskNo:'',
                    oldDeskId:''
                },
                couponData:[],
                dialogCopyFormVisible:false,//转台弹出层
                dialogCopyForm:{
                    deskId:'',
                    oldDeskNo:'',
                    oldDeskId:''
                },
                rules: {
                    deskId:[
                        {required: true, message: '请选择桌号', trigger: 'change' }
                    ]
                },
                dialogIsOkFormVisible:false,
                dialogIsOkForm:{},
                couponDataList:[],
                orderList:[],
                IntegralruleData:'',
                allIntergralrule:0,
                useIntegrale:0,
                deductionAcount:0,
                ListLoading:false,
                orderId:'',
                value:0,
                nowPrice:'',
                goodsData:[],
                delPrice:0,
                goodsPrice:0,
                discount:'',
                fraction:0,
                amountPrice:0,
                rules:{
                 paymentMethod: [
                    { required: true, message: '请选择活动区域', trigger: 'change' },
                  ],
                },
            }
        },
        computed:{
            totalPrice:function() {
                var total = 0;
                total=((this.dialogForm.totalPrice-this.goodsPrice)*this.discount + (1 - this.discount)* this.dialogForm.noDiscountAmount)-this.dialogForm.coupon-this.delPrice-this.deductionAcount;
                return total;
            },
        },
        methods: {
            handleChange(){
                if(this.delPrice==undefined){
                    this.delPrice=0;
                }
            },
            pushOrder(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let str = '';
                        let tn = {};
                        tn = _this.tableData.find((item)=>{
                            return item.id === _this.dialogZhuanTaiForm.deskId;
                        });
                        if(tn.status == 1){
                            str = tn.deskNo+'号桌正在被使用！';
                        }
                        this.$confirm('确定将该桌合并到'+tn.deskNo+'号桌吗？'+str+'是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            _this.saveLoading = true;
                            requestDrogTwos({id:_this.dialogZhuanTaiForm.oldDeskId,toId: _this.dialogZhuanTaiForm.deskId,deskNo:tn.deskNo}).then(res => {
                                if(res.status == 200){
                                    this.$message({
                                        type: 'success',
                                        message: '合并成功!',
                                        duration:300,
                                        onClose:function(){
                                            _this.saveLoading = false;
                                            _this.dialogHebinFormVisible = false;
                                            _this.getAjaxList();
                                            _this.getStatusAjaxList();
                                        }
                                    });
                                }else{
                                    _this.saveLoading = false;
                                    _this.dialogZhuanTaiFormVisible = false;
                                    _this.$message({
                                        type: 'error',
                                        message: res.msg
                                    });
                                }
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }else{
                        return false;
                    }
                });
            },
            handelDoType(row,type){
                if(type=='hebin'){
                    this.dialogZhuanTaiForm.deskId = '';
                    this.dialogZhuanTaiForm.oldDeskId = row.id;
                    this.dialogZhuanTaiForm.oldDeskNo = row.deskNo;
                    this.dialogHebinFormVisible = true;
                }
                if(type == 'zhuantai'){
                    this.dialogZhuanTaiForm.deskId = '';
                    this.dialogZhuanTaiForm.oldDeskId = row.id;
                    this.dialogZhuanTaiForm.oldDeskNo = row.deskNo;
                    this.dialogZhuanTaiFormVisible = true;
                }else if(type == 'fuzhi'){
                    this.dialogCopyForm.deskId = '';
                    this.dialogCopyForm.deskNo = '';
                    this.dialogCopyForm.oldDeskId = row.id;
                    this.dialogCopyForm.oldDeskNo = row.deskNo;
                    this.dialogCopyFormVisible = true;
                }
            },
            //是否使用积分
            isActive(val){
                console.log(this.allIntergralrule<this.IntegralruleData.integral);
                if(val){
                    if(((this.dialogForm.totalPrice-this.goodsPrice)*this.discount + (1 - this.discount)* this.dialogForm.noDiscountAmount)-this.dialogForm.coupon-parseInt(this.delPrice)-this.deductionAcount>this.IntegralruleData.minUseAmount && this.allIntergralrule>this.IntegralruleData.integral){
                        if(val){
                            this.allIntergralrule=this.allIntergralrule-this.IntegralruleData.integral;
                            this.useIntegrale=this.IntegralruleData.integral;
                            this.deductionAcount=this.IntegralruleData.amount;
                        }else{
                            this.allIntergralrule=this.allIntergralrule+this.IntegralruleData.integral;
                            this.useIntegrale=0;
                            this.deductionAcount=0;
                        }
                    }else{
                        this.$message({
                            type:'error',
                            message:'不满足积分使用规则',
                        })
                        this.value=0;
                    }
                }else{
                    this.allIntergralrule=this.allIntergralrule+this.IntegralruleData.integral;
                    this.useIntegrale=0;
                    this.deductionAcount=0;
                }
            },
            checkCoupondata(data,index){
                
                this.couponData[index].check=!this.couponData[index].check;
            },
            confrimCoupon(){
                this.couponDataList=[];
                let couponPrice=0;
                for(let i=0;i<this.couponData.length;i++){
                    if(this.couponData[i].check){
                        this.couponDataList.push(this.couponData[i])
                    }
                }
                if(this.couponDataList.length==0){
                    this.dialogForm.coupon=0;
                    this.goodsPrice=0;
                }else{
                    for(let i=0;i<this.couponDataList.length;i++){
                        if(this.couponDataList[i].type=='2'){
                            this.goodsPrice=this.couponDataList[i].couponAmount;
                            console.log(this.goodsPrice);
                        }else{
                            couponPrice+=parseInt(this.couponDataList[i].couponAmount);
                            if(this.couponDataList.length>4){
                                this.$message({
                                    type:'error',
                                    message:'只能选择四个优惠卷',
                                })
                                return false;
                            }
                            if(couponPrice>((this.dialogForm.totalPrice-this.goodsPrice)*this.discount + (1 - this.discount)* this.dialogForm.noDiscountAmount)-this.dialogForm.coupon-parseInt(this.delPrice)-this.deductionAcount){
                                this.$message({
                                    type:'error',
                                    message:'优惠金额不能大于结算金额',
                                })
                                return false;
                            }
                    

                        }
                    }
                }
                const item = this.couponDataList.findIndex( item => item.type == "2");
                if(item==-1){
                   this.goodsPrice=0;
                }
                this.dialogForm.coupon=couponPrice;
                this.dialogCoupon=false;
            },
            spanClick(e){
              console.log(e);
            },
            changePlay(val){
                this.dialogForm.paymentMethod=val;
                console.log(this.dialogForm.paymentMethod);
            },
            //选择优惠卷
            checkCoupon(){
                this.dialogCoupon=true;
                for(let i=0;i<this.couponData.length;i++){
                    if(this.couponData[i].type=="1"){
                        if(this.couponData[i].couponUploadStatus=='1'){
                            this.couponData[i].isPrice=true;
                        }else{
                            this.couponData[i].isPrice=false;
                        }
                    }
                }
                if(this.goodsData.length>=this.couponData.length){
                    for(let i=0;i<this.goodsData.length;i++){
                        for(let j=0;j<this.couponData.length;j++){
                            if(this.goodsData[i].goodsId==this.couponData[j].couponId){
                                this.couponData[j].isPrice=false;
                            }
                        }
                    }
                }else{
                    for(let i=0;i<this.couponData.length;i++){

                        for(let j=0;j<this.goodsData.length;j++){
                            if(this.goodsData[j].goodsId==this.couponData[i].couponId){
                                this.couponData[i].isPrice=false;
                            }
                        }

                    }
                }


            },
            dialogZhuanTaiFormSubmit(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                            let str = '';
                            let tn = {};
                            tn = _this.tableData.find((item)=>{
                                return item.id === _this.dialogZhuanTaiForm.deskId;
                            });
                            if(tn.status == 1){
                                str = tn.deskNo+'号桌正在被使用！';
                            }
                            this.$confirm('确定将该桌转移到'+tn.deskNo+'号桌吗？'+str+'是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                _this.saveLoading = true;
                                requestTurntable({id:_this.dialogZhuanTaiForm.oldDeskId,toId: _this.dialogZhuanTaiForm.deskId,deskNo:tn.deskNo}).then(res => {
                                    if(res.status == 200){
                                        this.$message({
                                            type: 'success',
                                            message: '转桌成功!',
                                            duration:300,
                                            onClose:function(){
                                                _this.saveLoading = false;
                                                _this.dialogZhuanTaiFormVisible = false;
                                                _this.getAjaxList();
                                                _this.getStatusAjaxList();
                                            }
                                        });
                                    }else{
                                        _this.saveLoading = false;
                                        _this.dialogZhuanTaiFormVisible = false;
                                        _this.$message({
                                            type: 'error',
                                            message: res.msg
                                        });
                                    }
                                });
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消'
                                });
                            });
                        }else{
                            return false;
                        }
                });
            },
            //复制菜品
            dialogCopyFormSubmit(formName){
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let str = '';
                        let tn = {};
                        tn = _this.tableData.find((item)=>{
                            return item.id === _this.dialogCopyForm.deskId;
                        });
                        if(tn.status == 1){
                            str = tn.deskNo+'号桌正在被使用！';
                        }
                        this.$confirm('确定将该桌菜单复制到'+tn.deskNo+'号桌吗？'+str+'是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

                            localStorage.setItem('oldDeskId',_this.dialogCopyForm.oldDeskId);
                            localStorage.setItem('newDeskId',_this.dialogCopyForm.deskId);
                            localStorage.setItem('newDeskNo',tn.deskNo);
                            // _this.saveLoading = true;
                            _this.$router.push({ path: '/editOrder'});

                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }else{
                        return false;
                    }
                });
            },


            //会员弹出框关闭按钮
            memberClick(){
                let _this = this;
                if(_this.dialogForm.id==undefined){
                    this.$message({
                        type: 'erroe',
                        message: '请选择会员!',
                        duration:3000,
                        onClose:function(){

                        }
                    });
                }else{

                }
            },
            /*点击按钮事件*/
            handleClickDetail(index, row, doType) {
                let _this = this;
                if(doType=="add"){
                    //会员结算
                    _this.dialogForm.type="2";
                    //改变按钮状态
                    _this.buttonHui='primary';
                    _this.buttonPu='';
                    if(doType == 'add'){
                        //添加
                        _this.addOrg('add',row);
                    }
                }else if(doType=="add2"){
                    //普通结算
                    //改变按钮状态
                    _this.buttonPu='primary'
                    _this.buttonHui=''
                    _this.dialogForm.type="1"
                    _this.dialogForm.memberId='';
                    _this.dialogForm.discount2='';
                    _this.dialogForm.discount='';
                    //this.dialogForm.discountPrice =0;
                    _this.smallRemoveZero= this.dialogForm.totalPrice-10;
                    _this.bigRemoveZero= this.dialogForm.totalPrice;
                    _this.dialogForm.discountPrice =  this.dialogForm.totalPrice;
                }
            },
            //显示会员弹出层
            addOrg(type,row){
                this.dialogTreeFormVisible = true;
                this.getTreeAjaxPage();
            },
            //查询会员
            getTreeAjaxPage(){
                let _this = this;
                requestSearchMember(_this.paramTree).then(res => {
                    if (res.status == 200) {
                        let data = res.data.items;
                        if(data && data.length>0){
                            _this.tableTreeData2 = data;
                            _this.totalTreeNum = parseInt(res.data.totalNum);
                        }else{
                            _this.tableTreeData2 = [];
                            _this.totalTreeNum = 0;
                        }
                    }
                });
            },
            //会员分页
            handleCurrentChangeTree2(val) {
                this.paramTree2.pageNo = val;
                this.getTreeAjaxPage2();
            },
            //会员搜索点击
            onSearch() {
                this.paramTree.pageNo =1;
                this.paramTree.content = this.searchForm.username;
                this.getTreeAjaxPage();
            },
            //选择会员
            handleClickTreeAdd2(index,row){
                let _this = this;
                let discount = row.discount;
                this.discount=row.discount;
                console.log(this.discount);
                let noDiscountAmount = parseFloat(this.dialogForm.noDiscountAmount);
                let recPrice = parseFloat(this.dialogForm.recPrice);
                let totalPrice = parseFloat(this.dialogForm.totalPrice);
                this.allIntergralrule=row.integral;
               this.amountPrice=row.amount;
            
                   _this.dialogForm.name = row.name;
                   _this.dialogForm.phone=row.phone;
                   _this.dialogForm.memberId=row.id;
                   _this.dialogForm.discount2=row.discount;
                   _this.dialogForm.discount=row.discount;
                   _this.dialogForm.discountPrice = (totalPrice * discount + (1 - discount) * noDiscountAmount).toFixed(2);
                   console.log(_this.dialogForm.discountPrice);
                   _this.smallRemoveZero=(discount*parseFloat(_this.dialogForm.discountPrice))-10;//最小抹零
                   _this.bigRemoveZero=discount*parseFloat(_this.dialogForm.discountPrice);//最大抹零
                   _this.dialogTreeFormVisible = false;
                   this.couponData=[];
                   requestCouponInfo({memberId:row.id}).then((res)=>{
                       if(res.status==200){
                           this.couponData=res.data;
                           this.couponData.forEach((item)=>{
                               this.$set(item,'check',false)
                               this.$set(item,'isPrice',true)
                           })
                       }
                       requestStoreDeskOrders({id:this.orderId}).then((res)=>{
                           if(res.status==200){
                               let goodsData=res.data.orders;
                               for(let i=0;i<goodsData.length;i++){
                                   for(let j=0;j<goodsData[i].detailList.length;j++){
                                       this.goodsData.push(goodsData[i].detailList[j]);
                                   }
                               }
                               console.log(this.goodsData);
                           }
                       })

                   })
                   requestIntegralruleInfo({type:2}).then((res)=>{
                       if(res.status==200){
                           this.IntegralruleData=res.data;
                       }

                   })


               
            },
            initWebSocket(){ //初始化weosocket
                let user = sessionStorage.getItem('user');

                if (user) {
                    user = JSON.parse(user);
                     const basews = requestUrl.replace('http','ws');
                     const wsuri = basews + "webSocket/"+user.id;//ws地址

                    this.websock = new WebSocket(wsuri);
                    this.websock.onopen = this.websocketonopen;
                    this.websock.onerror = this.websocketonerror;
                    this.websock.onmessage = this.websocketonmessage;
                    this.websock.onclose = this.websocketclose;
                }
            },
            websocketonopen() {
                console.log("WebSocket连接成功");
            },
            websocketonerror(e) { //错误
                console.log("WebSocket连接发生错误");
            },
            websocketonmessage(e){ //数据接收
                let _this=this;
                if(e.data){
                    const redata = JSON.parse(e.data);
                    console.log(redata)
                    // debugger
                    //接收微信小程序数据
                    _this.statusList.unshift(redata.data);
                    _this.messageBox(redata);
                }


            },
            websocketclose(e){ //关闭
                console.log("connection closed");
            },
            messageBox(data){
                if (window.Notification) {
                    // var button = document.getElementById('button'), text = document.getElementById('text');

                    var popNotice = function() {
                        if (Notification.permission == "granted") {
                            var notification = new Notification("新的消息", {
                                body: data.title,
                                requireInteraction:true,
                            })
                            notification.onclick = function() {
                                notification.close();
                            }
                        }
                    }
                    var desktop = function() {
                        if (Notification.permission == "granted") {
                            popNotice();
                        } else if (Notification.permission != "denied") {
                            Notification.requestPermission(function (permission) {
                                popNotice();
                            })
                        }
                    }
                    desktop();
                } else {
                    alert('浏览器不支持Notification');
                }
            },
            changeCount(val){
                let discount = parseFloat(this.dialogForm.discount/10).toFixed(2);
                let noDiscountAmount = parseFloat(this.dialogForm.noDiscountAmount);
                let recPrice = parseFloat(this.dialogForm.recPrice);
                let totalPrice = parseFloat(this.dialogForm.totalPrice);
                if(val){
                   this.dialogForm.discountPrice = (totalPrice * discount + (1 - discount) * noDiscountAmount).toFixed(2);
                    this.smallRemoveZero=(this.dialogForm.discountPrice)-10;//最小抹零
                    this.bigRemoveZero=this.dialogForm.discountPrice;//最大抹零
                }else{
                    this.dialogForm.discountPrice =  this.dialogForm.totalPrice;
                    this.smallRemoveZero=this.dialogForm.totalPrice-10;//最小抹零
                    this.bigRemoveZero=this.dialogForm.totalPrice;//最大抹零
                }
            },
            getFlavorAjaxList(){
                let _this = this;
                requestTreeList({type:'折扣'}).then(res => {
                    let data = res.data;
                    if (res.status == 200) {
                        if(data && data.length>0){
                            _this.checkOutList = data;
                        }else{
                            _this.checkOutList = [];
                        }
                    } else {
                        _this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            //结算按钮提交
            dialogFormSubmit(type){
                if(type=='budget'){
                    this.$confirm('确定预结算该桌已确认的订单吗?','提示',{
                        confirmButtonText:'确定',
                        cancelButtonText:'取消',
                    }).then(()=>{
                        this.ListLoading=true;
                        let budgetData = {};
                        budgetData ={
                            deskId:this.dialogForm.deskId,
                            customerId:this.dialogForm.customerId
                        };
                        requestBugetData(budgetData).then((res)=>{
                            if(res.status == 200){
                                this.$message({
                                    type: 'success',
                                    message: '预结算成功!',
                                    duration:300,
                                });
                                this.ListLoading=false;
                            }else{
                                this.saveLoading = false;
                                this.dialogFormVisible = true;
                                this.$message({
                                    type: 'error',
                                    message: res.msg
                                });
                                this.ListLoading=false;
                            }
                        })
                    })
                }else{
                    let that=this;
                    if(this.dialogForm.type==2){
                        if(((this.dialogForm.totalPrice-this.goodsPrice)*this.discount + (1 - this.discount)* this.dialogForm.noDiscountAmount)-this.dialogForm.coupon-parseInt(this.delPrice)-this.deductionAcount>this.amountPrice){
                            this.$message({
                                type:'error',
                                message:'会员余额不足,请充值'
                            })
                            return false;
                        }
                    }
                    if(this.dialogForm.type==1){
                        if(this.dialogForm.paymentMethod==''){
                            this.$message({
                                type:'error',
                                message:'请选择支付方式',
                                duration:1000,
                            })
                            return false;
                        }
                    }
                    this.$confirm('确定结算该桌已确认的订单吗？ 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.saveLoading = true;
						console.log(this.dialogForm.orderNo);
						requestStoreOrderpaymentCheck({orderNo:this.dialogForm.orderNo}).then((res)=>{
							if(res.status==400){
								this.$message({
									type:'error',
									message:res.msg,
									duration:2000,
								})
								this.saveLoading=false;
								return false;
							}
							if(res.status==500){
								this.$message({
									type:'error',
									message:res.msg,
									duration:2000,
								})
								this.getAjaxList();
								this.saveLoading=false;
							}
							if(res.status==200){
								if(this.dialogForm.discount==''){
								    this.dialogForm.discount=10;
								}
								//换算抹零金额
                                let arr=[];
                                for(let i=0;i<this.couponDataList.length;i++){
                                    arr.push(this.couponDataList[i].id)
                                }
                                if(this.dialogForm.type==2){
                                    this.discount = this.dialogForm.discount;
                                    this.fraction=parseInt(this.delPrice);
                                }else{
                                    this.fraction = ((parseFloat(this.dialogForm.totalPrice) * this.discount + (1 - this.discount) *parseFloat(this.dialogForm.noDiscountAmount))-this.dialogForm.coupon).toFixed(2)-this.dialogForm.discountPrice;
                                    this.discount = parseFloat(this.dialogForm.discount/10).toFixed(2);
                                }
                                let id=arr.join(',');
								requestStoreOrdeCheckOut({deskId:this.dialogForm.deskId,discount:this.dialogForm.discount,memberId:this.dialogForm.memberId,remark: this.dialogForm.remark,fraction:this.fraction,type:this.dialogForm.type,customerId:this.dialogForm.customerId,paymentMethod:this.dialogForm.paymentMethod,
                                    couponMoney:this.dialogForm.coupon,couponIds:id,useIntegrale:this.useIntegrale,deductionAcount:this.deductionAcount,giveGoodsMoney:this.goodsPrice,
                                }).then(res => {
								    if(res.status == 200){
								        this.$message({
								            type: 'success',
								            message: '结算成功!',
								            duration:300,
								            onClose:function(){
								                that.saveLoading = false;
								                that.dialogFormVisible = false;
								                that.getAjaxList();
								            }
								        });
								        this.saveLoading=false;
								    }else{
								        this.saveLoading = false;
								        this.dialogFormVisible = true;
								        this.$message({
								            type: 'error',
								            message: res.msg
								        });
								    }
								});
							}

						})
                    })
                }


            },
            //点击结算按钮
            checkOut(row){
                this.value=0;
                this.orderId=row.id;
                this.dialogForm.type="1";
                this.buttonPu='primary';
                this.dialogForm.discount='';
                this.buttonHui='';
                this.couponDataList=[];
                this.goodsPrice=0;
                this.delPrice=0;
                this.goodsData=[];
                this.dialogForm.coupon=0;
                this.dialogFormTitle = '第'+row.deskNo+'号桌结算';
                requestStoreOrdeCheckOrder({deskId:row.id}).then(res => {
					console.log(res);
                    if(res.status == 200){
                        if(res.data.result == 200){
                            this.dialogFormVisible = true;
                            this.dialogForm.deskId = row.id;
                            this.dialogForm.recPrice = res.data.recPrice;
                            this.dialogForm.totalPrice = res.data.totalPrice;
                            this.dialogForm.noDiscountAmount = res.data.noDiscountAmount;
                            this.dialogForm.discountPrice = res.data.totalPrice;
							this.dialogForm.orderNo=res.data.orders[0].orderNo;
                            this.smallRemoveZero=res.data.totalPrice-10;//最小抹零
                            this.bigRemoveZero=res.data.totalPrice;//最大抹零
                            this.getFlavorAjaxList();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.orders
                            });
                        }
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data
                        });
                    }
                });
            },
            addOrder(row){
                if(row.isOpen==1){
                    sessionStorage.setItem('deskId',row.id);
                    sessionStorage.setItem('deskNo',row.deskNo);
                    if(row.orders && row.orders.length>0){
                        sessionStorage.setItem('doType','edit');
                    }else{
                        sessionStorage.setItem('doType','add');
                    }
                    this.$router.push({ path: '/editorder'});
                }
            },
            getAjaxList(){
                let _this = this;
                requestStoreDeskList(_this.param).then(res => {
                    let data = res.data;
                    if(data && data.length>0){
                        _this.tableData = data;
                    }else{
                        _this.tableData = [];
                    }

                });
            },
            getStatusAjaxList(){
                let _this = this;
                    requestSearchStoreOrde(_this.param2).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.statusList = data;
                    }else{
                        _this.statusList = [];
                    }
                });
            },
            onClickQueRen(sd){
                this.dialogIsOkFormVisible = true;
                this.dialogIsOkForm = sd;
                this.orderList = [];
                requestStoreOrderDetailListByPid({pid:this.dialogIsOkForm.id}).then(res => {
                    if(res.status == 200){
                        let data = res.data;
                        if (data && data.length>0) {
                            this.orderList = data;
                        }
                    }else{
                        this.$message({
                            message: '请求异常',
                            type: 'error'
                        });
                    }
                });
            },
            dialogIsOkFormSubmit(){
                let _this = this;
                this.$confirm('确认该订单吗？ 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.saveLoading = true;
                    let deleteParam ={
                        id: _this.dialogIsOkForm.id,
                        status:1
                    };
                    requestCheckOrder({orderId: _this.dialogIsOkForm.id}).then((res)=>{
                        if(res.status=='200'){
                            requestStatusStoreOrde(deleteParam).then(res => {
                                _this.$message({
                                    type: 'success',
                                    message: '操作成功!',
                                    duration:300,
                                    onClose:function(){
                                        _this.saveLoading = false;
                                        _this.dialogIsOkFormVisible = false;
                                        _this.getAjaxList();
                                        _this.getStatusAjaxList();
                                    }
                                });
                            });
                        }else{
                           _this.$message({
                               type:'error',
                               message:`${res.msg}''${res.data}`,
                           })
                            _this.saveLoading = false;
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        },
        beforeMount() {
            sessionStorage.removeItem('deskId');
            sessionStorage.removeItem('deskNo');
            sessionStorage.removeItem('doType');
            this.getAjaxList();
            this.getStatusAjaxList();
        },
        created(){
            //页面刚进入时开启长连接
            this.initWebSocket();
        },
		beforeRouteLeave(to,from,next) {
			next(vm=>{
				vm.websocketclose();
			})
		}


    }
</script>
<style lang="scss">
    .coupon-list{
        width: 90%;
        margin: 10px auto;
        height: 150px;
        box-shadow: 2px 2px 2px #f1f1f1;
        border:1px solid #f1f1f1;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 5px;
        .coupon-left{
            width: 30%;
            height: 150px;
            float: left;
            text-align: center;
            span{
                display: block;
            }
            span:first-child{
                font-size: 24px;
                color: #f60;
                margin-top:40px;
                margin-bottom: 5px;
            }
        }
        .coupon-center{
            width: 50%;
            height: 150px;
            float: left;
            h3{
                color: #000;
                font-weight: 500;
                font-size: 18px;
            }
        }
        .coupon-right{
            width: 20%;
            height: 150px;
            float: left;
            text-align: center;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding-top: 60px;
        }
    }
    .el-breadcrumb{
        line-height: 4;
        padding-left: 20px;
        background-color: #ffffff;
    }
    #storeOrder{
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
        .boxContent{
            text-align: left;
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            justify-content: space-between;

            .zhuotai{
                border: 1px solid #000000;
                border-radius: 6px;
            }
            .title{
                padding: 10px;
            }
            .self-card{
                cursor: pointer;
                width: 29%;
                color: #ffffff;
                margin: 5px 20px;
                height: 200px;
                overflow-y: auto;
            }
            .self-card-red{
                background-color: #e16870;
            }
            .self-card-green{
                background-color: #35B178;
            }
            .self-card-gray{
                background-color: #909399;
            }
        }
        .boxContent:after {
            content: "";
            display: block;
            width: 29%;
            margin: 5px 20px;
        }
        .largeFont{
            font-size: 24px;
        }
    }
    .redColor{
        color:#e16870;
    }
    .btn{
        line-height: 30px;
        background-color: #35B178;
        color:#ffffff;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
    }
</style>
