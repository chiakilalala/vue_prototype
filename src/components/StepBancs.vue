<template>
  <span>
      <span :class="this.step ?'alert':''">客戶預填表單</span>/
      <span :class="this.step >1 ?'alert':''"> 列印表單</span>/
      <span :class="this.step >2 ?'alert':''"> 照相</span>/
      <span :class="this.step >3 ?'alert':''"> 表單掃描</span>/ 
      <span :class="this.step >4 ?'alert':''">交易執行</span> /       
      <span :class="this.step >5 ?'alert':''">交易覆核</span>/ 
      <span :class="this.step >6 ?'alert':''">掃描交易憑條副本</span>
  </span>
</template>
<script>
export default {
  name:'StepBancs',
  props:['step'],
  mounted() {
    console.log(this.step)
  },

}
</script>
<style>


</style>
