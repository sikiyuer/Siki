<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in carlist " :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" @change="changeIschecked(cart)"  :checked="cart.isChecked" name="chk_list">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" @click="handler('des',-1,cart)" class="mins">-</a>
            <input autocomplete="off" @change="handler('inp',$event.target.value*1,cart)" type="text" minnum="1" class="itxt" :value='cart.skuNum'>
            <a href="javascript:void(0)" @click="handler('add',1,cart)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum*cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="Deletepro(cart)" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" @change="SelectAll" :checked="isAllChecked&&carlist.length>0" type="checkbox">
        <span >全选</span>
      </div>
      <div class="option">
        <a @click="delAllSelect">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn" target="self">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle' // 引入lodash 实现节流(按需引入)

  export default {
    name: 'ShopCart',
    mounted() {
      this.getCarList()
    },
    computed: {
      ...mapGetters('shopcart',{carlistAll:'carlistAll'}),
      carlist(){
        return this.carlistAll.cartInfoList||[];
      },
      totalPrice(){ // 计算总价
        let sum = 0;
        this.carlist.forEach(list => {
          if(list.isChecked)
          sum+=list.skuPrice*list.skuNum
        });
        return sum
      },
      isAllChecked(){ // 判断是否全部勾选
        return this.carlist.every(list=>list.isChecked == 1)
      }
    },
    methods: {
      getCarList(){
       return this.$store.dispatch('shopcart/getCartList')
      },
    handler:throttle( async function(type,change,obj){ // 数量改变发送请求改变数据  传来点击的哪个，改变数量，对应的商品
        // alert('数量改变了'+type+change+obj.id)
        switch (type) {
            case 'add':
              change = 1

            break;
            case 'des':
              // 如果 大于1可以发请求
              if(obj.skuNum>1){ change = -1} else change = 0  //如果当前为1个商品则变化为0

            break;
            case 'inp':
              if(isNaN(change)|| change<1){
                change = 0;
              }
              else { change = parseInt(change) - cart.skuNum} 
              change = 1
            break;
        
          default:
            break;
        }
        try {
        await this.$store.dispatch('detail/addCar',{skuId:obj.skuId,skuNum:change})
          this.getCarList() // 修改成功重新发送请求
        } catch (error) {
          console.log(new Error('商品数量修改失败'));
        }
        
      },300),
      // 删除商品
     async Deletepro(obj){
        // console.log(obj.skuId);
       try { // 如果删除成功
      await    this.$store.dispatch('shopcart/Deletepro',obj.skuId)
      this.getCarList()
       } catch (error) {  
          console.log(new Error(error.message));
       }
      },
    // 改变商品选中的状态
    async changeIschecked(cart){
      try {
        await this.$store.dispatch('shopcart/cartChangeIschecked',{skuId:cart.skuId,isChecked:Math.abs(cart.isChecked - 1)})
        this.getCarList();
      } catch (error) {
        alert('改变失败')
      }
    },
    // 改变所有商品的选中状态
   async SelectAll(e){
     let isChecked = e.target.checked?'1':'0'  // 获取全选按钮的状态并派发action
    //  alert(isChecked)
     try {
       await  this.$store.dispatch('shopcart/updateAllChecked',isChecked)
       this.getCarList()
     } catch (error) {
      alert('全选失败'+error.message)
     }
        
    },
    // 删除选中的商品
   async delAllSelect(){
     try {
      await this.$store.dispatch('shopcart/delAllSelect')
       this.getCarList()
     } catch (error) {
       alert('删除所有选中失败')
     }
    }
    },
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

      

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>