<template>
  <v-container fluid>
    <v-row no-gutters align="center">
      <v-col cols="12" md="12" class="border-left-primary">
        <v-card class="pa-1" outlined>
          <v-row no-gutters>
            <v-col cols="2">
              <v-subheader>業務類別:</v-subheader>
            </v-col>
            <v-col cols="2" md="2">
              <v-select
                :items="transactionCategories"
                v-model="selectedCategory"
                @change="CategoryChanged"
                hide-details
                solo
                dense
                style="margin-left: -30px"
              ></v-select>
              <!-- :disabled="!isReady || selectedTransaction !== null" -->
            </v-col>
            <v-col cols="2" md="2">
              <v-subheader>業務項目:</v-subheader>
            </v-col>
            <v-col cols="3" md="3">
              <v-select
                :items="transactions"
                v-model="selectedTransaction"
                @change="TransactionChanged"
                hide-details
                solo
                dense
                style="margin-left: -40px"
              ></v-select>
              <!-- @change="TransactionChanged" -->
              <!-- :disabled="!isReady || selectedTransaction !== null" -->
            </v-col>
            <v-col cols="3" md="3">
              <v-btn
                @click="TransactionCanceled"
                style="margin-left: 8px; margin-right: 8px"
                :disabled="!selectedTransaction"
                >取消辦理</v-btn
              >
              <v-btn
                @click="TransactionFinished"
                color="primary"
                :disabled="!selectedTransaction || currentUnit !== null"
                >完成辦理</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col   cols="9"  md="9"  v-show="!isShow" class="my-1 border-left-primary" >
        <v-card class="pa-1" outlined v-if="selectedTransaction !== null">
          <v-subheader>
            業務導航訊息:
            <span
              v-if="selectedCategory == '服務類'"
              class="font-weight-regular subheading"
            >
              <span :class="this.step ? 'alert' : ''">證件掃描</span>/
              <span :class="this.step > 1 ? 'alert' : ''"> 照相</span>/
              <span :class="this.step > 2 ? 'alert' : ''"> Richart後台操作</span
              >/
              <span :class="this.step > 3 ? 'alert' : ''">身份核驗完成</span>
        
            </span>
            <!-- 申請類 -->
            <span
              v-if="
                selectedCategory == '申請類' &&
                selectedTransaction == '約定轉入帳號'
              "
              class="font-weight-regular subheading"
            >
          
              <StepApplication :step="step"> </StepApplication>
            </span>
              <!-- 申請類 變更客戶基本資料-->  
            <span
              v-if="
                selectedCategory == '申請類' &&
                selectedTransaction == '變更客戶基本資料'
              "
              class="font-weight-regular subheading"
            >
              <StepChangeForm :step="step"> </StepChangeForm>
            </span>
            <!--申請類  提款卡申請/終止非約定轉帳-->
            <span
              v-if="
                selectedCategory == '申請類' &&
                selectedTransaction == '提款卡申請/終止非約定轉帳'
              "
              class="font-weight-regular subheading"
            >
              <StepChangeForm :step="step"> </StepChangeForm>
            </span>
            <span
              v-if="
                selectedCategory == '申請類' &&
                selectedTransaction == '存摺取款密碼變更/刪除'
              "
              class="font-weight-regular subheading"
            >
              <StepChangeForm :step="step"> </StepChangeForm>
            </span>

            <!-- 現金類 -->

            <!-- 現金類 台幣現金存入（金融卡ATM交易）-->
            <span
              v-if="
                selectedCategory == '現金類' &&
                selectedTransaction == '台幣現金存入（金融卡ATM交易）'
              "
              class="font-weight-regular subheading"
            >
              <!-- <span :class="this.step ?'alert':''">讀取金融卡</span>/
              <span :class="this.step >1 ?'alert':''"> 證件掃描</span>/
              <span :class="this.step >2 ?'alert':''"> 照相</span>/        
              <span :class="this.step >3 ?'alert':''">交易覆核</span> -->
              <StepCash :step="step"> </StepCash>
            </span>
            <!-- 現金類 台幣現金存入（Bancs無摺交易）-->
            <span
              v-if="
                selectedCategory == '現金類' &&
                selectedTransaction == '台幣現金存入（Bancs無摺交易）'
              "
              class="font-weight-regular subheading"
            >

              <StepBancs :step="step"> </StepBancs>
            </span>
            <!-- 現金類 台幣現金取款（金融卡ATM交易）-->
            <span
              v-if="
                selectedCategory == '現金類' &&
                selectedTransaction == '台幣現金取款（金融卡ATM交易）'
              "
              class="font-weight-regular subheading"
            >
              <StepCash :step="step"> </StepCash>
            </span>

            <!-- 現金類 台幣現金取款（Bancs無摺交易）-->
            <span
              v-if="
                selectedCategory == '現金類' &&
                selectedTransaction == '台幣現金取款（Bancs無摺交易）'
              "
              class="font-weight-regular subheading"
            >
              <StepBancs :step="step"> </StepBancs>
            </span>
            <!-- 非現金類 -->
            <span
              v-if="selectedCategory == '非現金類' && selectedTransaction == '台幣轉帳' "
              class="font-weight-regular subheading" >
              <NonCash :step="step"> </NonCash>
            </span>
            <span
              v-if="
                selectedCategory == '非現金類' &&
                selectedTransaction == '台幣匯款'
              "
              class="font-weight-regular subheading"
            >
              <NonCash :step="step"> </NonCash>
            </span>
          </v-subheader>
        </v-card>
      </v-col>
    <v-col cols="3" md="3" v-show="!isShow" class="my-1">
    <v-card outlined  class="pa-1"    v-if="selectedTransaction !== null"    > 
    <v-subheader>
                設備狀態:
                <span :class="{ alert: isAlert }">{{ deviceStatus }}</span>
              </v-subheader>
    </v-card>
    </v-col>
    </v-row>
