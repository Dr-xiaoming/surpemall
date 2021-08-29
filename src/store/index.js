import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'
//1.安装插件 
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
    getters,
    mutations,
    actions,
    state:{
        cartList:[]
    },
})

//3.挂载Vue实例上
export default store