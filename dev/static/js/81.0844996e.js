(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{Lk77:function(e,t,a){"use strict";var r=a("heLK");a.n(r).a},"RU/L":function(e,t,a){a("Rqdy");var r=a("WEpk").Object;e.exports=function(e,t,a){return r.defineProperty(e,t,a)}},Rqdy:function(e,t,a){var r=a("Y7ZC");r(r.S+r.F*!a("jmDH"),"Object",{defineProperty:a("2faE").f})},SEkw:function(e,t,a){e.exports={default:a("RU/L"),__esModule:!0}},YEIV:function(e,t,a){"use strict";t.__esModule=!0;var r=function(e){return e&&e.__esModule?e:{default:e}}(a("SEkw"));t.default=function(e,t,a){return t in e?(0,r.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},heLK:function(e,t,a){},w4Qw:function(e,t,a){"use strict";a.r(t);var r,n=a("YEIV"),i=a.n(n),l=a("TsPW"),s={name:"merchant",data:function(){return{pid:sessionStorage.getItem("purchaseReportId"),loading:!1,searchForm:{time:"",pid:sessionStorage.getItem("purchaseReportId"),name:"",serialNo:"",supplierId:""},tableData:null,param:{beginDate:"",endDate:"",pid:sessionStorage.getItem("purchaseReportId"),name:"",serialNo:"",supplierId:"",pageNo:1,pageSize:20},totalNum:0,supplierList:[],paramSupplier:{pageNo:1,pageSize:0,status:1}}},methods:(r={onPickHandle:function(e){this.onSearch()},timeData:function(e){var t=e.split("-"),a=t[0];if(t[1].length<2)var r="0"+t[1];else r=""+t[1];if(t[2].length<2)var n="0"+t[2];else n=""+t[2];return a+"-"+r+"-"+n},handleSizeChange:function(e){var t=this;t.param.pageSize=e,Object(l.fc)(t.param).then(function(e){t.loading=!1;var a=e.data.items;a&&a.length>0?(t.tableData=a,t.totalNum=parseInt(e.data.totalNum)):(t.tableData=[],t.totalNum=0);for(var r=0;r<t.tableData.length;r++)t.tableData[r].dateTime=t.timeData(t.tableData[r].dateTime)})},changeSelect:function(){this.onSearch()},resetForm:function(e){this.$refs[e].resetFields(),this.onSearch()},indexMethod:function(e){return(this.param.pageNo-1)*this.param.pageSize+e+1},handleClick:function(e,t,a){if("export"==a){var r="",n="";this.searchForm.time&&this.searchForm.time.length>0&&(r=this.searchForm.time.length>0?this.searchForm.time[0]:"",n=this.searchForm.time.length>0?this.searchForm.time[1]:""),location.href=l.He+"export/purchaseDetailReport?beginDate="+r+"&endDate="+n+"&serialNo="+this.searchForm.serialNo+"&name="+this.searchForm.name+"&supplierId="+this.searchForm.supplierId+"&pid="+this.searchForm.pid}},onSearch:function(){this.param.pageNo=1,this.param.name=this.searchForm.name,this.param.serialNo=this.searchForm.serialNo,this.param.supplierId=this.searchForm.supplierId,this.searchForm.time&&this.searchForm.time.length>0?(this.param.beginDate=this.searchForm.time.length>0?this.searchForm.time[0]:"",this.param.endDate=this.searchForm.time.length>0?this.searchForm.time[1]:""):(this.param.beginDate="",this.param.endDate=""),this.getAjaxList()},handleCurrentChange:function(e){this.param.pageNo=e,this.getAjaxList()}},i()(r,"handleSizeChange",function(e){this.param.pageNo=1,this.param.pageSize=e,this.getAjaxList()}),i()(r,"getAjaxList",function(){var e=this;e.loading=!0,Object(l.fc)(e.param).then(function(t){e.loading=!1;var a=t.data.items;a&&a.length>0?(e.tableData=a,e.totalNum=parseInt(t.data.totalNum)):(e.tableData=[],e.totalNum=0)})}),i()(r,"getAjaxSupplier",function(){var e=this;Object(l.Qd)(e.paramSupplier).then(function(t){var a=t.data.items;a&&a.length>0?e.supplierList=a:e.supplierList=[]})}),r),filters:{substr:function(e){if(null==e){return(0).toFixed(2)}return e.toFixed(2)},substrs:function(e){if(null==e){return(0).toFixed(4)}return e.toFixed(4)}},beforeMount:function(){this.getAjaxList(),this.getAjaxSupplier()}},o=(a("Lk77"),a("KHd+")),c=Object(o.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/purchasereport"}}},[e._v("采购单报表统计")]),e._v(" "),a("el-breadcrumb-item",[e._v("采购单详情报表统计")])],1),e._v(" "),a("div",{staticClass:"contentBody",staticStyle:{"padding-bottom":"0px"}},[a("el-form",{ref:"ruleForm",attrs:{model:e.searchForm,inline:"","label-width":"100px","label-position":"left"}},[a("el-form-item",{attrs:{label:"货品编码"}},[a("el-input",{staticClass:"min-width-select",attrs:{maxlength:200,autocomplete:"off",placeholder:"请输入",clearable:""},model:{value:e.searchForm.serialNo,callback:function(t){e.$set(e.searchForm,"serialNo",t)},expression:"searchForm.serialNo"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"货品名称"}},[a("el-input",{staticClass:"min-width-select",attrs:{maxlength:200,autocomplete:"off",placeholder:"请输入",clearable:""},model:{value:e.searchForm.name,callback:function(t){e.$set(e.searchForm,"name",t)},expression:"searchForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"供应商名称",prop:"supplierId"}},[a("el-select",{staticClass:"min-width-select",attrs:{clearable:"",filterable:"",placeholder:"请选择"},on:{change:e.changeSelect},model:{value:e.searchForm.supplierId,callback:function(t){e.$set(e.searchForm,"supplierId",t)},expression:"searchForm.supplierId"}},e._l(e.supplierList,function(e){return a("el-option",{attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"日期范围选择",prop:"time"}},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.onPickHandle},model:{value:e.searchForm.time,callback:function(t){e.$set(e.searchForm,"time",t)},expression:"searchForm.time"}})],1),e._v(" "),a("el-form-item",{staticStyle:{"padding-left":"20px"}},[a("el-button",{attrs:{type:"success","native-type":"submit"},nativeOn:{click:function(t){return t.preventDefault(),e.onSearch(t)}}},[e._v("查询")]),e._v(" "),a("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("重置")])],1)],1)],1),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"contentBody",attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(241, 242, 247, 0.5)"}},[a("div",{staticStyle:{"padding-bottom":"20px","text-align":"right"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.handleClick("","","export")}}},[e._v("导出")])],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",index:e.indexMethod,label:"行号",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"货品编码"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"categoryName",label:"货品分类"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"货品名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"supplierName",label:"供应商"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"standard",label:"单位",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"number",label:"数量"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"price",label:"单价"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("substrs")(t.row.price)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"totalPrice",label:"总价"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("substr")(t.row.totalPrice)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"createTime",label:"下单时间",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"remark",label:"备注"}})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.param.pageNo,"page-sizes":[20,40,60,80],"page-size":e.param.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalNum},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},[],!1,null,"e217a54a",null);c.options.__file="purchaseReportDetail.vue";t.default=c.exports}}]);