<template>
  <v-card height="680px">
    <v-container
            v-if="done"
            align="start"
            fluid
    >
      <v-row no-gutters>
        <v-col cols="10" md="10">
          <v-dialog
                  v-model="dispDoc"
                  persistent
                  max-width="1000"
          >
            <template v-slot:activator="{ on, attrs}">
              <v-btn v-bind="attrs" v-on="on" style="margin-right: 8px;">檢視文件</v-btn>
            </template>
            <v-card class="elevation-12" height="820">
              <v-toolbar
                      color="primary"
                      dark
                      flat
                      dense
              >
                <v-toolbar-title>檢視文件</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <div style="display: flex; justify-content: center; position: relative; width: 950px; height:680px; margin-top: 20px;">
                  <div style="border: 1px solid black; width: 200px; height: 640px;">顯示各頁正反面的縮圖</div>
                  <div style="border: 1px solid black; width: 750px; height: 640px;">顯示目前選取的影像</div>
                  <div style="position: absolute; bottom: 8px; margin: auto">
                    <!--v-btn small style="margin-right: 8px;">正面/反面</v-btn-->
                    <v-btn small style="margin-right: 8px;">視窗大小</v-btn>
                    <v-btn small style="margin-right: 8px;">原始大小</v-btn>
                    <v-btn small style="margin-right: 8px;">放大</v-btn>
                    <v-btn small style="margin-right: 8px;">縮小</v-btn>
                    <v-btn small style="margin-right: 8px;">順時鐘旋轉</v-btn>
                    <v-btn small style="margin-right: 8px;">逆時鐘旋轉</v-btn>
                    <v-btn small style="margin-right: 8px;">驗印通過</v-btn>
                    <v-btn small>驗印不通過</v-btn>
                  </div>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="dispDoc = false">關閉</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn @click="isScanner" style="margin-right: 8px;" :disabled="!isScannerReady" class="primary">掃描文件</v-btn>
          <v-btn @click="EmptyScanner" style="margin-right: 8px;" :disabled="isScannerReady">退出文件</v-btn>
          <v-btn @click="EmptyScanner" style="margin-right: 8px;" :disabled="isScannerReady">收納文件</v-btn>
          <v-btn @click="ScanNextPage" style="margin-right: 8px;" :disabled="!isScannerReady">掃描下一頁</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  export default {
    name: 'ScanDocument',
    created () {
      this.$parent.status = 13
      this.$parent.$on('cancel', this.Cancel)
    },
    beforeDestroy() {
      this.$parent.$off('cancel')
    },
    data () {
      return {
        done: true,
        dispDoc: false,
        isScannerReady: true
      }
    },
    methods: {
    isScanner(){
      this.dispDoc =true;
    },
      Cancel() {
        this.done = true
      },
      EmptyScanner() {
        this.isScannerReady = true;
      },
      ScanNextPage() {
        this.$parent.status = 13
        this.isScannerReady = false
      }
    }
  }
</script>
<style scoped>
</style>
