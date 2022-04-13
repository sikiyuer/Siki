//***********************************************************vuex home 仓库 */
// 引入读取数据的接口
import { getNavList, bannerList, floorList} from '@/api'

const state = {
     // __定义初始导航列表来接收服务器返回的数据
     NavList: [],
     bannerList: [],
     floorList:[],
}

const actions = {

     // __获取nav数据
     async getNav(context) {
          let result = await getNavList();
          console.log(result, '这里是vuex的home组件，这是获取到的nav数据');
          context.commit("NAVLIST", result.data)
     },

     // __读取bannerList数据
     async getBanner(context) {
          let result = await bannerList()
          console.log(result, '这里是vuex的home组件，这是获取到的banner数据');
          context.commit('GETBANNER', result.data)
     },
      // __读取floor数据
      async getFloor(context) {
          let result = await floorList();
          if (result.code == 200) {
               console.log(result, '这里是vuex的home组件，这是获取到的floor数据');
               context.commit('GETFLOOR', result.data)
          }
     },
}
const mutations = {
     NAVLIST(state, nav) {
          state.NavList = nav
     },

     GETBANNER(state,banner) {
          state.bannerList = banner
     },
     GETFLOOR(state,floor) {
          state.floorList = floor
     }

}


const getters = {}


export default {
     namespaced: true, // 开启命名空间
     actions,
     mutations,
     getters,
     state
}