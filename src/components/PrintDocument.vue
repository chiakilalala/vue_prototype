<template>
  <v-card height="680px">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="4" md="4">
          <div style="padding: 10px;">
            <v-btn @click="StartPrint">發送取件通知</v-btn>
          </div>
        </v-col>
        <v-col cols="8" md="8">
          <!--div style="border: 1px solid black; width: 300px; height:200px;">
            預填單匯入文件/憑條
          </div-->
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="6" md="6">
          <v-card style="margin-right: 10px;">
            <v-toolbar
                    color="blue lighten-4 black--text"
                    dark
                    dense
                    flat
            >
              <v-toolbar-title class="text-subtitle-1">預填單匯入的文件</v-toolbar-title>
            </v-toolbar>
            <v-virtual-scroll :items="preprocessImportedDocs" :item-height="200" height="540">
              <template v-slot="{ item }">
                <v-list-item>
                  <v-list-item-action>
                    <v-btn small @click="StartPrint">列印</v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <div style="border: 1px solid black; width:100px; height:180px;">
                      {{item.name}}
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-virtual-scroll>
          </v-card>
        </v-col>
        <v-col cols="6" md="6">
          <v-card>
            <v-toolbar
                    color="blue lighten-4 black--text"
                    dark
                    dense
                    flat
            >
              <v-toolbar-title class="text-subtitle-1">掃描匯入的文件</v-toolbar-title>
            </v-toolbar>
            <v-virtual-scroll :items="scanImportedDocs" :item-height="200" height="540">
              <template v-slot="{ item }">
                <v-list-item>
                  <v-list-item-action>
                    <v-btn small @click="StartPrint">列印</v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <div style="border: 1px solid black; width:100px; height:180px;">
                      {{item.name}}
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-virtual-scroll>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  export default {
    name: 'PrintDocument',
    data () {
      return {
        preprocessImportedDocs: [
          { name: '預填單-1' },
          { name: '預填單-2' },
          { name: '預填單-3' }
        ],
        scanImportedDocs: [
          { name: '掃描-1' },
          { name: '掃描-2' },
          { name: '掃描-3' },
          { name: '掃描-4' }
        ]
      }
    },
    methods: {
      StartPrint () {
        this.$parent.status = 16
      },
      Done () {
        this.$parent.status = ''
      }
    }
  }
</script>
<style scoped>
</style>
