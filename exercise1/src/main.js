import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入路由 --p配置项在router下的index.js里面
import TypeNav from './components/TypeNav/index'  // 注册全局导航组件
import Carsouel from './components/Carsouel/index'  // 注册全局轮播组件
import Pagination from './components/Pagination/index'  // 注册全局分页组件
import { Button,MessageBox } from 'element-ui';  // 按需引入element ui
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.use(Button)
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
// 统一引入暴露所有的api接口
 import * as API from '@/api'
Vue.config.productionTip = false //——关闭生产提示
import VueLazyload from 'vue-lazyload'
import imglazy from '../public/images/banner1.jpg'
Vue.use(VueLazyload,{ //懒加载配置参数
      loading:imglazy   // 默认图片
})
// 引入表单验证插件
import validate from '@/plugins/validate'
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this; // 定义全局事件总线
    Vue.prototype.$API = API; // 定义全局总接口
  },
  store:Store,
    router:router,
}).$mount('#app')


