(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{JIgS:function(e,t,a){"use strict";var n=a("JvSk");a.n(n).a},JvSk:function(e,t,a){},"m76+":function(e,t,a){"use strict";a.r(t);var n=a("TsPW"),i={name:"user-manage",data:function(){return{loading:!1,searchForm:{name:"",isSale:""},tableData:null,param:{pageNo:1,pageSize:15,name:"",isSale:"",customerId:sessionStorage.getItem("customerId")},totalNum:0}},methods:{indexMethod:function(e){return(this.param.pageNo-1)*this.param.pageSize+e+1},handleSizeChange:function(e){var t=this;t.param.pageSize=e,Object(n.Gd)(t.param).then(function(e){var a=e.data.items;a&&a.length>0?(t.tableData=a,t.totalNum=parseInt(e.data.totalNum)):(t.tableData=[],t.totalNum=0)})},handleClick:function(e,t,a){var i=this,o=this;if("detail"==a&&(sessionStorage.setItem("id",t.id),sessionStorage.setItem("type",1),this.$router.push({path:"/editInRestaurant"})),"delete"==a)this.$confirm("真的删除该行数据么, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.loading=!0;var e={id:t.id};Object(n.vc)(e).then(function(e){i.$message({type:"success",message:"删除成功!",duration:300,onClose:function(){o.loading=!1,o.param.pageNo=1,o.getAjaxList()}})})}).catch(function(){i.$message({type:"info",message:"已取消删除"})});else if("add"==a)sessionStorage.setItem("id",""),sessionStorage.setItem("type",0),this.$router.push({path:"/editInRestaurant"});else if("edit"==a)sessionStorage.setItem("id",t.id),sessionStorage.setItem("type",0),this.$router.push({path:"/editInRestaurant"});else if("isSale"==a)this.$confirm("是否上架?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"isSale"}).then(function(){i.loading=!0;var e={id:t.id,isSale:1};Object(n.zc)(e).then(function(e){i.$message({type:"success",message:"操作成功!",duration:300,onClose:function(){o.loading=!1,o.param.pageNo=1,o.getAjaxList()}})})}).catch(function(){i.$message({type:"info",message:"已取消"})});else if("isClose"==a)this.$confirm("是否下架?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"isSale"}).then(function(){i.loading=!0;var e={id:t.id,isSale:0};Object(n.zc)(e).then(function(e){i.$message({type:"success",message:"操作成功!",duration:300,onClose:function(){o.loading=!1,o.param.pageNo=1,o.getAjaxList()}})})}).catch(function(){i.$message({type:"info",message:"已取消"})});else if("ok"==a){var l={id:t.id,status:1};Object(n.Ac)(l).then(function(e){200==e.status&&(i.$message({type:"success",message:"操作成功"}),i.getAjaxList())})}},onSearch:function(){this.param.pageNo=1,this.param.name=this.searchForm.name,this.param.isSale=this.searchForm.isSale,this.getAjaxList()},handleCurrentChange:function(e){this.param.pageNo=e,this.getAjaxList()},getAjaxList:function(){var e=this;Object(n.wc)(e.param).then(function(t){var a=t.data.items;a&&a.length>0?(e.tableData=a,e.totalNum=parseInt(t.data.totalNum)):(e.tableData=[],e.totalNum=0)})}},beforeMount:function(){sessionStorage.removeItem("inId"),this.getAjaxList()}},o=(a("JIgS"),a("KHd+")),l=Object(o.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("门店套餐管理")])],1),e._v(" "),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"contentBody",attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(241, 242, 247, 0.5)"}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchForm,"label-width":"80px","label-position":"left"}},[a("el-row",{attrs:{gutter:13}},[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"套餐名称"}},[a("el-input",{attrs:{maxlength:200,autocomplete:"off",placeholder:"请输入",clearable:""},model:{value:e.searchForm.name,callback:function(t){e.$set(e.searchForm,"name",t)},expression:"searchForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否上架"}},[a("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:e.searchForm.isSale,callback:function(t){e.$set(e.searchForm,"isSale",t)},expression:"searchForm.isSale"}},[a("el-option",{attrs:{label:"全部",value:""}}),e._v(" "),a("el-option",{attrs:{label:"上架中",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"已下架",value:"0"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{"label-width":"0"}},[a("el-button",{attrs:{icon:"el-icon-search",circle:"","native-type":"submit"},nativeOn:{click:function(t){return t.preventDefault(),e.onSearch(t)}}}),e._v(" "),a("el-button",{attrs:{icon:"el-icon-plus",circle:""},on:{click:function(t){return e.handleClick("","","add")}}})],1)],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{align:"center","header-align":"center",type:"index",index:e.indexMethod,label:"行号",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"name",label:"套餐名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"price",label:"价格",width:"80"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"typeName",label:"商品类型",width:"140"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"kind",label:"菜品种类",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.kind?a("span",[e._v("其他")]):e._e(),e._v(" "),1==t.row.kind?a("span",[e._v("炒锅涮锅")]):e._e(),e._v(" "),2==t.row.kind?a("span",[e._v("烧烤")]):e._e(),e._v(" "),3==t.row.kind?a("span",[e._v("凉菜")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"saleName",label:"是否上架",width:"140"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"isDiscount",label:"是否打折",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.isDiscount?a("span",[e._v("是")]):e._e(),e._v(" "),1==t.row.isDiscount?a("span",[e._v("否")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"num",label:"排序号",width:"140"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","header-align":"center",prop:"createUser",label:"操作员",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"left","header-align":"center",label:"操作",width:"460"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{icon:"el-icon-document",size:"mini"},on:{click:function(a){return e.handleClick(t.$index,t.row,"detail")}}},[e._v("详情")]),e._v(" "),1==t.row.isSale?a("el-button",{staticStyle:{"background-color":"#4395fb",color:"#fff",border:"none"},attrs:{icon:"el-icon-upload2",type:"isSale",size:"small"},on:{click:function(a){return e.handleClick(t.$index,t.row,"isClose")}}},[e._v("下架")]):e._e(),e._v(" "),0==t.row.isSale?a("el-button",{staticStyle:{"background-color":"#847ffe",color:"#fff",border:"none"},attrs:{icon:"el-icon-download",size:"small"},on:{click:function(a){return e.handleClick(t.$index,t.row,"isSale")}}},[e._v("上架")]):e._e(),e._v(" "),1!=t.row.status?a("el-button",{staticStyle:{"background-color":"#24cbc1",color:"#fff",border:"none"},attrs:{icon:"el-icon-edit",type:"primary",size:"mini"},on:{click:function(a){return e.handleClick(t.$index,t.row,"edit")}}},[e._v("编辑")]):e._e(),e._v(" "),a("el-button",{staticStyle:{"background-color":"#fe8d29",color:"#fff",border:"none"},attrs:{icon:"el-icon-delete",size:"mini",type:"danger"},on:{click:function(a){return e.handleClick(t.$index,t.row,"delete")}}},[e._v("删除")]),e._v(" "),1!=t.row.status?a("el-button",{attrs:{icon:"el-icon-check",size:"mini",type:"danger"},on:{click:function(a){return e.handleClick(t.$index,t.row,"ok")}}},[e._v("确定")]):e._e()]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.param.pageNo,"page-sizes":[15,30,45,60],"page-size":e.param.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalNum},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},[],!1,null,"c1dcd9f0",null);l.options.__file="restaurant.vue";t.default=l.exports}}]);