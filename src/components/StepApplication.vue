<template>
  <span>
      <span :class="this.step  ?'alert':''">證件掃描</span>/
      <span :class="this.step >1 ?'alert':''"> 照相</span>/
      <span :class="this.step >2 ?'alert':''"> 主管覆核</span>/
      <span :class="this.step >3 ?'alert':''"> 客戶填單</span>/
      <span :class="this.step >4 ?'alert':''"> 資料確認</span>/
      <span :class="this.step >5 ?'alert':''"> 申請書用印掃描</span>/
      <span :class="this.step >6 ?'alert':''">申請書副本列印</span>/
      <span :class="this.step >7 ?'alert':''"> 交易覆核</span>
  </span>
</template>
<script>
export default {
  name:'StepApplication',
  props:['step'],
  mounted() {
    console.log(this.step)
  },

}
</script>
<style>


</style>