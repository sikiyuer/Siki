import { searchInfo } from '@/api'

const state = {
     searchList: {}
}

const mutations = {
     SEARCHINFO(state, value) {
          state.searchList = value
     }
}
const actions = {
     // 获取搜索信息
     async searchInfo(context, value = {}) {  // value 没传则按空数组
          let result = await searchInfo(value);
          console.log(result, '这里是search小仓库，获取了search的数据并提交保存了');
          if (result.code == 200) {
               context.commit('SEARCHINFO', result.data)
          }
          
     }
}

const getters = {
     goodsList(state){
          return state.searchList.goodsList||[]
     },
     trademarkList(state){
          return state.searchList.trademarkList||[]
     },
     attrsList(state){
          return state.searchList.attrsList||[]
     },
     total(state){
          return state.searchList.total
     }
}


export default {
     namespaced: true, // 开启命名空间
     actions,
     mutations,
     state,
     getters

}