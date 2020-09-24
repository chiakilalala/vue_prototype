<template>
  <v-card height="620px">
    <v-container
            class="fill-height"
            fluid
    >
      <v-row no-gutters>
        <v-col cols="12" md="12" > 
          <span style="padding: 10px;">交易覆核狀態:</span>
          <span :class="{ alert: verifyStatus < 0 }">{{verifyStatusMessage}}</span>
          <span v-if="verifyStatus < 0 && verifyNote !== ''" class="alert">({{verifyNote}})</span>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="12" class="mb-3">
          <span style="padding: 10px;">請<span class="font-weight-black">選取</span>提交主管覆核的交易文件, 再按下"送出主管覆核".</span>
          <v-btn @click="Send" style="padding: 10px;" :disabled="sendBtnDisabled">送出主管覆核</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="6" md="6">
          <v-card>
            <v-toolbar
                    color="blue lighten-4 black--text"
                    dark
                    dense
                    flat
            >
              <v-toolbar-title class="text-subtitle-1">掃描匯入的文件</v-toolbar-title>
            </v-toolbar>
            <v-virtual-scroll :items="scanImportedDocs" :item-height="200" height="500">
              <template v-slot="{ item }">
                <v-list-item>
                  <v-list-item-action>
                    <v-checkbox v-model="item.selected"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <div style="border: 1px solid black; width:100px; height:180px;">
                      {{item.name}}
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-virtual-scroll>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  export default {
    name: 'ReviewTransaction',
    created () {
      this.$parent.$on('cancel', this.Cancel)
    },
    beforeDestroy() {
      this.$parent.$off('cancel')
    },
    data () {
      return {
        done: true,
        scanImportedDocs: [
          {
            name: '掃描-1',
            selected: false
          },
          {
            name: '掃描-2',
            selected: false
          },
          {
            name: '掃描-3',
            selected: false
          },
          {
            name: '掃描-4',
            selected: false
          }
        ]
      }
    },
    computed: {
      sendBtnDisabled() {
        if (this.$parent.transactionVerifyStatus > 0) return true;
        var result = true
        this.scanImportedDocs.forEach(i => {
          if (i.selected) result = false
        })
        return result
      },
      verifyStatus() {
        return this.$parent.transactionVerifyStatus
      },
      申請類交易流程() {
        switch (this.$parent.transactionVerifyStatus) {
          case -1:
            return '主管交易覆核被駁回'
          case 0:
            return '尚未送出主管交易覆核'
          case 1:
            return '主管交易覆核已經送出'
          case 2:
            return '主管交易覆核已經通過'
        }
        return ''
      },
      verifyNote() {
        return this.$parent.transactionVerifyNote
      }
    },
    methods: {
      Send() {
        this.$parent.transactionVerifyStatus = 0
        this.$parent.status = 15
      },
      Cancel() {
        this.done = true
      }
    }
  }
</script>
<style scoped>
  .alert {
    color: red;
  }
</style>
