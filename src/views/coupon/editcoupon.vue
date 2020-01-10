<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/coupon'}">优惠卷列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑优惠卷</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <el-row>
                <el-col :span="20">
                    <el-form ref="couponData" :rules="rules" :model="couponData" label-width="140px">
                        <el-form-item label="优惠卷名称" prop="couponName">
                            <el-input v-model="couponData.couponName"></el-input>
                        </el-form-item>
                        <el-form-item label="优惠卷金额" prop="couponAmount">
                            <el-input v-model="couponData.couponAmount"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="满多少元使用" prop="superimposedSheets">
                            <el-input v-model="couponData.superimposedSheets"></el-input>
                        </el-form-item>-->
                        <el-form-item label="发放数量" prop="couponNumber">
                            <el-input v-model="couponData.couponNumber" placeholder="输入0表示无限制"></el-input>
                        </el-form-item>
                        <el-form-item label="每人最大领取数" prop="limitTheNumberOfSheets">
                            <el-input v-model="couponData.limitTheNumberOfSheets"></el-input>
                        </el-form-item>
                        <el-form-item label="是否可以叠加使用" prop="whetherItCanBeSuperimposed">
                            <el-select v-model="couponData.whetherItCanBeSuperimposed">
                                <el-option label="是" :value="0"></el-option>
                                <el-option label="否" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="发送方式" prop="sendingMethod">
                            <el-radio-group v-model="couponData.sendingMethod" @change="checkTime">
                                <el-radio :label="1">每周</el-radio>
<!--                                <el-radio label="2">每月</el-radio>-->
                                <el-radio :label="3">自定义时间</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="选择时间" v-if="showTime">
                            <el-radio-group v-model="couponData.time" @change="checkDate">
                                <el-radio :label="1">星期一</el-radio>
                                <el-radio :label="2">星期二</el-radio>
                                <el-radio :label="3">星期三</el-radio>
                                <el-radio :label="4">星期四</el-radio>
                                <el-radio :label="5">星期五</el-radio>
                                <el-radio :label="6">星期六</el-radio>
                                <el-radio :label="7">星期日</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动时间" v-if="showDate">
                            <el-col :span="11">
                                <el-date-picker type="datetime" placeholder="选择开始日期" value-format="yyyy-MM-dd HH:mm:ss"  v-model="couponData.couponStartTime" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" style="text-align: center"  :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="datetime" placeholder="选择结束日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="couponData.couponEndTime" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :disabled="disBtn" @click="submitForm('couponData')">立即创建</el-button>
                            <el-button @click="back">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

        </div>
    </section>
</template>

<script>
    import {requestCouponedit} from '../../api/api.js'
    export default {
        name: "addcoupon",
        data() {
            return {
                couponData:{
                    id:'',
                    couponName:'',
                    couponAmount:'',
                    usageLimit:'',
                    whetherItCanBeSuperimposed:'',
                    superimposedSheets:'',
                    couponStartTime:'',
                    couponEndTime:'',
                    couponNumber:'',
                    limitTheNumberOfSheets:'',
                    sendingMethod:'',
                    cronExpression:'',
                    time:'',
                    couponSetId:'',
                },
                showTime:false,
                showDate:false,
                disBtn:false,
                rules: {
                    couponName: [
                        { required: true, message: '请输入优惠卷名称', trigger: 'blur' },
                    ],
                    couponAmount: [
                        { required: true, message: '请输入优惠卷金额', trigger: 'blur' },
                    ],
                    // superimposedSheets: [
                    //     { required: true, message: '满多少元使用', trigger: 'blur' },
                    // ],
                    couponNumber: [
                        { required: true, message: '请输入发放数量', trigger: 'blur' },
                    ],
                    limitTheNumberOfSheets:[
                        { required: true, message: '请输入每人领取份数', trigger: 'blur' },
                    ],
                    whetherItCanBeSuperimposed:[
                        { required: true, message: '请选择是否可以叠加使用', trigger: 'change' },
                    ],
                    sendingMethod:[
                        { required: true, message: '请选择发送方式', trigger: 'change' },
                    ]
                }

            }
        },
        created() {
          this.getData();
          this.checkTime();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.couponData.sendingMethod==1) {
                            if(this.couponData.time==''){
                                this.$message({
                                    type:'error',
                                    message:'请选择每周发放时间！'
                                })
                                return false;
                            }
                        }
                        if(this.couponData.sendingMethod==3){
                            if(this.couponData.couponStartTime==''|| this.couponData.couponEndTime==''){
                                this.$message({
                                    type:'error',
                                    message:'请选择优惠卷开始结束日期！'
                                })
                                return false;
                            }
                        }
                        this.disBtn=true;
                        requestCouponedit(this.couponData).then((res)=>{
                            if(res.success){
                                this.$message({
                                    type:'success',
                                    message:'添加优惠卷成功',
                                    onClose:()=>{
                                        this.$router.push({path:'/coupon'})
                                    }
                                })
                            }else{
                                this.disBtn=false;
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        this.disBtn=false;
                        return false;
                    }
                });
            },
            back(){
                this.$router.push({path:'/coupon'});
            },
            checkTime(val){
                if(this.couponData.sendingMethod==1){
                    this.showTime=true;
                    this.showDate=false;
                }
                if(this.couponData.sendingMethod==2){
                    this.showTime=false;
                    this.showDate=false;
                }
                if(this.couponData.sendingMethod==3){
                    this.showDate=true;
                    this.showTime=false;
                }
            },
            checkDate(val){
                this.couponData.cronExpression=`0 0 0 ? * ${val}`
            },
            getData(){
                const list=JSON.parse(sessionStorage.getItem('couponData'));
                this.couponData.couponName=list.couponName;
                this.couponData.couponAmount=list.couponAmount;
                this.couponData.usageLimit=list.usageLimit;
                this.couponData.whetherItCanBeSuperimposed=list.whetherItCanBeSuperimposed;
                this.couponData.superimposedSheets=list.superimposedSheets;
                this.couponData.couponStartTime=list.couponStartTime;
                this.couponData.couponEndTime=list.couponEndTime;
                this.couponData.couponNumber=list.couponNumber;
                this.couponData.limitTheNumberOfSheets=list.limitTheNumberOfSheets;
                this.couponData.sendingMethod=list.sendingMethod;
                this.couponData.cronExpression=list.cronExpression;
                this.couponData.couponSetId=list.couponValidTimeList[0].id;
                this.couponData.couponId=list.id;
                console.log(this.couponData.sendingMethod);
            },
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
</style>
