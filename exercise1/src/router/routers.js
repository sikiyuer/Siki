/* ************************************一级路由组件 */
import Login from '@/pages/Login/index'
import Register from '@/pages/Register/index'
import Home from '@/pages/Home/index'
import Search from '@/pages/Search/index'
import Detail from '@/pages/Detail/index'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart' // 购物车
import Trade from '@/pages/Trade'  //商品结算模块
import Pay from '@/pages/Pay'  //支付模块
import Paysuccess from '@/pages/PaySuccess'  //支付成功模块
import Center from '@/pages/Center'  //个人中心模块
/* ************************************二级路由组件 */
import MyOrder from '@/pages/Center/MyOrder'  //个人订单
import AllOrder from '@/pages/Center/AllOrder'  //团购订单


export default [
  {
    name: 'center',
    path: '/center',
    component: Center,
    meta: {
      footShow: true
    },
    children:[
      {
        path:'/center',
        redirect:'myorder'
      },
      {
        path:'myorder',
        name:'myorder',
        component:MyOrder
      },
      {
        path:'allorder',
        name:'allorder',
        component:AllOrder
      }
    ]
  },
  {
    name: 'paysuccess',
    path: '/paysuccess',
    component: Paysuccess,
    meta: {
      footShow: true
    }
  },
  {
    name: 'pay',
    path: '/pay',
    component: Pay,
    meta: {
      footShow: true
    }
  },
  {
    name: 'trade',
    path: '/trade',
    component: Trade,
    meta: {
      footShow: true
    }
  },
  {
    name: 'shopcart',
    path: '/ShopCart',
    component: ShopCart,
    meta: {
      footShow: true
    }
  },
  {
    name: 'addCartSuccess',
    path: '/AddCartSuccess',
    component: AddCartSuccess,
    meta: {
      footShow: true
    }
  },
  {
    name: 'detail',
    path: '/detail/:proId?',
    component: Detail,
    meta: {
      footShow: true
    }
  }, {
    name: 'home',
    path: '/home',
    component: Home,
    meta: {
      footShow: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'search',
    // path: '/search:keyword?',   // 占位符 
    path: '/search/:keyword?',   // 占位符 
    component: Search,
    meta: {
      footShow: true
    },
    // props:($route)=>{
    //   return {word:$route.params.pppp,wordquery:$route.query.pppp}
    // }
  },
  {
    name: 'register',
    path: '/register',
    component: Register
  },
  {
    path: '*',
    redirect: '/home'
  },
]
