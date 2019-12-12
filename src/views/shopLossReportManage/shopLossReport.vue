<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>门店报损单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentBody"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(241, 242, 247, 0.5)">
            <el-form :inline="true" :model="searchForm" label-width="85px" class="demo-form-inline" label-position="left">
                <el-form-item label="报损单名称">
                    <el-input v-model="searchForm.name" :maxlength="200" autocomplete="off" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="搜索状态">
                    <el-select v-model="searchForm.status" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="草稿" value="0"></el-option>
                        <el-option label="已确认" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" circle @click.native.prevent="onSearch" native-type="submit"></el-button>
                    <el-button icon="el-icon-plus" circle @click="handleClick('', '', 'add')"></el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column align="center" header-align='center' type="index" :index="indexMethod" label="行号" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="orderNo" label="报损单号" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="name" label="报损单名称" ></el-table-column>
                <el-table-column align="center" header-align='center' prop="dateTime" label="报损单日期" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="totalNumber" label="总量" width="80"></el-table-column>
                <el-table-column align="center" header-align='center' prop="statusName" label="状态" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="lossType" label="报损类型" width="140">
                    <template slot-scope="scope">
                        <span v-if="scope.row.lossType==1">物品损坏</span>
                        <span v-if="scope.row.lossType==2">物品遗失</span>
                        <span v-if="scope.row.lossType==3">员工餐使用</span>
                        <span v-if="scope.row.lossType==4">库存错误</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align='center' prop="createUser" label="创建人" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="updateUser" label="修改人" width="140"></el-table-column>
                <el-table-column align="center" header-align='center' prop="confirmer" label="确认人" width="140"></el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="435" v-if="isLossManager==1">
                    <template slot-scope="scope">
                        <el-button style="background-color: #f37276;color: #fff;border: none;" icon="el-icon-document" size="mini" @click="handleClick(scope.$index, scope.row, 'detail')">查看</el-button>
                        <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit" v-if='scope.row.status == 0 || scope.row.status == 2' type="primary" size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" v-if='scope.row.status == 0 || scope.row.status == 2' size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
                        <el-button icon="el-icon-success" style="background-color: #6faffd;color: #fff;border: none;" v-if='scope.row.status == 0 || scope.row.status == 2' size="mini" type="warning" @click="handleClick(scope.$index, scope.row, 'ok')">确认</el-button>
                        <el-button icon="el-icon-error" style="background-color: #6faffd;color: #fff;border: none;" v-if='scope.row.check==0' size="mini"  type="warning" @click="handleClick(scope.$index, scope.row, 'error')">驳回</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="left" header-align='center' label="操作" width="360" v-else>
                    <template slot-scope="scope">
                        <el-button style="background-color: #f37276;color: #fff;border: none;" icon="el-icon-document" size="mini" @click="handleClick(scope.$index, scope.row, 'detail')">查看</el-button>
                        <el-button style="background-color: #24cbc1;color: #fff;border: none;" icon="el-icon-edit" v-if='scope.row.status == 0 || scope.row.status == 2' type="primary" size="mini" @click="handleClick(scope.$index, scope.row, 'edit')">编辑</el-button>
                        <el-button style="background-color: #fe8d29;color: #fff;border: none;" icon="el-icon-delete" v-if='scope.row.status == 0 || scope.row.status == 2' size="mini" type="danger" @click="handleClick(scope.$index, scope.row, 'delete')">删除</el-button>
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
        </div>
        <el-dialog
                        title="提示"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :before-close="handleClose">
                <span style="display: block;margin-bottom: 20px">请输入驳回原因</span>
                 <span>
                     <el-input
                             type="textarea"
                             :rows="5"
                             placeholder="请输入内容120个字以内"
                             :maxlength="120"
                             v-model="rejectrData.comment">
                     </el-input>
                 </span>
                <span slot="footer" class="dialog-footer">
            <el-button @click="rejectrDialogClose">取 消</el-button>
            <el-button type="primary" @click="rejectrDialog" native-type="submit" >确 定</el-button>
        </span>
        </el-dialog>
    </section>
