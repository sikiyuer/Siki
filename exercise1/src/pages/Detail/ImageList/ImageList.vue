<template>
  <div class="swiper-container" ref='detail'>
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(list,index) in skuImageList" :key="list.id">
        <img :class="{active:isActive == index}" 
        @click="changeIndex(index)"
        :src="list.imgUrl">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    data() {
      return {
        isActive: 3, // 将第n+1个小图设置为active选中状态
      }
    },
    name: "ImageList",
    props:['skuImageList'],
    methods: {
      changeIndex(index){
        this.isActive = index;
        // 通知 兄弟元素（放大镜）更改对应点击的图片
        this.$bus.$emit('changeImg',index)
      }
    },
    watch: {
      skuImageList(newVal,oldVal){
          this.$nextTick(()=>{
            new Swiper (this.$refs.detail, {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
             slidesPerView : 3, 
             slidesPerGroup : 3,
                 centeredSlides:true,//设定为true时，active slide会居中，而不是默认状态下的居左。
    
  })     

          })



      }
    },
    
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>