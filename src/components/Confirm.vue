<template>
  <v-card height="680px">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="10">
          <div class="home">
            <div style="text-align: left; padding: 60px;">
              <h1>
                1.確認客戶是否已完成線上預填表單或是已填憑單 (若無引導客戶預填) 
                <br />2.列印表單   (預填QR Code/客戶填單)
                <br />3.引導客戶確認內容並簽蓋原留印鑑  (預填QR Code/客戶填單)
             
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
  name: 'Confirm',
};
</script>