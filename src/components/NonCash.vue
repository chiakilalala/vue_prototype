<template>
  <span>
  <span :class="this.step  ?'alert':''">確定客戶預填表單</span>/
  <span :class="this.step >1 ?'alert':''"> 列印表單</span>/
  <span :class="this.step >2 ?'alert':''"> 照相 </span>/
  <span :class="this.step >3 ?'alert':''"> 證件掃描</span>/   
  <span :class="this.step >4 ?'alert':''"> 文件掃描檢視</span>/       
  <span :class="this.step >5 ?'alert':''">交易覆核</span>
  </span>
</template>
<script>
export default {
  name:'NonCash',
  props:['step'],
  mounted() {
    console.log(this.step)
  },

}
</script>
<style>
/* .alert {
  color: red;
} */

</style>