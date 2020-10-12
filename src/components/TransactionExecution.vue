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
              <h1>請輸入取款密碼 <br> 
              請記得取出現鈔並點收
              </h1>
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
              <h1>請客戶輸入密碼(有取款密碼時)<br>
              引導客戶於設備取出現鈔並點收

              
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
    name: 'TransactionExecution'
  }
</script>

<style scoped>

</style>
