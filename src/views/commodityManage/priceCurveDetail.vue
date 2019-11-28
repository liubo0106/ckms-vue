<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/commodityManage' }">原料管理</el-breadcrumb-item>
            <el-breadcrumb-item>价格详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody">
            <div class="btn">
                <div class="left">
                   <el-button size="mini" round v-on:click="priceClick(1)">最近10天</el-button>
                   <el-button size="mini" round v-on:click="priceClick(2)">最近一个月</el-button>
                   <el-button size="mini" round v-on:click="priceClick(3)">最近半年</el-button>
                </div>
                <div class="right">
                    <!-- <el-button type="primary" size="small" v-on:click="drawLine(1)">折线图</el-button>
                    <el-button type="primary" size="small" v-on:click="drawLine(2)">柱状图</el-button>
                    <el-button type="primary" size="small" v-on:click="drawLine(3)">数据图</el-button> -->
                    <el-button type="primary" size="small" v-on:click="drawLine(4)">导出</el-button>
                </div>
            </div>
            <div class="wrap">
                <div id="myChart" style="width:100%;height:600px;"></div>   
            </div>
        </div>
    </section>
</template>
<script>
 import {requestSearchqueryPrice,requestUrl} from '../../api/api';
export default {
  name:'priceCurveDetail',
  data(){
    return{
       priceDataX:[], 
       priceDataY:[],
       typeClass:'bar',
       myChart:'',
       
       queryData:{
           id:'',
           type:1,
       }
    }
  },
  mounted(){
    window.addEventListener("resize", () => {
        this.myChart.resize();
    }); 
    this.drawLine();
  },
  methods: {
    priceClick(type){
        if(type==1){
            this.queryData.type=1;
            this.drawLine();
        }
        if(type==2){
            this.queryData.type=2;
            this.drawLine();
        }
        if(type==3){
            this.queryData.type=3;
            this.drawLine();
        }
    },  
    drawLine(type){
        this.queryData.id=sessionStorage.getItem('serialNo');
        if(type==1){
           this.typeClass='line';
        }else if(type==2){
           this.typeClass='bar';
        }
        requestSearchqueryPrice(this.queryData).then((res)=>{
                this.priceDataX=res.data.x;
                this.priceDataY=res.data.y;
                 this.myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                    this.myChart.setOption({
                        title: { text: '' },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross'
                            }
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                                dataView: {readOnly: false},
                                magicType: {type: ['line', 'bar']},
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            name:'日期',
                            data: this.priceDataX,
                        },
                        yAxis: {},
                        series: [{
                            name: '价格',
                            type: this.typeClass ,
                            data: this.priceDataY,
                        }]
                    });        
        })
        if(type==4){
            alert();
            location.href = `${requestUrl}export/priceReport?id=${this.queryData.id}`
        }
    },
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb{
        line-height: 4;
        padding-left: 20px;
        background-color: #ffffff;
    }
.contentBody{
    margin: 20px;
    background-color: #ffffff;
    padding: 20px;
    .btn{
        display: flex;
        margin-bottom: 20px;
        .left{
            width: 50%;
        }
        .right{
            width: 50%;
            text-align: right;
        }
    }
}    
</style>
