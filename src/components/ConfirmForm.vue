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
            <div style="text-align: left; padding: 10px;">
              <h1>1.如果資料沒有問題，請按下一步，那如果還需修改請按更正，再來幫您更正。<br>
                  2.請在申請書簽名蓋章（列印申請書之後）
              </h1>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row
              align="center"
              justify="center"
              class="align-self-stretch"
      >
        <v-col
                cols="12"
                sm="10"
                md="10"
        >
          <div class="home">
            <div style="text-align: left; padding: 20px;">
              <h1>1.確認資料無誤，操作”約轉平台”輸入身份證號匯入填單資料，<br>
              2.確認交易資料內容後，按列印申請書供客戶簽名或蓋章
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
    name: 'ConfirmForm' /*資料確認 */
  }
</script>

<style scoped>

</style>
