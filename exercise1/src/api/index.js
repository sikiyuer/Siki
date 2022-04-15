
//******************这里对所有的API进行管理********************* */
import ajax from './ajax' // __/api开头的请求
import mock from './mock_ajax' // __/mock开头的请求

// __获取三级导航的接口 get 无参数
export const getNavList = () =>{
      // 发送请求，默认返回underfind 需要return（返回一个promise函数）
    return  ajax({url:'/product/getBaseCategoryList',methods:'get'}) ;
}

// __获取banner(home轮播图)的接口
export const bannerList = () => mock.get('/banner')

// __获取floor数据
export const floorList = () =>mock.get('/floor')

// __获取search数据 需要带参数
export const searchInfo = (sear) =>ajax({
  url:'/list',
  method:'post',
  data:sear,  // post传data,get传params
})

// __ 获取产品详情的信息  url /api/item/{ skuId }

export const proDetail = (skuId) =>ajax({url:`/item/${skuId}`,method:'get'})


// 添加购物车和修改数量的接口

export const addCar = (skuId,skuNum) =>ajax({url:`cart/addToCart/${skuId}/${skuNum}`,method:'post'})