<template>
  <div>
        <ul>
              <li v-for="nav in navAll" :key="nav.id">
                    <p>{{nav.name}} </p>
                    <p>{{nav.age}} </p>
                    <span v-for="erji in nav.erji" :key="erji.id">二级分类---{{erji.name}}</span>
                    </li>
        </ul>
 </div>
</template>

<script>
import axios from 'axios'                     // 引入axios

export default {
      name:'NavAll',
      data() {
            return {
                  navAll:{}
            }
      },
      methods:{   

            getAjax(){
            //     axios.get("http://localhost:8080/siki").then(
            //     axios.get("http://localhost:8080/dl/siki").then( // 走代理
                axios.get("http://localhost:8080/navAll.js").then(    // 走本地
                             response=>{
                                  
                              //      const a = {}= 
                                   this.navAll = response.data
                                   console.log(this.navAll);
                                    
                             },
                             error=>{
                                   console.log("哎呀，出错了",error.message);
                             }
                )
            },
      },
      mounted() {
            this.getAjax()
      },
}
</script>

<style>

</style>