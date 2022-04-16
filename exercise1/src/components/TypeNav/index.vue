<template>
    <!-- 商品分类导航 -->
        <div class="type-nav">
            <div  @mouseleave="leave" class="container">
                <h2  @mouseenter="showList" class="all">全部商品分类</h2>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <!-- 定义过度动画样式 -->
                <transition name='siki'>
                
                <div   v-show="show" class="sort">
                     <!-- a的点击事件委派给这个元素 -->
                    <div class="all-sort-list2" @click.prevent="goSearch">

                        <div v-for="(yiji,index) in Nav" :key="yiji.categoryId" class="item">
                            <h3  @mouseenter="enter(index)" :class="{cur:nav_index==index}" >
                              <!-- 直接在a上面绑定编程路由跳转的函数不太好，还是循环太多了 -->
                              <!-- 所以将点击事件委派给父元素，定义自定义属性data-catName来告诉父组件点击的是哪个元素 -->
                                <a :data-catName='yiji.categoryName' :data-catId1='yiji.categoryId' href="">{{yiji.categoryName}}</a> 
                                <!-- <router-link to="search"> {{yiji.categoryName}} </router-link>  声明式导航容易卡顿-->

                            </h3>
                            <div class="item-list clearfix">
                                <div v-for="(erji) in yiji.categoryChild " :key="erji.categoryId" class="subitem">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-catName='erji.categoryName' :data-catId2='erji.categoryId' href="">{{erji.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="sanji in erji.categoryChild" :key="sanji.categoryId">
                                                <a :data-catName='sanji.categoryName' :data-catId3='sanji.categoryId' href="">{{sanji.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                </transition>

            </div>
        </div>
</template>

<script>
import {mapState} from 'vuex'
import throttle from 'lodash/throttle' // 引入lodash 实现节流(按需引入)
export default {
      name:'NavAll',
      data() {
        return {
          nav_index:-1 ,  // 定义获取的当前导航序号
          show:true    // 默认展示列表
        }
      },
      methods: {
        // enter(index){
        //   console.log(index);
        //   this.nav_index = index;
        // },
        enter:throttle(function(index){  // 将函数改为调用节流
              // console.log(index);
          this.nav_index = index;
        },50),  // 将es6写法改为es5写法调用节流函数


         leave(){
          this.nav_index = -1;
          if(this.$route.path!='/home')
          this.show = false
        },
        goSearch(e){
          // 这个函数在父元素身上，通过传来触发这个函数的节点就能知道是谁点击触发的函数
          // 获取到有自定义属性 data-catName的节点，一定是a标签
          // 节点有一个dataset属性，可以获取节点的自定义属性和属性 e.dataset
          // 解构获取自定义属性来判断点击的节点是否有自定义属性data-catName  浏览器自动小写，为catname
          // console.log(e);
          // console.log(e.target);
          // console.log(e.target.dataset);
          let { catname ,catid1,catid2,catid3} =  e.target.dataset
          // 如果有这个自定义属性则进行跳转
          // console.log(catname);
          if(catname){
            // console.log("是a标签");
            // 定义跳转的路径和参数
            let location ={ name :'search'} // 定义路径
            let query = { catName : catname } // 解构拿到传递的导航名字
            if(catid1){
            // console.log("是一级导航");
            query.catId1 =catid1  // 根据不同的导航自定义属性来决定传递的id

            }
            else if(catid2){
            // console.log("是二级级导航");
            query.catId2 =catid2


            }
            else if(catid3){
            // console.log("是三级导航");
            query.catId3 =catid3


            }

            // console.log(location , query);
            // 将动态生成的query(带有对应的导航id) 添加到location里面
            location.query = query;
            // 路由跳转
            if(this.$route.params){  // 如果跳转时有params参数
            // console.log("点击了三级导航");
            // console.log("当前传递的是query参数");
            // console.log("读取的params为输入的==",this.$route.params);

              location.params = this.$route.params
              this.$router.push(location,()=>{},()=>{})
            }
          //  this.$router.push({
          //    name:'search'
          //  },()=>{},()=>{})
          }
        },
        showList(){
          // console.log(233);
          this.show = true}
       
      },
     computed:{
        //  映射vux的home小仓库获取报存的的导航列表数组,并改名为Naav
         ...mapState('home',{Nav:'NavList'})
     },
      mounted() { 
          //  // 挂载成功发送请求调用vuex的home小仓库的getNav  放到app里面，避免多次获取
          //   this.$store.dispatch('home/getNav');
            // 挂载时判断当前路由是否为home路由组件，则隐藏列表
            if(this.$route.path!='/home'){ this.show = false}
      },
}
</script>

<style>
/* 过度动画  进入时候*/
 .siki-enter{
  opacity: 0;
  transform: scale(1);
}
.siki-enter-to{
  opacity: 1;
  /* transform: scale(1.5); */

}
.siki-leave{
  opacity: 1;
  transform: scale(1);
}
.siki-leave-to{
  opacity: 0;
  /* transform: scale(1.5); */

}
.siki-enter-active{
  transition: all 1s;
} 
.siki-leave-active{
  transition: all 1s;
} 
.cur{
background: skyblue;;

}
    .type-nav {
  border-bottom: 2px solid #e1251b;
}
    .type-nav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}
    .type-nav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
    .type-nav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
    .type-nav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}
    .type-nav .container .sort .all-sort-list2 .item h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}
    .type-nav .container .sort .all-sort-list2 .item h3 a {
  color: #333;
}
    .type-nav .container .sort .all-sort-list2 .item .item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}
    .type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}
    .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}
    .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl.fore {
  border-top: 0;
}
    .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}
    .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}
    .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}
    .type-nav .container .sort .all-sort-list2 .item:hover .item-list {
  display: block;
}
</style>