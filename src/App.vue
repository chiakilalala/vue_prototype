<template>
  <v-app ref="app">
    <v-main class="wrap">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
  }),
};
</script>
<style>
.wrap{
  overflow-y: hidden;
}
.theme--light.v-sheet {
    background-color: #f5f5f5 !important;
  
}
.wrap .v-subheader{
  height: 38px !important;
  font-size: 16px;

}
.wrap .theme--light.v-sheet--outlined {
    border: none
}
.wrap .v-card__text {
    padding:10px;
}

</style>
