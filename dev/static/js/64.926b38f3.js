(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{"0Ri8":function(e,t,a){"use strict";a.r(t);var r=a("TsPW"),l={name:"edit-user-manage",data:function(){return{tableData:null,formLabelWidth:"80px",id:"",saveLoading:!1,editForm:{name:"",orderNo:"",dateTime:"",totalNumber:0,totalPrice:0,remark:"",supplierId:""},headers:{sessionId:sessionStorage.getItem("sessionId")},supplierList:[],productList:[],param:{pageNo:1,pageSize:0,status:1},param2:{pid:""},rules:{name:[{required:!0,message:"请输入领料单名称",trigger:"blur"}]},content:""}},methods:{getAjaxList:function(e){var t=this;Object(r.zb)(t.param2).then(function(a){t.tableData=[];var r=a.data;if(r&&r.length>0){t.tableData=r;for(var l=0,i=0,o=0;o<t.tableData.length;o++)l+=t.tableData[o].price*t.tableData[o].number,i+=t.tableData[o].number;t.editForm.totalPrice=l,t.editForm.totalNumber=i,1==e&&t.requestClientInfo()}else t.tableData=[]})},requestClientInfo:function(){var e=this,t=this;Object(r.Mb)({id:this.id}).then(function(a){if(200==a.status){var r=a.data;r&&(t.editForm.name=r.name,t.editForm.orderNo=r.orderNo,t.editForm.dateTime=r.dateTime,t.editForm.totalNumber=r.totalNumber,t.editForm.totalPrice=r.totalPrice,t.editForm.remark=r.remark)}else e.$message({message:"请求异常",type:"error"})})},goBack:function(){this.$router.push({path:"/material"})}},beforeMount:function(){var e=sessionStorage.getItem("materialId");e&&(this.id=e,this.param2.pid=e,this.requestClientInfo(),this.getAjaxList(2))}},i=(a("x8/a"),a("KHd+")),o=Object(i.a)(l,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/material"}}},[e._v("领料单管理")]),e._v(" "),a("el-breadcrumb-item",[e._v("详情")])],1),e._v(" "),a("div",{staticClass:"contentBody"},[a("el-form",{ref:"editForm",staticClass:"demo-ruleForm",attrs:{model:e.editForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{staticStyle:{"text-align":"right"}},[a("el-button",{on:{click:function(t){return e.goBack()}}},[e._v("返回")])],1),e._v(" "),a("el-form-item",{attrs:{label:"领料单名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入",disabled:""},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"领料日期"}},[a("el-date-picker",{attrs:{disabled:"",type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.editForm.dateTime,callback:function(t){e.$set(e.editForm,"dateTime",t)},expression:"editForm.dateTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{staticStyle:{width:"316px"},attrs:{label:"总量"}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:200,disabled:""},model:{value:e.editForm.totalNumber,callback:function(t){e.$set(e.editForm,"totalNumber",t)},expression:"editForm.totalNumber"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{staticStyle:{width:"316px"},attrs:{label:"总价"}},[a("el-input",{attrs:{placeholder:"请输入",maxlength:200,disabled:""},model:{value:e.editForm.totalPrice,callback:function(t){e.$set(e.editForm,"totalPrice",t)},expression:"editForm.totalPrice"}})],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{type:"textarea",disabled:"",placeholder:"请输入",maxlength:200},model:{value:e.editForm.remark,callback:function(t){e.$set(e.editForm,"remark",t)},expression:"editForm.remark"}})],1)],1),e._v(" "),e.id?a("div",{staticClass:"contentBody"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",label:"序号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"原料编号"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"原料名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"standard",label:"单位"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"number",label:"数量",width:"140"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"price",label:"单价",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                        ￥"+e._s(t.row.price)+"\n                    ")]}}],null,!1,3603381429)})],1)],1):e._e()],1)],1)},[],!1,null,"f62bacfc",null);o.options.__file="detailMaterial.vue";t.default=o.exports},Et5p:function(e,t,a){},"x8/a":function(e,t,a){"use strict";var r=a("Et5p");a.n(r).a}}]);