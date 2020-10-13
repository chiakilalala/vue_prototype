<template>
  <v-card height="680px">
    <v-container
            class="fill-height"
            fluid
    >
      <v-row no-gutters>
        <v-col cols="6" md="6">
          <span>客戶身分覆核狀態: </span>
          <span :class="{ alert: verifyStatus < 0 }">{{verifyStatusMessage}}</span>
          <span class="alert" v-if="verifyStatus < 0 && verifyNote !== ''">({{verifyNote}})</span>
        </v-col>
        <v-col cols="6" md="6">
          <v-chip-group mandatory active-class="primary--text">
            <v-chip v-for="(item, index) in items" :key="item" @click="IdentitySelected(index)">
              {{ item }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <v-btn @click="Send" style="padding: 10px;" :disabled="sendBtnDisabled" class="secondary">送出主管覆核</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="6" md="6">
          <v-container fluid class="fill-height">
            <v-row no-gutters>
              <v-col cols="12" md="12">
                <div class="isCard">
                  證件影像
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" md="12">
                <div class="Custom">
                  客戶照片
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="6" md="6">
          <div  class="identity">
            戶政司國民身分證領補換資料查詢結果截圖
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  export default {
    name: 'ReviewIdentity',
    created () {
      this.$parent.$on('cancel', this.Cancel)
    },
    beforeDestroy() {
      this.$parent.$off('cancel')
    },
    data () {
      return {
        identityIndex: 0,
        items: [
          '第一位',
          '第二位',
          '第三位'
        ],
        done: false,
       
      }
    },
    computed: {
      sendBtnDisabled() {
        return this.$parent.identityVerifyStatus > 0
      },
      verifyStatus() {
        return this.$parent.identityVerifyStatus
      },
      verifyStatusMessage() {
        switch (this.$parent.identityVerifyStatus) {
          case -1:
            return '主管身分覆核被駁回'
          case 0:
            return '尚未送出主管身分覆核'
          case 1:
            return '主管身分覆核已經送出'
          case 2:
            return '主管身分覆核已經通過'
        }
        return ''
      },
      verifyNote() {
        return this.$parent.identityVerifyNote
      }
    },
    methods: {
      IdentitySelected(index) {
        this.identityIndex = index
      },
      Send() {
        this.$parent.status = 15
        this.$parent.identityVerifyStatus = 1
      },
      Cancel() {
        this.done = true
      }
    }
  }
</script>
<style scoped>
  /* .alert {
    color: red;
  } */
  .isCard{
    border: 1px dashed rgba(0,0,0,0.6); 
    width: 500px; 
    height:300px;
    background-color: #fff;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .Custom{
    border: 1px dashed rgba(0,0,0,0.6); 
    width: 500px; 
    height:180px;
    background-color: #fff;
      display: flex;
    align-items: center;
    justify-content: center;
  }
  .identity{
    border: 1px dashed rgba(0,0,0,0.6); 
    background-color: #fff;
    width: 500px; 
    height:520px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
