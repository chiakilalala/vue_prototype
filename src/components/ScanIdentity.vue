<template>
  <v-card height="675">
<!-- fluid -->
    <v-container  fluid>
      <v-row no-gutters justify="center">
        <v-vol cols="10" md="10">
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
          <div style="padding: 0px;">
            <v-btn class="secondary" @click="ScanBtnClicked(1)">step1.掃描身分證正面<v-icon>mdi-credit-card-scan</v-icon></v-btn>
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
                  <v-btn small class="accent"><v-icon>mdi-autorenew</v-icon>更新資料</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-col>
        <v-col cols="4" md="4" class="pr">
          <div class="idCard" style="">身分證正面</div>
        </v-col>
        <v-col cols="4" md="4" class="">
          <div class="idCard "
               
          >身分證正面(紫外線)</div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="4" md="4" class="pr">
          <div style="padding: 10px;">
            <v-btn @click="ScanBtnClicked(2)" class="secondary">step2.掃描身分證反面  <v-icon>mdi-credit-card-scan</v-icon></v-btn>
          </div>
        </v-col>
        <v-col cols="4" md="4" class="pr">
          <div class="idCard" >身分證反面</div>
        </v-col>
        <v-col cols="4" md="4">
          <div class="idCard" 
           
          >身分證反面(紫外線)</div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="4" md="4">
          <div style="padding: 10px;">
            <v-btn @click="ScanBtnClicked(3)" style="margin-right: 8px;" class="mb-5 secondary">step3.掃描第二證件正面<v-icon>mdi-credit-card-scan-outline</v-icon></v-btn>
            <v-btn @click="ScanBtnClicked(4)" class="mb-5 secondary">step4.掃描第二證件反面<v-icon>mdi-credit-card-scan</v-icon></v-btn>
          </div>
        </v-col>
        <v-col cols="4" md="4" class="pr">
          <div style="" class="idCard mb-0">第二證件正面</div>
        </v-col>
        <v-col cols="4" md="4">
          <div class="idCard mb-0" style="">第二證件反面</div>
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
  computed: {
    
  },
  methods: {
    IdentitySelected(index) {
      this.identityIndex = index;
    },
    ScanBtnClicked(id) {
      switch (id) {
        case 1:
          this.$parent.status = 9;
          //"身分證正面掃描中…"
          break;
        case 2:
          this.$parent.status = 10;
           //"身分證反面掃描中…"
          break;
        case 3:
          this.$parent.status = 11;
          //"第二證件正面掃描中…"
          break;
        case 4:
          this.$parent.status = 12;
          //"第二證件反面掃描中…"
          break;
      }
    },
  },
 
};
</script>

<style >
.idCard{
border: 1px dashed rgba(0,0,0,0.6);
width: 300px; 
height:200px;
background-color: #fff;
margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color:rgba(0,0,0,0.6);
}


</style>