<!-- 業務導航系統 -->

  
    <!-- new 步驟流程: 目前隱藏中 -->
    <v-row no-gutters style="display: none">
      <v-col cols="12" md="12" v-show="!isShow" class="">
        <v-card class="pa-1" outlined v-if="selectedTransaction !== null">
          <v-row no-gutters>
            <v-col cols="2" md="2" style="margin-right: -44px">
              <v-subheader>步驟流程:</v-subheader>
            </v-col>
            <v-col v-if="selectedCategory == '服務類'" cols="6" md="6" class>
              <span v-if="this.step == 1" style="font-size: 16px">
                <span class="stepball primary mr-1">1</span>提示客戶證件掃描</span>
              
              <span v-if="this.step == 2" style="font-size: 16px">
                <span class="stepball primary mr-1">2</span> 照相
              </span>
              <span v-if="this.step == 3" style="font-size: 16px">
                <span class="stepball primary mr-1">3</span> Richart數位後台
              </span>
              <span v-if="this.step == 4" style="font-size: 16px">
                <span class="stepball primary mr-1">4</span>身分核驗完成
              </span>
            </v-col>
            <!-- 申請類 -->
            <v-col
              v-if="
                selectedCategory == '申請類' &&
                selectedTransaction == '約定轉入帳號'
              "
              cols="6"
              md="6"
              class
            >
              <span v-if="this.step == 1" style="font-size: 16px">
                <span class="stepball primary mr-1">1</span>提示客戶證件掃描
              </span>
              <span v-if="this.step == 2" style="font-size: 16px">
                <span class="stepball primary mr-1">2</span>
                拍照確認身份並開啟戶政網頁
              </span>
              <span v-if="this.step == 3" style="font-size: 16px">
                <span class="stepball primary mr-1">3</span> 送出主管覆核
              </span>

              <span v-if="this.step == 4" style="font-size: 16px">
                <span class="stepball primary mr-1">4</span>
                確認預填表單（客戶填單/預填QR Code掃描）列印後，引導親簽
              </span>
              <span v-if="this.step == 5" style="font-size: 16px">
                <span class="stepball primary mr-1">5</span> 提示掃描表單
              </span>
              <span v-if="this.step == 6" style="font-size: 16px">
                <span class="stepball primary mr-1">6</span> 提示列印申請書副本
              </span>
              <span v-if="this.step == 7" style="font-size: 16px">
                <span class="stepball primary mr-1">7</span> 交易覆核
              </span>
            </v-col>
            <!-- 申請類 變更客戶基本資料-->
            <v-col
              v-if="
                selectedCategory == '申請類' &&
                selectedTransaction == '變更客戶基本資料'
              "
              cols="6"
              md="6"
              class
            >
              <span v-if="this.step == 1" style="font-size: 16px">
                <span class="stepball primary mr-1">1</span>提示客戶證件掃描
              </span>
              <span v-if="this.step == 2" style="font-size: 16px">
                <span class="stepball primary mr-1">2</span>
                拍照確認身份並開啟戶政網頁
              </span>
              <span v-if="this.step == 3" style="font-size: 16px">
                <span class="stepball primary mr-1">3</span> 送出主管覆核
              </span>
              <span v-if="this.step == 4" style="font-size: 16px">
                <span class="stepball primary mr-1">4</span>
                列印申請書&確認內容並引導親簽
              </span>
              <span v-if="this.step == 5" style="font-size: 16px">
                <span class="stepball primary mr-1">5</span>
                文件掃描＆檢視文件內容
              </span>
              <span v-if="this.step == 6" style="font-size: 16px">
                <span class="stepball primary mr-1">6</span> 提示列印申請書副本
              </span>
              <span v-if="this.step == 7" style="font-size: 16px">
                <span class="stepball primary mr-1">7</span> 送出給主管覆核
              </span>
            </v-col>
            <!-- 申請類 提款卡申請/終止非約定轉帳-->
            <v-col
              v-if="
                selectedCategory == '申請類' &&
                selectedTransaction == '提款卡申請/終止非約定轉帳'
              "
              cols="6"
              md="6"
              class
            >
              <span v-if="this.step == 1" style="font-size: 16px">
                <span class="stepball primary mr-1">1</span>提示客戶證件掃描
              </span>
              <span v-if="this.step == 2" style="font-size: 16px">
                <span class="stepball primary mr-1">2</span>
                拍照確認身份並開啟戶政網頁
              </span>
              <span v-if="this.step == 3" style="font-size: 16px">
                <span class="stepball primary mr-1">3</span> 送出主管覆核
              </span>
              <span v-if="this.step == 4" style="font-size: 16px">
                <span class="stepball primary mr-1">4</span> 列印申請書&確認內容
              </span>
              <span v-if="this.step == 5" style="font-size: 16px">
                <span class="stepball primary mr-1">5</span>
                文件掃描＆檢視文件內容
              </span>
              <span v-if="this.step == 6" style="font-size: 16px">
                <span class="stepball primary mr-1">6</span> 提示列印申請書副本
              </span>
              <span v-if="this.step == 7" style="font-size: 16px">
                <span class="stepball primary mr-1">7</span> 送出給主管覆核
              </span>
            </v-col>
            <!-- 申請類 存摺取款密碼變更/刪除-->
            <v-col
              v-if="
                selectedCategory == '申請類' &&
                selectedTransaction == '存摺取款密碼變更/刪除'
              "
              cols="6"
              md="6"
              class
            >
              <span v-if="this.step == 1" style="font-size: 16px">
                <span class="stepball primary mr-1">1</span>提示客戶證件掃描
              </span>
              <span v-if="this.step == 2" style="font-size: 16px">
                <span class="stepball primary mr-1">2</span>
                拍照確認身份並開啟戶政網頁
              </span>
              <span v-if="this.step == 3" style="font-size: 16px">
                <span class="stepball primary mr-1">3</span> 送出主管覆核
              </span>
              <span v-if="this.step == 4" style="font-size: 16px">
                <span class="stepball primary mr-1">4</span> 列印申請書&確認內容
              </span>
              <span v-if="this.step == 5" style="font-size: 16px">
                <span class="stepball primary mr-1">5</span>
                文件掃描＆檢視文件內容
              </span>
              <span v-if="this.step == 6" style="font-size: 16px">
                <span class="stepball primary mr-1">6</span> 提示列印申請書副本
              </span>
              <span v-if="this.step == 7" style="font-size: 16px">
                <span class="stepball primary mr-1">7</span> 送出給主管覆核
              </span>
            </v-col>
            <!-- 現金類 -->

            <!-- 現金類 台幣現金存入（金融卡ATM交易）-->
            <v-col
              v-if="
                selectedCategory == '現金類' &&
                selectedTransaction == '台幣現金存入（金融卡ATM交易）'
              "
              cols="6"
              md="6"
              class
            >
              <span v-if="this.step == 1" style="font-size: 16px">
                <span class="stepball primary mr-1">1</span
                >金融卡讀卡(交易超過十萬元進行下面步驟，如無直接收取收據)
              </span>
              <span v-if="this.step == 2" style="font-size: 16px">
                <span class="stepball primary mr-1">2</span>
                交易超過十萬元提供證件掃描（本行客戶得以詢問個資方式確認身份）
              </span>
              <span v-if="this.step == 3" style="font-size: 16px">
                <span class="stepball primary mr-1">3</span>
                交易超過十萬元需拍照確認身份
                （本行客戶得以詢問個資方式確認身份）
              </span>
              <span v-if="this.step == 4" style="font-size: 16px">
                <span class="stepball primary mr-1">4</span>
                交易超過十萬元送出給主管覆核
              </span>
            </v-col>
            <!-- 現金類 台幣現金存入（Bancs無摺交易）-->
            <v-col
              v-if="
                selectedCategory == '現金類' &&
                selectedTransaction == '台幣現金存入（Bancs無摺交易）'
              "
              cols="6"
              md="6"
              class
            >
              <span v-if="this.step == 1" style="font-size: 16px">
                <span class="stepball primary mr-1">1</span
                >確認客戶是否已填寫表單 (若無引導客戶預填)
              </span>
              <span v-if="this.step == 2" style="font-size: 16px">
                <span class="stepball primary mr-1">2</span> 列印表單 (預填QR
                Code/客戶填單並 引導客戶確認內容 並簽蓋原留印鑑)
              </span>
              <span v-if="this.step == 3" style="font-size: 16px">
                <span class="stepball primary mr-1">3</span>
                拍照確認身份並出示存摺
              </span>
              <span v-if="this.step == 4" style="font-size: 16px">
                <span class="stepball primary mr-1">4</span>
                掃描表單（客戶填單/預填QR Code掃描/交易憑條掃描)
              </span>
              <span v-if="this.step == 5" style="font-size: 16px">
                <span class="stepball primary mr-1">5</span>
                交易執行(請客戶輸入密碼，有取款密碼時) 引導客戶存入現鈔
              </span>
              <span v-if="this.step == 6" style="font-size: 16px">
                <span class="stepball primary mr-1">6</span>
                交易覆核並提供收據(匯款金額 100萬含以上需進行覆驗印)
              </span>
              <span v-if="this.step == 7" style="font-size: 16px">
                <span class="stepball primary mr-1">7</span>
                掃描交易憑條副本（如客戶要求）
              </span>
            </v-col>
            <!-- 現金類 台幣現金取款（金融卡ATM交易）-->
            <v-col
              v-if="
                selectedCategory == '現金類' &&
                selectedTransaction == '台幣現金取款（金融卡ATM交易）'
              "
              cols="6"
              md="6"
              class
            >
              <span v-if="this.step == 1" style="font-size: 16px">
                <span class="stepball primary mr-1">1</span>金融卡讀卡
              </span>
              <span v-if="this.step == 2" style="font-size: 16px">
                <span class="stepball primary mr-1">2</span
                >交易超過十萬元提供證件掃描（本行客戶得以詢問個資方式確認身份）
              </span>
              <span v-if="this.step == 3" style="font-size: 16px">
                <span class="stepball primary mr-1">3</span>
                交易超過十萬元需拍照確認身份
                （本行客戶得以詢問個資方式確認身份）
              </span>
              <span v-if="this.step == 4" style="font-size: 16px">
                <span class="stepball primary mr-1">4</span>
                引導客戶取款提醒收據（交易超過十萬元，送出給主管覆核）
              </span>
            </v-col>
            <!-- 現金類 台幣現金取款（Bancs無摺交易）-->
            <v-col
              v-if="
                selectedCategory == '現金類' &&
                selectedTransaction == '台幣現金取款（Bancs無摺交易）'
              "
              cols="6"
              md="6"
              class
            >
              <span v-if="this.step == 1" style="font-size: 16px">
                <span class="stepball primary mr-1">1</span
                >確認客戶是否已填寫表單 (若無引導客戶預填)
              </span>
              <span v-if="this.step == 2" style="font-size: 16px">
                <span class="stepball primary mr-1">2</span> 列印表單 (預填QR
                Code/客戶填單並 引導客戶確認內容 並簽蓋原留印鑑)
              </span>
              <span v-if="this.step == 3" style="font-size: 16px">
                <span class="stepball primary mr-1">3</span>
                拍照確認身份並出示存摺
              </span>
              <span v-if="this.step == 4" style="font-size: 16px">
                <span class="stepball primary mr-1">4</span>
                掃描表單（客戶填單/預填QR Code掃描/交易憑條掃描)
              </span>
              <span v-if="this.step == 5" style="font-size: 16px">
                <span class="stepball primary mr-1">5</span>
                交易執行(請客戶輸入密碼，有取款密碼時) 引導客戶取出現鈔並點收
              </span>
              <span v-if="this.step == 6" style="font-size: 16px">
                <span class="stepball primary mr-1">6</span>
                交易覆核並提供收據(金額 100萬含以上需進行覆驗印)
              </span>
              <span v-if="this.step == 7" style="font-size: 16px">
                <span class="stepball primary mr-1">7</span>
                掃描交易憑條副本（如客戶要求）
              </span>
            </v-col>
            <!-- 非現金類 -->
            <v-col
              v-if="
                selectedCategory == '非現金類' &&
                selectedTransaction == '台幣轉帳'
              "
              cols="6"
              md="6"
              class
            >
              <span v-if="this.step == 1" style="font-size: 16px">
                <span class="stepball primary mr-1">1</span>確定客戶預填表單
              </span>
              <span v-if="this.step == 2" style="font-size: 16px">
                <span class="stepball primary mr-1">2</span> 列印表單 (預填QR
                Code/客戶填單並 引導客戶確認內容 並簽蓋原留印鑑)
              </span>
              <span v-if="this.step == 3" style="font-size: 16px">
                <span class="stepball primary mr-1">3</span>拍照確認身份
              </span>
              <span v-if="this.step == 4" style="font-size: 16px">
                <span class="stepball primary mr-1">4</span>
                交易超過三萬元提供證件掃描（本行客戶得以詢問個資方式確認身份）
              </span>
              <span v-if="this.step == 5" style="font-size: 16px">
                <span class="stepball primary mr-1">5</span> 表單掃描並檢視
              </span>
              <span v-if="this.step == 6" style="font-size: 16px">
                <span class="stepball primary mr-1">6</span> 送出給主管覆核
              </span>
            </v-col>
            <!-- 非現金類 -->
            <v-col
              v-if="
                selectedCategory == '非現金類' &&
                selectedTransaction == '台幣匯款'
              "
              cols="6"
              md="6"
              class
            >
              <span v-if="this.step == 1" style="font-size: 16px">
                <span class="stepball primary mr-1">1</span>確定客戶預填表單
              </span>
              <span v-if="this.step == 2" style="font-size: 16px">
                <span class="stepball primary mr-1">2</span> 列印表單 (預填QR
                Code/客戶填單並 引導客戶確認內容 並簽蓋原留印鑑)
              </span>
              <span v-if="this.step == 3" style="font-size: 16px">
                <span class="stepball primary mr-1">3</span>拍照確認身份
              </span>
              <span v-if="this.step == 4" style="font-size: 16px">
                <span class="stepball primary mr-1">4</span>
                交易超過三萬元提供證件掃描（本行客戶得以詢問個資方式確認身份）
              </span>
              <span v-if="this.step == 5" style="font-size: 16px">
                <span class="stepball primary mr-1">5</span> 表單掃描並檢視
              </span>
              <span v-if="this.step == 6" style="font-size: 16px">
                <span class="stepball primary mr-1">6</span> 送出給主管覆核
              </span>
            </v-col>
            <v-col cols="3" md="3">
              <v-subheader>
                設備狀態:
                <span :class="{ alert: isAlert }">{{ deviceStatus }}</span>
              </v-subheader>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-card class="pa-1" outlined>
          <h2 class="subtitle-1">
            設備狀態:
            <span :class="{ alert: isAlert }">{{deviceStatus}}</span>
          </h2>
        </v-card>
      </v-col>
    </v-row> -->
    <!-- <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-toolbar dense>
          <v-btn
            v-for="(value, name) in unitOperations"
            :key="name"
            :color="ButtonColor(value)"
            @click="UnitOperation(value)"
            :disabled="IsDisabled(value)"
            style="margin-left: 4px"
          >{{value.label}}</v-btn>
        </v-toolbar>
      </v-col>
    </v-row> -->
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <!-- <span v-if="this.selectedTransaction=='Richart身分驗證'">  -->
        <!-- <span v-if="isShow" style="margin-left: 4px"> 請點擊 <span class="font-weight-black">證件掃描</span> 按鈕</span> -->
        <component :is="currentUnitComponent"></component>
      </v-col>
    </v-row>
    <v-row justify="end" no-gutters>
      <v-col cols="5" md="5" class=" mt-2">
        <v-btn
          @click.prevent="back(step)"
          style="margin-right: 4px"
          :disabled="currentUnit === null || step < 2"
          >上一步</v-btn
        >
        <v-btn
          @click.prevent="forward(step)"
          color="primary"
          style="margin-right: 4px"
          :disabled="
            currentUnit === null ||
            (step > 7 &&
              selectedCategory == '申請類' &&
              selectedTransaction == '約定轉入帳號') ||
            (step > 3 && selectedCategory == '服務類') ||
            (step > 6 &&
              selectedCategory == '申請類' &&
              selectedTransaction == '變更客戶基本資料') ||
            (step > 6 &&
              selectedCategory == '申請類' &&
              selectedTransaction == '存摺取款密碼變更/刪除') ||
            (step > 6 &&
              selectedCategory == '申請類' &&
              selectedTransaction == '提款卡申請/終止非約定轉帳') ||
            (step > 5 &&
              selectedCategory == '非現金類' &&
              selectedTransaction == '台幣轉帳') ||
            (step > 5 &&
              selectedCategory == '非現金類' &&
              selectedTransaction == '台幣匯款') ||
            (step > 4 &&
              selectedCategory == '現金類' &&
              selectedTransaction == '台幣現金取款（金融卡ATM交易）') ||
            (step > 6 &&
              selectedCategory == '現金類' &&
              selectedTransaction == '台幣現金取款（Bancs無摺交易）') ||
            (step > 3 &&
              selectedCategory == '現金類' &&
              selectedTransaction == '台幣現金存入（金融卡ATM交易）') ||
            (step > 6 &&
              selectedCategory == '現金類' &&
              selectedTransaction == '台幣現金存入（Bancs無摺交易）')
          "
          >下一步</v-btn
        >
        <v-btn
          v-if="
            (this.selectedCategory != '服務類' &&
              this.selectedCategory != '申請類' &&
              this.selectedTransaction != '約定轉入帳號' &&
              this.selectedCategory != '現金類' &&
              this.selectedTransaction != '台幣現金存入（Bancs無摺交易）' &&
              this.selectedCategory != '現金類' &&
              this.selectedTransaction != '台幣現金存入（金融卡ATM交易）' &&
              this.selectedCategory != '現金類' &&
              this.selectedTransaction != '台幣現金取款（金融卡ATM交易）' &&
              this.selectedCategory != '現金類' &&
              this.selectedTransaction != '台幣現金取款（Bancs無摺交易）' &&
              this.selectedCategory != '非現金類' &&
              this.selectedTransaction != '台幣轉帳' &&
              this.selectedCategory != '非現金類' &&
              this.selectedTransaction != '台幣匯款' &&
              this.selectedCategory != '申請類' &&
              this.selectedTransaction != '變更客戶基本資料' &&
              this.selectedCategory != '申請類' &&
              this.selectedTransaction != '存摺取款密碼變更/刪除' &&
              this.selectedCategory != '申請類' &&
              this.selectedTransaction != '提款卡申請/終止非約定轉帳') ||
            (this.step == 4 && this.selectedCategory == '服務類') ||
            (this.step == 6 &&
              this.selectedCategory == '非現金類' &&
              this.selectedTransaction == '台幣轉帳') ||
            (this.step == 6 &&
              this.selectedCategory == '非現金類' &&
              this.selectedTransaction == '台幣匯款') ||
            (this.step == 4 &&
              this.selectedCategory == '現金類' &&
              this.selectedTransaction == '台幣現金存入（金融卡ATM交易）') ||
            (this.step == 7 &&
              this.selectedCategory == '現金類' &&
              this.selectedTransaction == '台幣現金存入（Bancs無摺交易）') ||
            (this.step == 5 &&
              this.selectedCategory == '現金類' &&
              this.selectedTransaction == '台幣現金取款（金融卡ATM交易）') ||
            (this.step == 7 &&
              this.selectedCategory == '現金類' &&
              this.selectedTransaction == '台幣現金取款（Bancs無摺交易）') ||
            (this.step == 8 &&
              this.selectedCategory == '申請類' &&
              this.selectedTransaction == '約定轉入帳號') ||
            (this.step == 7 &&
              this.selectedCategory == '申請類' &&
              this.selectedTransaction == '存摺取款密碼變更/刪除') ||
            (this.step == 7 &&
              this.selectedCategory == '申請類' &&
              this.selectedTransaction == '提款卡申請/終止非約定轉帳') ||
            (this.step == 7 &&
              this.selectedCategory == '申請類' &&
              this.selectedTransaction == '變更客戶基本資料')
          "
          @click="CancelUnitOperation"
          style="margin-right: 4px"
          :disabled="currentUnit === null"
          >結束服務</v-btn
        >
        <v-btn
          v-if="
            (this.selectedCategory != '服務類' &&
              this.selectedCategory != '申請類' &&
              this.selectedTransaction != '約定轉入帳號' &&
              this.selectedCategory != '現金類' &&
              this.selectedTransaction != '台幣現金取款（金融卡ATM交易）' &&
              this.selectedCategory != '現金類' &&
              this.selectedTransaction != '台幣現金存入（Bancs無摺交易）' &&
              this.selectedCategory != '現金類' &&
              this.selectedTransaction != '台幣現金存入（金融卡ATM交易）' &&
              this.selectedCategory != '非現金類' &&
              this.selectedTransaction != '台幣轉帳' &&
              this.selectedCategory != '非現金類' &&
              this.selectedTransaction != '台幣匯款' &&
              this.selectedCategory != '申請類' &&
              this.selectedTransaction != '變更客戶基本資料' &&
              this.selectedCategory != '申請類' &&
              this.selectedTransaction != '存摺取款密碼變更/刪除' &&
              this.selectedCategory != '申請類' &&
              this.selectedTransaction != '提款卡申請/終止非約定轉帳') ||
            (this.step == 4 && this.selectedCategory == '服務類') ||
            (this.step == 7 &&
              this.selectedCategory == '現金類' &&
              this.selectedTransaction == '台幣現金存入（Bancs無摺交易）') ||
            (this.step == 4 &&
              this.selectedCategory == '現金類' &&
              this.selectedTransaction == '台幣現金存入（金融卡ATM交易）') ||
            (this.step == 7 &&
              this.selectedCategory == '現金類' &&
              this.selectedTransaction == '台幣現金取款（Bancs無摺交易）') ||
            (this.step == 5 &&
              this.selectedCategory == '現金類' &&
              this.selectedTransaction == '台幣現金取款（金融卡ATM交易）') ||
            (this.step == 6 &&
              this.selectedCategory == '非現金類' &&
              this.selectedTransaction == '台幣轉帳') ||
            (this.step == 6 &&
              this.selectedCategory == '非現金類' &&
              this.selectedTransaction == '台幣匯款') ||
            (this.step == 7 &&
              this.selectedCategory == '申請類' &&
              this.selectedTransaction == '提款卡申請/終止非約定轉帳') ||
            (this.step == 7 &&
              this.selectedCategory == '申請類' &&
              this.selectedTransaction == '存摺取款密碼變更/刪除') ||
            (this.step == 7 &&
              this.selectedCategory == '申請類' &&
              this.selectedTransaction == '變更客戶基本資料') ||
            (this.step == 8 &&
              this.selectedCategory == '申請類' &&
              this.selectedTransaction == '約定轉入帳號')
          "
          @click="FinishUnitOperation"
          color="primary"
          :disabled="currentUnit === null"
          >繼續辦理</v-btn
        >
      </v-col>
    </v-row>
    <v-dialog
      v-model="dispIdentityVerifyNotification"
      persistent
      max-width="600"
    >
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat dense>
          <v-toolbar-title>主管身分覆核結果</v-toolbar-title>
        </v-toolbar>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="10">
              <div class="home">
                <div
                  v-if="identityVerifyStatus === 2"
                  style="text-align: center; padding: 60px"
                >
                  <h1>主管身分覆核已經通過</h1>
                </div>
                <div v-else style="text-align: center; padding: 60px">
                  <h1 class="alert">主管身分覆核被駁回</h1>
                  <h2 v-if="identityVerifyNote !== ''" class="alert">
                    {{ identityVerifyNote }}
                  </h2>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dispIdentityVerifyNotification = false"
            >關閉</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import NonCash from "../components/NonCash";
