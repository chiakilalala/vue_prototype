<template>
  <v-card height="680px">
    <v-container
            class="fill-height"
            fluid
    >
      <v-row
              align="center"
              justify="center"
              style="background:#1976D2"
              class="align-self-stretch "
            
      >
        <v-col
                cols="12"
                sm="10"
                md="10"
                class="white--text"
        >
          <div class="home">
            <div style="text-align: center; padding: 20px;">
              <h1>請問是否已在網路先填好表單，如果沒有可以選擇線上填單<br>，或是使用QR Code掃描</h1>
            </div>
          </div>
        </v-col>
      </v-row>
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
            <div style="text-align: center; padding: 20px;">
              <h1>確認客戶資料 才可進行下一步</h1>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'IdentityVerification'
  }
</script>

<style scoped>

</style>
