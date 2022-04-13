<template>
  <div>
    <NavAll />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag" >
            <!-- 面包屑 分类 -->
            <li class="with-x" v-show="searchParams.catName">{{searchParams.catName}} <i @click="removebread">X</i></li>
            <!-- 面包屑 关键字-->
            <li class="with-x" v-show="searchParams.keyword">{{searchParams.keyword}} <i @click="removekeyword">X</i></li>
             <!-- 面包屑 子组件传来的品牌-->
            <li class="with-x" v-show="searchParams.trademark">{{searchParams.trademark.split(':')[1]}} <i @click="removemark">X</i></li>
            <!-- 面包屑 子组件传来的售卖属性  点击移除-->
            <li class="with-x" v-for="(attr, index) in searchParams.props" :key="index" >{{attr.split(':')[1]}} <i @click="removeattr(index)">X</i></li>

              
          </ul>
        </div>
        <!--selector  使用自定义事件接收子组件传来的品牌参数对象-->
        <!-- 产品参数组件 -->
        <SearchSelector @attrInfo ="attrInfo" @getmark = "getmark"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder(0)">
                  <a href="#">
                    综合
                  <span class="iconfont" v-show="isOne" :class="{'icon-jiantou_xiangshang':isAsc,'icon-jiantou_xiangxia':isDesc}"></span>
                  </a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder(1)">
                  <a href="#">
                    价格
                  <span v-show="isTwo" class="iconfont" :class="{'icon-jiantou_xiangshang':isAsc,'icon-jiantou_xiangxia':isDesc}"></span>
                    </a>
                </li>
                
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`" target="_self">
                      
                      <img :src="good.defaultImg"/>
                      </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
             
            </ul>
          </div>
        <Pagination :pageNo = "searchParams.pageNo" :pageSize = "searchParams.pageSize" :total="total" :continues = "5" @getPage = 'getPage'></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Search",
  components: { SearchSelector },
  beforeMount() {  // 挂载之前整理参数
  
    // console.log(this.$route.query);
    // 复杂
    // this.searchParams.catId1=this.$route.query.catId1
    // this.searchParams.catId2=this.$route.query.catId2
    // this.searchParams.catId3=this.$route.query.catId3
    // this.searchParams.catName=this.$route.query.catName
    // this.searchParams.keyword=this.$route.params.keyword
    // ES 6 的语法 Object.assign 合并对象
    Object.assign(this.searchParams,this.$route.query,this.$route.params)

  },
  data() {// 这是需要传给服务器的参数
    return {
      
      searchParams: {
        //1级分类id
        category1Id: "",
        //2级分类id
        category2Id: "",
        //3级分类id
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "2:desc",
        pageNo: 8,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  mounted() { // 挂载时调用方法请求数据
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("search/searchInfo", this.searchParams);
    }, 
    removebread(){ // 三级列表面包屑，属性置空 重新发送请求 underfind 不会被发送给服务器，自动丢弃
    this.searchParams.catName= undefined  
    this.searchParams.keyword= undefined  
     this.searchParams.category1Id =undefined
      this.searchParams.category2Id =undefined
      this.searchParams.category3Id = undefined
    this.getData();
    // 如果有params参数(搜索的)要保留
    if(this.$route.params)
    this.$router.push({name:'search',params:this.$route.params})

    },
    removekeyword(){ // 关键子面包屑的置空并重新发请求
    this.searchParams.keyword=''
    this.getData();

    //  全局事件总线通知header，将输入的值清空
    this.$bus.$emit('clear')
    // 将路由信息重置（自己跳转自己就没有参数了）
    this.$router.push({name:'search',query:this.$route.query})

    },
    removemark(){ // 品牌关键字面包屑 删除置空 重新发送请求
      this.searchParams.trademark = ''
      this.getData()
    },
    removeattr(index){ //  删除售卖属性的回调
      this.searchParams.props.splice(index,1)
      this.getData()
    },
    getmark(value){   // 接收子组件自定义事件点击关键字的回调
        console.log("接收的品牌参数",value);  
        // 参数格式为  ‘ ID：品牌名字      ’ 
        this.searchParams.trademark = `${value.tmId}:${value.tmName}`
        this.getData()
    },
    attrInfo(yiji,erji){  //  接收子组件自定义事件属性列表的回调
      console.log("接收的属性值和属性分类为",yiji,erji);
      // 整理参数
      let props = `${yiji.attrId}:${erji}:${yiji.attrName}`
      // 重复添加判断
      if(this.searchParams.props.indexOf(props)){ // 如果没有,就把属性参数push到 请求参数里
      this.searchParams.props.push(props)}
      this.getData()
    },
    changeOrder(flag){ // 点击切换排序分类和排序方式
         this.searchParams.order = flag? this.isTwo? this.isAsc? '2:desc':'2:asc' :'2:desc' :this.isOne? this.isAsc? '1:desc':'1:asc' :'1:desc'
         this.getData()
          
    }
    ,getPage(page){  // 自定义事件 获取子组件点击的页码
        // console.log("点击了页码",page);
        this.searchParams.pageNo = page;
        this.getData();
    }
  },
  computed: {// 获取search仓库的 处理过的商品数据
    ...mapGetters({goodsList: "search/goodsList", total:"search/total"}),
    isOne(){ // 判断是综合还是价格排序  返回当前是否有类名
         return this.searchParams.order.indexOf('1') != -1
      },isTwo(){
         return this.searchParams.order.indexOf('2') != -1
      },
      isAsc(){  // 判断升序还是降序 返回当前是否升序
          return this.searchParams.order.indexOf('asc')!=-1
      },isDesc(){  // 判断升序还是降序
          return this.searchParams.order.indexOf('desc')!=-1
      }
  },
  watch: {
    $route(){  // 监听路由信息是否发生变化，变化再次发送请求
    // 再次发请求之前重新整理数据
    Object.assign(this.searchParams,this.$route.query,this.$route.params)
      this.getData();
      // 发送后清空id，来接收下一次的参数
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined

    }
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>