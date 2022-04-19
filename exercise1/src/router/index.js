// 这里是路由配置
import vue  from 'vue' // 引入vm
import VueRouter from 'vue-router' // 引入路由
import Store from '@/vuex/sort'
vue.use(VueRouter) // 使用路由
import routes from './routers'

      const rou = new VueRouter({
      // 配置路由
      routes,
      // 添加滚动行为，新页面到顶部
      scrollBehavior(to ,from,savePosition){
        return { x:0 , y : 0}
      },
     
})
export default rou

rou.beforeEach( async (to, from, next) => {
      // to 获取到要要跳转的路由信息
      // from 获取到从哪来的路由信息
      let username = Store.state.user.userInfo.name // 获取仓库存储的登录用户信息，不能直接用userInfo这个对象判断，始终为真
      let isLogin = Store.state.user.token // 获取仓库token判断是否登录
      next()
      if(isLogin){ //如果登录成功
            if(to.path == '/login'){ // 如果要去登录页面
                  next('/home')
            }
            else{
                  //登录了但是不跳转登录页面
                  // 跳转时判断对应的路由要有用户的信息
                  if(username){ // 如果有用户信息
                        next()
                  }
                  else{  // 如果没有用户信息
                        try {
                              await  Store.dispatch('user/tokenLogin');
                              next();
                        } catch (error) {
                              // 用户登录了 还是没获取到数据
                              // 登录的token过期了
                                    await Store.dispatch('user/logout')
                                    alert('登录已经过期，请重新登录')
                                    next('/login')
                           
                        }
                  }
            }
      }
      else{        // 如果未登录 不能去订单，个人中心等交易和支付相关的页面
            let toPath = to.path
           if(toPath=='/trade'||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            next('/login?redirect='+toPath) // 把未登录时点击想去的地方存入query,登录成功再跳过去
           }
      }

});

// // 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题  push
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catclskl;h(err => err)
// }
// const originalReplace = VueRouter.prototype.replace   // replace
// VueRouter.prototype.replace = function replace (location) {
//   return originalReplace.call(this, location).catch(err => err)
// }




/*

{
      path:'/Catt',
      component:Cat,
      meta:{
            isAuth:false,// 是否校验拦截
            title:'猫咪'
      },
      beforeEnter: (to, from, next) => {
            // ...
            next()
      },     

//暴露路由前给其配置    全局前置路由守卫   初始化和每次路由切换之前调用
rou.beforeEach((to, from, next) => {
      if(!to.meta.isAuth) {// 或name
      next();}
});
//暴露路由前给其配置    全局后置置路由守卫   每次路由切换之后调用
rou.afterEach((to, from) => {
      document.title=to.meta.title

});

//暴露路由
export default rou;




// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题  push
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace   // replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}
*/
