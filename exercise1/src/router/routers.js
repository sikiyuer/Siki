
import Login from '@/pages/Login/index'
import Register from '@/pages/Register/index'
import Home from '@/pages/Home/index'
import Search from '@/pages/Search/index'
import Detail from '@/pages/Detail/index'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'


export default [
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
