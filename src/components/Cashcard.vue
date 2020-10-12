<template>
  <v-card height="680px">
    <v-container
            class="fill-height"
            fluid
    >
      <v-row
              align="center"
              justify="center"
      >
        <v-col
                cols="12"
                sm="10"
                md="10"
        >
          <div class="home">
            <div style="text-align: center; padding: 60px;">
              <h1>
                1.請客戶讀取金融卡 <br /> 
              2.交易金額超過10萬元（含）須提供證件掃描（得以詢問個資方式確認身份）與現場拍照
</h1>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'Cashcard'
  }
</script>

<style scoped>

</style>
