<template>
  <v-card height="680px">
    <v-container
            v-if="done"
            class="fill-height"
            fluid
    >
      <v-row no-gutters justify="center">
        <v-col cols="9" md="9">
          <div style="border: 1px solid black; width: 800px; height: 620px;">
            客戶簽名
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  export default {
    name: 'Signature',
    created () {
      this.$parent.deviceStatus = '等待客戶簽名…'
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
