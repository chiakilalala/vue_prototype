<template>
  <v-card class="mainContent">

    <v-container fluid>
      <v-row no-gutters justify="center">
        <v-vol cols="10 md=10">
          <v-chip-group mandatory active-class="primary--text">
            <v-chip
              v-for="(item, index) in items"
              :key="item"
              @click="IdentitySelected(index)"
            >{{ item }}</v-chip>
          </v-chip-group>
        </v-vol>
      </v-row>
      <v-row no-gutters>
        <v-col cols="4" md="4">
          <div style="padding: 10px;">
            <v-btn @click="ScanBtnClicked(1)">step1.掃描身分證正面<v-icon>mdi-credit-card-scan</v-icon></v-btn>
            <br />
            <v-container fluid>
              <v-row no-gutters>
                <v-col cols="4" md="4">身分證號碼:</v-col>
                <v-col cols="8" md="8">
                  <v-text-field dense single-line v-model="customerId"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="4" md="4">姓名:</v-col>
                <v-col cols="8" md="8">
                  <v-text-field dense single-line v-model="customerName"></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" md="12">
                  <v-btn small>更新資料</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-col>
        <v-col cols="4" md="4">
          <div style="border: 1px solid black; width: 300px; height:200px;margin-bottom: 5px;">身分證正面</div>
        </v-col>
        <v-col cols="4" md="4">
          <div
            style="border: 1px solid black; width: 300px; height:200px;margin-bottom: 5px;"
          >身分證正面(紫外線)</div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="4" md="4">
          <div style="padding: 10px;">
            <v-btn @click="ScanBtnClicked(2)">step2.掃描身分證反面  <v-icon>mdi-credit-card-scan</v-icon></v-btn>
          </div>
        </v-col>
        <v-col cols="4" md="4">
          <div style="border: 1px solid black; width: 300px; height:200px;margin-bottom: 5px;">身分證反面</div>
        </v-col>
        <v-col cols="4" md="4">
          <div
            style="border: 1px solid black; width: 300px; height:200px;margin-bottom: 5px;"
          >身分證反面(紫外線)</div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="4" md="4">
          <div style="padding: 10px;">
            <v-btn @click="ScanBtnClicked(3)" style="margin-right: 8px;" class="mb-5">step3.掃描第二證件正面<v-icon>mdi-credit-card-scan-outline</v-icon></v-btn>
            <v-btn @click="ScanBtnClicked(4)" class="mb-5">step4.掃描第二證件反面<v-icon>mdi-credit-card-scan</v-icon></v-btn>
          </div>
        </v-col>
        <v-col cols="4" md="4">
          <div style="border: 1px solid black; width: 300px; height:200px;">第二證件正面</div>
        </v-col>
        <v-col cols="4" md="4">
          <div style="border: 1px solid black; width: 300px; height:200px;">第二證件反面</div>
        </v-col>
      </v-row>
    </v-container>
   
  </v-card>

  
</template>

<script>
export default {
  name: "ScanIdentity",
  data: () => ({
   
    identityIndex: 0,
    items: ["第一位", "第二位", "第三位"],
    customerId: "",
    customerName: "",
  }),
  methods: {
 
    IdentitySelected(index) {
      this.identityIndex = index;
    },
    ScanBtnClicked(id) {
      switch (id) {
        case 1:
          this.$parent.deviceStatus = "身分證正面掃描中…";
          break;
        case 2:
          this.$parent.deviceStatus = "身分證反面掃描中…";
          break;
        case 3:
          this.$parent.deviceStatus = "第二證件正面掃描中…";
          break;
        case 4:
          this.$parent.deviceStatus = "第二證件反面掃描中…";
          break;
      }
    },
  },
};
</script>

<style scoped>
</style>
