<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-08 10:41:31
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-17 14:31:47
-->
<template>
  <div class="content">
    <!-- {{ findListParams }} -->
    <!-- 搜索top -->
    <EvsSearchArea
      :formModel="formInline"
      :initData="initData"
      :hasFold="true"
      @search="fromSubmit"
      @resetForm="resetSubmit"
    >
      <template v-slot:selectStation>
        <SelectStation style="width:100%" @EventChangeStation="changeStation" ref="resetName"></SelectStation>
      </template>
    </EvsSearchArea>

    <div class="list-switch">
      <div>
        <el-button @click="onShowMessage()" type="primary">新建规则</el-button>
        <el-button @click="onShowMessage('open')" plain>批量启用</el-button>
        <el-button @click="onShowMessage('close')" plain>批量禁用</el-button>
      </div>

      <!-- 配置表头 -->
      <HeaderTable
        type="text"
        style="color:#666666"
        :allTable="allTable"
        @handleCheckedChangelist="handleCheckedChangelist"
      />
    </div>

    <!-- 表格 -->
    <EvsTablePage
      ref="multipleTable"
      :data="tableData"
      :border="false"
      :loading="tableLoading"
      :pagination="tableConfig"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @cell-click="handleClickChange"
      @selection-change="selectionChange"
    >
      <!-- 操作按钮逻辑 -->
      <template #scope="{scope}">
        <el-button @click="onModify(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="onDisable(scope.row)" type="text" size="small">禁用</el-button>
        <el-button @click="onEnable(scope.row)" type="text" size="small">启用</el-button>
        <el-button @click="onUserLog(scope.row)" type="text" size="small">操作日志</el-button>
      </template>
    </EvsTablePage>

    <!-- 详情 -->
    <el-drawer title="超时占位规则详情" v-model="drawer" :modal="false" size="50%">
      <div class="content">
        <el-descriptions title="充电站信息" :column="2">
          <el-descriptions-item label="站编码：">{{ detailsData['stationNo'] }}</el-descriptions-item>
          <el-descriptions-item label="站名称：">{{ detailsData['stationName'] }}</el-descriptions-item>
          <el-descriptions-item label="站地址：">{{ detailsData['address'] }}</el-descriptions-item>
          <el-descriptions-item label="行政单位：">{{ detailsData[''] }}</el-descriptions-item>
          <el-descriptions-item label="管理单位：">{{ detailsData['manageOrganization'] }}</el-descriptions-item>
          <el-descriptions-item label="运营态：">{{ detailsData['operateState'] }}</el-descriptions-item>
          <el-descriptions-item label="省：">{{ detailsData['province'] }}</el-descriptions-item>
          <el-descriptions-item label="市：">{{ detailsData['city'] }}</el-descriptions-item>
          <el-descriptions-item label="区：">{{ detailsData['area'] }}</el-descriptions-item>
          <el-descriptions-item label="是否在白名单：">{{
            detailsData['hasInWhiteList'] == true ? '是' : '否'
          }}</el-descriptions-item>
        </el-descriptions>

        <el-descriptions title="超时占位费规则信息" :column="2">
          <el-descriptions-item label="是否启用超时占位费："
            >{{ detailsData['validStatus'] ? '是' : '否' }}
          </el-descriptions-item>
          <el-descriptions-item label="起止时间：">{{
            detailsData['startTime'] + '～' + detailsData['endTime']
          }}</el-descriptions-item>
          <el-descriptions-item label="启用时间：">{{ detailsData['enableTime'] }}</el-descriptions-item>
          <el-descriptions-item label="禁用时间：">{{ detailsData['forbiddenTime'] }}</el-descriptions-item>
          <el-descriptions-item label="创建时间：">{{ detailsData['createdAt'] }}</el-descriptions-item>
          <el-descriptions-item label="超时占位费单价：">{{ detailsData['price'] }}</el-descriptions-item
          >】
          <el-descriptions-item label="超时占位费减免时长：">{{ detailsData['reduceTime'] }}</el-descriptions-item>
          <el-descriptions-item label="超时占位费减免次数：">{{ detailsData['reduceTimes'] }}</el-descriptions-item>
          <el-descriptions-item label="超时占位费封顶条件：">{{ detailsData['limit'] }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-drawer>

    <!-- 操作日志 -->
    <el-dialog title="操作日志" v-model="dialogVisible" width="456px" :before-close="handleClose">
      <!-- 表格 -->
      <EvsTablePage
        style="margin-top:16px"
        :data="tableLogData"
        height="300px"
        :border="false"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @cell-click="handleClickChange"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, onBeforeMount } from 'vue'
