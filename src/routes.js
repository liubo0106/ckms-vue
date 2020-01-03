const Login = () => import( './views/Login.vue');
const NotFound = () => import( './views/404.vue');
const Home = () => import( './views/Home.vue');
const Main = () => import( './views/Main.vue');
const UserPage = () => import( './views/authorityManage/user.vue');
const UserEditPage = () => import( './views/authorityManage/editUser.vue');
const RolePage = () => import( './views/authorityManage/role.vue');
const RoleEditPage = () => import( './views/authorityManage/editRole.vue');
const MenuPage = () => import( './views/authorityManage/menu.vue');
const MenuEditPage = () => import( './views/authorityManage/editMenu.vue');
const supplierManage = () => import( './views/supplierManage/supplierManage.vue');//供应商管理
const detailSupplier = () => import( './views/supplierManage/detailSupplier.vue');//供应商管理详情
const editSupplier = () => import( './views/supplierManage/editSupplier.vue');//供应商添加编辑
const clientManage = () => import( './views/clientManage/clientManage.vue');//客户管理
const editClient = () => import( './views/clientManage/editClient.vue');//客户添加编辑
const dataDicManage = () => import( './views/dataDicManage/dataDicManage.vue');//数据字典管理
const commodityType= () => import( './views/commodityType/commodityType.vue');//商品分类
const commodityManage= () => import( './views/commodityManage/commodityManage.vue');//商品管理
const editCommodity= () => import( './views/commodityManage/editCommodity.vue');//商品管理添加编辑
const groupManage= () => import( './views/groupManage/groupManage.vue');//打包管理
const editGroup= () => import( './views/groupManage/editGroup.vue');//打包管理添加编辑
const groupType= () => import( './views/groupType/groupType.vue');//打包分类
const inventoryManage= () => import( './views/inventoryManage/inventoryManage.vue');//库存管理
const purchaseOrder= () => import( './views/purchaseOrder/purchaseOrder.vue');//采购单
const editPurchase= () => import( './views/purchaseOrder/editPurchase.vue');//添加编辑采购单
const detailPurchase= () => import( './views/purchaseOrder/detailPurchase.vue');//采购单详情
const inStockOrder= () => import( './views/inStockOrder/inStockOrder.vue');//入库单
const editInStockOrder= () => import( './views/inStockOrder/editInStockOrder.vue');//添加编辑入库单
const detailInStockOrder= () => import( './views/inStockOrder/detailInStockOrder.vue');//入库单详情
const salesOrder= () => import( './views/salesOrder/salesOrder.vue');//销售单
const editSalesOrder= () => import( './views/salesOrder/editSalesOrder.vue');//添加编辑销售单
const detailSalesOrder= () => import( './views/salesOrder/detailSalesOrder.vue');//销售单详情
const outStockOrder= () => import( './views/outStockOrder/outStockOrder.vue');//出库单
const editOutStockOrder= () => import( './views/outStockOrder/editOutStockOrder.vue');//添加编辑出库单
const detailOutStockOrder= () => import( './views/outStockOrder/detailOutStockOrder.vue');//出库单详情
const logisticsManage= () => import( './views/logisticsManage/logisticsManage.vue');//物流管理
const editLogistics= () => import( './views/logisticsManage/editLogistics.vue');//物流管理编辑
const shopInStock= () => import( './views/shopInStock/shopInStock.vue');//门店商品管理
const editInShopInStock= () => import( './views/shopInStock/editInShopInStock.vue');//门店商品编辑
const storeDesk= () => import( './views/storeDesk/storeDesk.vue');//门店桌号管理
const editStoreDesk= () => import( './views/storeDesk/editStoreDesk.vue');//门店桌号编辑
const storeOrde= () => import( './views/storeOrder/storeOrde.vue');//客户订单管理
const detailStoreOrde= () => import( './views/storeOrder/detailStoreOrde.vue');//客户订单管理详情
const shopOrderManage= () => import( './views/shopOrderManage/shopOrderManage.vue');//店铺订单管理
const detailShopOrder= () => import( './views/shopOrderManage/detailShopOrder.vue');//店铺订单管理详情
const shopInventoryManage= () => import( './views/shopInventoryManage/shopInventoryManage.vue');//店铺库存管理
const clientConsumemanage= () => import( './views/clientConsumemanage/clientConsumemanage.vue');//客户消费情况管理
const detailcCientConsume= () => import( './views/clientConsumemanage/detailcCientConsume.vue');//客户消费情况管理详情
const shopInStoreManage= () => import( './views/shopInStoreManage/shopInStoreManage.vue');//店铺入库管理
const editShopInStock= () => import( './views/shopInStoreManage/editShopInStock.vue');//店铺入库管理编辑
const detailShopInStock= () => import( './views/shopInStoreManage/detailShopInStock.vue');//店铺入库管理详情
const menuTypeManage= () => import( './views/menuTypeManage/menuTypeManage.vue');//菜品分类管理
const orderManage= () => import( './views/orderManage/order.vue');//客户订单结算管理
const editOrderManage= () => import( './views/orderManage/editOrder.vue');//编辑客户订单结算管理
const StoreReturnPage= () => import( './views/shopReturnManage/storeReturn.vue');//门店退货管理
const DetailStoreReturnPage= () => import( './views/shopReturnManage/detailStoreReturn.vue');//门店退货详情
const EditStoreReturnPage= () => import( './views/shopReturnManage/editStoreReturn.vue');//门店退货编辑
const DestroyPage= () => import( './views/destroyManage/destroy.vue');//废库管理
const EditDestroyPage= () => import( './views/destroyManage/editDestroy.vue');//添加废库
const DetailDestroyPage= () => import( './views/destroyManage/detailDestroy.vue');//详情废库
const assetsManage= () => import( './views/assetsManage/assetsManage.vue');//固定资产及易消耗品管理
const editAssets= () => import( './views/assetsManage/editAssets.vue');//编辑固定资产及易消耗品
const MaterialPage= () => import( './views/materialManage/material.vue');//领料单管理
const DetailMaterialPage= () => import( './views/materialManage/detailMaterial.vue');//详情领料单
const EditMaterialPage= () => import( './views/materialManage/editMaterial.vue');//编辑领料单
const shopAssetsManage= () => import( './views/shopAssetsManage/shopAssetsManage.vue');//门店固定资产管理
const editShopAssets= () => import( './views/shopAssetsManage/editShopAssets.vue');//编辑门店固定资产管理
const KitchenRaw= () => import( './views/kitchenRawManage/kitchenRaw.vue');//厨房库存
const ShopLossReportPage= () => import( './views/shopLossReportManage/shopLossReport.vue');//门店报损单管理
const EditShopLossReportPage= () => import( './views/shopLossReportManage/editShopLossReport.vue');//添加门店报损单
const DetailShopLossReportPage= () => import( './views/shopLossReportManage/detailShopLossReport.vue');//详情门店报损单
const memberManage= () => import( './views/memberManage/memberManage.vue');//会员管理
const editMember= () => import( './views/memberManage/editMember.vue');//编辑会员管理
const memberRechargeManage= () => import( './views/memberRechargeManage/memberRechargeManage.vue');//会员充值管理
const editMemberRecharge= () => import( './views/memberRechargeManage/editMemberRecharge.vue');//编辑会员充值
const memberConsumeManage= () => import( './views/memberConsumeManage/memberConsumeManage.vue');//会员消费情况管理
const detailcMemberConsume= () => import( './views/memberConsumeManage/detailcMemberConsume.vue');//详情会员消费情况
const rechargeRule= () => import( './views/rechargeRule/rechargeRule.vue');//充值规则管理
const shopPrint= () => import( './views/shopPrintManage/printSetting.vue');//充值规则管理
const purchaseReport= () => import( './views/reportManage/purchaseReport.vue');//采购单报表统计
const purchaseReportDetail= () => import( './views/reportManage/purchaseReportDetail.vue');//采购单明细报表统计
const materialReport= () => import( './views/reportManage/materialReport.vue');//领料单报表统计
const materialReportDetail= () => import( './views/reportManage/materialReportDetail.vue');//领料单报表统计
const inStockReport= () => import( './views/reportManage/inStockReport.vue');//入库单报表统计
const inStockReportDetail= () => import( './views/reportManage/inStockReportDetail.vue');//入库单详情报表统计
const outStockReport= () => import( './views/reportManage/outStockReport.vue');//出库单报表统计
const outStockReportDetail= () => import( './views/reportManage/outStockReportDetail.vue');//出库单详情报表统计
const consumptionDetail = ()=>import('./views/consumption/consumption.vue');//日消费明细
const unitConversion= () => import( './views/dataDicManage/unitConversion.vue');//出库单详情报表统计
const ruturnGreens= () => import( './views/ruturnGreens/ruturnGreens.vue');//顾客退菜明细
const compositeFlavour= () => import( './views/compositeFlavour/compositeFlavour.vue');//复合调料包
const editCompositeFlavour= () => import( './views/compositeFlavour/editCompositeFlavour.vue');//复合调料包编辑
const restaurantList =()=>import('./views/restaurant/restaurant.vue');//套餐管理
const editInRestaurant=()=>import('./views/restaurant/editInRestaurant.vue');//编辑套餐
const priceCurveDetail = ()=>import('./views/commodityManage/priceCurveDetail.vue')//原材料价格可视化
const recombination= ()=>import('./views/recombination/recombination.vue')//商品重组
const editrecombination=()=>import('./views/recombination/editrecombination.vue')//商品重组编辑添加
const storeList = ()=>import('./views/storeOrder/storeList.vue')//顾客订单详情
const storeSales=()=>import('./views/storeSales/storeSales')// 进销库存管理
const coupon=()=>import('./views/coupon/coupon');//优惠卷管理
const addcoupon=()=>import('./views/coupon/addcoupon');//添加优惠卷
const editcoupon=()=>import('./views/coupon/editcoupon');//修改优惠卷
const integralrule=()=>import('./views/integralrule/integralrule');//积分充值规则管理
const storeSummary=()=>import('./views/reportManage/storeSummary')//门店汇总表
const materialSummary=()=>import('./views/reportManage/materialSummary')//原材料汇总表
const storeBusinessReport=()=>import('./views/reportManage/storeBusinessReport')//门店营业额汇总表
let routes = [
    {
        path: '/login',
        component: Login,
        name: ''
    },
    {
        path: '/404',
        component: NotFound,
        name: ''
    },
    {
        path: '/',
        component: Home,
        children: [
            { path: '/', component: Main, name: '首页'},
            { path: '/user', component: UserPage, name: '用户管理'},
            { path: '/edituser', component: UserEditPage, name: '添加编辑用户'},
            { path: '/role', component: RolePage, name: '角色管理'},
            { path: '/editrole', component: RoleEditPage, name: '添加编辑角色'},
            { path: '/menu', component: MenuPage, name: '菜单管理'},
            { path: '/editmenu', component: MenuEditPage, name: '添加编辑菜单'},
            { path: '/supplierManage', component: supplierManage, name: '供应商管理'},
            { path: '/detailSupplier', component: detailSupplier, name: '供应商管理详情'},
            { path: '/editSupplier', component: editSupplier, name: '添加编辑供应商'},
            { path: '/clientManage', component: clientManage, name: '客户管理'},
            { path: '/editClient', component: editClient, name: '添加编辑客户'},
            { path: '/dataDicManage', component: dataDicManage, name: '数据字典管理'},
            { path: '/commodityType', component: commodityType, name: '商品分类'},
            { path: '/commodityManage', component: commodityManage, name: '商品管理'},
            { path: '/editCommodity', component: editCommodity, name: '添加编辑商品'},
            { path: '/groupManage', component: groupManage, name: '打包管理'},
            { path: '/editGroup', component: editGroup, name: '添加编辑打包商品'},
            { path: '/groupType', component: groupType, name: '打包分类'},
            { path: '/inventoryManage', component: inventoryManage, name: '库存管理'},
            { path: '/purchaseOrder', component: purchaseOrder, name: '采购单'},
            { path: '/editPurchase', component: editPurchase, name: '添加编辑采购单'},
            { path: '/detailPurchase', component: detailPurchase, name: '采购单详情'},
            { path: '/inStockOrder', component: inStockOrder, name: '入库单'},
            { path: '/salesOrder', component: salesOrder, name: '销售单'},
            { path: '/editSalesOrder', component: editSalesOrder, name: '添加编辑销售单'},
            { path: '/detailSalesOrder', component: detailSalesOrder, name: '销售单详情'},
            { path: '/inStockOrder', component: inStockOrder, name: '入库单'},
            { path: '/editInStockOrder', component: editInStockOrder, name: '添加入库单'},
            { path: '/detailInStockOrder', component: detailInStockOrder, name: '入库单详情'},
            { path: '/outStockOrder', component: outStockOrder, name: '出库单'},
            { path: '/editOutStockOrder', component: editOutStockOrder, name: '添加出库单'},
            { path: '/detailOutStockOrder', component: detailOutStockOrder, name: '出库单详情'},
            { path: '/logisticsManage', component: logisticsManage, name: '物流管理'},
            { path: '/editLogistics', component: editLogistics, name: '添加编辑物流'},
            { path: '/shopInStock', component: shopInStock, name: '门店商品管理'},
            { path: '/editInShopInStock', component: editInShopInStock, name: '添加编辑门店商品'},
            { path: '/storeDesk', component: storeDesk, name: '门店桌号管理'},
            { path: '/editStoreDesk', component: editStoreDesk, name: '添加编辑门店桌号'},
            { path: '/storeOrde', component: storeOrde, name: '客户订单管理'},
            { path: '/detailStoreOrde', component: detailStoreOrde, name: '查看客户订单'},
            { path: '/shopOrderManage', component: shopOrderManage, name: '店铺订单管理'},
            { path: '/detailShopOrder', component: detailShopOrder, name: '店铺订单管理详情'},
            { path: '/shopInventoryManage', component: shopInventoryManage, name: '店铺库存管理'},
            { path: '/clientConsumemanage', component: clientConsumemanage, name: '客户消费情况管理'},
            { path: '/detailcCientConsume', component: detailcCientConsume, name: '客户消费情况管理详情'},
            { path: '/shopInStoreManage', component: shopInStoreManage, name: '店铺入库管理'},
            { path: '/editShopInStock', component: editShopInStock, name: '编辑店铺入库管理'},
            { path: '/detailShopInStock', component: detailShopInStock, name: '查看店铺入库管理'},
            { path: '/menuTypeManage', component: menuTypeManage, name: '菜品分类管理'},
            { path: '/order', component: orderManage, name: '客户订单结算管理'},
            { path: '/editorder', component: editOrderManage, name: '编辑客户订单结算管理'},
            { path: '/storereturn', component: StoreReturnPage, name: '门店退货管理'},
            { path: '/detailstorereturn', component: DetailStoreReturnPage, name: '门店退货详情'},
            { path: '/editstorereturn', component: EditStoreReturnPage, name: '门店退货编辑'},
            { path: '/destroy', component: DestroyPage, name: '废库管理'},
            { path: '/editdestroy', component: EditDestroyPage, name: '编辑废库'},
            { path: '/detaildestroy', component: DetailDestroyPage, name: '详情废库'},
            { path: '/assetsManage', component: assetsManage, name: '固定资产及易消耗品'},
            { path: '/editAssets', component: editAssets, name: '编辑固定资产及易消耗品'},
            { path: '/material', component: MaterialPage, name: '领料单'},
            { path: '/detailmaterial', component: DetailMaterialPage, name: '详情领料单'},
            { path: '/editmaterial', component: EditMaterialPage, name: '编辑领料单'},
            { path: '/shopAssetsManage', component: shopAssetsManage, name: '门店固定资产管理'},
            { path: '/editShopAssets', component: editShopAssets, name: '编辑门店固定资产管理'},
            { path: '/skr', component: KitchenRaw, name: '厨房库存'},
            { path: '/slr', component: ShopLossReportPage, name: '报损单管理'},
            { path: '/editslr', component: EditShopLossReportPage, name: '编辑报损单'},
            { path: '/detailslr', component: DetailShopLossReportPage, name: '详情报损单'},
            { path: '/memberManage', component: memberManage, name: '会员管理'},
            { path: '/editMember', component: editMember, name: '编辑会员管理'},
            { path: '/memberRechargeManage', component: memberRechargeManage, name: '会员充值管理'},
            { path: '/editMemberRecharge', component: editMemberRecharge, name: '详情会员消费情况'},
            { path: '/memberConsumeManage', component: memberConsumeManage, name: '会员消费情况管理'},
            { path: '/detailcMemberConsume', component: detailcMemberConsume, name: '详情会员消费情况'},
            { path: '/rechargeRule', component: rechargeRule, name: '充值规则'},
            { path: '/shopprint', component: shopPrint, name: '小票打印机配置'},
            { path: '/purchasereport', component: purchaseReport, name: '采购单报表统计'},
            { path: '/purchasereportdetail', component: purchaseReportDetail, name: '采购单详情报表统计'},
            { path: '/materialreport', component: materialReport, name: '领料单报表统计'},
            { path: '/materialreportdetail', component: materialReportDetail, name: '领料单详情报表统计'},
            { path: '/instockreport', component: inStockReport, name: '入库单报表统计'},
            { path: '/instockreportdetail', component: inStockReportDetail, name: '入库单详情报表统计'},
            { path: '/outstockreport', component: outStockReport, name: '出库单报表统计'},
            { path: '/outstockreportdetail', component: outStockReportDetail, name: '出库单详情报表统计'},
            { path: '/storeSummary',component:storeSummary,name:'门店汇总表'},
            {path:'/materialSummary',component:materialSummary,name:'原材料汇总表'},
            { path: '/unitconversion', component: unitConversion, name: '单位换算配置管理'},
            { path: '/ruturnGreens', component: ruturnGreens, name: '顾客退菜明细'},
            { path: '/compositeFlavour', component: compositeFlavour, name: '复合调料包'},
            { path: '/editCompositeFlavour', component: editCompositeFlavour, name: '编辑复合调料包'},
            {path:'/restaurant',component:restaurantList,name:'门店套餐管理'},
            {path:'/editInRestaurant',component:editInRestaurant,name:'编辑门店套餐'},
            {path:'/consumption',component:consumptionDetail,name:'日消费明细'},
            {path:'/priceCurveDetail',component:priceCurveDetail,name:'原材料价格曲线'},
            {path:'/recombination',component:recombination,name:'商品重组'},
            {path:'/editrecombination',component:editrecombination,name:'编辑重组商品'},
            {path:'/storeList',component:storeList,name:'顾客订单详情'},
            {path:'/storeSales',component:storeSales,name:'进销库存管理'},
            {path:'/coupon',component:coupon,name:'优惠卷管理'},
            {path:'/addcoupon',component:addcoupon,name:'添加优惠卷'},
            {path:'/editcoupon',component:editcoupon,name:'修改优惠卷'},
            {path:'/integralrule',component:integralrule,name:'积分规则'},
            {path:'/storeBusinessReport',component:storeBusinessReport,name:'门店营业额汇总表'},
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
