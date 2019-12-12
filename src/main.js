import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
//引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//import 'font-awesome/css/font-awesome.min.css'
import './common/iconfont/iconfont.css'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
// 简单配置
NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });


const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});


router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('sessionId');
  }
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId && to.path != '/login') {
    next({ path: '/login' });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

