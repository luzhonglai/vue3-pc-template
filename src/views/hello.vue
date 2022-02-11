<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-12-22 11:28:20
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2022-02-09 22:34:23
-->
<script setup lang="ts">
import { reactive, getCurrentInstance, onMounted, defineProps, toRefs, ref } from 'vue'
const {
  proxy: { $api, $fetch, $wsCache }
}: any = getCurrentInstance() // 获取挂在全局方法

// pinia demo
import { storeUser } from '@/store/modules/user'
console.log(storeUser())
console.log(storeUser().nameLength, 'getter')
storeUser().addNum('1111')
console.log(storeUser().name, '新name')
console.log(storeUser().nameLength, 'getter')

const state = reactive({
  pagination: {
    currentPage: 1,
    pageSizes: [10, 20, 30],
    pageSize: 10,
    total: 0
  },
  tableData: [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    },
    {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }
  ],
  num: 111
})

const methods: any = {
  async getUserInfo() {
    const res = await $api.test.test({ type: 'djradio', id: 1306231997 })
  },
  handleSizeChange() {},
  handleCurrentChange() {}
}

methods.getUserInfo()
</script>
<template>
  <div style="width: 100%; height: 300px">
    <van-button type="primary">主要按钮</van-button><van-button type="success">成功按钮</van-button
    ><van-button type="default">默认按钮</van-button><van-button type="warning">警告按钮</van-button
    ><van-button type="danger">危险按钮</van-button>
  </div>
</template>

<style lang="less" scoped></style>
