<template>
  <div class="pagination">
    <button v-if="starandendNum.start > 1" @click="$emit('getPage',1)" :class="{active:pageNo==1}">1</button>
    <button :disabled="pageNo ==1" @click="$emit('getPage',pageNo - 1)">上一页</button>
    <button v-if="starandendNum.start >2">···</button>

    <button v-for="(num, index) in starandendNum.end" 
    :key="index" v-show="num>=starandendNum.start" 
    @click="$emit('getPage',num)"
    :class="{active:pageNo==num}"
    >{{num}}</button>
    
    
    <button v-if="starandendNum.end < totalPage - 1">···</button>
    <button v-if="starandendNum.end < totalPage"  :class="{active:pageNo==totalPage }" @click="$emit('getPage',totalPage)">{{totalPage}}</button>
    <button :disabled='pageNo == totalPage' @click="$emit('getPage',pageNo + 1)">下一页</button>
    <!-- <p>{{starandendNum.end}}</p> -->
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'], // 获取页码相关信息
    computed: {
      totalPage(){ // 计算总的页数
        return Math.ceil(this.total/this.pageSize)
      },
      // 计算出连续的页码的起始数字和结束数字 
      starandendNum(){
        // 解构出需要的属性
        const {continues,pageNo,totalPage} = this;
        let start = 0
        ,end = 0 // 定义初始的开始页码和结束页码（连续的）
        // 当前设置的连续页码是5 ，就需要至少 5 页 
        // 如果不够5 页
        if(continues > totalPage){ // 如果连续的页码大于总页数
        // console.log(1);
          start = 1;
          end = totalPage; //   结束页就是总的页数
        }
        else{  // 如果正常情况，总页数大于连续的页数
        // console.log(2);

            // start = pageNo - Math.floor(continus/2);
            start = pageNo - parseInt(continues/2);
            end = pageNo + parseInt(continues/2);
            console.log(start);
            // start可能为负数 如点击的页数为
            if(start<1){ // 如果计算的初始页小于1  则计算页码为1 -5
            start = 1
            end= continues

            }
            if(end > totalPage){ // 如果计算的结束页大于总页码 计算为 26 - 31
            start = totalPage - continues +1
                end= totalPage
            }
        }
 return {start,end}
       
      }
    },
  }
</script>

<style lang="less" scoped>
.active{
  background: skyblue;
}
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
