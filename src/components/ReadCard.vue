<template>
  <v-card height="680px">
    <v-container
            class="fill-height"
            fluid
    >

      <v-row
        align="center"
        justify="center"
        style="background: #1976d2"
        class="align-self-stretch"
      >
        <v-col cols="12" sm="10" md="10" class="white--text">
          <div class="home">
            <div style="text-align: center; padding: 20px">
          <h1>1.於讀卡器位置插入金融卡</h1>
          <h1>2. 依照介面提示輸入取款金額</h1>
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
            <div v-if="status === 0"></div>
            <div v-else-if="status === 1" style="text-align: center; padding: 20px;">
              <h1>金融卡帳號讀取完成</h1>
              <h2>金融卡帳號: XXXXXXXXXXXXXX</h2>
            </div>
            <div v-else style="text-align: center; padding: 20px;">
              <h1 class="alert">金融卡讀取失敗</h1>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: "ReadCard",
  created() {
    this.$parent.deviceStatus = "等待讀取金融卡帳號…";
    this.$parent.$on("cancel", this.Cancel);
  },
  beforeDestroy() {
    this.$parent.$off("cancel");
  },
  data() {
    return {
      status: 1,
    };
  },
  methods: {
    Cancel() {
      this.status++;
      if (this.status > 1) this.status = -1;
    },
  },
};
</script>
<style scoped>
.alert {
  color: red;
}
</style>
