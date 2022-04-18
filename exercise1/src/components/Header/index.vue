<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if='!userName'>
            <span>请</span>
            <router-link to="login">登录</router-link>
            <router-link to="register" class="register"
              >免费注册</router-link
            >
          </p>

          <p v-if='userName'>
            <router-link to="login">登录名{{userName}}</router-link>
            <a to="register" @click="logout" >退出登录</a
            >
          </p>



        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="/">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form  class="searchForm">
          <input
            type="text"
            id="autocomplete"
            v-model="searchWord"
            class="input-error input-xxlarge"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            @click="search"
            type="button"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "SikiHeader",
  data() {
    return {
      searchWord: "",
      isCommit: false,
    };
  },
  computed: {
    userName(){
      return this.$store.state.user.userInfo.loginName
    },
  },
  // watch: { $route (to, from) { this.$router.go(0) } },
  methods: {
    
    search() {
      // 此函数是点击搜索的回调，将路由定向到搜索结果页面

        // this.$router.push(`/search/${this.searchWord}?myquery=${this.searchWord}`) // 直接传递param和query参数
        // this.$router.push("/search/"+ this.searchW ord +"?myquery="+this.searchWord) // 直接传递param和query参数

        if(this.$route.query){
          // 点击搜索
          let location = { name: "search", params: {keyword: this.searchWord||undefined}};
          location.query = this.$route.query
           this.$router.push(location)


        // console.log("点击了搜索，传入的query是", this.searchWord);
        // console.log("当前输入的是", this.$route.query);
        // location.query = this.$route.query;
        // this.$router.push(
        //   location,
        //   () => {},
        //   () => {}
        // );

        }

        // let query = this.$route.query // 获取当前点击的三级列表信息

        // this.$router.push({
        //   name: "search",
        //   params: {
        //     searchWord: this.searchWord,
        //   },
        //     // query: {
        //     //   query
        //     // },
        // });


        // },()=>{},()=>{})
    },
   async  logout(){ // 退出登录
    try {
      await  this.$store.dispatch('user/logout')
      this.$router.replace('/home')
    } catch (error) {
        alert(error.message)
    }
    }
  },
  mounted() { // 挂载时就开始监听全局事件总线
    this.$bus.$on('clear',()=>{
      this.searchWord = '';
    })
  },
};
</script>

<style scoped>
.header > .top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}
.header > .top .container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.header > .top .container .loginList {
  float: left;
}
.header > .top .container .loginList p {
  float: left;
  margin-right: 10px;
}
.header > .top .container .loginList p .register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}
.header > .top .container .typeList {
  float: right;
}
.header > .top .container .typeList a {
  padding: 0 10px;
}
.header > .top .container .typeList a + a {
  border-left: 1px solid #b3aeae;
}
.header > .bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.header > .bottom .logoArea {
  float: left;
}
.header > .bottom .logoArea .logo img {
  width: 175px;
  margin: 25px 45px;
}
.header > .bottom .searchArea {
  float: right;
  margin-top: 35px;
}
.header > .bottom .searchArea .searchForm {
  overflow: hidden;
}
.header > .bottom .searchArea .searchForm input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0px 4px;
  border: 2px solid #ea4a36;
  float: left;
}
.header > .bottom .searchArea .searchForm input:focus {
  outline: none;
}
.header > .bottom .searchArea .searchForm button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}
.header > .bottom .searchArea .searchForm button:focus {
  outline: none;
}
</style>