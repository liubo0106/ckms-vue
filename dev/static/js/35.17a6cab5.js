(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{CYsy:function(t,e,a){"use strict";var i=a("yzdP");a.n(i).a},przw:function(t,e,a){"use strict";a.r(e);var i=a("TsPW"),r={name:"edit-out-stock-order",data:function(){return{tableData:null,typeBool:!1,logisticsInfo:!1,formLabelWidth:"80px",dialogFormVisible:!1,dialogTitle:"新增出库单明细",dialogForm:{standard:"",number:"",price:"",id:"",name:"",serialNo:"",productInfoId:"",type:1,category:"",model:""},id:"",saveLoading:!1,editForm:{name:"",dateTime:"",totalNumber:"",totalPrice:"",remark:"",salesOrderIds:[],logisticsNo:"",logisticsId:"",customerId:"",supplierId:"",company:"",type:1},rules:{name:[{required:!0,message:"请输入出库单名称",trigger:"blur"}],salesOrderIds:[{required:!0,message:"请选择店铺订单",trigger:"blur"}],dateTime:[{required:!0,message:"请选择出库日期",trigger:"blur"}]},headers:{sessionId:sessionStorage.getItem("sessionId")},purchaseList:[],LogisticsList:[],customerList:[],groupList:[],supplierList:[],param:{pageSize:-1},param2:{pid:""},param3:{pageSize:-1},param4:{content:"",pageSize:-1},param5:{pageSize:-1,status:1,type:1},param6:{content:"",pageSize:-1,status:1,type:2},standardParam:{type:"单位"},productList:[],content:"",standardDataDicList:[],consumetList:[],fixedList:[]}},methods:{changeFixed:function(t){var e;e=this.fixedList.find(function(e){return e.id===t}),this.dialogForm.name=e.name,this.dialogForm.serialNo=e.serialNo,this.dialogForm.model=e.model,this.dialogForm.category=e.category},changeConsume:function(t){var e;e=this.consumetList.find(function(e){return e.id===t}),this.dialogForm.name=e.name,this.dialogForm.serialNo=e.serialNo,this.dialogForm.model=e.model,this.dialogForm.category=e.category},getAjaxStandardDataDic:function(){var t=this;Object(i.ze)(t.standardParam).then(function(e){if(200==e.status){var a=e.data;a&&a.length>0?t.standardDataDicList=a:t.standardDataDicList=[]}})},changeProduct:function(t){var e;e=this.productList.find(function(e){return e.id===t}),this.dialogForm.standard=e.standard,this.dialogForm.name=e.name,this.dialogForm.serialNo=e.serialNo},changeGroup:function(t){var e;e=this.groupList.find(function(e){return e.id===t}),this.dialogForm.standard=e.standard,this.dialogForm.name=e.name,this.dialogForm.serialNo=e.serialNo},changeSupplier:function(t){var e=this,a=setInterval(function(){if(e.supplierList&&e.supplierList.length>0){var i;(i=e.supplierList.find(function(e){return e.id===t})).content&&(e.content=i.content),clearInterval(a)}},100)},changeLogistics:function(t){var e;e=this.LogisticsList.find(function(e){return e.id===t}),this.editForm.phone=e.phone,this.editForm.company=e.company,this.editForm.contact=e.contact},getAjaxList:function(t){var e=this;Object(i.Ab)(e.param2).then(function(a){e.tableData=[];var i=a.data;if(i&&i.length>0){e.tableData=i;for(var r=0,s=0,o=0;o<e.tableData.length;o++)r+=e.tableData[o].price*e.tableData[o].number,s+=e.tableData[o].number;e.editForm.totalPrice=r,e.editForm.totalNumber=s,1==t&&e.requestClientInfo()}else e.tableData=[]})},requestClientInfo:function(){var t=this,e=this;Object(i.Wb)({id:this.id}).then(function(a){if(t.logisticsInfo=!0,200==a.status){var i=a.data;i&&(e.editForm.name=i.name,e.editForm.dateTime=i.dateTime,e.editForm.totalNumber=i.totalNumber,e.editForm.totalPrice=i.totalPrice,e.editForm.remark=i.remark,e.editForm.salesOrderIds=i.salesOrderIds,e.editForm.logisticsId=i.logisticsId,i.logistics&&(e.editForm.plateNumber=i.logistics.plateNumber,e.editForm.contact=i.logistics.contact,e.editForm.phone=i.logistics.phone,e.editForm.company=i.logistics.company),e.editForm.logisticsNo=i.logisticsNo,e.editForm.supplierId=i.supplierId,i.supplierId&&e.changeSupplier(i.supplierId),e.editForm.type=i.type,e.editForm.customerId=i.customerId)}else t.$message({message:"请求异常",type:"error"})})},goBack:function(){this.$router.push({path:"/outStockOrder"})},submitForm:function(t){var e=this,a=this;this.$refs[t].validate(function(t){if(!t)return!1;a.saveLoading=!0;e.supplierList.find(function(t){return t.id===a.editForm.supplierId});var r={id:a.id,name:a.editForm.name,dateTime:a.editForm.dateTime,totalNumber:a.editForm.totalNumber,totalPrice:a.editForm.totalPrice,remark:a.editForm.remark,logisticsNo:a.editForm.logisticsNo,customerId:a.editForm.customerId,supplierId:a.editForm.supplierId,type:a.editForm.type,salesOrderIds:a.editForm.salesOrderIds.toString(),logisticsId:a.editForm.logisticsId.toString()};Object(i.ad)(r).then(function(t){e.$message({type:"success",message:"操作成功!",duration:300,onClose:function(){sessionStorage.setItem("outId",t.data.id),a.id=t.data.id,a.param2.pid=t.data.id,a.requestClientInfo(),a.getAjaxList(2),a.saveLoading=!1,a.typeBool=!0}})})})},getAjaxPList:function(){var t=this;Object(i.Bc)(t.param3).then(function(e){var a=e.data.items;a&&a.length>0?t.purchaseList=a:t.purchaseList=[]})},getAjaxLogisticsList:function(){var t=this;Object(i.Ed)(t.param4).then(function(e){var a=e.data.items;a&&a.length>0?t.LogisticsList=a:t.LogisticsList=[]})},getAjaxClient:function(){var t=this;Object(i.td)(t.param).then(function(e){var a=e.data.items;a&&a.length>0?t.customerList=a:t.customerList=[]})},getAjaxProduct:function(){var t=this;Object(i.Md)(t.param).then(function(e){if(200==e.status){var a=e.data.items;a&&a.length>0?t.productList=a:t.productList=[]}})},getAjaxGroup:function(){var t=this;Object(i.hd)().then(function(e){if(200==e.status){var a=e.data;a&&a.length>0?t.groupList=a:t.groupList=[]}})},getAjaxSupplier:function(){var t=this;Object(i.Qd)(t.param).then(function(e){var a=e.data.items;a&&a.length>0?t.supplierList=a:t.supplierList=[]})},getAjaxFixed:function(){var t=this;Object(i.sd)(t.param5).then(function(e){if(200==e.status){var a=e.data.items;a&&a.length>0?t.fixedList=a:t.fixedList=[]}})},getAjaxConsume:function(){var t=this;Object(i.sd)(t.param6).then(function(e){if(200==e.status){var a=e.data.items;a&&a.length>0?t.consumetList=a:t.consumetList=[]}})}},beforeMount:function(){this.getAjaxSupplier();var t=sessionStorage.getItem("outId");t&&(this.id=t,this.param2.pid=t,this.typeBool=!0,this.requestClientInfo(),this.getAjaxList(2)),this.getAjaxPList(),this.getAjaxProduct(),this.getAjaxLogisticsList(),this.getAjaxClient()}},s=(a("CYsy"),a("KHd+")),o=Object(s.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/outStockOrder"}}},[t._v("出库单管理")]),t._v(" "),a("el-breadcrumb-item",[t._v("详情")])],1),t._v(" "),a("div",{staticClass:"contentBody"},[a("el-form",{ref:"editForm",staticClass:"demo-ruleForm",attrs:{model:t.editForm,rules:t.rules,"label-width":"100px"}},[a("el-form-item",{staticStyle:{"text-align":"right"}},[a("el-button",{on:{click:function(e){return t.goBack()}}},[t._v("返回")])],1),t._v(" "),a("el-form-item",{attrs:{label:"出库单名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:15,disabled:""},model:{value:t.editForm.name,callback:function(e){t.$set(t.editForm,"name",e)},expression:"editForm.name"}})],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"出库类型",prop:"type"}},[a("el-select",{attrs:{placeholder:"请选择",disabled:""},model:{value:t.editForm.type,callback:function(e){t.$set(t.editForm,"type",e)},expression:"editForm.type"}},[a("el-option",{attrs:{label:"门店订单",value:1}},[t._v("门店订单")]),t._v(" "),a("el-option",{attrs:{label:"自主配货",value:2}},[t._v("自主配货")])],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{staticStyle:{width:"316px"},attrs:{label:"出库日期",prop:"dateTime"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd",disabled:""},model:{value:t.editForm.dateTime,callback:function(e){t.$set(t.editForm,"dateTime",e)},expression:"editForm.dateTime"}})],1)],1)],1),t._v(" "),1==t.editForm.type?a("el-form-item",{staticStyle:{width:"100%"},attrs:{label:"店铺订单",prop:"salesOrderIds"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择",disabled:""},model:{value:t.editForm.salesOrderIds,callback:function(e){t.$set(t.editForm,"salesOrderIds",e)},expression:"editForm.salesOrderIds"}},t._l(t.purchaseList,function(t){return a("el-option",{attrs:{label:t.name+" ["+t.customerName+"]",value:t.id}})}),1)],1):t._e(),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{staticStyle:{width:"316px"},attrs:{label:"总量"}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:200,disabled:""},model:{value:t.editForm.totalNumber,callback:function(e){t.$set(t.editForm,"totalNumber",e)},expression:"editForm.totalNumber"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{staticStyle:{width:"316px"},attrs:{label:"物流单号"}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:200,disabled:""},model:{value:t.editForm.logisticsNo,callback:function(e){t.$set(t.editForm,"logisticsNo",e)},expression:"editForm.logisticsNo"}})],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{staticStyle:{width:"316px"},attrs:{label:" 物流车牌号"}},[a("el-select",{attrs:{placeholder:"请选择",disabled:""},on:{change:t.changeLogistics},model:{value:t.editForm.logisticsId,callback:function(e){t.$set(t.editForm,"logisticsId",e)},expression:"editForm.logisticsId"}},t._l(t.LogisticsList,function(t){return a("el-option",{attrs:{label:t.plateNumber,value:t.id}})}),1)],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[t.editForm.phone?a("el-form-item",{staticStyle:{width:"316px"},attrs:{label:"物流电话"}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:200,disabled:""},model:{value:t.editForm.phone,callback:function(e){t.$set(t.editForm,"phone",e)},expression:"editForm.phone"}})],1):t._e()],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[t.editForm.company?a("el-form-item",{staticStyle:{width:"316px"},attrs:{label:"物流公司名称"}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:200,disabled:""},model:{value:t.editForm.company,callback:function(e){t.$set(t.editForm,"company",e)},expression:"editForm.company"}})],1):t._e()],1),t._v(" "),a("el-col",{attrs:{span:8}},[t.editForm.contact?a("el-form-item",{staticStyle:{width:"316px"},attrs:{label:"物流联系人"}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:200,disabled:""},model:{value:t.editForm.contact,callback:function(e){t.$set(t.editForm,"contact",e)},expression:"editForm.contact"}})],1):t._e()],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[2==t.editForm.type?a("el-form-item",{attrs:{label:"门店",prop:"customerId"}},[a("el-select",{attrs:{placeholder:"请选择",disabled:""},model:{value:t.editForm.customerId,callback:function(e){t.$set(t.editForm,"customerId",e)},expression:"editForm.customerId"}},t._l(t.customerList,function(t){return a("el-option",{attrs:{label:t.name,value:t.id}})}),1)],1):t._e()],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"供应商",prop:"supplierId"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择",disabled:""},on:{change:t.changeSupplier},model:{value:t.editForm.supplierId,callback:function(e){t.$set(t.editForm,"supplierId",e)},expression:"editForm.supplierId"}},t._l(t.supplierList,function(t){return a("el-option",{attrs:{label:t.name,value:t.id}})}),1)],1)],1)],1),t._v(" "),t.editForm.supplierId?a("el-form-item",{attrs:{label:"供应内容"}},[a("el-input",{attrs:{disabled:""},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入",maxlength:200,disabled:""},model:{value:t.editForm.remark,callback:function(e){t.$set(t.editForm,"remark",e)},expression:"editForm.remark"}})],1)],1),t._v(" "),t.id?a("div",{staticClass:"contentBody"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",label:"序号",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"编号"}}),t._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"名称"}}),t._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"standard",label:"单位"}}),t._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"number",label:"数量",width:"140"}})],1)],1):t._e()],1)],1)},[],!1,null,"08e804e6",null);o.options.__file="detailOutStockOrder.vue";e.default=o.exports},yzdP:function(t,e,a){}}]);