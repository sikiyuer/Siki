import { Address,OrderInfo,SubmitOrder } from '@/api'

const state = {
    address : [],
    order:''
}
const mutations = {
      ADDRESS(state,add){
            state.address= add||[]
      },
      OERDER(state,order){
            state.order= order||{}
      }
}
const actions = {
      async address({commit}){  // 获取用户地址
            let result = await Address()
            // console.log(result.data);
            if (result.code == 200) {
                  commit('ADDRESS',result.data)
            }
      },
      async orderInfo({commit}){  // 获取订单信息
            let result = await OrderInfo()
            console.log(result);
            if (result.code == 200) {
                  commit('OERDER',result.data)
            }
      }
}
const getters = {}
export default{
      namespaced:true,
      state,
      mutations,
      getters,
      actions
}