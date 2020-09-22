<template>
  <v-card height="680px">
    <v-simple-table v-if="dispList" height="650px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">預填單序號</th>
            <th class="text-left">預填單名稱</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in preprocessList" :key="item.ordinal">
            <td>{{ item.ordinal }}</td>
            <td>{{ item.name }}</td>
            <td>
              <v-btn @click="OpenForm(item)">開啟預填單</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-container v-else fluid>
      <v-row no-gutters>
        <v-col cols="4" md="4">
          <div style="padding: 10px;">
            預填單序號: {{ selectedForm.ordinal }}
          </div>
        </v-col>
        <v-col cols="8" md="8">
          <div style="padding: 10px;">
            預填單名稱: {{ selectedForm.name }}
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="4" md="4">
          <div style="padding: 10px;">
            <v-btn @click="ConfirmData">客戶確認</v-btn>
            <v-btn @click="BackToList" style="margin-left: 8px;">回到預填單清單</v-btn>
          </div>
        </v-col>
        <v-col cols="8" md="8">
        </v-col>
      </v-row>
      <v-row justify="center" no-gutters>
        <v-col cols="10" md="10">
          <div style="border: 1px solid black; width: 800px; height:500px;">

          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  export default {
    name: 'Preprocess',
    created () {
      this.$parent.$on('cancel', this.Cancel)
    },
    beforeDestroy() {
      this.$parent.$off('cancel')
    },
    data () {
      return {
        done: false,
        dispList: true,
        selectedForm: null,
        preprocessList: [
          {
            ordinal: 1,
            name: '約定轉帳'
          },
          {
            ordinal: 2,
            name: '台幣轉帳'
          },
          {
            ordinal: 3,
            name: '台幣轉帳'
          },
          {
            ordinal: 4,
            name: '台幣轉帳'
          },
          {
            ordinal: 5,
            name: '台幣匯款'
          },
          {
            ordinal: 6,
            name: '台幣匯款'
          }
        ]
      }
    },
    methods: {
      Cancel() {
        this.done = true
      },
      OpenForm(form) {
        this.selectedForm = form
        this.dispList = false
      },
      ConfirmData() {
        this.$parent.deviceStatus = '等待客戶確認...'
      },
      BackToList() {
        this.$parent.deviceStatus = ''
        this.dispList = true
      }
    }
  }
</script>
<style scoped>
</style>
