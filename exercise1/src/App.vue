<template>
  <div id="outer">
    <Header/>
    <router-view></router-view>
    <Foolter v-show="$route.meta.footShow"/>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Foolter from './components/Foolter/index.vue'
export default {
  name: 'App',
  components: {
    Header,Foolter
  },
  mounted(){
    // 挂载成功发送请求调用vuex的home小仓库的getNav
            this.$store.dispatch('home/getNav');
            console.log("app组件，挂载请求了navList数据");
  }
}
</script>

<style>


</style>
