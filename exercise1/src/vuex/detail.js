import { proDetail } from '@/api'

const state = {
      proInfo:{}
}
const mutations = {
      PEODETAIL(state,data){
                  state.proInfo = data
                  console.log("获取的具体商品",data);
      }
}
const actions = {
// 获取产品信息
  async proDetail(context,id){ // 获取上下文，传来的需要查询id
          let result =   await proDetail(id) 
          if(result.code ==200){
                context.commit('PEODETAIL',result.data)
          }
}     

}
const getters = {}

export default{
      namespaced:true,
      state,mutations,actions,getters
}