import StepApplication from "../components/StepApplication";
import StepCash from "../components/StepCash";
import StepBancs from "../components/StepBancs";
import SelectUnit from "../components/SelectUnit";
import ScanIdentity from "../components/ScanIdentity";
import ScanDocument from "../components/ScanDocument";
import Photograph from "../components/Photograph";
import BackgroundOperation from "../components/BackgroundOperation";
import Cashcard from "../components/Cashcard";
import IdentityVerificationCompleted from "../components/IdentityVerificationCompleted";
import CustomOrder from "../components/CustomOrder";
import Bancs from "../components/Bancs";
import Confirm from "../components/Confirm";
import StepChangeForm from "../components/StepChangeForm";
import ConfirmForm from "../components/ConfirmForm";
import TransactionExecution from "../components/TransactionExecution";
//import InputPassword from '../components/InputPassword'
import ReadCard from "../components/ReadCard";
import PrintDocument from "../components/PrintDocument";
//import Signature from '../components/Signature'
import IdentityVerify from "../components/IdentityVerify";
import TransactionVerify from "../components/TransactionVerify";
import TransactionItems from "../transactions.json";

export default {
  name: "UnitOperationBase",
  components: {
    StepApplication,
    StepChangeForm,
    StepCash,
    StepBancs,
    NonCash,
  },
  data: () => ({
    // deviceStatus: '等待叫號',

    // deviceStatus: '',
    isAlert: false,
    isReady: false,
    isShow: false,
    step: 0,
    //steps: 4,
    status: 2,
    transactionCategories: ["服務類", "申請類", "非現金類", "現金類"],
    selectedCategory: null,

    // transactionItems: {
    //   '服務類': [
    //     'Richart身分驗證'
    //   ],
    //   '申請類': [
    //     '約定轉入帳號',
    //     '變更客戶基本資料',
    //     '提款卡申請/終止非約定轉帳',
    //     '存摺取款密碼變更/刪除'
    //   ],
    //   '非現金類': [
    //     '台幣轉帳',
    //     '台幣匯款'
    //   ],
    //   '現金類': [
    //     '台幣現金存入',
    //     '台幣現金取款(金融卡ATM交易)'
    //   ],
    //   '其他類': [
    //     '其他業務'
    //   ]
    // },

    transactionItems: TransactionItems,
    transactions: [],
    selectedTransaction: null,
    currentUnitComponent: SelectUnit,
    currentUnit: null,
    unitOperations: {
      ScanIdentity: {
        name: "ScanIdentity",
        label: "證件掃描",
        pressed: false,
        component: ScanIdentity,
      },
      PrintDocument: {
        name: "PrintDocument",
        label: "文件列印",
        pressed: false,
        component: PrintDocument,
      },
      ScanDocument: {
        name: "ScanDocument",
        label: "文件掃描",
        pressed: false,
        component: ScanDocument,
      },
      /*
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
        */
      Confirm: {
        name: "Confirm",
        label: "金融讀卡",
        pressed: false,
        component: Confirm,
      },
      Cashcard: {
        name: "Cashcard",
        label: "金融讀卡",
        pressed: false,
        component: Cashcard,
      },
      ReviewIdentity: {
        name: "IdentityVerify",
        label: "客戶身分覆核",
        pressed: false,
        component: IdentityVerify,
      },
      ReviewTransaction: {
        name: "ReviewTransaction",
        label: "交易覆核",
        pressed: false,
        component: TransactionVerify,
      },
      TransactionExecution: {
        name: "TransactionExecution",
        label: "交易執行",
        pressed: false,
        component: TransactionExecution,
      },
    },
    dispIdentityVerifyNotification: false,
    identityVerifyStatus: 0,
    identityVerifyNote: "",
    transactionVerifyStatus: 0,
    transactionVerifyNote: "",
  }),
  methods: {
    forward(step) {
      if (step < this.steps) {
        this.step++;
      }
      this.$emit("step");
    },
    back(step) {
      if (step > 1) {
        this.step--;
      }
      this.$emit("step");
    },
    ButtonColor(unit) {
      return unit.pressed ? "blue-grey white--text" : "primary";
    },
    IsDisabled(unit) {
      if (this.selectedTransaction === null) return true;
      if (this.currentUnit === null) return false;
      return unit !== this.currentUnit;
    },
    UnitOperation(unit) {
      this.status = -2;
      this.currentUnit = unit;
      this.currentUnitComponent = unit.component;
    },
    CancelUnitOperation() {
      this.status = -2;
      this.$emit("cancel");
      this.currentUnit = null;
      this.currentUnitComponent = SelectUnit;
      this.selectedCategory = null;
      this.selectedTransaction = null;
      this.transactionVerifyStatus = 0;
      this.transactionVerifyNote = "";
      this.identityVerifyStatus = 0;
    },
    FinishUnitOperation() {
      this.status = -2;
      this.currentUnit.pressed = true;
      this.currentUnit = null;
      this.currentUnitComponent = SelectUnit;
      this.isShow = true;
      this.transactionVerifyStatus = 0;
      this.transactionVerifyNote = "";
      this.identityVerifyStatus = 0;
    },
    CategoryChanged() {
      this.transactions = this.transactionItems[this.selectedCategory];
    },
    TransactionChanged() {
      this.status = -2;
      this.isAlert = true;
      this.isShow = false;
      this.step = 1;
    },
    TransactionCanceled() {
      this.$emit("cancel");
      this.currentUnit = null;
      this.currentUnitComponent = SelectUnit;
      this.selectedCategory = null;
      this.selectedTransaction = null;
      this.status = 3;
      this.ClearUnitPressedState();
      this.transactionVerifyStatus = 0;
      this.transactionVerifyNote = "";
      this.identityVerifyStatus = 0;
      this.step = 0;
    },
    TransactionFinished() {
      this.selectedCategory = null;
      this.selectedTransaction = null;
      this.status = 3;
      this.ClearUnitPressedState();
      this.transactionVerifyStatus = 0;
      this.transactionVerifyNote = "";
      this.identityVerifyStatus = 0;
    },
    ClearUnitPressedState() {
      for (var unit in this.unitOperations) {
        console.log(`unit name: ${unit.name}`);
        this.unitOperations[unit].pressed = false;
      }
    },
  },
  computed: {
    deviceStatus() {
      switch (this.status) {
        case -2:
          return "";
        case -1:
          return "客戶不同意錄影錄音";
        case 0:
          return "等待叫號";
        case 1:
          return "等待客戶同意錄影錄音";
        case 2:
          return "選擇業務項目";
        case 3:
          return "請選擇業務類別與項目";
        case 4:
          return "客戶端設備狀態正常";
        case 5:
          return "客戶證件掃描中…";
        case 6:
          return "等待主管交易覆核";
        case 7:
          return " 金融卡讀卡中";
        case 8:
          return " 等待文件掃描中";
        case 9:
          return " 身分證正面掃描中…";
        case 10:
          return " 身分證反面掃描中…";
        case 11:
          return " 第二證件正面掃描中…";
        case 12:
          return " 第二證件反面掃描中…";
        case 13:
          return "等待客戶掃描文件…";
        case 14:
          return "確認客戶填單";
        case 15:
          return "已經送出主管覆核";
        case 16:
          return "等待文件列印…";
      }
      return "";
    },
    steps() {
      if (this.selectedCategory == "服務類") {
        return 4;
      } else if (
        this.selectedCategory == "申請類" &&
        this.selectedTransaction == "約定轉入帳號"
      ) {
        return 8;
      } else if (
        this.selectedCategory == "申請類" &&
        this.selectedTransaction == "變更客戶基本資料"
      ) {
        return 7;
      } else if (
        this.selectedCategory == "申請類" &&
        this.selectedTransaction == "提款卡申請/終止非約定轉帳"
      ) {
        return 7;
      } else if (
        this.selectedCategory == "申請類" &&
        this.selectedTransaction == "存摺取款密碼變更/刪除"
      ) {
        return 7;
      } else if (
        this.selectedCategory == "現金類" &&
        this.selectedTransaction == "台幣現金存入（金融卡ATM交易)"
      ) {
        return 4;
      } else if (
        this.selectedCategory == "現金類" &&
        this.selectedTransaction == "台幣現金存入（Bancs無摺交易）"
      ) {
        return 7;
      } else if (
        this.selectedCategory == "現金類" &&
        this.selectedTransaction == "台幣現金取款（金融卡ATM交易）"
      ) {
        return 5;
      } else if (
        this.selectedCategory == "現金類" &&
        this.selectedTransaction == "台幣現金取款（Bancs無摺交易）"
      ) {
        return 7;
      } else if (
        this.selectedCategory == "非現金類" &&
        this.selectedTransaction == "台幣轉帳"
      ) {
        return 6;
      } else if (
        this.selectedCategory == "非現金類" &&
        this.selectedTransaction == "台幣匯款"
      ) {
        return 6;
      } else {
        return 4;
      }
    },
  },
  watch: {
    step() {
      if (this.selectedCategory == "服務類") {
        switch (this.step) {
          case 1:
            this.currentUnit = ScanIdentity;
            this.currentUnitComponent = ScanIdentity;
            this.status = 2;
            break;
          case 2:
            this.currentUnit = Photograph;
            this.currentUnitComponent = Photograph;
            this.status = 2;
            break;
          case 3:
            this.currentUnit = BackgroundOperation;
            this.currentUnitComponent = BackgroundOperation;
            this.status = 4;
            break;
          case 4:
            this.currentUnit = IdentityVerificationCompleted;
            this.currentUnitComponent = IdentityVerificationCompleted;
            this.status = 4;
            break;
        }
      } else if (
        this.selectedCategory == "申請類" &&
        this.selectedTransaction == "約定轉入帳號"
      ) {
        switch (this.step) {
          case 1:
            this.currentUnit = ScanIdentity;
            this.currentUnitComponent = ScanIdentity;
            this.status = 2;
            break;
          case 2:
            this.currentUnit = Photograph;
            this.currentUnitComponent = Photograph;
            this.status = 2;
            break;
          case 3:
            this.currentUnit = IdentityVerify;
            this.currentUnitComponent = IdentityVerify;
            this.status = 4;
            break;
          case 4:
            this.currentUnit = CustomOrder;
            this.currentUnitComponent = CustomOrder;
            this.status = 14;
            break;
          case 5:
            this.currentUnit = ConfirmForm;
            this.currentUnitComponent =ConfirmForm;
            this.status = 14;
            break;
          case 6:
            this.currentUnit = ScanDocument;
            this.currentUnitComponent = ScanDocument;
            this.status = 2;
            break;
          case 7:
            this.currentUnit = PrintDocument;
            this.currentUnitComponent = PrintDocument;
            this.status = -2;
            break;
          case 8:
            this.currentUnit = TransactionVerify;
            this.currentUnitComponent = TransactionVerify;
            this.status = 6;
            break;
        }
      } else if (
        this.selectedCategory == "申請類" &&
        this.selectedTransaction == "變更客戶基本資料"
      ) {
        switch (this.step) {
          case 1:
            this.currentUnit = ScanIdentity;
            this.currentUnitComponent = ScanIdentity;
            this.status = 2;
            break;
          case 2:
            this.currentUnit = Photograph;
            this.currentUnitComponent = Photograph;
            this.status = 2;
            break;
          case 3:
            this.currentUnit = IdentityVerify;
            this.currentUnitComponent = IdentityVerify;
            this.status = 4;
            break;
          case 4:
            this.currentUnit = Bancs;
            this.currentUnitComponent = Bancs;
            this.status = -2;
            break;
          case 5:
            this.currentUnit = ScanDocument;
            this.currentUnitComponent = ScanDocument;
            this.status = -2;
            break;
          case 6:
            this.currentUnit = PrintDocument;
            this.currentUnitComponent = PrintDocument;
            this.status = -2;
            break;
          case 7:
            this.currentUnit = TransactionVerify;
            this.currentUnitComponent = TransactionVerify;
            this.status = 6;
            break;
        }
      } else if (
        this.selectedCategory == "申請類" &&
        this.selectedTransaction == "提款卡申請/終止非約定轉帳"
      ) {
        switch (this.step) {
          case 1:
            this.currentUnit = ScanIdentity;
            this.currentUnitComponent = ScanIdentity;
            this.status = 2;
            break;
          case 2:
            this.currentUnit = Photograph;
            this.currentUnitComponent = Photograph;
            this.status = 2;
            break;
          case 3:
            this.currentUnit = IdentityVerify;
            this.currentUnitComponent = IdentityVerify;
            this.status = 4;
            break;
          case 4:
            this.currentUnit = Bancs;
            this.currentUnitComponent = Bancs;
            this.status = 5;
            break;
          case 5:
            this.currentUnit = ScanDocument;
            this.currentUnitComponent = ScanDocument;
            this.status = -2;
            break;
          case 6:
            this.currentUnit = PrintDocument;
            this.currentUnitComponent = PrintDocument;
            this.status = -2;
            break;
          case 7:
            this.currentUnit = TransactionVerify;
            this.currentUnitComponent = TransactionVerify;
            this.status = 6;
            break;
        }
      } else if (
        this.selectedCategory == "申請類" &&
        this.selectedTransaction == "存摺取款密碼變更/刪除"
      ) {
        switch (this.step) {
          case 1:
            this.currentUnit = ScanIdentity;
            this.currentUnitComponent = ScanIdentity;
            this.status = 2;
            break;
          case 2:
            this.currentUnit = Photograph;
            this.currentUnitComponent = Photograph;
            this.status = 2;
            break;
          case 3:
            this.currentUnit = IdentityVerify;
            this.currentUnitComponent = IdentityVerify;
            this.status = 4;
            break;
          case 4:
            this.currentUnit = Bancs;
            this.currentUnitComponent = Bancs;
            this.status = 5;
            break;
          case 5:
            this.currentUnit = ScanDocument;
            this.currentUnitComponent = ScanDocument;
            this.status = -2;
            break;
          case 6:
            this.currentUnit = TransactionVerify;
            this.currentUnitComponent = TransactionVerify;
            this.status = 6;
            break;
        }
      } else if (
        this.selectedCategory == "現金類" &&
        this.selectedTransaction == "台幣現金存入（金融卡ATM交易）"
      ) {
        switch (this.step) {
          case 1:
            this.currentUnit = ReadCard;
            this.currentUnitComponent = ReadCard;
            this.status = 4;
            break;
          case 2:
            this.currentUnit = ScanIdentity;
            this.currentUnitComponent = ScanIdentity;
            this.status = 2;
            break;
          case 3:
            this.currentUnit = Photograph;
            this.currentUnitComponent = Photograph;
            this.status = 2;
            break;
          case 4:
            this.currentUnit = IdentityVerify;
            this.currentUnitComponent = IdentityVerify;
            this.status = 4;
            break;
        }
      } else if (
        this.selectedCategory == "現金類" &&
        this.selectedTransaction == "台幣現金存入（Bancs無摺交易）"
      ) {
        switch (this.step) {
          case 1:
            this.currentUnit = CustomOrder;
            this.currentUnitComponent = CustomOrder;
            this.status = 4;
            break;
          case 2:
            this.currentUnit = PrintDocument;
            this.currentUnitComponent = PrintDocument;
            this.status = -2;
            break;
          case 3:
            this.currentUnit = Photograph;
            this.currentUnitComponent = Photograph;
            this.status = 2;
            break;
          case 4:
            this.currentUnit = ScanDocument;
            this.currentUnitComponent = ScanDocument;
            this.status = 2;
            break;
          case 5:
            this.currentUnit = TransactionExecution;
            this.currentUnitComponent = TransactionExecution;
            this.status = 2;
            break;
          case 6:
            this.currentUnit = TransactionVerify;
            this.currentUnitComponent = TransactionVerify;
            this.status = 6;
            break;
          case 7:
            this.currentUnit = ScanDocument;
            this.currentUnitComponent = ScanDocument;
            this.status = 6;
            break;
        }
      } else if (
        this.selectedCategory == "非現金類" &&
        this.selectedTransaction == "台幣轉帳"
      ) {
        switch (this.step) {
          case 1:
            this.currentUnit = CustomOrder;
            this.currentUnitComponent = CustomOrder;
            this.status = 4;
            break;
          case 2:
            this.currentUnit = PrintDocument;
            this.currentUnitComponent = PrintDocument;
            this.status = -2;
            break;
          case 3:
            this.currentUnit = Photograph;
            this.currentUnitComponent = Photograph;
            this.status = 2;
            break;
          case 4:
            this.currentUnit = ScanIdentity;
            this.currentUnitComponent = ScanIdentity;
            this.status = 2;
            break;
          case 5:
            this.currentUnit = ScanDocument;
            this.currentUnitComponent = ScanDocument;
            this.status = 8;
            break;
          case 6:
            this.currentUnit = TransactionVerify;
            this.currentUnitComponent = TransactionVerify;
            this.status = 6;
            break;
        }
      } else if (
        this.selectedCategory == "非現金類" &&
        this.selectedTransaction == "台幣匯款"
      ) {
        switch (this.step) {
          case 1:
            this.currentUnit = CustomOrder;
            this.currentUnitComponent = CustomOrder;
            this.status = 4;
            break;
          case 2:
            this.currentUnit = PrintDocument;
            this.currentUnitComponent = PrintDocument;
            this.status = -2;
            break;
          case 3:
            this.currentUnit = Photograph;
            this.currentUnitComponent = Photograph;
            this.status = 2;
            break;
          case 4:
            this.currentUnit = ScanIdentity;
            this.currentUnitComponent = ScanIdentity;
            this.status = 2;
            break;
          case 5:
            this.currentUnit = ScanDocument;
            this.currentUnitComponent = ScanDocument;
            this.status = 8;
            break;
          case 6:
            this.currentUnit = TransactionVerify;
            this.currentUnitComponent = TransactionVerify;
            this.status = 6;
            break;
        }
      } else if (
        this.selectedCategory == "現金類" &&
        this.selectedTransaction == "台幣現金取款（金融卡ATM交易）"
      ) {
        switch (this.step) {
          case 1:
            this.currentUnit = ReadCard;
            this.currentUnitComponent = ReadCard;
            this.status = 7;
            break;
          case 2:
            this.currentUnit = ScanIdentity;
            this.currentUnitComponent = ScanIdentity;
            this.status = 2;
            break;
          case 3:
            this.currentUnit = Photograph;
            this.currentUnitComponent = Photograph;
            this.status = 2;
            break;
          case 4:
            this.currentUnit = IdentityVerify;
            this.currentUnitComponent = IdentityVerify;
            this.status = 4;
            break;
          case 5:
            this.currentUnit = TransactionVerify;
            this.currentUnitComponent = TransactionVerify;
            this.status = 6;
            break;
        }
      } else if (
        this.selectedCategory == "現金類" &&
        this.selectedTransaction == "台幣現金取款（Bancs無摺交易）"
      ) {
        switch (this.step) {
          case 1:
            this.currentUnit = CustomOrder;
            this.currentUnitComponent = CustomOrder;
            this.status = 4;
            break;
          case 2:
            this.currentUnit = PrintDocument;
            this.currentUnitComponent = PrintDocument;
            this.status = -2;
            break;
          case 3:
            this.currentUnit = Photograph;
            this.currentUnitComponent = Photograph;
            this.status = 2;
            break;
          case 4:
            this.currentUnit = ScanDocument;
            this.currentUnitComponent = ScanDocument;
            this.status = 2;
            break;
          case 5:
            this.currentUnit = TransactionExecution;
            this.currentUnitComponent = TransactionExecution;
            this.status = 2;
            break;
          case 6:
            this.currentUnit = TransactionVerify;
            this.currentUnitComponent = TransactionVerify;
            this.status = 6;
            break;
          case 7:
            this.currentUnit = ScanDocument;
            this.currentUnitComponent = ScanDocument;
            this.status = 6;
            break;
        }
      }
    },
  },
};
</script>

<style>
.alert {
  color:#de5858;
  font-weight:800;
}
.stepball {
  align-items: center;
  border-radius: 50%;
  display: inline-flex;
  font-size: 0.75rem;
  justify-content: center;
  height: 24px;
  min-width: 24px;
  width: 24px;
  color: #de5858;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.wrap .border-left-primary {
  border-left: 4px solid #1E88E5;
}
.mainContent{
  min-height: calc(934px - 120px);
}
</style>
