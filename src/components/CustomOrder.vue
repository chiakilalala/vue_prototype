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
              <h1>1.請先詢問客戶是否已完成線上預填表單 <br />    
                  2.如無請選擇客戶填單/預填QR Code掃描<br /> 
                  3.列印完的表單請引導客戶簽名</h1>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'CustomOrder'
  }
</script>

<style scoped>

</style>
