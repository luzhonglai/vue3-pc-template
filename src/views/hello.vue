<!--
 * @Description: 
 * @Author: luzhonglai
 * @Date: 2022-12-04 22:01:00
 * @LastEditors: luzhonglai
 * @LastEditTime: 2023-02-21 18:26:11
 * @FilePath: \vue3-pc-template\src\views\hello.vue
-->
<script setup lang="ts">
import { defineExpose, reactive, getCurrentInstance, onMounted } from 'vue'
const {
  proxy: { $api, $fetch, $wsCache }
}: any = getCurrentInstance() // 获取挂在全局方法
import { searchFormConfig } from './test'

const state = reactive({
  searchFormConfig
})
const methods: any = {
  async getUserInfo() {
    //  const res = await $api.test.findChildOptions({
    //    currentPage: 1,
    //    keyWord: {},
    //    parentApiName: 'country',
    //    parentValue: 'ZM'
    //  })
    // const { result } = await $api.test.getFormOp()
    const result = searchFormConfig.result
    state.searchFormConfig.formItems = []

    const mdataList = result.layout.sections.chosedPools
    const objRules = result.describe.fields
    debugger
    state.searchFormConfig.modelValue = {}
    mdataList.map((item) => {
      if (item.isActive == false) return
      const key = item.apiName

      if (item.apiName == 'Field_34ti__u') {
        Object.values(item.subFields).map((items: any) => {
          if (items.isActive) {
            const key = items.apiName
            items['field'] = key
            items.type = 'select'
            items['options'] = []
            items.config = objRules[key].config
            state.searchFormConfig.modelValue[key] = ''
            state.searchFormConfig.formItems.push(items)
          }
        })
      } else {
        item['field'] = key
        ;['text'].includes(item.type) && (item.type = 'input')
        ;['long_text'].includes(item.type) && (item.type = 'textarea')
        ;['select_one'].includes(item.type) && (item.type = 'select')
        item.dateFormat && (item.dateFormat = item.dateFormat.toUpperCase()).replaceAll('-', '/')
        item.selectOptions && (item['options'] = item.selectOptions)
        item.config = objRules[key].config
        state.searchFormConfig.modelValue[key] = ''
        state.searchFormConfig.formItems.push(item)
      }
    })
    console.log(searchFormConfig)
  },
  handleSizeChange() {},
  handleCurrentChange() {}
}

onMounted(() => {
  // myEcharts()
  methods.getUserInfo()
})
</script>
<template>
  <Form v-bind="state.searchFormConfig"></Form>
</template>

<style lang="less" scoped>
#box {
  width: 100%;
  height: 800px;
}
</style>
