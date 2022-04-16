import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入路由 --p配置项在router下的index.js里面
import TypeNav from './components/TypeNav/index'  // 注册全局导航组件
import Carsouel from './components/Carsouel/index'  // 注册全局轮播组件
import Pagination from './components/Pagination/index'  // 注册全局分页组件
import {searchInfo} from '@/api'
  // console.log(searchInfo())
// __引入myMock.js 来让模拟的数据执行一次 
import '@/mock/myMock'
// __引入swiper样式
import 'swiper/css/swiper.css'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsouel.name, Carsouel)
Vue.component(Pagination.name, Pagination)


import Store from './vuex/sort.js'
Vue.config.productionTip = false //——关闭生产提示


// Vue.use(router) // 使用路由
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this; // 定义全局事件总线
  },
  store:Store,
    router:router,
}).$mount('#app')


