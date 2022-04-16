import { proDetail ,addCar } from '@/api'
import { getUUID } from '@/utils/uuid'

const state = {
      proInfo:{},
      uuid_token:getUUID() // 临时的游客身份标识 调用方法生成一个唯一的id
}
const mutations = {
      PEODETAIL(state,data){
                  state.proInfo = data
                  // console.log("获取的具体商品",data);
      }
} 
const actions = {
// 获取产品信息
  async proDetail(context,id){ // 获取上下文，传来的需要查询id
          let result =   await proDetail(id) 
          if(result.code ==200){
                context.commit('PEODETAIL',result.data)
          }
} ,   
// 添加购物车
 async addCar({commit},{skuId,skuNum}){
        let result = await  addCar(skuId,skuNum)
        if(result.code ==200){
            console.log("添加购物车成功（vuex-detail）",skuId,skuNum,result)
            return 1 // 如果成功添加，则返回1
        }
        else {
              return Promise.reject(new Error ("添加购物车失败"))
        }
 }

}
const getters = {
      categoryView(state){
            // 这里返回可能数据还没回来返回为underfind
            return state.proInfo.categoryView || {}
      }
      ,
      skuInfo(state){  // 产品信息
            return state.proInfo.skuInfo||{}
      },
      spuSaleAttrList(state){  // 售卖属性的简化
            return state.proInfo.spuSaleAttrList||[]
      }
      
}

export default{
      namespaced:true,
      state,mutations,actions,getters
}