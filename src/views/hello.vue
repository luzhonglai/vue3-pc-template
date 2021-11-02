<script setup lang="ts">
import { defineExpose, reactive, getCurrentInstance, onMounted, defineProps, toRefs, ref } from 'vue'
const {
  proxy: { $api, $fetch, $wsCache }
}: any = getCurrentInstance() // 获取挂在全局方法

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
  <div>{{ state.num }}</div>
  <button @click="methods.add"></button>
</template>

<style lang="less" scoped></style>
