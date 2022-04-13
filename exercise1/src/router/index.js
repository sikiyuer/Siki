// 这里是路由配置
import vue  from 'vue' // 引入vm
import VueRouter from 'vue-router' // 引入路由

vue.use(VueRouter) // 使用路由
import routes from './routers'

export default new VueRouter({
      // 配置路由
      routes,
      // 添加滚动行为，新页面到顶部
      scrollBehavior(to ,from,savePosition){
        return { x:0 , y : 0}
      },
     
})


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
