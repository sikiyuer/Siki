import { CarList,cartDelete,cartChangeChecked} from '@/api'

const state ={
      carlist:[] // 存储获取的购物车数据
}
const mutations ={
      GETCARTLIST(state,carlist){
            state.carlist = carlist
      }
}
const actions ={

      // 获取购物车列表
    async  getCartList({commit}){
              let result =  await  CarList()
              if(result.code==200){ // 获取购物车数据成功
                  commit('GETCARTLIST',result.data)
            //   alert('获取购物车数据成功')

              }
                 else  alert('获取购物车数据失败')
      },
      // 删除购物车商品
    async Deletepro (context,skuId){
            let result = await cartDelete(skuId);
            console.log(result);
            if(result.code == 200){
                  // alert('删除成功')
            }
            else{
                  return Promise.reject(new Error('删除商品失败'))
            }
      },
      // 改变购物车商品选中的状态
    async cartChangeIschecked({commit},{skuId,isChecked}){
          let result = await cartChangeChecked(skuId,isChecked)
          if(result.code == 200){
          }
          else{
                return Promise.reject(new Error('改变选中状态失败'))
          }
    },
    // 删除所有选中的商品
    delAllSelect({dispatch,getters}){ // context 包含所有仓库数据 
//      getters.carlistAll.cartInfoList // 获取购物车所有商品
     let PromiseAll = [] // 定义一个数组来存储每个选中商品的删除结果
     getters.carlistAll.cartInfoList.forEach(list => {
          let flag= list.isChecked? dispatch('Deletepro',list.skuId):''
           PromiseAll.push(flag) // 将每个删除结果存入数组
     });
     return Promise.all(PromiseAll) // 返回所有的执行结果，有一个为失败则返回失败
    },
    // 改变全选的商品
    updateAllChecked({dispatch,state},isChecked){   
          let PromiseAll = []
        state.carlist[0].cartInfoList.forEach(list=>{
           let flag = dispatch('cartChangeIschecked',{skuId:list.skuId,isChecked})
            PromiseAll.push(flag)
        })
        return Promise.all(PromiseAll)
        
    }
}
const getters ={
      carlistAll(state){
            return state.carlist[0]||[]
}

}
export default{
      namespaced:true,
      state,
      mutations,
      actions,
      getters
}