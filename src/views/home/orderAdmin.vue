<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-08 10:41:31
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-10 15:43:05
-->
<template>
  <div class="content">
    <!-- 搜索top -->
    <EvsSearchArea
      :formModel="formInline"
      :initData="initData"
      :hasFold="true"
      @search="changeStations"
      @resetForm="resetSubmit"
    >
      <template v-slot:selectStation>
        <SelectStation style="width:100%" @EventChangeStation="changeStation" ref="resetName"></SelectStation>
      </template>

      <template v-slot:othersBtn>
        <export
          type="default"
          :fileName="exportModel.fileName"
          :url="exportModel.url"
          :params="exportModel.params"
          :total="[1]"
        ></export>
      </template>
    </EvsSearchArea>

    <!-- 表格 -->
    <EvsTablePage
      :data="tableData"
      :border="false"
      :pagination="tableConfig"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @cell-click="handleClickChange"
    >
      <!-- 操作按钮逻辑 -->
      <template v-slot:scope>
        <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">禁用</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">启用</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">操作日志</el-button>
      </template>
    </EvsTablePage>

    <!-- 详情 -->
    <el-drawer title="超时占位规则详情" v-model="drawer" :modal="false" size="50%">
      <div class="content">
        <el-descriptions title="交易信息" :column="2">
          <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
          <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
        </el-descriptions>

        <el-descriptions title="用户信息" :column="2">
          <el-descriptions-item label="用户ID：">32943898021309809423 </el-descriptions-item>
          <el-descriptions-item label="姓名：">32943898021309809423</el-descriptions-item>
          <el-descriptions-item label="手机号：">- -</el-descriptions-item>
          <el-descriptions-item label="卡号：">32943898021309809423</el-descriptions-item>
          <el-descriptions-item label="是否开票：">是</el-descriptions-item>
          <el-descriptions-item label="是否冲正：">是</el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="项目信息" :column="2">
          <el-descriptions-item label="是否清分：">是</el-descriptions-item>
          <el-descriptions-item label="是否结算：">是</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, Ref } from 'vue'

interface InputProps {
  value: string
}

export default defineComponent({
  name: 'orderAdmin',
  setup(props: InputProps, { emit }) {
    const formInline = ref([
      { name: 'stationCode', label: '交易流水号', type: 'input', placeholder: '请输入内容' },
      { name: 'stationCode', label: '用户手机号', type: 'input', placeholder: '请输入内容' },
      { name: 'stationCode', label: '订单状态', type: 'select', placeholder: '请选择' },
      { name: 'stationCode', label: '桩编号', type: 'select', placeholder: '请选择' },
      { name: 'stationCode', label: '站编号', type: 'select', placeholder: '请选择' },
      { name: 'stationCode', label: '站名称', type: 'select', placeholder: '请选择' },
      {
        name: 'time',
        label: '交易时间',
        type: 'datetimerange',
        rangeSeparator: '~',
        startPlaceholder: '时间范围起',
        endPlaceholder: '时间范围止',
        defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]
      }
    ])
    const tableData: Ref<object> = ref({
      tableColumn: [
        {
          type: 'selection',
          width: '55'
        },
        { type: 'index', label: '序号' },
        {
          label: '用户ID',
          prop: 'num'
        },
        {
          label: '名称',
          prop: 'name'
        },
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '地址',
          prop: 'address'
        },
        {
          label: '操作',
          scope: true,
          width: 192
        }
      ],
      data: [
        {
          num: '300003000600018405',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          num: '300003000600018405',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          num: '300003000600018405',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          num: '300003000600018405',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    })
    const resetName = ref(null)
    const exportModel: Ref<object> = ref({
      url: 'mvp-charmodel/asset/station/export',
      params: [],
      fileName: ''
    })
    const tableConfig = ref({
      currentPage: 1,
      pageSizes: [10, 20, 30],
      pageSize: 10,
      total: 3
    })
    const drawer: Ref<boolean> = ref(false)

    const methods = {
      changeStations() {
        alert(11)
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      resetSubmit() {},
      changeStation() {
        console.log(resetName.value, '213123')
      },
      handleClickChange(row, column, cell, event) {
        if (column.no == 2) {
          drawer.value = true
        }
      },
      handleCurrentChange(val) {
        console.log(val)
      },
      handleSizeChange(val) {
        console.log(val)
      }
    }
    // const handleCurrentChange = () => {}
    // const handleSizeChange = () => {}

    return {
      drawer,
      resetName,
      tableConfig,
      formInline,
      tableData,
      exportModel,
      ...methods
    }
  }
})
</script>
<style lang="less" scoped>
.content {
  padding: 0 24px;
  box-sizing: border-box;
  display: block;

  :deep(.el-table) {
    .cell {
      padding-right: 10px;
    }
    .el-table__row {
      .el-table_1_column_3 {
        color: #487ef0;
        font-weight: 400;
        font-size: 12;
      }
    }
  }

  :deep(.el-drawer__header) {
    height: 60px;
    padding: 24px 24px;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 0;
    color: #333333;
  }

  :deep(.el-descriptions) {
    padding: 24px 0;
    box-sizing: border-box;
    border-top: 1px solid #e8e8e8;
    display: block;
    .el-descriptions__label {
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
    }
    .el-descriptions__content {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>
