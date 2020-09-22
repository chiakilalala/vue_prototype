<template>
  <v-container
          class="fill-height"
          fluid
  >
    <v-row no-gutters justify="center">
      <v-col cols="12" md="10">
        <v-card class="pa-1">
          <h1>
            設備狀態: <span :class="{ alert: status < 0 }">{{deviceStatus}}</span>
          </h1>
        </v-card>
      </v-col>
    </v-row>
    <v-row
            align="center"
            justify="center"
            no-gutters
    >
      <v-col
              cols="12"
              sm="10"
              md="10"
      >
        <v-card class="elevation-12">
          <v-toolbar
                  color="primary"
                  dark
                  flat
                  dense
          >
            <v-toolbar-title>選擇業務項目</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-data-table
                    :headers="category_headers"
                    :items="transactionItems"
                    :single-expand="false"
                    :expanded="transactionItems"
                    item-key="category"
                    show-expand
                    disable-pagination
                    hide-default-footer
                    height="600"
            >
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length" style="padding: 8px;">
                  <v-data-table
                          v-model="item.selectedItems"
                          :headers="item_headers"
                          :items="item.items"
                          :single-select="false"
                          item-key="name"
                          show-select
                          disable-pagination
                          hide-default-footer
                  >
                    <template v-slot:item.count="props">
                      <v-edit-dialog :return-value.sync="props.item.count">
                        {{ props.item.count }}
                        <template v-slot:input>
                          <v-text-field
                            v-model="props.item.count"
                            type="number"
                            min="1"
                            single-line
                            ></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </template>
                  </v-data-table>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="primary"
                    @click="StartProcess"
                    :disabled="btnDisabled"
            >開始處理業務</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'SelectItem',
    data: () => ({
      status: 0,
      category_headers: [
        {
          text: '業務類別',
          sortable: false,
          value: 'category'
        }
      ],
      item_headers: [
        {
          text: '筆數',
          align: 'end',
          sortable: false,
          value: 'count',
          width: '150'
        },
        {
          text: '業務項目',
          align: 'start',
          sortable: false,
          value: 'name'
        }
      ],
      transactionItems: [
        {
          category: '服務類',
          items: [
            {
              name: 'Richart身分驗證',
              count: 1
            },
            {
              name: 'Richart身分驗證(自助)',
              count: 1
            },
            {
              name: '數位開戶',
              count: 1
            }
          ],
          selectedItems: []
        },
        {
          category: '申請類',
          items: [
            {
              name: '約定轉入帳號',
              count: 1
            },
            {
              name: '變更客戶基本資料',
              count: 1
            },
            {
              name: '提款卡申請/終止非約定轉帳',
              count: 1
            },
            {
              name: '存摺取款密碼變更/刪除',
              count: 1
            },
            {
              name: '電話理財申請/停用/重新申請',
              count: 1
            },
            {
              name: '網銀申請/停用/重新申請',
              count: 1
            },
            {
              name: '台幣存款餘額證明',
              count: 1
            }
          ],
          selectedItems: []
        },
        {
          category: '非現金類',
          items: [
            {
              name: '台幣轉帳',
              count: 1
            },
            {
              name: '台幣匯款',
              count: 1
            },
            {
              name: '台幣綜定存解約',
              count: 1
            },
            {
              name: '台幣活存轉綜定存',
              count: 1
            },
            {
              name: '轉帳繳信用卡',
              count: 1
            },
            {
              name: '轉帳繳公用事業費用',
              count: 1
            },
            {
              name: '轉帳繳貸款',
              count: 1
            }
          ],
          selectedItems: []
        },
        {
          category: '現金類',
          items: [
            {
              name: '台幣現金存入',
              count: 1
            },
            {
              name: '台幣現金匯款',
              count: 1
            },
            {
              name: '台幣現金取款',
              count: 1
            },
            {
              name: '現金繳信用卡',
              count: 1
            },
            {
              name: '現金繳公用事業費用',
              count: 1
            },
            {
              name: '現金繳貸款',
              count: 1
            }
          ],
          selectedItems: []
        },
        {
          category: '其他類',
          items: [
            {
              name: '其他',
              count: 1
            }
          ],
          selectedItems: []
        }
      ]
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
      btnDisabled () {
        if (this.status !== 2) return true
        var selected = []
        this.transactionItems.forEach(category => {
          category.selectedItems.forEach(item => {
            selected.push(item.name)
          })
        })
        return selected.length === 0
      }
    },
    methods: {
      StartProcess() {
        var selected = []
        this.transactionItems.forEach(category => {
          category.selectedItems.forEach(item => {
            selected.push(item.name)
          })
        })
        this.$root.transactions = selected
        this.$router.push('/unitOperation')
      }
    }
  }
</script>

<style scoped>
  .alert {
    color: red
  }
</style>
