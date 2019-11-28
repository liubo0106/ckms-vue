import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import {requesTunreadNoticeCount } from '../api/api';
Vue.use(Vuex)

// 应用初始状态
const state = {
    msgCount: 0
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        var user = sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            //requesTunreadNoticeCount({userId: user.id}).then(res => {
            //    if (res.status == 200) {
            //        let data = res.data;
            //        state.msgCount = data;
            //    } else {
            //        state.msgCount = 0;
            //    }
            //});
        }
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})