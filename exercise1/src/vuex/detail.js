import { proDetail ,addCar } from '@/api'

const state = {
      proInfo:{}
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
}     ,
// 添加购物车
 async addCar({commit},{skuId,skuNum}){
        let result = await  addCar(skuId,skuNum)
        if(result.code ==200){
            console.log("添加成功",skuId,skuNum,result)

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