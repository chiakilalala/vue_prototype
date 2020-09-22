<template>
  <v-card height="680px">
    <v-container
            v-if="done"
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
              <h1>客戶輸入密碼/代號完成</h1>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container
            v-else
            align="start"
            fluid
    >
      <v-row no-gutters>
        <v-col cols="10" md="10">
          <v-btn @click="StartInput(1)" style="margin-right: 8px;" :disabled="true">密碼鍵盤輸入密碼</v-btn>
          <v-btn @click="StartInput(2)" style="margin-right: 8px;">螢幕鍵盤輸入密碼</v-btn>
          <v-btn @click="StartInput(3)">螢幕鍵盤輸入代號</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  export default {
    name: 'InputPassword',
    created () {
      this.$parent.$on('cancel', this.Cancel)
    },
    beforeDestroy() {
      this.$parent.$off('cancel')
    },
    data () {
      return {
        done: false
      }
    },
    methods: {
      StartInput(type) {
        switch (type) {
          case 1:
            this.$parent.deviceStatus = '等待客戶輸入密碼…'
            break
          case 2:
            this.$parent.deviceStatus = '等待客戶輸入密碼…'
            break
          case 3:
            this.$parent.deviceStatus = '等待客戶輸入代號…'
            break
        }
      },
      Cancel() {
        this.done = true
      }
    }
  }
</script>
<style scoped>
</style>
