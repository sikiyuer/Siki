<template>
  <div class="">这是主页
  <!-- 导航分类 -->
  <NavAll></NavAll>
<List></List>
<Recommend></Recommend>
<Rank></Rank>
<Like></Like>
<Floor v-for="f in floors" :key="f.id" :list='f'></Floor>
<!-- <Floor></Floor>  遍历生成两个，这个不需要了-->
<Brond></Brond>
  </div>
</template>

<script>
import List from './ListContainer/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brond from './Brond/index.vue'
import {mapState} from 'vuex'
   
  
export default {
  name:'SikiHome',
  components:{List,Recommend,Rank,Like,Floor,Brond},
 mounted() {
        this.$store.dispatch("home/getFloor")
      
  }, 
  computed: {
      ...mapState('home',{floors:"floorList"})
  },

}
</script>

<style>

</style>