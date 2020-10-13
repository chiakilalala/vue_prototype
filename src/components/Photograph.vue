<template>
  <v-card height="650px">
    <v-container class="fill-height" fluid>
      <v-row
        align="center"
        justify="center"
        style="background: #1976d2"
        class="align-self-stretch"
      >
        <v-col cols="12" sm="10" md="10" class="white--text">
          <div class="home">
            <div style="text-align: center; padding: 50px">
              <h1>請將臉的位置調整在畫面中央, 直視鏡頭, 將進行拍照...</h1>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" class="align-self-stretch">
        <v-col cols="12" sm="10" md="10">
          <div class="home">
            <div style="text-align: center; padding: 20px" > 
              <h1>
                透過視訊系統截屏功能拍照<br />(桌面的視訊放大畫面可以擷取視訊畫面)
              </h1>
              <v-img
                lazy-src="https://upload.cc/i1/2020/10/08/cM6fel.png"
                max-height="150"
                max-width="250"
                class="mx-auto"
                
                src="https://upload.cc/i1/2020/10/08/cM6fel.png"></v-img>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "Photograph",
};
</script>

<style scoped>
</style>
