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
              <h1>QR Code掃描完成</h1>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'ScanQrCode',
    created () {
      console.log('qr code')
      this.$parent.deviceStatus = '等待客戶掃描QR Code…'
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
      Cancel() {
        this.done = true
      }
    }
  }
</script>

<style scoped>

</style>