</template>
<script type="text/ecmascript-6">
    import { requestDestroyPage, requestDeleteDestroy,requestStatusDestroy} from '../../api/api';
    export default {
        name: 'user-manage',
        data() {
            return {
                loading: false,
                searchForm: {
                    name: '',
                    orderNo:'',
                    status:'',
                },
                tableData: null,
                param: {
                    name:'',
                    orderNo:"",
                    status:'',
                    pageNo:1,
                    pageSize:15,
                },
                totalNum:0,
                isLossManager:'',
                dialogVisible:false,
                rejectrStatus:false,
                rejectrData:{
                    comment:'',
                    id:'',
                    status:2,
                }
            }
        },
        mounted(){
            this.getUser();
        },
        methods: {
            indexMethod(index) {
                return (this.param.pageNo - 1) * this.param.pageSize + index + 1;
            },
            getUser(){
              const userData=JSON.parse(sessionStorage.getItem('user'));
              this.isLossManager=userData.isLossManager;
            },
            handleClose(){
                this.dialogVisible=false;
            },
            rejectrDialog(){
                this.rejectrStatus=true;
                if(this.rejectrData.comment==''){
                    this.$message({
                        type:'error',
                        message:'驳回原因不能为空'
                    })
                    return false;
                }
                this.dialogVisible=false;
                requestStatusDestroy(this.rejectrData).then(res => {
                    if(res.status==200){
                        this.$message({
                            type: 'success',
                            message: "提交成功！",
                            duration:1000,
                        });
                        this.getAjaxList();
                        this.loading=false;
                        this.param.pageNo =1;
                        this.rejectrStatus=false;
                    }

                });
            },
            rejectrDialogClose(){
                this.dialogVisible=false;
            },
            timeData:function(data){
                var str=data.split('-');
                var y=str[0];
                if(str[1].length<2){
                    var m=`0${str[1]}`
                }else{
                    var m=`${str[1]}`
                }
                if(str[2].length<2){
                    var d=`0${str[2]}`
                }else{
                    var d=`${str[2]}`
                }
                return `${y}-${m}-${d}`

            },
            handleSizeChange(val){
                let _this = this;
                _this.param.pageSize=val;
                requestDestroyPage(_this.param).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.tableData = data;
                        _this.totalNum = parseInt(res.data.totalNum);
                    }else{
                        _this.tableData = [];
                        _this.totalNum = 0;
                    }
                    for(let i=0;i<_this.tableData.length;i++){
                        _this.tableData[i].dateTime=_this.timeData(_this.tableData[i].dateTime)

                    }
                });
            },
            handleClick(index, row, doType) {
                let _this = this;
                if(doType == 'delete'){
                    this.$confirm('真的删除该行数据么, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        let deleteParam ={
                            id: row.id
                        };
                        requestDeleteDestroy(deleteParam).then(res => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                                duration:300,
                                onClose:function(){
                                    _this.loading=false;
                                    _this.param.pageNo =1;
                                    _this.getAjaxList();
                                }
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else if(doType == 'add'){
                    sessionStorage.setItem('lossReportId', '');
                    this.$router.push({ path: '/editslr'});
                }else if(doType == 'edit'){
                    sessionStorage.setItem('lossReportId', row.id);
                    sessionStorage.setItem('check',row.check);
                    this.$router.push({ path: '/editslr'});
                }else if(doType == 'detail'){
                    sessionStorage.setItem('lossReportId', row.id);
                    this.$router.push({ path: '/detailslr'});
                }else if(doType=='error'){
                    this.dialogVisible=true;
                    this.rejectrData.id=row.id;
                }
                if(doType == 'ok'){
                    this.$confirm('是否确认该报损单单?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading=true;
                        let sParam ={
                            id: row.id,
                            status:1
                        };
                        requestStatusDestroy(sParam).then(res => {
                            if(res.status==400){
                                this.$message({
                                    type:'error',
                                    message:res.msg,
                                    duration:1000,
                                })
                                _this.loading=false;
                                return false;
                            }
                            this.$message({
                                type: 'warning',
                                message: res.data,
                                duration:1000,
                                onClose:function(){
                                    _this.loading=false;
                                    _this.param.pageNo =1;
                                    _this.getAjaxList();
                                }
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
            onSearch() {
                this.param.pageNo =1;
                this.param.name = this.searchForm.name;
                this.param.orderNo = this.searchForm.orderNo;
                this.param.status = this.searchForm.status;
                this.getAjaxList();
            },
            handleCurrentChange(val) {
                this.param.pageNo = val;
                this.getAjaxList();
            },
            getAjaxList(){
                let _this = this;
                requestDestroyPage(_this.param).then(res => {
                    let data = res.data.items;
                    if(data && data.length>0){
                        _this.tableData = data;
                        _this.totalNum = parseInt(res.data.totalNum);
                        this.tableData.forEach((item)=>{
                            this.$set(item,'check',0);
                        })
                        for(let i=0;i<_this.tableData.length;i++){
                            if(this.tableData[i].statusName=="未通过"){
                                this.tableData[i].check=1;
                            }
                            if(this.tableData[i].statusName=="已通过"){
                                this.tableData[i].check=2;
                            }
                            _this.tableData[i].dateTime=_this.timeData(_this.tableData[i].dateTime)
                        }
                    }else{
                        _this.tableData = [];
                        _this.totalNum = 0;
                    }

                });
            }
        },
        beforeMount() {
            sessionStorage.removeItem('lossReportId');
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
        .el-aside{
            width: auto;
            height: 700px;
        }
    }
</style>