import { setStoreState } from '@/store/utils'
import { formatDate } from '@/utils/utils'
import { findBelongOrganizationList } from '@/api/whiteList'
import store from '@/store'

import { findByPage, overTimeFeeModel, queryStaReacord, findByIdDetail } from '../service'

export default defineComponent({
  name: 'roleList',
  setup(props, ctx) {
    // 运营态 状态
    const status = [
      { label: '待投运', value: 2 },
      { label: '运行', value: 3 },
      { label: '停运', value: 10 },
      { label: '退运', value: 11 }
    ]
    const formInline: Ref<any> = ref([
      { name: 'seniorSearch', label: '高级筛选', type: 'input', placeholder: '请输入站编码、站名称' },
      { name: 'address', label: '站地址', type: 'input', placeholder: '请输入站ID' },
      { name: 'administrative', label: '行政单位', type: 'cascader', placeholder: '请选择' },
      {
        name: 'operateState',
        label: '运营态',
        type: 'select',
        placeholder: '请选择',
        options: [
          { label: '待投运', value: 2 },
          { label: '运行', value: 3 },
          { label: '停运', value: 10 },
          { label: '退运', value: 11 }
        ]
      },
      {
        name: 'manageOrganization',
        label: '管理单位',
        type: 'cascader',
        placeholder: '请选择',
        options: []
      },
      {
        name: 'enableStatus',
        label: '开启状态',
        type: 'select',
        placeholder: '请选择',
        options: [
          {
            label: '启用',
            value: 1
          },
          {
            label: '禁用',
            value: 0
          }
        ]
      },
      {
        name: 'time',
        label: '创建时间',
        type: 'daterange',
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
          label: '站编号',
          prop: 'stationNo',
          show: true
        },
        {
          label: '站名称',
          prop: 'stationName',
          show: true
        },
        {
          label: '运营态',
          prop: 'operateState',
          show: true
        },
        {
          label: '站地址',
          prop: 'address',
          show: true
        },
        {
          label: '超时占位费状态',
          prop: 'enableStatus',
          show: true
        },
        {
          label: '超时占位费单价（元/分钟）',
          prop: 'price',
          show: true
        },
        {
          label: '减免时长',
          prop: 'REDUCE_TIME',
          show: true
        },
        {
          label: '操作',
          fixed: 'right',
          scope: true,
          width: 192
        }
      ],
      data: []
    })
    const tableLogData: Ref<object> = ref({
      tableColumn: [
        {
          label: '操作帐号',
          prop: 'operatorAccount'
        },
        {
          label: '操作时间',
          prop: 'createdAt',
          formatter(row, colimn) {
            return formatDate(row.createdAt, 'Y/M/D h:m')
          }
        },
        {
          label: '操作项',
          prop: 'operatorType',
          fixed: 'left',
          align: 'left'
        }
      ],
      data: []
    })
    const resetName: Ref<null> = ref(null)
    const tableConfig: Ref<object> = ref({
      currentPage: 1,
      pageSizes: [10, 20, 30],
      pageSize: 10,
      total: 0
    })
    const drawer: Ref<boolean> = ref(false)
    const dialogVisible: Ref<boolean> = ref(false)
    const tableLoading: Ref<boolean> = ref(false)
    // 列表查询参数配置
    const findListParams: any = {
      bean: {
        // address: '',
        // area: '',
        // belongOrganization: '',
        // city: '',
        // enableStatus: 0,
        // endTime: 0,
        // manageOrganization: '',
        // operateState: 0,
        // province: '',
        // startTime: 0,
        // stationName: '',
        // stationNo: ''
      },
      page: 1,
      pageSize: 10,
      sorts: {
        additionalProp1: '',
        additionalProp2: '',
        additionalProp3: ''
      }
    }

    // 批量开启禁用接口 入参数
    const batchParasm: any = {
      idList: [],
      validState: false
    }
    const detailsData: Ref<object> = ref({})
    // 全部表头
    const allTable: any = ref([
      {
        type: 'selection',
        width: '55'
      },
      { type: 'index', label: '序号' },
      {
        label: '站编号',
        prop: 'stationNo'
      },
      {
        label: '站名称',
        prop: 'stationName'
      },
      {
        label: '运营态',
        prop: 'operateState',
        formatter(row, colimn) {
          const value = status.filter((result) => result.value == row.operateState)[0]
          if (value && value.label != undefined) {
            return value.label
          }
        }
      },
      {
        label: '站地址',
        prop: 'address'
      },
      {
        label: '超时占位费状态',
        prop: 'enableStatus',
        formatter(row) {
          if (row.validStatus == 'VALID') {
            return '启用'
          } else {
            return '禁用'
          }
        }
      },
      {
        label: '超时占位费单价（元/分钟）',
        prop: 'price'
      },
      {
        label: '减免时长',
        prop: 'reduceTime'
      },
      {
        label: '减免次数',
        prop: 'reduceTimes'
      },
      {
        label: '封顶条件',
        prop: 'limit'
      },
      {
        label: '操作',
        fixed: 'right',
        scope: true,
        width: 192
      }
    ])

    const methods = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      // 重置表单
      async resetSubmit(val = {}) {
        findListParams.bean = { ...val }
      },

      async getList() {
        const { result }: any = await findBelongOrganizationList()
        const manageOrganization = formInline.value.filter((item) => item.name == 'manageOrganization')[0]
        manageOrganization.options = methods.getChildren(result)[0].children
      },

      getChildren(list) {
        return list.map((item) => ({
          label: item.ouName,
          value: item.ouCode,
          children: item.listBean ? methods.getChildren(item.listBean) : null
        }))
      },

      nowHeaderClass() {
        // 配置要显示的
        const defalutLabel = tableData.value['tableColumn'].filter((item) => item.prop).map((item) => item.prop)
        allTable.value = allTable.value.map((item) => {
          if (item.prop) {
            // 添加标记 --- 默认显示true --- 没有false
            item.isShow = defalutLabel.includes(item.prop)
          }
          return item
        })
      },

      // 勾选更新当前表头
      handleCheckedChangelist(newArr) {
        tableData.value['tableColumn'] = []
        tableData.value['tableColumn'] = newArr
      },

      // 表单提交
      async fromSubmit(from): Promise<void> {
        const { time = false, administrative = false, manageOrganization = false } = from
        const bean = findListParams.bean

        if (time) {
          const startTime = new Date(time[0]).getTime()
          const endTime = new Date(time[1]).getTime()
          bean.startTime = startTime
          bean.endTime = endTime
        }

        // 行政单位 --- 省市区
        if (administrative) {
          bean.address = administrative[0]
          bean.province = administrative[1]
          bean.city = administrative[2]
        }
        // if (manageOrganization) {
        //   debugger
        //   from.manageOrganization = manageOrganization.jion('')
        // }
        findListParams.bean = { ...bean, ...from }
        methods.findByPageData()
      },

      // 表单查询
      async findByPageData() {
        try {
          tableLoading.value = true
          const {
            result,
            result: { total, pageNumber: pageSize, list }
          } = await findByPage(findListParams).catch((e) => null)
          if (result == null) return
          tableData.value['data'] = list
          tableConfig.value = { ...tableConfig.value, total, pageSize }
          tableLoading.value = false
        } catch (e) {
          tableLoading.value = false
          //  tableLoading.value = true
        }
        methods.resetSubmit()
      },

      changeStation(val) {
        console.log(resetName.value, '213123')
      },

      // 弹窗管理
      async onShowMessage(type) {
        // 新建规则
        if (type == undefined) {
          setStoreState('app', 'isNewRules', !store.state.app.isNewRules)
          return
        }
        // 判断是否勾选数据
        if (batchParasm.idList.length <= 0) {
          this.$message.warning({
            message: '请去勾选数据',
            type: 'warning'
          })
          return false
        }
        if (type == 'open') {
          await this.$messageBox({
            title: '批量启用',
            type: 'warning',
            message: '确认启动当前选中的充电站收取超时占位费？',
            showCancelButton: true
          }).then((res) => {
            batchParasm.validState = true
          })
        }
        if (type == 'close') {
          await this.$messageBox({
            title: '批量禁用',
            type: 'warning',
            message: '确认取消当前选中的充电站收取超时占位费？禁用后当前选中的充电站不在收取占位费。',
            showCancelButton: true
          }).then((res) => {
            batchParasm.validState = false
          })
        }
        // 批量开启禁用接口
        const { msg } = await overTimeFeeModel(batchParasm).catch((e) => null)
        this.$refs.multipleTable.clearSelection()
        this.$message.success({
          message: msg,
          type: 'success'
        })
        methods.findByPageData()
      },

      // 修改
      async onModify(row) {
        try {
          ctx.emit('setComponents', row)
          setStoreState('app', 'isNewRules', !store.state.app.isNewRules)
          return
        } catch (e) {
          //
        }
      },

      //  禁用状态
      async onDisable(row) {
        try {
          const params = {
            idList: [row.id],
            validState: false
          }
          const { code, msg }: any = await overTimeFeeModel(params)
          this.$message.success({
            message: msg,
            type: 'success'
          })
          methods.findByPageData()
        } catch (e) {
          //
        }
      },

      //  开启状态
      async onEnable(row) {
        try {
          const params = {
            idList: [row.id],
            validState: true
          }
          const { code, msg }: any = await overTimeFeeModel(params)
          this.$message.success({
            message: msg,
            type: 'success'
          })
          methods.findByPageData()
        } catch (e) {
          //
        }
      },

      // 操作log
      async onUserLog(row) {
        try {
          const params = {
            operationTableId: row.id,
            operatorChannel: 2001
          }
          const { code, msg, result }: any = await queryStaReacord(params)
          tableLogData.value['data'] = result.list
          dialogVisible.value = true
        } catch (e) {
          //
        }
      },

      async handleClickChange(row, column, cell, event) {
        if (column.no == 2) {
          const { code, result }: any = await findByIdDetail(row.id)
          drawer.value = true

          result.operateState = status.filter((item) => item.value == result.operateState)[0].label
          result.endTime = formatDate(result.endTime, 'Y.M.D')
          result.startTime = formatDate(result.startTime, 'Y.M.D')
          result.createdAt = formatDate(result.createdAt, 'Y.D.M')
          result.forbiddenTime = formatDate(result.forbiddenTime, 'Y.M.D')
          result.enableTime = formatDate(result.enableTime, 'Y.M.D')
          detailsData.value = result
        }
      },

      handleSizeChange(val) {
        findListParams.pageSize = val
        methods.findByPageData()
      },

      handleCurrentChange(val) {
        findListParams.page = val
        methods.findByPageData()
      },
      // 选中得数据
      selectionChange(val) {
        batchParasm.idList = val.map((item) => item.id)
      }
    }

    onBeforeMount(() => {
      methods.getList()
      methods.findByPageData()
      methods.nowHeaderClass()
    })

    return {
      allTable,
      tableLoading,
      detailsData,
      tableLogData,
      dialogVisible,
      drawer,
      resetName,
      tableConfig,
      formInline,
      tableData,
      findListParams,
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
  .list-switch {
    margin-top: 24px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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
  :deep(.el-dialog__body) {
    width: 456px;
    border-radius: 1px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #dddddd;
    padding: 0 20px;
    padding-bottom: 40px;
    overflow-y: scroll;
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
  :deep(.cell) {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .el-button--small {
      margin: 0;
    }
  }
}
</style>
