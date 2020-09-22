<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-card class="pa-1" outlined>
          <v-row no-gutters>
            <v-col cols="2" md="2">
              <h2>
                業務類別:
              </h2>
            </v-col>
            <v-col cols="4" md="4">
              <v-select
                      :items="transactionCategories"
                      v-model="selectedCategory"
                      @change="CategoryChanged"
                      hide-details
                      solo
                      dense
                      :disabled="!isReady || selectedCategory !== null"
              ></v-select>
            </v-col>
            <v-col cols="2" md="">
              <h2 style="margin-left: 20px;">
                業務項目:
              </h2>
            </v-col>
            <v-col cols="3" md="3">
              <v-select
                      :items="transactions"
                      v-model="selectedTransaction"
                      @change="TransactionChanged"
                      hide-details
                      solo
                      dense
                      :disabled="!isReady || selectedTransaction !== null"
              ></v-select>
            </v-col>
            <v-col cols="3" md="3">
              <v-btn @click="TransactionCanceled" style="margin-left: 8px; margin-right: 8px;" :disabled="!selectedTransaction">取消辦理</v-btn>
              <v-btn @click="TransactionFinished" color="primary" :disabled="!selectedTransaction || currentUnit !== null">完成辦理</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-card class="pa-1" outlined>
          <h2>
            設備狀態:  {{deviceStatus}} 
          </h2>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-toolbar dense>
          <v-btn
                  v-for="(value, name) in unitOperations"
                  :key="name"
                  :color="ButtonColor(value)"
                  @click="UnitOperation(value)"
                  :disabled="IsDisabled(value)"
                  style="margin-left: 4px"
          >
            {{value.label}}
          </v-btn>
        
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <component :is="currentUnitComponent"></component>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="4" md="4">
        <v-btn @click="CancelUnitOperation" style="margin-right: 4px;" :disabled="currentUnit === null">取消單元操作</v-btn>
        <v-btn @click="FinishUnitOperation" color="primary" :disabled="currentUnit === null">完成單元操作</v-btn>
      </v-col>
    </v-row>
    <v-dialog
            v-model="dispIdentityVerifyNotification"
            persistent
            max-width="600"
    >
      <v-card class="elevation-12">
        <v-toolbar
                color="primary"
                dark
                flat
                dense
        >
          <v-toolbar-title>主管身分覆核結果</v-toolbar-title>
        </v-toolbar>
        <v-container
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
                <div v-if="identityVerifyStatus === 2" style="text-align: center; padding: 60px;">
                  <h1>主管身分覆核已經通過</h1>
                </div>
                <div v-else style="text-align: center; padding: 60px;">
                  <h1 class="alert">主管身分覆核被駁回</h1>
                  <h2 v-if="identityVerifyNote !== ''" class="alert">{{identityVerifyNote}}</h2>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dispIdentityVerifyNotification = false">關閉</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import SelectUnit from '../components/SelectUnit'
  import ScanIdentity from '../components/ScanIdentity'
  import ScanDocument from '../components/ScanDocument'
  import InputPassword from '../components/InputPassword'
  import ReadCard from '../components/ReadCard'
  import PrintDocument from '../components/PrintDocument'
  import Signature from '../components/Signature'
  import IdentityVerify from '../components/IdentityVerify'
  import TransactionVerify from '../components/TransactionVerify'

  export default {
    name: 'UnitOperationBase',
    data: () => ({
      status:2,
     
      isReady: false,
      transactionCategories: [
        '服務類',
        '申請類',
        '非現金類',
        '現金類',
        '其他類'
      ],
      selectedCategory: null,//業務類別
      transactionItems: {
        '服務類': [
          'Richart身分驗證'
        ],
        '申請類': [
          '約定轉入帳號',
          '變更客戶基本資料',
          '提款卡申請/終止非約定轉帳',
          '存摺取款密碼變更/刪除'
        ],
        '非現金類': [
          '台幣轉帳',
          '台幣匯款'
        ],
        '現金類': [
          '台幣現金存入',
          '台幣現金取款'
        ],
        '其他類': [
          '其他業務'
        ]
      },
      transactions: [],
      selectedTransaction: null, //業務項目
      currentUnitComponent: SelectUnit,
      currentUnit: null,
      unitOperations: {
        ScanIdentity: {
          name: 'ScanIdentity',
          label: '證件掃描',
          pressed: false,
          component: ScanIdentity
        },
        ScanDocument: {
          name: 'ScanDocument',
          label: '文件掃描',
          pressed: false,
          component: ScanDocument
        },
        InputPassword: {
          name: 'InputPassword',
          label: '輸入密碼/代號',
          pressed: false,
          component: InputPassword
        },
        ReadCard: {
          name: 'ReadCard',
          label: '讀取金融卡帳號',
          pressed: false,
          component: ReadCard
        },
        Signature: {
          name: 'Signature',
          label: '電子簽名',
          pressed: false,
          component: Signature
        },
        PrintDocument: {
          name: 'PrintDocument',
          label: '文件列印',
          pressed: false,
          component: PrintDocument
        },
        ReviewIdentity: {
          name: 'IdentityVerify',
          label: '客戶身分覆核',
          pressed: false,
          component: IdentityVerify
        },
        ReviewTransaction: {
          name: 'TransactionVerify',
          label: '交易覆核',
          pressed: false,
          component: TransactionVerify
        }
      },
      dispIdentityVerifyNotification: false,
      identityVerifyStatus: 0,
      identityVerifyNote: '',
      transactionVerifyStatus: 0,
      transactionVerifyNote: ''
    }),
    computed: {
        deviceStatus () {
        switch (this.status) {
          case -1:
            return '客戶不同意錄影錄音'
          case 0:
            return '等待叫號'
          case 1:
            return '等待客戶同意錄影錄音'
          case 2:
            return '選擇業務項目'
        }
        return ''
      },
    },
    methods: {
      ButtonColor(unit) {
        return unit.pressed ? 'blue-grey white--text' : 'primary'
      },
      IsDisabled(unit) {
        if (this.selectedTransaction === null) return true
        if (this.currentUnit === null) return false
        return unit !== this.currentUnit
      },
      UnitOperation(unit) {
        this.deviceStatus = ''
        this.currentUnit = unit
        this.currentUnitComponent = unit.component
      },
      CancelUnitOperation() {
        this.deviceStatus = ''
        this.$emit('cancel')
        this.currentUnit = null
        this.currentUnitComponent = SelectUnit
      },
      FinishUnitOperation() {
        this.deviceStatus = ''
        this.currentUnit.pressed = true
        this.currentUnit = null
        this.currentUnitComponent = SelectUnit
      },
      CategoryChanged() {
        this.transactions = this.transactionItems[this.selectedCategory]
      },
      TransactionChanged() {
        this.deviceStatus = ''
      },
      TransactionCanceled() {
        this.$emit('cancel')
        this.currentUnit = null
        this.currentUnitComponent = SelectUnit
        this.selectedCategory = null
        this.selectedTransaction = null
        this.deviceStatus = '請選擇業務類別與項目'
        this.ClearUnitPressedState()
        this.transactionVerifyStatus = 0
        this.transactionVerifyNote = ''
      },
      TransactionFinished() {
        this.selectedCategory = null
        this.selectedTransaction = null
        this.deviceStatus = '請選擇業務類別與項目'
        this.ClearUnitPressedState()
        this.transactionVerifyStatus = 0
        this.transactionVerifyNote = ''
      },
      ClearUnitPressedState(){
        for (var unit in this.unitOperations) {
          console.log(`unit name: ${unit.name}`)
          this.unitOperations[unit].pressed = false
        }
      }
    }
  }
</script>

<style scoped>
  .alert {
    color: red;
  }
</style>
