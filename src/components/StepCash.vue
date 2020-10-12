<template>
  <span>
    <span :class="this.step ?'alert':''">讀取金融卡</span>/
    <span :class="this.step >1 ?'alert':''"> 證件掃描</span>/
    <span :class="this.step >2 ?'alert':''"> 照相</span>/        
    <span :class="this.step >3 ?'alert':''">交易覆核</span> 
  </span>
</template>
<script>
export default {
  name:'StepCash',
  props:['step'],
  mounted() {
    console.log(this.step)
  },

}
</script>
<style>


</style>
