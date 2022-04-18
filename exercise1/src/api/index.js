
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
export const proDetail = (skuId) =>ajax({url:`/item/${skuId}`,method:'get'});
// 添加购物车和修改数量的接口
export const addCar = (skuId,skuNum) =>ajax({url:`cart/addToCart/${skuId}/${skuNum}`,method:'post'});
// 获取购物车列表的接口 /api/cart/cartList    get
export const CarList = () => ajax({url:'/cart/cartList',method:'get'})
// 删除购物车商品的接口
export const cartDelete = (skuId) =>ajax({url:`cart/deleteCart/${skuId}`,method:'DELETE'});
// 购物车是否选中的接口
export const cartChangeChecked = (skuID,isChecked)=> ajax({url:`/cart/checkCart/${skuID}/${isChecked}`,method:'get'});
// 获取验证码
export const getCode =(phone) =>ajax({url:`/user/passport/sendCode/${phone}`});
// 注册
export const Register = (data) =>ajax({url:"/user/passport/register",data,method:'post'});
// 登录
export const Login = (data) => ajax({url:'/user/passport/login',data,method:"post"})
// 登录成功 通过token获取用户数据/api/user/passport/auth/getUserInfo
export const TokenLogin = ()=>ajax({url:"/user/passport/auth/getUserInfo",method:'get'})
// 退出登录
export const Logout =()=>ajax({url:'/user/passport/logout',method:'get'})