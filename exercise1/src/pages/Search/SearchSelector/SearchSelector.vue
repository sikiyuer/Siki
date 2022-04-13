<template>
  <div class="clearfix selector">
    <!-- 品牌属性 -->
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <li 
          @click="markClick(mark)"
           v-for="mark in trademarkList" 
           :key="mark.tmId">

           {{mark.tmName}}</li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <!-- 售卖属性 点击 -->
    <div class="type-wrap" v-for="art in attrsList" :key="art.attrId">
      <div class="fl key">{{art.attrName}}</div>
      <div class="fl value">
        <ul class="type-list">
          <li @click="shuxing(art,sx)" v-for="(sx ,index)  in art" :key="index">
            <a >{{sx}}</a>
          </li>
         
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
   
  </div>
</template>

<script>
import {mapGetters} from "vuex"
  export default {
    name: 'SearchSelector',
    computed: { // 获取search仓库的数据
      ...mapGetters({
      trademarkList: "search/trademarkList",
      attrsList: "search/attrsList",
    }),
   
    },
     methods: {  
      markClick(mark){  // 品牌点击的回调 
      // 整理参数，给父组件（带给服务器的参数都在父组件里面） 重新发送数据
       this.$emit('getmark',mark)
        
        },
        shuxing(yiji,erji){  // 属性的点击回调
      // 整理参数，给父组件（带给服务器的参数都在父组件里面） 重新发送数据
          // console.log(yiji,erji);
          this.$emit('attrInfo',yiji,erji)
        }
    },

  }
</script>

<style lang="less" scoped>
  .selector {
    border: 1px solid #ddd;
    margin-bottom: 5px;
    overflow: hidden;

    .logo {
      border-top: 0;
      margin: 0;
      position: relative;
      overflow: hidden;

      .key {
        padding-bottom: 87px !important;
      }
    }

    .type-wrap {
      margin: 0;
      position: relative;
      border-top: 1px solid #ddd;
      overflow: hidden;

      .key {
        width: 100px;
        background: #f1f1f1;
        line-height: 26px;
        text-align: right;
        padding: 10px 10px 0 15px;
        float: left;
      }

      .value {
        overflow: hidden;
        padding: 10px 0 0 15px;
        color: #333;
        margin-left: 120px;
        padding-right: 90px;

        .logo-list {
          li {
            float: left;
            border: 1px solid #e4e4e4;
            margin: -1px -1px 0 0;
            width: 105px;
            height: 52px;
            text-align: center;
            line-height: 52px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
            color: #e1251b;
            font-style: italic;
            font-size: 14px;

            img {
              max-width: 100%;
              vertical-align: middle;
            }
          }
        }

        .type-list {
          li {
            float: left;
            display: block;
            margin-right: 30px;
            line-height: 26px;

            a {
              text-decoration: none;
              color: #666;
            }
          }
        }
      }

      .ext {
        position: absolute;
        top: 10px;
        right: 10px;

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
          padding: 0 10px;
          background: #fff;
          border: 1px solid #d5d5d5;
        }

        a {
          color: #666;
        }
      }
    }
  }
</style>