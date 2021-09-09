<template>
  <div>
    <div class="left" />
    <div class="right">
      <evs-table-page :pagination="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <template #table>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="address" label="地址" />
          </el-table>
        </template>
      </evs-table-page>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, toRefs, onMounted } from 'vue'
const { ctx }: any = getCurrentInstance() // 获取全局方法

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
  ]
})

const { tableData, pagination } = toRefs(state)
const methods = {
  async getUserInfo() {
    const res = await ctx.$api.test.getInfo()
    console.log('res', res)
  }
}
onMounted(() => {
  methods.getUserInfo()
})
</script>

<style lang="less" scoped></style>
