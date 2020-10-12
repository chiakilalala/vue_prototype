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
            <div style="text-align: center; padding: 10px;">
              <h1>我們身份核驗完成之後，手機會寄來簡訊通知。
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
            <div style="text-align:center; padding: 20px;">
              <h1>提醒客戶身分證核驗完成之後，會有簡訊通知
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
    name: 'IdentityVerificationCompleted'
  }
</script>

<style scoped>

</style>
