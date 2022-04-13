<template>
          <div class="floorBanner">
              <div class="swiper-container" ref="cur" id="floor1Swiper">
                <div class="swiper-wrapper">
                  <div
                    v-for="cars in list"
                    :key="cars.id"
                    class="swiper-slide"
                  >
                    <img :src="cars.imgUrl" />
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
                    </div>
</template>

<script>
import Swiper from "swiper";

export default {
name:'Carsouel',
props:['list'],
  watch: {
    list: {
      immediate: true,
      handler(){
          this.$nextTick(()=>{
               var mySwiper = new Swiper(this.$refs.cur, {
          loop: true, // 循环模式选项

          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },

          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },

          // 如果需要滚动条
          scrollbar: {
            el: ".swiper-scrollbar",
          },
        });
          })
       
      },
    },
  },
}
</script>

<style>

</style>