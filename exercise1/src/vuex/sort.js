// 该文件用于创建vuex的核心--store
import Vue from 'vue'
import Vuex from 'vuex' // 引入vuex
Vue.use(Vuex)             // 这里引用vue并直接调用使用vuex，否则执行顺序出错无法解析执行到下面的配置

import home from './home'
import search from './search/index'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'



export default new Vuex.Store({   //export default 是封装代码，使外部可用
      modules:{
            // namespaced:true,
            home,
            search,
            detail,
            shopcart,user,trade
      }

})






















// <template>
//   <div class="hello">
//     <h1>{{sum}}</h1>
//     <!-- <h1>{{msg1}}</h1> -->
//     <!-- <h1>{{msg2}}</h1>  -->
//     <!-- 从getters里面获取数据 -->
//     <!-- <h2>{{bigNum}}</h2> -->
//     <h2>{{msg}}</h2>
//     <button @click="add(num)">点击加1</button>
//     <button @click="dec(num)">点击减1</button>
//     
//   </div>
// </template>

// <script>
// import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'   // 引入属性映射 
// export default {
//   name: 'NumAll',
//   data() {
//     return {
//       num:10,
//     }
//   },
//   computed:{
//     // ...mapState({msg1:'msg1',msg2:'msg2'}) // 通过mapState来调用state数据直接生成需要的计算属性
//     // ...mapState(['msg1','msg2','sum']), // 通过mapState来直接生成需要的计算属性
//     ...mapState('aaa',['msg1','msg2','sum']), // 模块化调用

//     // ...mapGetters({bigNum:'bigNum',msg:'msg'}) // 通过mapGetters来从getters直接生成需要的计算属性
//     ...mapGetters('aaa',['bigNum','msg']) // 通过mapGetters来从getters直接生成需要的计算属性
//   },
//   methods: {
//     // add(){
//         //调用vuex
//         // this.$store.dispatch('add',this.num)  // 这里是调用action进行  复杂的逻辑判断  之后commit在mutations里面进行运算
//         // this.$store.commit('ADD',this.num)   // 如果不需要逻辑运算可以直接调用commit进入mutations运算  this.$store.commit('ADD',this.num) 
//     // },



//     // ...mapMutations({add:'ADD',dec:'DEC'}) // 调用生成求生成调用mutations里面的方法（不进行逻辑判断）
//     ...mapActions('aaa',{add:'add',dec:'dec'}) // 调用生成求生成调用action里面的方法（进行逻辑判断）
//   },
//   
// }
// </script>


// <style scoped>

// </style>

