(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{Gc1t:function(e,t,a){"use strict";a.r(t);var n=a("TsPW"),r={name:"user-manage",data:function(){return{loading:!1,searchForm:{name:"",serialNo:""},tableData:null,param:{pageNo:1,pageSize:15,name:"",isSale:"",customerId:sessionStorage.getItem("customerId"),type:"2"},totalNum:0}},methods:{indexMethod:function(e){return(this.param.pageNo-1)*this.param.pageSize+e+1},handleSizeChange:function(e){var t=this;t.param.pageSize=e,Object(n.Gd)(t.param).then(function(e){var a=e.data.items;a&&a.length>0?(t.tableData=a,t.totalNum=parseInt(e.data.totalNum)):(t.tableData=[],t.totalNum=0)})},handleClick:function(e,t,a){var r=this,l=this;"delete"==a?this.$confirm("真的删除该行数据么, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.loading=!0;var e={id:t.id};Object(n.B)(e).then(function(e){r.$message({type:"success",message:"删除成功!",duration:300,onClose:function(){l.loading=!1,l.param.pageNo=1,l.getAjaxList()}})})}).catch(function(){r.$message({type:"info",message:"已取消删除"})}):"add"==a?(sessionStorage.setItem("id",""),this.$router.push({path:"/editShopAssets"})):"edit"==a&&(sessionStorage.setItem("id",t.id),this.$router.push({path:"/editShopAssets"}))},onSearch:function(){this.param.pageNo=1,this.param.name=this.searchForm.name,this.param.serialNo=this.searchForm.serialNo,this.getAjaxList()},handleCurrentChange:function(e){this.param.pageNo=e,this.getAjaxList()},getAjaxList:function(){var e=this;Object(n.Gd)(e.param).then(function(t){var a=t.data.items;a&&a.length>0?(e.tableData=a,e.totalNum=parseInt(t.data.totalNum)):(e.tableData=[],e.totalNum=0)})}},beforeMount:function(){sessionStorage.removeItem("inId"),this.getAjaxList()}},l=(a("t4GM"),a("KHd+")),i=Object(l.a)(r,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("门店固定资产管理")])],1),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"contentBody",attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(241, 242, 247, 0.5)"}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchForm,"label-width":"80px","label-position":"left"}},[a("el-form-item",{staticStyle:{"font-family":"MicrosoftYaHeiLight","font-weight":"bold",color:"rgba(102,102,102,1)"},attrs:{label:"资产编号"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"资产编号",clearable:""},model:{value:e.searchForm.serialNo,callback:function(t){e.$set(e.searchForm,"serialNo",t)},expression:"searchForm.serialNo"}})],1),e._v(" "),a("el-form-item",{staticStyle:{"font-family":"MicrosoftYaHeiLight","font-weight":"bold",color:"rgba(102,102,102,1)"},attrs:{label:"资产名称"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"资产名称",clearable:""},model:{value:e.searchForm.name,callback:function(t){e.$set(e.searchForm,"name",t)},expression:"searchForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{"label-width":"0"}},[a("el-button",{attrs:{icon:"el-icon-search",circle:"","native-type":"submit"},nativeOn:{click:function(t){return t.preventDefault(),e.onSearch(t)}}}),e._v(" "),a("el-button",{attrs:{icon:"el-icon-plus",circle:""},on:{click:function(t){return e.handleClick("","","add")}}})],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",index:e.indexMethod,label:"行号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"serialNo",label:"资产编号",width:"140"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"资产名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"stock",label:"资产库存",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"typeName",label:"资产类型",width:"140"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"createUser",label:"操作员",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticStyle:{"background-color":"#fe8d29",color:"#fff",border:"none"},attrs:{icon:"el-icon-delete",size:"mini",type:"danger"},on:{click:function(a){return e.handleClick(t.$index,t.row,"delete")}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.param.pageNo,"page-sizes":[15,30,45,60],"page-size":e.param.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalNum},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},[],!1,null,"49b50505",null);i.options.__file="shopAssetsManage.vue";t.default=i.exports},aqKU:function(e,t,a){},t4GM:function(e,t,a){"use strict";var n=a("aqKU");a.n(n).a}}]);