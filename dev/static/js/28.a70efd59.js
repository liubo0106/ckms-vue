(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{"/GNZ":function(e,t,a){},"6aZL":function(e,t,a){"use strict";a.r(t);var r=a("TsPW"),i={name:"edit-user-manage",data:function(){return{activeName:"0",tableData:null,typeBool:!1,dialogForm:{standard:"",number:"",price:"",id:"",name:"",serialNo:"",productInfoId:"",type:2},id:"",saveLoading:!1,editForm:{name:"",dateTime:"",totalNumber:"",totalPrice:"",remark:"",purchaseOrderIds:[],storeReturnIds:[],type:1,pickOrderIds:""},disabled:!0,rules:{name:[{required:!0,message:"请输入入库单名称",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 15 个字",trigger:"blur"}],type:[{required:!0,message:"请输入入库类型",trigger:"blur"}],dateTime:[{required:!0,message:"请选择",trigger:"blur"}],productInfoId:[{required:!0,message:"请选择原料名称",trigger:"blur"}],purchaseOrderIds:[{required:!0,message:"请选择采购单",trigger:"blur"}],pickOrderIds:[{required:!0,message:"请选择领料单",trigger:"blur"}],storeReturnIds:[{required:!0,message:"请选择退货单",trigger:"blur"}]},headers:{sessionId:sessionStorage.getItem("sessionId")},purchaseList:[],pickOrderList:[],storeReturnList:[],param:{pageSize:-1},param2:{pid:""},param3:{pageSize:-1,status:1},productList:[],dialogTreeFormVisible:!1,dialogTreeTitle:"新增入库明细",searchTreeForm:{name:"",serialNo:""},tableTreeData:null,paramTree:{name:"",pageNo:1,pageSize:10,deptId:"",checkChild:"all",serialNo:"",categoryId:""},totalTreeNum:0,orgTreeData:[],defaultProps:{children:"children",label:"name"},searchTreeForm2:{name:"",serialNo:""},tableTreeData2:null,paramTree2:{name:"",pageNo:1,pageSize:10,deptId:"",checkChild:"all",serialNo:"",packCategoryId:"",categoryId:"",parentId:""},totalTreeNum2:0,orgTreeData2:[],directDialogTreeFormVisible:!1,directDialogTreeTitle:"新增入库单明细",directActiveName:"1",directSearchTreeForm:{name:"",serialNo:""},directTableTreeData:null,directParamTree:{name:"",pageNo:1,pageSize:10,deptId:"",checkChild:"all",serialNo:"",packCategoryId:"",isDelete:1},directTotalTreeNum:0,directOrgTreeData:[],directSearchTreeForm2:{name:"",serialNo:""},directTableTreeData2:null,directParamTree2:{name:"",pageNo:1,pageSize:10,deptId:"",checkChild:"all",serialNo:"",categoryId:"",isDelete:1},directTotalTreeNum2:0,directOrgTreeData2:[],directSearchTreeForm3:{name:"",serialNo:""},directTableTreeData3:[],directParamTree3:{name:"",pageNo:1,pageSize:10,serialNo:"",type:"1",isDelete:1},directTotalTreeNum3:0,directSearchTreeForm4:{name:"",serialNo:""},directTableTreeData4:null,directParamTree4:{name:"",pageNo:1,pageSize:10,serialNo:"",type:"2",isDelete:1},directTotalTreeNum4:0,unitFromList:[],unitFromDialogFormVisible:!1,unitFrom:"",tableIndex:"",tableRow:{},tableType:1,tabName:0}},methods:{handleClick:function(e,t){"0"==e.name&&(this.getTreeAjaxPage2(),this.getTreeAjaxList2(),this.tabName=e.name,this.searchTreeForm2.name="",this.paramTree2.name="",this.paramTree2.packCategoryId="",this.paramTree2.serialNo="",this.searchTreeForm2.serialNo="",this.searchTreeForm2.name=""),1==e.name&&(this.getMaterial(),this.getMaterialList(),this.tabName=e.name,this.searchTreeForm2.name="",this.paramTree2.name="",this.paramTree2.packCategoryId="",this.paramTree2.serialNo="",this.searchTreeForm2.serialNo="",this.searchTreeForm2.name="")},getMaterial:function(){var e=this;Object(r.Jd)({}).then(function(t){if(200==t.status){var a=t.data;a?a&&a.length>0?e.orgTreeData2=a:e.orgTreeData2=[]:e.$message({type:"error",message:"系统异常！"})}})},getMaterialList:function(){var e=this;Object(r.Md)(e.paramTree2).then(function(t){if(200==t.status){var a=t.data.items;a&&a.length>0?(e.tableTreeData2=a,e.totalTreeNum2=parseInt(t.data.totalNum)):(e.tableTreeData2=[],e.totalTreeNum2=0)}})},handleNodeClick3:function(e){this.searchTreeForm2.name="",this.paramTree2.name="",this.paramTree2.packCategoryId="",this.paramTree2.serialNo="",this.searchTreeForm2.serialNo="",this.searchTreeForm2.name="",0==!e.id&&(this.paramTree2.categoryId=e.id),this.paramTree2.pageNo=1,this.getMaterialList()},handleNodeClick2:function(e){this.searchTreeForm2.name="",this.paramTree2.name="",this.paramTree2.packCategoryId="",this.paramTree2.serialNo="",this.searchTreeForm2.serialNo="",this.searchTreeForm2.name="","0"==e.id||(this.paramTree2.packCategoryId=e.id),this.paramTree2.pageNo=1,this.getTreeAjaxPage2()},onSearchTree2:function(){this.paramTree2.pageNo=1,this.paramTree2.serialNo=this.searchTreeForm2.serialNo,this.paramTree2.name=this.searchTreeForm2.name,this.getTreeAjaxPage2()},handleCurrentChangeTree2:function(e){this.paramTree2.pageNo=e,this.getTreeAjaxPage2()},getTreeAjaxPage2:function(){var e=this;Object(r.Cd)(e.paramTree2).then(function(t){if(200==t.status){var a=t.data.items;a&&a.length>0?(e.tableTreeData2=a,e.totalTreeNum2=parseInt(t.data.totalNum)):(e.tableTreeData2=[],e.totalTreeNum2=0)}})},getTreeAjaxList2:function(){var e=this;Object(r.Bd)({}).then(function(t){if(200==t.status){var a=t.data;a&&a.length>0?e.orgTreeData2=a:e.orgTreeData2=[]}})},handleClickTreeAdd2:function(e,t){var a=this;if(this.tableIndex="",this.tableRow={},this.unitFrom="",this.tableTreeData2[e].number>0){var i,l=this;i={id:"",standard:t.standard,number:t.number,price:t.costPrice,name:t.name,serialNo:t.serialNo,spec:t.spec,rawPrice:t.rawPrice,discount:t.discount,amount:t.amount,state:l.activeName,type:0==l.activeName?1:2,inStockOrderId:l.id,productInfoId:t.id},Object(r.Nc)(i).then(function(e){200==e.status?a.$message({type:"success",message:"操作成功!",onClose:function(){l.saveLoading=!1,l.unitFromDialogFormVisible=!1,l.getAjaxList(1)}}):(l.saveLoading=!1,l.unitFromDialogFormVisible=!1,l.$message({type:"error",message:e.msg}))})}else this.$message({type:"error",message:"请选择数量！"})},unitFromAdd:function(){this.ajaxSaveInStockDetail(this.tableIndex,this.tableRow,this.tableType)},ajaxSaveInStockDetail:function(e,t,a){var i=this,l=0;if(1==a){if(this.unitFrom){l=this.unitFromList.find(function(e){return e.id===i.unitFrom}).ratio*this.tableTreeData2[e].number}else l=this.tableTreeData2[e].number;var n,o=this;n={id:"",standard:t.standard,number:l,price:t.price,name:t.name,serialNo:t.serialNo,spec:t.spec,rawPrice:t.rawPrice,discount:t.discount,amount:t.amount,state:o.activeName,type:0==o.activeName?1:2,inStockOrderId:o.id,productInfoId:t.id},Object(r.Nc)(n).then(function(e){200==e.status?o.$message({type:"success",message:"操作成功!",duration:300,onClose:function(){o.saveLoading=!1,o.unitFromDialogFormVisible=!1,o.getAjaxList(1)}}):(o.saveLoading=!1,o.unitFromDialogFormVisible=!1,o.$message({type:"error",message:e.msg}))})}else{var s,c,d=this;c=this.unitFromList.find(function(e){return e.id===i.unitFrom}),2==a?l=this.unitFrom?c.ratio*this.directTableTreeData[e].number:this.directTableTreeData[e].number:3==a&&(l=this.unitFrom?c.ratio*this.directTableTreeData2[e].number:this.directTableTreeData2[e].number),4==a&&(l=this.unitFrom?c.ratio*this.directTableTreeData3[e].number:this.directTableTreeData3[e].number),5==a&&(l=this.unitFrom?c.ratio*this.directTableTreeData4[e].number:this.directTableTreeData4[e].number),s={id:"",standard:t.standard,number:l,price:t.price,name:t.name,serialNo:t.serialNo,type:d.directActiveName,inStockOrderId:d.id,productInfoId:t.id},Object(r.Nc)(s).then(function(e){200==e.status?d.$message({type:"success",message:"操作成功!",duration:300,onClose:function(){d.unitFromDialogFormVisible=!1,d.saveLoading=!1,d.getAjaxList(1)}}):(d.unitFromDialogFormVisible=!1,d.saveLoading=!1,d.$message({type:"error",message:e.msg}))})}},getdatatime:function(){var e=new Date,t=e.getFullYear(),a=e.getMonth()+1,r=e.getDate(),i=r>9?r:"0"+r,l=a>9?a:"0"+a;this.editForm.dateTime=t+"-"+l+"-"+i},handleClickDetail:function(e,t,a){var i=this;"delete"==a?i.$confirm("真的删除该行数据么, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.saveLoading=!0;var e={id:t.id};Object(r.C)(e).then(function(e){i.saveLoading=!1,200==e.status?i.$message({type:"success",message:"删除成功!",duration:300,onClose:function(){i.getAjaxList(1)}}):i.$message({type:"error",message:e.msg})})}).catch(function(){i.$message({type:"info",message:"已取消删除"})}):"add"==a?i.addOrg("add",t):"edit"==a&&i.addOrg("edit",t)},addOrg:function(e,t){4==this.editForm.type?(0==this.tabName&&(this.getTreeAjaxPage2(),this.getTreeAjaxList2(),this.dialogTreeFormVisible=!0),1==this.tabName&&(this.getMaterial(),this.getMaterialList(),this.dialogTreeFormVisible=!0)):2==this.editForm.type&&(this.directGetTreeAjaxPage(),this.directGetTreeAjaxList(),this.directDialogTreeFormVisible=!0)},getAjaxList:function(e){var t=this;Object(r.yb)(t.param2).then(function(a){t.tableData=[];var r=a.data;if(r&&r.length>0){t.tableData=r;for(var i=0,l=0,n=0;n<t.tableData.length;n++)i+=t.tableData[n].price*t.tableData[n].number,l+=t.tableData[n].number;t.editForm.totalPrice=i,t.editForm.totalNumber=l,1==e&&t.submitForm("editForm")}else t.tableData=[]})},requestClientInfo:function(){var e=this,t=this;Object(r.qb)({id:this.id}).then(function(a){if(200==a.status){var r=a.data;r&&(t.editForm.name=r.name,t.editForm.dateTime=r.dateTime,t.editForm.totalNumber=r.totalNumber,t.editForm.totalPrice=r.totalPrice,t.editForm.remark=r.remark,t.editForm.type=r.type,t.editForm.purchaseOrderIds=r.purchaseOrderIds.split(","),t.editForm.storeReturnIds=r.storeReturnIds.split(","),t.editForm.pickOrderIds=r.pickOrderIds)}else e.$message({message:"请求异常",type:"error"})})},goBack:function(){this.$router.push({path:"/inStockOrder"})},submitForm:function(e){var t=this,a=this;this.$refs[e].validate(function(e){if(!e)return!1;a.saveLoading=!0;var i={id:a.id,name:a.editForm.name,dateTime:a.editForm.dateTime,totalNumber:a.editForm.totalNumber,totalPrice:a.editForm.totalPrice,remark:a.editForm.remark,type:a.editForm.type,purchaseOrderIds:2==a.editForm.type?"":a.editForm.purchaseOrderIds.toString(),storeReturnIds:3==a.editForm.type?a.editForm.storeReturnIds.toString():"",pickOrderIds:a.editForm.pickOrderIds};Object(r.Oc)(i).then(function(e){t.$message({type:"success",message:"操作成功!",duration:300,onClose:function(){sessionStorage.setItem("inId",e.data.id),a.id=e.data.id,a.param2.pid=e.data.id,a.requestClientInfo(),a.getAjaxList(2),a.saveLoading=!1,a.typeBool=!0}})})})},getAjaxProduct:function(){var e=this;Object(r.Md)(e.param).then(function(t){if(200==t.status){var a=t.data.items;a&&a.length>0?e.productList=a:e.productList=[]}})},getAjaxPList:function(){var e=this;Object(r.Nd)(e.param3).then(function(t){var a=t.data.items;a&&a.length>0?e.purchaseList=a:e.purchaseList=[]})},getAjaxOList:function(){var e=this;Object(r.ve)(e.param3).then(function(t){var a=t.data.items;a&&a.length>0?e.storeReturnList=a:e.storeReturnList=[]})},getAjaxPickOrderList:function(){var e=this;Object(r.Nb)(e.param3).then(function(t){var a=t.data.items;a&&a.length>0?e.pickOrderList=a:e.pickOrderList=[]})},directHandleClick:function(e,t){"1"==e.name?(this.directGetTreeAjaxPage(),this.directGetTreeAjaxList()):"2"==e.name?(this.directGetTreeAjaxPage2(),this.directGetTreeAjaxList2()):"3"==e.name?this.directGetTreeAjaxPage3():"4"==e.name&&this.directGetTreeAjaxPage4()},directHandleNodeClick:function(e){this.directSearchTreeForm.name="",this.directSearchTreeForm.serialNo="",this.directParamTree.serialNo="",this.directParamTree.name="",this.directParamTree.packCategoryId="","0"==e.id||(this.directParamTree.packCategoryId=e.id),this.directParamTree.pageNo=1,this.directGetTreeAjaxPage()},directOnSearchTree:function(){this.directParamTree.pageNo=1,this.directParamTree.serialNo=this.directSearchTreeForm.serialNo,this.directParamTree.name=this.directSearchTreeForm.name,this.directGetTreeAjaxPage()},directHandleCurrentChangeTree:function(e){this.directParamTree.pageNo=e,this.directGetTreeAjaxPage()},directGetTreeAjaxPage:function(){var e=this;Object(r.Cd)(e.directParamTree).then(function(t){if(200==t.status){var a=t.data.items;a&&a.length>0?(e.directTableTreeData=a,e.directTotalTreeNum=parseInt(t.data.totalNum)):(e.directTableTreeData=[],e.directTotalTreeNum=0)}})},directGetTreeAjaxList:function(){var e=this;Object(r.Bd)({}).then(function(t){if(200==t.status){var a=t.data;a&&a.length>0?e.directOrgTreeData=a:e.directOrgTreeData=[]}})},directHandleClickTreeAdd:function(e,t){this.tableIndex="",this.tableRow={},this.unitFrom="",this.directTableTreeData[e].number>0?(this.unitFromDialogFormVisible=!0,this.tableIndex=e,this.tableRow=t,this.tableType=2):this.$message({type:"error",message:"请选择数量！"})},directHandleNodeClick2:function(e){this.directSearchTreeForm2.name="",this.directSearchTreeForm2.serialNo="",this.directParamTree2.name="",this.directParamTree2.serialNo="",this.directParamTree2.categoryId="","0"==e.id||(this.directParamTree2.categoryId=e.id),this.directParamTree2.pageNo=1,this.directGetTreeAjaxPage2()},directOnSearchTree2:function(){this.directParamTree2.pageNo=1,this.directParamTree2.serialNo=this.directSearchTreeForm2.serialNo,this.directParamTree2.name=this.directSearchTreeForm2.name,this.directGetTreeAjaxPage2()},directHandleCurrentChangeTree2:function(e){this.directParamTree2.pageNo=e,this.directGetTreeAjaxPage2()},directGetTreeAjaxPage2:function(){var e=this;Object(r.Md)(e.directParamTree2).then(function(t){if(200==t.status){var a=t.data.items;a&&a.length>0?(e.directTableTreeData2=a,e.directTotalTreeNum2=parseInt(t.data.totalNum)):(e.directTableTreeData2=[],e.directTotalTreeNum2=0)}})},directGetTreeAjaxList2:function(){var e=this;Object(r.Ld)({}).then(function(t){if(200==t.status){var a=t.data;a&&a.length>0?e.directOrgTreeData2=a:e.directOrgTreeData2=[]}})},directHandleClickTreeAdd2:function(e,t){this.tableIndex="",this.tableRow={},this.unitFrom="",this.directTableTreeData2[e].number>0?(this.unitFromDialogFormVisible=!0,this.tableIndex=e,this.tableRow=t,this.tableType=3):this.$message({type:"error",message:"请选择数量！"})},directOnSearchTree3:function(){this.directParamTree3.pageNo=1,this.directParamTree3.serialNo=this.directSearchTreeForm3.serialNo,this.directParamTree3.name=this.directSearchTreeForm3.name,this.directParamTree3.type=this.directSearchTreeForm3.type,this.directGetTreeAjaxPage3()},directHandleCurrentChangeTree3:function(e){this.directParamTree3.pageNo=e,this.directGetTreeAjaxPage3()},directGetTreeAjaxPage3:function(){var e=this;Object(r.sd)(e.directParamTree3).then(function(t){if(200==t.status){var a=t.data.items;a&&a.length>0?(e.directTableTreeData3=a,e.directTotalTreeNum3=parseInt(t.data.totalNum)):(e.directTableTreeData3=[],e.directTotalTreeNum3=0)}})},directHandleClickTreeAdd3:function(e,t){this.tableIndex="",this.tableRow={},this.unitFrom="",this.directTableTreeData3[e].number>0?(this.unitFromDialogFormVisible=!0,this.tableIndex=e,this.tableRow=t,this.tableType=4):this.$message({type:"error",message:"请选择数量！"})},directOnSearchTree4:function(){this.directParamTree4.pageNo=1,this.directParamTree4.serialNo=this.directSearchTreeForm4.serialNo,this.directParamTree4.name=this.directSearchTreeForm4.name,this.directParamTree4.type=this.directSearchTreeForm4.type,this.directGetTreeAjaxPage4()},directHandleCurrentChangeTree4:function(e){this.directParamTree4.pageNo=e,this.directGetTreeAjaxPage4()},directGetTreeAjaxPage4:function(){var e=this;Object(r.sd)(e.directParamTree4).then(function(t){if(200==t.status){var a=t.data.items;a&&a.length>0?(e.directTableTreeData4=a,e.directTotalTreeNum4=parseInt(t.data.totalNum)):(e.directTableTreeData4=[],e.directTotalTreeNum4=0)}})},directHandleClickTreeAdd4:function(e,t){this.tableIndex="",this.tableRow={},this.unitFrom="",this.directTableTreeData4[e].number>0?(this.unitFromDialogFormVisible=!0,this.tableIndex=e,this.tableRow=t,this.tableType=5):this.$message({type:"error",message:"请选择数量！"})},getAjaxUnitConversionPage:function(){var e=this;Object(r.De)({pageSize:0}).then(function(t){if(200==t.status){var a=t.data.items;a&&a.length>0?e.unitFromList=a:e.unitFromList=[]}})}},filters:{substr:function(e){if(null!=e)return e.toFixed(4)}},beforeMount:function(){var e=sessionStorage.getItem("inId");e&&(this.id=e,this.param2.pid=e,this.typeBool=!0,this.requestClientInfo(),this.getAjaxList(2)),this.getAjaxPList(),this.getAjaxProduct(),this.getdatatime(),this.getAjaxOList(),this.getAjaxPickOrderList(),this.getAjaxUnitConversionPage()}},l=(a("BlE8"),a("KHd+")),n=Object(l.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/inStockOrder"}}},[e._v("入库单管理")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(""==e.id?"新增":"编辑"))])],1),e._v(" "),a("div",{staticClass:"contentBody"},[a("el-form",{ref:"editForm",staticClass:"demo-ruleForm",attrs:{model:e.editForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"入库单名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:15},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"入库类型",prop:"type"}},[a("el-select",{attrs:{placeholder:"请选择",disabled:e.typeBool},model:{value:e.editForm.type,callback:function(t){e.$set(e.editForm,"type",t)},expression:"editForm.type"}},[a("el-option",{attrs:{label:"采购入库",value:1}},[e._v("采购入库")]),e._v(" "),a("el-option",{attrs:{label:"门店退货",value:3}},[e._v("门店退货")]),e._v(" "),a("el-option",{attrs:{label:"领料入库",value:4}},[e._v("领料入库")])],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"入库日期",prop:"dateTime"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.editForm.dateTime,callback:function(t){e.$set(e.editForm,"dateTime",t)},expression:"editForm.dateTime"}})],1)],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{staticStyle:{width:"316px"},attrs:{label:"总量"}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:200,disabled:""},model:{value:e.editForm.totalNumber,callback:function(t){e.$set(e.editForm,"totalNumber",t)},expression:"editForm.totalNumber"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}})],1),e._v(" "),1==e.editForm.type?a("el-form-item",{attrs:{label:"采购单",prop:"purchaseOrderIds"}},[a("el-select",{staticClass:"self-select-width",attrs:{placeholder:"请选择",disabled:e.typeBool,multiple:""},model:{value:e.editForm.purchaseOrderIds,callback:function(t){e.$set(e.editForm,"purchaseOrderIds",t)},expression:"editForm.purchaseOrderIds"}},e._l(e.purchaseList,function(e){return a("el-option",{attrs:{label:e.name,value:e.id}})}),1)],1):e._e(),e._v(" "),3==e.editForm.type?a("el-form-item",{attrs:{label:"退货单",prop:"storeReturnIds"}},[a("el-select",{staticClass:"self-select-width",attrs:{placeholder:"请选择",disabled:e.typeBool,multiple:""},model:{value:e.editForm.storeReturnIds,callback:function(t){e.$set(e.editForm,"storeReturnIds",t)},expression:"editForm.storeReturnIds"}},e._l(e.storeReturnList,function(e){return a("el-option",{attrs:{label:e.name,value:e.id}})}),1)],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入",maxlength:200},model:{value:e.editForm.remark,callback:function(t){e.$set(e.editForm,"remark",t)},expression:"editForm.remark"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.saveLoading},on:{click:function(t){return e.submitForm("editForm")}}},[e._v("提交")]),e._v(" "),a("el-button",{on:{click:function(t){return e.goBack()}}},[e._v("返回")])],1)],1),e._v(" "),e.id?a("div",{staticClass:"contentBody"},[2==e.editForm.type||4==e.editForm.type?a("el-form",{staticClass:"demo-form-inline",attrs:{"label-width":"60px"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{"label-width":"0"}},[a("el-button",{attrs:{icon:"el-icon-plus",circle:""},on:{click:function(t){return e.handleClickDetail("","","add")}}})],1)],1)],1)],1):e._e(),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",label:"序号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"编号"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"number",label:"数量",width:"140"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"standard",label:"单位",width:"80"}}),e._v(" "),2==e.editForm.type||4==e.editForm.type?a("el-table-column",{attrs:{align:"center","header-align":"center",label:"操作",width:"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleClickDetail(t.$index,t.row,"delete")}}},[e._v("删除")])]}}],null,!1,2088583025)}):e._e()],1)],1):e._e()],1),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTreeTitle,visible:e.dialogTreeFormVisible,width:"80%",top:"5vh"},on:{"update:visible":function(t){e.dialogTreeFormVisible=t}}},[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"打包",name:"0"}},[a("el-container",[a("el-aside",[a("el-tree",{attrs:{"highlight-current":!0,"node-key":"id","default-expand-all":"",data:e.orgTreeData2,props:e.defaultProps,"expand-on-click-node":!1},on:{"node-click":e.handleNodeClick2}})],1),e._v(" "),a("el-main",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchTreeForm2,"label-width":"80px"}},[a("el-form-item",{staticStyle:{"font-family":"MicrosoftYaHeiLight","font-weight":"bold",color:"rgba(102,102,102,1)"},attrs:{label:"打包编号"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"打包编号",clearable:""},model:{value:e.searchTreeForm2.serialNo,callback:function(t){e.$set(e.searchTreeForm2,"serialNo",t)},expression:"searchTreeForm2.serialNo "}})],1),e._v(" "),a("el-form-item",{staticStyle:{"font-family":"MicrosoftYaHeiLight","font-weight":"bold",color:"rgba(102,102,102,1)"},attrs:{label:"打包名称"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"打包名称",clearable:""},model:{value:e.searchTreeForm2.name,callback:function(t){e.$set(e.searchTreeForm2,"name",t)},expression:"searchTreeForm2.name"}})],1),e._v(" "),a("el-form-item",{attrs:{"label-width":"0"}},[a("el-button",{attrs:{icon:"el-icon-search",circle:"","native-type":"submit"},nativeOn:{click:function(t){return t.preventDefault(),e.onSearchTree2(t)}}})],1)],1),e._v(" "),a("el-table",{attrs:{data:e.tableTreeData2,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",label:"行号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"打包编号",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"打包名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"costPrice",label:"出售单价",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                                    ￥"+e._s(e._f("substr")(t.row.costPrice))+"\n                                ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"stock",label:"库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"number",label:"数量",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input-number",{staticStyle:{width:"130px"},attrs:{min:0},model:{value:e.tableTreeData2[t.$index].number,callback:function(a){e.$set(e.tableTreeData2[t.$index],"number",a)},expression:"tableTreeData2[scope.$index].number"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",label:"操作",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.handleClickTreeAdd2(t.$index,t.row)}}},[e._v("添加")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{background:"","current-page":e.paramTree2.pageNo,"page-size":e.paramTree2.pageSize,layout:"total,prev, pager, next",total:e.totalTreeNum2},on:{"current-change":e.handleCurrentChangeTree2,"update:currentPage":function(t){return e.$set(e.paramTree2,"pageNo",t)},"update:current-page":function(t){return e.$set(e.paramTree2,"pageNo",t)}}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTreeFormVisible=!1}}},[e._v("关闭")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:e.directDialogTreeTitle,visible:e.directDialogTreeFormVisible,width:"80%",top:"5vh"},on:{"update:visible":function(t){e.directDialogTreeFormVisible=t}}},[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.directHandleClick},model:{value:e.directActiveName,callback:function(t){e.directActiveName=t},expression:"directActiveName"}},[a("el-tab-pane",{attrs:{label:"打包",name:"1"}},[a("el-container",[a("el-aside",[a("el-tree",{attrs:{"highlight-current":!0,"node-key":"id","default-expand-all":"",data:e.directOrgTreeData,props:e.defaultProps,"expand-on-click-node":!1},on:{"node-click":e.directHandleNodeClick}})],1),e._v(" "),a("el-main",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.directSearchTreeForm,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"编号"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"编号",clearable:""},model:{value:e.directSearchTreeForm.serialNo,callback:function(t){e.$set(e.directSearchTreeForm,"serialNo",t)},expression:"directSearchTreeForm.serialNo "}})],1),e._v(" "),a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"名称",clearable:""},model:{value:e.directSearchTreeForm.name,callback:function(t){e.$set(e.directSearchTreeForm,"name",t)},expression:"directSearchTreeForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{"label-width":"0"}},[a("el-button",{attrs:{icon:"el-icon-search",circle:"","native-type":"submit"},nativeOn:{click:function(t){return t.preventDefault(),e.directOnSearchTree(t)}}})],1)],1),e._v(" "),a("el-table",{attrs:{data:e.directTableTreeData,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",label:"行号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"编号",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"price",label:"出售单价",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                                    ￥"+e._s(t.row.price)+"\n                                ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"stock",label:"库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"number",label:"数量",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input-number",{staticStyle:{width:"130px"},attrs:{max:999999999,min:0},model:{value:e.directTableTreeData[t.$index].number,callback:function(a){e.$set(e.directTableTreeData[t.$index],"number",a)},expression:"directTableTreeData[scope.$index].number"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",label:"操作",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.directHandleClickTreeAdd(t.$index,t.row)}}},[e._v("添加")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{background:"","current-page":e.directParamTree.pageNo,"page-size":e.directParamTree.pageSize,layout:"total,prev, pager, next",total:e.directTotalTreeNum},on:{"current-change":e.directHandleCurrentChangeTree,"update:currentPage":function(t){return e.$set(e.directParamTree,"pageNo",t)},"update:current-page":function(t){return e.$set(e.directParamTree,"pageNo",t)}}})],1)],1)],1),e._v(" "),a("el-tab-pane",{attrs:{label:"原材料",name:"2"}},[a("el-container",[a("el-aside",[a("el-tree",{attrs:{"highlight-current":!0,"node-key":"id","default-expand-all":"",data:e.directOrgTreeData2,props:e.defaultProps,"expand-on-click-node":!1},on:{"node-click":e.directHandleNodeClick2}})],1),e._v(" "),a("el-main",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.directSearchTreeForm2,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"编号"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"原料编号",clearable:""},model:{value:e.directSearchTreeForm2.serialNo,callback:function(t){e.$set(e.directSearchTreeForm2,"serialNo",t)},expression:"directSearchTreeForm2.serialNo "}})],1),e._v(" "),a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"原料名称",clearable:""},model:{value:e.directSearchTreeForm2.name,callback:function(t){e.$set(e.directSearchTreeForm2,"name",t)},expression:"directSearchTreeForm2.name"}})],1),e._v(" "),a("el-form-item",{attrs:{"label-width":"0"}},[a("el-button",{attrs:{icon:"el-icon-search",circle:"","native-type":"submit"},nativeOn:{click:function(t){return t.preventDefault(),e.directOnSearchTree2(t)}}})],1)],1),e._v(" "),a("el-table",{attrs:{data:e.directTableTreeData2,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",label:"行号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"原料编号",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"原料名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"price",label:"出售单价",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                                    ￥"+e._s(t.row.price)+"\n                                ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"stock",label:"库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"safeStock",label:"安全库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"number",label:"数量",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input-number",{staticStyle:{width:"130px"},attrs:{max:999999999,min:0},model:{value:e.directTableTreeData2[t.$index].number,callback:function(a){e.$set(e.directTableTreeData2[t.$index],"number",a)},expression:"directTableTreeData2[scope.$index].number"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"standard",label:"单位",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",label:"操作",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.directHandleClickTreeAdd2(t.$index,t.row)}}},[e._v("添加")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{background:"","current-page":e.directParamTree2.pageNo,"page-size":e.directParamTree2.pageSize,layout:"total,prev, pager, next",total:e.directTotalTreeNum2},on:{"current-change":e.directHandleCurrentChangeTree2,"update:currentPage":function(t){return e.$set(e.directParamTree2,"pageNo",t)},"update:current-page":function(t){return e.$set(e.directParamTree2,"pageNo",t)}}})],1)],1)],1),e._v(" "),a("el-tab-pane",{attrs:{label:"固定资产",name:"3"}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.directSearchTreeForm3,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"编号"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"原料编号",clearable:""},model:{value:e.directSearchTreeForm3.serialNo,callback:function(t){e.$set(e.directSearchTreeForm3,"serialNo",t)},expression:"directSearchTreeForm3.serialNo "}})],1),e._v(" "),a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"名称",clearable:""},model:{value:e.directSearchTreeForm3.name,callback:function(t){e.$set(e.directSearchTreeForm3,"name",t)},expression:"directSearchTreeForm3.name"}})],1),e._v(" "),a("el-form-item",{attrs:{"label-width":"0"}},[a("el-button",{attrs:{icon:"el-icon-search",circle:"","native-type":"submit"},nativeOn:{click:function(t){return t.preventDefault(),e.directOnSearchTree3(t)}}})],1)],1),e._v(" "),a("el-table",{attrs:{data:e.directTableTreeData3,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",label:"行号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"编号",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"stock",label:"库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"safeStock",label:"安全库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"number",label:"数量",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input-number",{staticStyle:{width:"130px"},attrs:{max:999999999,min:0},model:{value:e.directTableTreeData3[t.$index].number,callback:function(a){e.$set(e.directTableTreeData3[t.$index],"number",a)},expression:"directTableTreeData3[scope.$index].number"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"standard",label:"单位",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",label:"操作",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.directHandleClickTreeAdd3(t.$index,t.row)}}},[e._v("添加")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{background:"","current-page":e.directParamTree3.pageNo,"page-size":e.directParamTree3.pageSize,layout:"total,prev, pager, next",total:e.directTotalTreeNum3},on:{"current-change":e.directHandleCurrentChangeTree3,"update:currentPage":function(t){return e.$set(e.directParamTree3,"pageNo",t)},"update:current-page":function(t){return e.$set(e.directParamTree3,"pageNo",t)}}})],1),e._v(" "),a("el-tab-pane",{attrs:{label:"易耗品",name:"4"}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.directSearchTreeForm4,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"编号"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"编号",clearable:""},model:{value:e.directSearchTreeForm4.serialNo,callback:function(t){e.$set(e.directSearchTreeForm4,"serialNo",t)},expression:"directSearchTreeForm4.serialNo "}})],1),e._v(" "),a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"名称",clearable:""},model:{value:e.directSearchTreeForm4.name,callback:function(t){e.$set(e.directSearchTreeForm4,"name",t)},expression:"directSearchTreeForm4.name"}})],1),e._v(" "),a("el-form-item",{attrs:{"label-width":"0"}},[a("el-button",{attrs:{icon:"el-icon-search",circle:"","native-type":"submit"},nativeOn:{click:function(t){return t.preventDefault(),e.directOnSearchTree4(t)}}})],1)],1),e._v(" "),a("el-table",{attrs:{data:e.directTableTreeData4,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",label:"行号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"编号",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"price",label:"出售单价",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                            ￥"+e._s(t.row.price)+"\n                        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"stock",label:"库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"safeStock",label:"安全库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"number",label:"数量",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input-number",{staticStyle:{width:"130px"},attrs:{max:999999999,min:0},model:{value:e.directTableTreeData4[t.$index].number,callback:function(a){e.$set(e.directTableTreeData4[t.$index],"number",a)},expression:"directTableTreeData4[scope.$index].number"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"standard",label:"单位",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",label:"操作",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.directHandleClickTreeAdd4(t.$index,t.row)}}},[e._v("添加")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{background:"","current-page":e.directParamTree4.pageNo,"page-size":e.directParamTree4.pageSize,layout:"total,prev, pager, next",total:e.directTotalTreeNum4},on:{"current-change":e.directHandleCurrentChangeTree4,"update:currentPage":function(t){return e.$set(e.directParamTree4,"pageNo",t)},"update:current-page":function(t){return e.$set(e.directParamTree4,"pageNo",t)}}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.directDialogTreeFormVisible=!1}}},[e._v("关闭")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"添加",visible:e.unitFromDialogFormVisible,width:"30%"},on:{"update:visible":function(t){e.unitFromDialogFormVisible=t}}},[a("el-form",[a("el-form-item",{attrs:{label:"原单位","label-width":"100px"}},[a("el-select",{attrs:{placeholder:"请选择",clearable:""},model:{value:e.unitFrom,callback:function(t){e.unitFrom=t},expression:"unitFrom"}},e._l(e.unitFromList,function(e){return a("el-option",{attrs:{label:e.unitFrom,value:e.id}})}),1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.unitFromDialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.unitFromAdd}},[e._v("确 定")])],1)],1)],1)},[],!1,null,"fa6db030",null);n.options.__file="editInStockOrder.vue";t.default=n.exports},BlE8:function(e,t,a){"use strict";var r=a("/GNZ");a.n(r).a}}]);