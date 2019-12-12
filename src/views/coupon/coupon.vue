<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>优惠卷管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-form :model="param" label-width="90px" class="demo-form-inline" label-position="left">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="优惠卷名称">
                            <el-input v-model="param.couponName" :maxlength="200" autocomplete="off" placeholder="优惠卷名称" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label-width="0">
                            <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                            <el-button icon="el-icon-plus" circle @click="addCoupon()"></el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table border :data="couponData">
                <el-table-column type="index" label="序号" header-align="center" align="center"></el-table-column>
                <el-table-column label="优惠卷名称" align="center" prop="couponName" header-align="center"></el-table-column>
                <el-table-column label="优惠卷金额" align="center" prop="couponAmount" header-align="center"></el-table-column>
                <el-table-column label="满多少使用" align="center" prop="superimposedSheets" header-align="center"></el-table-column>
                <el-table-column label="发送方式" align="center" prop="sendingMethod" header-align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sendingMethod==1">每周</span>
                        <span v-if="scope.row.sendingMethod==2">每月</span>
                        <span v-if="scope.row.sendingMethod==3">自定义时间</span>
                    </template>
                </el-table-column>
<!--                <el-table-column label="开始时间" align="center" header-align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                        <span>{{scope.row.couponStartTime}}</span>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column label="结束时间" align="center" header-align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                        <span>{{scope.row.couponEndTime}}</span>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column label="状态" header-align="center" align="center" prop="activeStatus">
                    <template slot-scope="scope">
                        <span v-if="scope.row.activeStatus==1">进行中</span>
                        <span v-if="scope.row.activeStatus==2">已暂停</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" header-align="center" width="440">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-document" size="mini" @click="handClick(scope.row,'detail')">详情</el-button>
                        <el-button style="background-color: #4395fb;color: #fff;border: none;" icon="el-icon-edit" size="mini" @click="handClick(scope.row,'edit')">编辑</el-button>
                        <el-button icon="el-icon-delete" size="mini" @click="handClick(scope.row,'delete')" v-if="scope.row.sendingMethod==3">删除</el-button>
                        <el-button icon="el-icon-lock" size="mini" type="danger" @click="handClick(scope.row,'close')" v-if="scope.row.sendingMethod==1">关闭</el-button>
                        <el-button icon="el-icon-switch-button" size="mini" type="success" @click="handClick(scope.row,'start')" v-if="scope.row.sendingMethod==1">启用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="param.pageNo"
                    :page-sizes="[15, 30, 45, 60]"
                    :page-size="param.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum">
            </el-pagination>
            <el-dialog
                    title="优惠卷详情"
                    :visible.sync="dialogVisible"
                    width="30%">
                <el-form label-position="left" class="demo-table-expand">
                    <el-form-item label="优惠卷名称">
                        <span>{{couponDetail.couponName}}</span>
                    </el-form-item>
                    <el-form-item label="优惠卷金额">
                        <span>{{couponDetail.couponAmount}}</span>
                    </el-form-item>
                    <el-form-item label="满多少使用">
                        <span>{{couponDetail.superimposedSheets}}</span>
                    </el-form-item>
                </el-form>
                <el-table border :data="couponDetail.couponValidTimeList">
                    <el-table-column label="序号" type="index"></el-table-column>
                    <el-table-column label="开始时间" prop="couponStartTime"></el-table-column>
                    <el-table-column label="结束时间" prop="couponEndTime"></el-table-column>
                </el-table>

            </el-dialog>
        </div>
    </section>
</template>

<script>
    import {requestCouponList,requestCouponDelete,requestCouponOff,requestCouponOn} from '../../api/api.js'
    export default {
        name: "coupon",
        data(){
          return{
              param:{
                  couponName:'',
                  pageNo:1,
                  pageSize:15,
              },
              totalNum:0,
              couponData:[],
              dialogVisible:false,
              couponDetail:'',
          }
        },
        created() {
            this.getCoupon();
        },
        methods:{
            handleSizeChange(val){
                this.param.pageSize=val;
                this.getCoupon();
            },
            handleCurrentChange(val){
                this.param.pageNo=val;
                this.getCoupon();
            },
            getCoupon(){
                requestCouponList(this.param).then((res)=>{
                    if(res.status==200){
                        this.couponData=res.data.items;
                        this.totalNum=res.data.totalNum;
                    }
                })
            },
            addCoupon(){
                this.$router.push({path:'/addCoupon'});
            },
            onSearch(){
                this.getCoupon();
            },
            handClick(row,type){
                if(type=='edit'){
                    const couponDataList=JSON.stringify(row);
                    sessionStorage.setItem('couponData',couponDataList);
                    this.$router.push({path:'/editcoupon'})
                }
                if(type=='delete'){
                    requestCouponDelete(row).then((res)=>{
                        if(res.success){
                            this.$message({
                                type:'success',
                                message:'删除活动成功',
                            })
                            this.getCoupon();
                        }
                    })
                }
                if(type=='detail'){
                    this.dialogVisible=true;
                    this.couponDetail=row;
                }
                if(type=='close'){
                    requestCouponOff({sendingMethod:row.sendingMethod,couponValidTimeId:row.id}).then((res)=>{
                        if(res.success){
                            this.$message({
                                type:'success',
                                message:'任务关闭成功'
                            });
                            this.getCoupon();
                        }
                    })
                }
                if(type=='start'){
                    requestCouponOn({sendingMethod:row.sendingMethod,couponValidTimeId:row.id}).then((res)=>{
                        if(res.success){
                            this.$message({
                                type:'success',
                                message:'任务启用成功'
                            });
                            this.getCoupon();
                        }
                    })
                }
            }
        },
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
</style>
