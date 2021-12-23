<script setup lang="ts">
import { defineExpose, reactive, getCurrentInstance, onMounted, defineProps, toRefs, ref } from 'vue'
const {
  proxy: { $api, $fetch, $wsCache, $echarts }
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

const myEcharts = () => {
  console.log($echarts, '----')
  const mycharts = $echarts.init(document.getElementById('box'))
  const options = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }
  mycharts.setOption(options)
}
onMounted(() => {
  myEcharts()
})
methods.getUserInfo()
</script>
<template>
  <div>
    <div>{{ state.num }}</div>
    <button @click="methods.add"></button>
    <div id="box"></div>
  </div>
</template>

<style lang="less" scoped>
#box {
  width: 100%;
  height: 800px;
}
</style>
