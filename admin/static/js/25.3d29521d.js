(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"4SWi":function(e,t,a){},lN5i:function(e,t,a){"use strict";a.r(t);var r=a("TsPW"),i={name:"edit-user-manage",data:function(){return{tableData:null,formLabelWidth:"120px",dialogFormVisible:!1,dialogTitle:"新增采购明细",commodityName:"名称",dialogForm:{standard:"",number:0,price:0,id:"",name:"",serialNo:"",model:"",category:"",productInfoId:"",supplierId:"",remark:"",type:2,unitFrom:""},id:"",saveLoading:!1,editForm:{name:"",orderNo:"",dateTime:"",totalNumber:0,totalPrice:0,remark:"",supplierId:""},headers:{sessionId:sessionStorage.getItem("sessionId")},supplierList:[],standardDataDicList:[],param:{pageNo:1,pageSize:0,status:1},param2:{pid:""},standardParam:{type:"单位"},rules:{name:[{required:!0,message:"请输入采购单名称",trigger:"blur"}],standard:[{required:!0,message:"请输入单位",trigger:"blur"}],number:[{required:!0,message:"请输入数量",trigger:"blur"},{validator:function(e,t,a){0===t?a(new Error("数量必须大于0")):a()},trigger:"change"}],price:[{required:!0,message:"请输入单价",trigger:"blur"},{validator:function(e,t,a){0===t?a(new Error("单价必须大于0")):a()},trigger:"change"}],dateTime:[{required:!0,message:"请选择采购日期",trigger:"change"}],productInfoId:[{required:!0,message:"请选择原料名称",trigger:"change"}],supplierId:[{required:!0,message:"请选择供应商",trigger:"change"}]},content:"",dialogTreeFormVisible:!1,dialogTreeTitle:"新增采购单商品",activeName:"2",searchTreeForm:{name:"",serialNo:""},tableTreeData:null,paramTree:{name:"",pageNo:1,pageSize:10,deptId:"",checkChild:"all",serialNo:"",packCategoryId:""},totalTreeNum:0,orgTreeData:[],defaultProps:{children:"children",label:"name"},searchTreeForm2:{name:"",serialNo:""},tableTreeData2:null,paramTree2:{name:"",pageNo:1,pageSize:10,deptId:"",checkChild:"all",serialNo:"",categoryId:"",isDelete:1},totalTreeNum2:0,orgTreeData2:[],searchTreeForm3:{name:"",serialNo:""},tableTreeData3:[],paramTree3:{name:"",pageNo:1,pageSize:10,serialNo:"",type:"1",isDelete:1},totalTreeNum3:0,searchTreeForm4:{name:"",serialNo:""},tableTreeData4:null,paramTree4:{name:"",pageNo:1,pageSize:10,serialNo:"",type:"2",isDelete:1},totalTreeNum4:0,unitFromList:[]}},methods:{changeType:function(){this.dialogForm.productInfoId=""},changeSupplier:function(e){var t;t=this.supplierList.find(function(t){return t.id===e}),this.content=t.content},handleClick:function(e,t){"2"==e.name?(this.getTreeAjaxPage2(),this.getTreeAjaxList2(),this.commodityName="原材料"):"3"==e.name?(this.getTreeAjaxPage3(),this.commodityName="固定资产"):"4"==e.name&&(this.getTreeAjaxPage4(),this.commodityName="易耗品")},handleNodeClick2:function(e){this.searchTreeForm2.name="",this.searchTreeForm2.serialNo="",this.paramTree2.name="",this.paramTree2.serialNo="",this.paramTree2.categoryId="","0"==e.id||(this.paramTree2.categoryId=e.id),this.paramTree2.pageNo=1,this.getTreeAjaxPage2()},onSearchTree2:function(){this.paramTree2.pageNo=1,this.paramTree2.serialNo=this.searchTreeForm2.serialNo,this.paramTree2.name=this.searchTreeForm2.name,this.getTreeAjaxPage2()},handleCurrentChangeTree2:function(e){this.paramTree2.pageNo=e,this.getTreeAjaxPage2()},getTreeAjaxPage2:function(){var e=this;Object(r.Sd)(e.paramTree2).then(function(t){if(200==t.status){var a=t.data.items;a&&a.length>0?(e.tableTreeData2=a,e.totalTreeNum2=parseInt(t.data.totalNum)):(e.tableTreeData2=[],e.totalTreeNum2=0)}})},getTreeAjaxList2:function(){var e=this;Object(r.Rd)({}).then(function(t){if(200==t.status){var a=t.data;a&&a.length>0?e.orgTreeData2=a:e.orgTreeData2=[]}})},handleClickTreeAdd2:function(e,t){this.dialogForm.standard=t.standard,this.dialogForm.number=this.tableTreeData2[e].number,this.dialogForm.name=t.name,this.dialogForm.productInfoId=t.id,this.dialogForm.type=this.activeName,this.dialogForm.serialNo=t.serialNo,this.dialogTreeFormVisible=!1},onSearchTree3:function(){this.paramTree3.pageNo=1,this.paramTree3.serialNo=this.searchTreeForm3.serialNo,this.paramTree3.name=this.searchTreeForm3.name,this.paramTree3.type=this.searchTreeForm3.type,this.getTreeAjaxPage3()},handleCurrentChangeTree3:function(e){this.paramTree3.pageNo=e,this.getTreeAjaxPage3()},getTreeAjaxPage3:function(){var e=this;Object(r.yd)(e.paramTree3).then(function(t){if(200==t.status){var a=t.data.items;a&&a.length>0?(e.tableTreeData3=a,e.totalTreeNum3=parseInt(t.data.totalNum)):(e.tableTreeData3=[],e.totalTreeNum3=0)}})},handleClickTreeAdd3:function(e,t){this.dialogForm.number=this.tableTreeData3[e].number,this.dialogForm.name=t.name,this.dialogForm.productInfoId=t.id,this.dialogForm.type=this.activeName,this.dialogForm.serialNo=t.serialNo,this.dialogForm.category=t.category,this.dialogForm.model=t.model,this.dialogForm.price=t.price,this.dialogTreeFormVisible=!1},onSearchTree4:function(){this.paramTree4.pageNo=1,this.paramTree4.serialNo=this.searchTreeForm4.serialNo,this.paramTree4.name=this.searchTreeForm4.name,this.paramTree4.type=this.searchTreeForm4.type,this.getTreeAjaxPage4()},handleCurrentChangeTree4:function(e){this.paramTree4.pageNo=e,this.getTreeAjaxPage4()},getTreeAjaxPage4:function(){var e=this;Object(r.yd)(e.paramTree4).then(function(t){if(200==t.status){var a=t.data.items;a&&a.length>0?(e.tableTreeData4=a,e.totalTreeNum4=parseInt(t.data.totalNum)):(e.tableTreeData4=[],e.totalTreeNum4=0)}})},handleClickTreeAdd4:function(e,t){this.dialogForm.number=this.tableTreeData4[e].number,this.dialogForm.name=t.name,this.dialogForm.productInfoId=t.id,this.dialogForm.type=this.activeName,this.dialogForm.serialNo=t.serialNo,this.dialogForm.category=t.category,this.dialogForm.model=t.model,this.dialogForm.price=t.price,this.dialogTreeFormVisible=!1},getdatatime:function(){var e=new Date,t=e.getFullYear(),a=e.getMonth()+1,r=a>9?a:"0"+a,i=e.getDate(),l=i>9?i:"0"+i;this.editForm.dateTime=t+"-"+r+"-"+l},handleClickDetail:function(e,t,a){var i=this;if("delete"==a)i.$confirm("真的删除该行数据么, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={id:t.id};Object(r.R)(e).then(function(e){200==e.status?i.$message({type:"success",message:"删除成功!",duration:300,onClose:function(){i.getAjaxList(1)}}):i.$message({type:"error",message:e.msg})})}).catch(function(){i.$message({type:"info",message:"已取消删除"})});else if("add"==a){this.dialogForm.number="",this.dialogForm.name="",this.dialogForm.productInfoId="",this.dialogForm.type="",this.dialogForm.serialNo="",this.dialogForm.category="",this.dialogForm.model="",this.dialogForm.price="",this.dialogForm.remark="",this.dialogForm.unitFrom="",this.addOrg("add",t)}else"edit"==a&&i.addOrg("edit",t)},addOrg:function(e,t){this.dialogFormVisible=!0,"add"==e?(this.dialogForm.standard="",this.dialogForm.number="",this.dialogForm.id="",this.dialogForm.price=0,this.dialogForm.productInfoId="",this.dialogForm.supplierId="",this.dialogForm.supplierId="",this.dialogForm.unitFrom=""):(this.dialogForm.standard=t.standard,this.dialogForm.id=t.id,this.dialogForm.number=t.number,this.dialogForm.price=t.price,this.dialogForm.productInfoId=t.productInfoId,this.dialogForm.unitFrom="")},dialogFormAdd:function(e){var t,a=this,i=this,l={};t=this.supplierList.find(function(e){return e.id===i.dialogForm.supplierId});var o=0,n=0;if(this.dialogForm.unitFrom){var s;s=this.unitFromList.find(function(e){return e.id===a.dialogForm.unitFrom}),o=s.ratio*this.dialogForm.number,n=this.dialogForm.price/s.ratio}else o=this.dialogForm.number,n=this.dialogForm.price;this.$refs[e].validate(function(e){if(!e)return!1;i.saveLoading=!0,l={id:a.dialogForm.id,standard:a.dialogForm.standard,number:o,price:n,name:a.dialogForm.name,serialNo:a.dialogForm.serialNo,model:a.dialogForm.model,category:a.dialogForm.category,supplierId:a.dialogForm.supplierId,productInfoId:a.dialogForm.productInfoId,remark:a.dialogForm.remark,type:i.dialogForm.type,supplierName:t.name,purchaseOrderId:i.id},Object(r.kd)(l).then(function(e){200==e.status?i.$message({type:"success",message:"操作成功!",duration:300,onClose:function(){i.saveLoading=!1,i.dialogFormVisible=!1,i.getAjaxList(1)}}):(i.saveLoading=!1,i.$message({type:"error",message:e.msg}))})})},getAjaxList:function(e){var t=this;Object(r.Gb)(t.param2).then(function(a){t.tableData=[];var r=a.data;if(r&&r.length>0){t.tableData=r;for(var i=0,l=0,o=0;o<t.tableData.length;o++)i+=t.tableData[o].price*t.tableData[o].number,l+=t.tableData[o].number;t.editForm.totalPrice=i,t.editForm.totalNumber=l,1==e&&t.submitForm("editForm")}else t.tableData=[]})},requestClientInfo:function(){var e=this,t=this;Object(r.jc)({id:this.id}).then(function(a){if(200==a.status){var r=a.data;r&&(t.editForm.name=r.name,t.editForm.orderNo=r.orderNo,t.editForm.dateTime=r.dateTime,t.editForm.totalNumber=r.totalNumber,t.editForm.totalPrice=r.totalPrice,t.editForm.remark=r.remark,t.editForm.supplier=r.supplierName,t.editForm.supplierId=r.supplierId)}else e.$message({message:"请求异常",type:"error"})})},getAjaxSupplier:function(){var e=this;Object(r.Wd)(e.param).then(function(t){var a=t.data.items;a&&a.length>0?e.supplierList=a:e.supplierList=[]})},getAjaxStandardDataDic:function(){var e=this;Object(r.He)(e.standardParam).then(function(t){if(200==t.status){var a=t.data;a&&a.length>0?e.standardDataDicList=a:e.standardDataDicList=[]}})},handleRowClick:function(){this.dialogTreeFormVisible=!0,this.getTreeAjaxPage2(),this.getTreeAjaxList2()},goBack:function(){this.$router.push({path:"/purchaseOrder"})},submitForm:function(e){var t=this,a=this;this.$refs[e].validate(function(e){if(!e)return!1;a.saveLoading=!0;var i={name:a.editForm.name,dateTime:a.editForm.dateTime,totalNumber:a.editForm.totalNumber,totalPrice:a.editForm.totalPrice,remark:a.editForm.remark,supplierId:a.editForm.supplierId,id:a.id};Object(r.jd)(i).then(function(e){t.$message({type:"success",message:"操作成功!",duration:300,onClose:function(){sessionStorage.setItem("oId",e.data.id),a.id=e.data.id,a.param2.pid=e.data.id,a.requestClientInfo(),a.getAjaxList(2),a.saveLoading=!1}})})})},getAjaxUnitConversionPage:function(){var e=this;Object(r.Le)({pageSize:0}).then(function(t){if(200==t.status){var a=t.data.items;a&&a.length>0?e.unitFromList=a:e.unitFromList=[]}})}},beforeMount:function(){var e=sessionStorage.getItem("oId");e&&(this.id=e,this.param2.pid=e,this.requestClientInfo(),this.getAjaxList(2)),this.getAjaxSupplier(),this.getAjaxStandardDataDic(),this.getdatatime(),this.getAjaxUnitConversionPage()}},l=(a("tf95"),a("KHd+")),o=Object(l.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/purchaseOrder"}}},[e._v("采购单管理")]),e._v(" "),a("el-breadcrumb-item",[e._v(e._s(""==e.id?"新增":"编辑"))])],1),e._v(" "),a("div",{staticClass:"contentBody"},[a("el-form",{ref:"editForm",staticClass:"demo-ruleForm",attrs:{model:e.editForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"采购单名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入"},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{staticStyle:{width:"316px"},attrs:{label:"总量"}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:200,disabled:""},model:{value:e.editForm.totalNumber,callback:function(t){e.$set(e.editForm,"totalNumber",t)},expression:"editForm.totalNumber"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{staticStyle:{width:"316px"},attrs:{label:"总价"}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:200,disabled:""},model:{value:e.editForm.totalPrice,callback:function(t){e.$set(e.editForm,"totalPrice",t)},expression:"editForm.totalPrice"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:8}}),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"采购日期",prop:"dateTime"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.editForm.dateTime,callback:function(t){e.$set(e.editForm,"dateTime",t)},expression:"editForm.dateTime"}})],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入",maxlength:200},model:{value:e.editForm.remark,callback:function(t){e.$set(e.editForm,"remark",t)},expression:"editForm.remark"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",loading:e.saveLoading},on:{click:function(t){return e.submitForm("editForm")}}},[e._v("提交")]),e._v(" "),a("el-button",{on:{click:function(t){return e.goBack()}}},[e._v("返回")])],1)],1),e._v(" "),e.id?a("div",{staticClass:"contentBody"},[a("el-form",{staticClass:"demo-form-inline",attrs:{"label-width":"60px"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{"label-width":"0"}},[a("el-button",{attrs:{icon:"el-icon-plus",circle:""},on:{click:function(t){return e.handleClickDetail("","","add")}}})],1)],1)],1)],1),e._v(" "),a("el-table",{attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",label:"序号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"type",label:"类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==t.row.type?[e._v("原材料")]:e._e(),e._v(" "),3==t.row.type?[e._v("固定资产")]:e._e(),e._v(" "),4==t.row.type?[e._v("易耗品")]:e._e()]}}],null,!1,623548852)}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"编号"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"standard",label:"单位"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"number",label:"数量",width:"140"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"price",label:"单价",width:"140"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"supplierName",label:"供应商",width:"140"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",label:"操作",width:"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleClickDetail(t.$index,t.row,"delete")}}},[e._v("删除")])]}}],null,!1,2088583025)})],1),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogFormVisible,width:"40%"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"dialogForm",attrs:{model:e.dialogForm,rules:e.rules}},[a("el-form-item",{attrs:{label:e.commodityName,"label-width":e.formLabelWidth,prop:"productInfoId"}},[a("el-input",{staticStyle:{width:"216px"},attrs:{autocomplete:"off",disabled:""},model:{value:e.dialogForm.name,callback:function(t){e.$set(e.dialogForm,"name",t)},expression:"dialogForm.name"}}),e._v(" "),a("el-button",{attrs:{icon:"el-icon-plus",circle:""},on:{click:e.handleRowClick}})],1),e._v(" "),a("el-form-item",{attrs:{label:"供应商","label-width":e.formLabelWidth,prop:"supplierId"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:e.changeSupplier},model:{value:e.dialogForm.supplierId,callback:function(t){e.$set(e.dialogForm,"supplierId",t)},expression:"dialogForm.supplierId"}},e._l(e.supplierList,function(e){return a("el-option",{attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),2==e.dialogForm.type?a("el-form-item",{staticStyle:{width:"336px"},attrs:{label:"单位","label-width":e.formLabelWidth,prop:"standard"}},[a("el-input",{attrs:{autocomplete:"off",disabled:""},model:{value:e.dialogForm.standard,callback:function(t){e.$set(e.dialogForm,"standard",t)},expression:"dialogForm.standard"}})],1):e._e(),e._v(" "),3==e.dialogForm.type||4==e.dialogForm.type?a("el-form-item",{attrs:{label:"单位","label-width":e.formLabelWidth,prop:"standard"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.dialogForm.standard,callback:function(t){e.$set(e.dialogForm,"standard",t)},expression:"dialogForm.standard"}},e._l(e.standardDataDicList,function(e){return a("el-option",{attrs:{label:e.name,value:e.name}})}),1)],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"数量","label-width":e.formLabelWidth,prop:"number"}},[a("el-input-number",{attrs:{size:"medium",min:0,max:999999999,step:1},model:{value:e.dialogForm.number,callback:function(t){e.$set(e.dialogForm,"number",t)},expression:"dialogForm.number"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"单价","label-width":e.formLabelWidth,prop:"price"}},[a("el-input-number",{attrs:{size:"medium",min:0,max:999999999,step:1},model:{value:e.dialogForm.price,callback:function(t){e.$set(e.dialogForm,"price",t)},expression:"dialogForm.price"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"原单位","label-width":e.formLabelWidth,prop:"unitFrom"}},[a("el-select",{attrs:{placeholder:"请选择",clearable:""},model:{value:e.dialogForm.unitFrom,callback:function(t){e.$set(e.dialogForm,"unitFrom",t)},expression:"dialogForm.unitFrom"}},e._l(e.unitFromList,function(e){return a("el-option",{attrs:{label:e.unitFrom,value:e.id}})}),1)],1),e._v(" "),e.dialogForm.supplierId?a("el-form-item",{attrs:{label:"供应内容","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",disabled:""},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"备注","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入",maxlength:200},model:{value:e.dialogForm.remark,callback:function(t){e.$set(e.dialogForm,"remark",t)},expression:"dialogForm.remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.saveLoading},on:{click:function(t){return e.dialogFormAdd("dialogForm")}}},[e._v("确 定")])],1)],1)],1):e._e()],1),e._v(" "),a("el-dialog",{attrs:{title:e.dialogTreeTitle,visible:e.dialogTreeFormVisible,width:"80%",top:"5vh"},on:{"update:visible":function(t){e.dialogTreeFormVisible=t}}},[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"原材料",name:"2"}},[a("el-container",[a("el-aside",[a("el-tree",{attrs:{"highlight-current":!0,"node-key":"id","default-expand-all":"",data:e.orgTreeData2,props:e.defaultProps,"expand-on-click-node":!1},on:{"node-click":e.handleNodeClick2}})],1),e._v(" "),a("el-main",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchTreeForm2,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"编号"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"原料编号",clearable:""},model:{value:e.searchTreeForm2.serialNo,callback:function(t){e.$set(e.searchTreeForm2,"serialNo",t)},expression:"searchTreeForm2.serialNo "}})],1),e._v(" "),a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"原料名称",clearable:""},model:{value:e.searchTreeForm2.name,callback:function(t){e.$set(e.searchTreeForm2,"name",t)},expression:"searchTreeForm2.name"}})],1),e._v(" "),a("el-form-item",{attrs:{"label-width":"0"}},[a("el-button",{attrs:{icon:"el-icon-search",circle:"","native-type":"submit"},nativeOn:{click:function(t){return t.preventDefault(),e.onSearchTree2(t)}}})],1)],1),e._v(" "),a("el-table",{attrs:{data:e.tableTreeData2,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",label:"行号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"原料编号",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"原料名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"stock",label:"库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"safeStock",label:"安全库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"standard",label:"单位",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",label:"操作",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.handleClickTreeAdd2(t.$index,t.row)}}},[e._v("添加")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{background:"","current-page":e.paramTree2.pageNo,"page-size":e.paramTree2.pageSize,layout:"total,prev, pager, next",total:e.totalTreeNum2},on:{"current-change":e.handleCurrentChangeTree2,"update:currentPage":function(t){return e.$set(e.paramTree2,"pageNo",t)},"update:current-page":function(t){return e.$set(e.paramTree2,"pageNo",t)}}})],1)],1)],1),e._v(" "),a("el-tab-pane",{attrs:{label:"固定资产",name:"3"}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchTreeForm3,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"编号"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"原料编号",clearable:""},model:{value:e.searchTreeForm3.serialNo,callback:function(t){e.$set(e.searchTreeForm3,"serialNo",t)},expression:"searchTreeForm3.serialNo "}})],1),e._v(" "),a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"名称",clearable:""},model:{value:e.searchTreeForm3.name,callback:function(t){e.$set(e.searchTreeForm3,"name",t)},expression:"searchTreeForm3.name"}})],1),e._v(" "),a("el-form-item",{attrs:{"label-width":"0"}},[a("el-button",{attrs:{icon:"el-icon-search",circle:"","native-type":"submit"},nativeOn:{click:function(t){return t.preventDefault(),e.onSearchTree3(t)}}})],1)],1),e._v(" "),a("el-table",{attrs:{data:e.tableTreeData3,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",label:"行号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"编号",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"stock",label:"库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"safeStock",label:"安全库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"standard",label:"单位",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",label:"操作",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.handleClickTreeAdd3(t.$index,t.row)}}},[e._v("添加")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{background:"","current-page":e.paramTree3.pageNo,"page-size":e.paramTree3.pageSize,layout:"total,prev, pager, next",total:e.totalTreeNum3},on:{"current-change":e.handleCurrentChangeTree3,"update:currentPage":function(t){return e.$set(e.paramTree3,"pageNo",t)},"update:current-page":function(t){return e.$set(e.paramTree3,"pageNo",t)}}})],1),e._v(" "),a("el-tab-pane",{attrs:{label:"易耗品",name:"4"}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchTreeForm4,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"编号"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"编号",clearable:""},model:{value:e.searchTreeForm4.serialNo,callback:function(t){e.$set(e.searchTreeForm4,"serialNo",t)},expression:"searchTreeForm4.serialNo "}})],1),e._v(" "),a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"名称",clearable:""},model:{value:e.searchTreeForm4.name,callback:function(t){e.$set(e.searchTreeForm4,"name",t)},expression:"searchTreeForm4.name"}})],1),e._v(" "),a("el-form-item",{attrs:{"label-width":"0"}},[a("el-button",{attrs:{icon:"el-icon-search",circle:"","native-type":"submit"},nativeOn:{click:function(t){return t.preventDefault(),e.onSearchTree4(t)}}})],1)],1),e._v(" "),a("el-table",{attrs:{data:e.tableTreeData4,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",label:"行号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"编号",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"price",label:"出售单价",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                                ￥"+e._s(t.row.price)+"\n                            ")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"stock",label:"库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"safeStock",label:"安全库存量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"standard",label:"单位",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",label:"操作",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return e.handleClickTreeAdd4(t.$index,t.row)}}},[e._v("添加")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{background:"","current-page":e.paramTree4.pageNo,"page-size":e.paramTree4.pageSize,layout:"total,prev, pager, next",total:e.totalTreeNum4},on:{"current-change":e.handleCurrentChangeTree4,"update:currentPage":function(t){return e.$set(e.paramTree4,"pageNo",t)},"update:current-page":function(t){return e.$set(e.paramTree4,"pageNo",t)}}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTreeFormVisible=!1}}},[e._v("关闭")])],1)],1)],1)},[],!1,null,"6962fabc",null);o.options.__file="editPurchase.vue";t.default=o.exports},tf95:function(e,t,a){"use strict";var r=a("4SWi");a.n(r).a}}]);