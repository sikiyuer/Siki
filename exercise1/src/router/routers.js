/* ************************************一级路由组件 */



export default [
  {
    name: 'center',
    path: '/center',
    component: ()=>import('@/pages/Center'),
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
    component: ()=>import('@/pages/Center/MyOrder'),

      },
      {
        path:'allorder',
        name:'allorder',
    component: ()=>import('@/pages/Center/AllOrder'),

      }
    ]
  },
  {
    name: 'paysuccess',
    path: '/paysuccess',
    component: ()=>import('@/pages/PaySuccess'),

    meta: {
      footShow: true
    }// 为了练习 写在组件守卫 了
  },
  {
    name: 'pay',
    path: '/pay',
    component: ()=>import('@/pages/Pay'),

    meta: {
      footShow: true
    },
    beforeEnter: (to, from, next) => {
      if(from.path=='/trade'){next()}
      else{next(false)}
    }
  },
  {
    name: 'trade',
    path: '/trade',
    component: ()=>import('@/pages/Trade'),
    
    meta: {
      footShow: true
    },
    // 路由独享守卫 进入trade之前进行判断
    beforeEnter: (to, from, next) => { // 进入之前
      // ...
      if(from.path=='/shopcart'){next()}
      else{next(false)} // 停留在来之前的页面

    }
  },
  {
    name: 'shopcart',
    path: '/ShopCart',
    component: ()=>import('@/pages/ShopCart'),

    meta: {
      footShow: true
    }
  },
  {
    name: 'addCartSuccess',
    path: '/AddCartSuccess',
    component: ()=>import('@/pages/AddCartSuccess'),

    meta: {
      footShow: true
    }
  },
  {
    name: 'detail',
    path: '/detail/:proId?',
    component: ()=>import('@/pages/Detail'),

    meta: {
      footShow: true
    }
  }, {
    name: 'home',
    path: '/home',
    component: ()=>import('@/pages/Home'),

    meta: {
      footShow: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: ()=>import('@/pages/Login'),
  },
  {
    name: 'search',
    // path: '/search:keyword?',   // 占位符 
    path: '/search/:keyword?',   // 占位符 
    component: ()=>import('@/pages/Search'),

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
    component: ()=>import('@/pages/Register'),

  },
  {
    path: '*',
    redirect: '/home'
  },
]
