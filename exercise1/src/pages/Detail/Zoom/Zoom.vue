<template>
  <div class="spec-preview">
    <!-- 展示的图片 -->
    <img :src="imgObj.imgUrl" />
    <!-- 写鼠标移动事件的地方 -->
    <div class="event" @mousemove="handler"></div>
    <!-- 放大的图片的展示 -->
    <div class="big">
    <img :src="imgObj.imgUrl" ref="big"/>

    </div>
    <!-- 蒙版 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data() {
      return {
        index:0,// 定义一个下标接受下面轮播传来的点击索引
      }
    },
    props:['skuImageList'],
    computed: {
      imgObj(){
        return this.skuImageList[this.index]||{}
      }
    },
    mounted() {
      this.$bus.$on('changeImg',index=>{this.index = index})
    },
    methods: {
      handler(e){  // 鼠标在图片区域内移动过触发的回调
        // console.log(33);
        let mask = this.$refs.mask
        let big = this.$refs.big
        let left = e.offsetX - mask.offsetWidth/2 // 计算蒙版到左侧的边距
        let top = e.offsetY - mask.offsetHeight/2 // 计算蒙版到顶部的边距

        if(left<=0) left = 0
        if(left>=mask.offsetWidth) left = mask.offsetWidth
        if(top<=0) top = 0
        if(top>=mask.offsetHeight) top = mask.offsetHeight
        
        // console.log(left,top);
        mask.style.left = left + 'px'
        mask.style.top = top +'px'
         big.style.left = left* -2 + 'px'
        big.style.top = top* -2 +'px'
        // e.offsetX
      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>