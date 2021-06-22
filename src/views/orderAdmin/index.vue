<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-08 10:41:31
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-22 18:43:09
-->
<template>
  <div class="content">
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

      <template v-slot:othersBtn>
        <export
          type="default"
          :fileName="exportModel.fileName"
          :url="exportModel.url"
          :params="exportModel.params"
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
      @selection-change="selectionChange"
    >
    </EvsTablePage>

    <!-- 详情 -->
    <EvsDialog
      ref="dialogRef"
      title="超时占位规则详情"
      :keyLabel="dialongConfg"
      :data="detailData"
      :modal="false"
      size="50%"
    >
    </EvsDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, Ref, onBeforeMount } from 'vue'
import { FindOrderList, OrderDetail } from './serivce'
import { findBelongOrganizationList } from '@/api/whiteList'
import EvsDialog from '@/components/EvsDialog/Index.vue'
import { formatDate } from '@/utils/utils'
export default defineComponent({
  name: 'orderAdmin',
  component: {
    EvsDialog
  },
  setup(props, { emit }) {
    let arr = []
    const dialogRef: any = ref('null')
    const formInline = ref([
      { name: 'tradeFlowNo', label: '交易流水号', type: 'input', placeholder: '请输入内容' },
      { name: 'phone', label: '用户手机号', type: 'input', placeholder: '请输入内容' },
      {
        name: 'orderState',
        label: '订单状态',
        type: 'select',
        placeholder: '请选择',
        options: [
          { label: '已支付', value: 20 },
          { label: '待支付', value: 70 }
        ]
      },
      { name: 'stakeNo', label: '桩编号', type: 'input', placeholder: '请输入内容' },
      { name: 'stationNo', label: '站编号', type: 'input', placeholder: '请输入内容' },
      { name: 'stationName', label: '站名称', type: 'input', placeholder: '请输入内容' },
      {
        name: 'time',
        label: '交易时间',
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
          label: '用户ID',
          prop: 'userId'
        },
        {
          label: '手机号',
          prop: 'phone'
        },
        {
          label: '交易流水号',
          prop: 'tradeFlowNo'
        },
        {
          label: '充电桩编号',
          prop: 'stakeNo',
          align: 'center',
          width: '200'
        },
        {
          label: '交易金额(元）',
          prop: 'amount'
        },
        {
          label: '充电时长(分钟)',
          prop: 'reduceTime',
          align: 'center',
          width: '150'
        },
        {
          label: '减免次数(次)',
          prop: 'reduceTime',
          align: 'center',
          width: '150'
        },
        {
          label: '封顶条件(元)',
          prop: 'limit',
          align: 'left',
          width: '200'
        }
      ],
      data: []
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
    const dialongConfg: object = reactive([
      {
        title: '交易信息',
        keyArr: [
          {
            lable: '订单编号：',
            key: 'tradeFlowNo'
          },
          {
            lable: '支付流水号：',
            key: 'payId'
          },
          {
            lable: '订单创建时间：',
            key: 'createTime'
          },
          {
            lable: '支付时间：',
            key: 'paidTime'
          },
          {
            lable: '订单状态：',
            key: 'orderState'
          },
          {
            lable: '充电桩编号：',
            key: 'stakeNo'
          },
          {
            lable: '产权单位：',
            key: 'stakeOuCode'
          },
          {
            lable: '站名称：',
            key: 'stationName'
          },
          {
            lable: '站编码：',
            key: 'stationNo'
          },
          {
            lable: '插枪时间：',
            key: 'putGunTime'
          },
          {
            lable: '关联充电订单交易流水号1：',
            key: 'orderTradeFlowNo1'
          },
          {
            lable: '启停时间：',
            key: 'chargeStartTime1'
          },
          {
            lable: '关联充电订单交易流水号2：',
            key: 'orderTradeFlowNo2'
          },
          {
            lable: '启停时间：',
            key: 'chargeStartTime2'
          },
          {
            lable: '拔枪时间：',
            key: 'pllGunTime'
          },
          {
            lable: '交易金额（元）：',
            key: 'amount'
          },
          {
            lable: '减免时长（小时）：',
            key: 'reduceTime'
          },
          {
            lable: '减免次数：',
            key: 'reduceTimes'
          },
          {
            lable: '封顶条件：',
            key: 'limit'
          },
          {
            lable: '支付方式：',
            key: 'payMode'
          }
        ]
      },
      {
        title: '用户信息',
        keyArr: [
          {
            lable: '用户ID：',
            key: 'userId'
          },
          {
            lable: '姓名：',
            key: 'userName'
          },
          {
            lable: '手机号：',
            key: 'phone'
          },
          {
            lable: '卡号：',
            key: 'cardNo'
          },
          {
            lable: '是否开票：',
            key: 'isInvoice'
          },
          {
            lable: '是否冲正：'
          }
        ]
      },
      {
        title: '项目信息',
        keyArr: [
          {
            lable: '是否清分：',
            key: 'clearDistribution'
          },
          {
            lable: '是否结算：',
            key: 'closeAccount'
          }
        ]
      }
    ])
    let detailData: Ref<object> = ref({})
    const findTableParams: any = {
      bean: {
        // endTime: '',
        // orderState: 1,
        // phone: '',
        // stakeNo: '',
        // startTime: '',
        // stationName: '',
        // stationNo: '',
        // tradeFlowNo: '',
        // operateState: 1
      },
      page: 1,
      pageSize: 10,
      sorts: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string'
      }
    }
    const methods = {
      // 表单查询
      async fromSubmit(from): Promise<void> {
        if (from.time) {
          const startTime = new Date(from.time[0]).getTime()
          const endTime = new Date(from.time[1]).getTime()
          findTableParams.bean.startTime = startTime
          findTableParams.bean.endTime = endTime
        }
        findTableParams.bean = { ...findTableParams.bean, ...from }
        methods.findOrderList()
      },
      // 列表查询
      async findOrderList() {
        try {
          const {
            result: { total, list, pageNumber: pageSize },
            code
          } = await FindOrderList(findTableParams).catch((e) => null)
          if (code == 0) return
          tableData.value['data'] = list
          tableConfig.value = { ...tableConfig.value, total, pageSize }
        } catch (e) {
          //
        }
      },
      handleSizeChange(val) {
        findTableParams.pageSize = val
        methods.findOrderList()
      },
      //
      handleCurrentChange(val) {
        findTableParams.page = val
        methods.findOrderList()
      },

      // 重置搜索
      resetSubmit(val) {
        findTableParams.bean.startTime = ''
        findTableParams.bean.endTime = ''
        findTableParams.bean = { ...val }
      },

      changeStation() {
        console.log(resetName.value, '213123')
      },

      async handleClickChange(row, column, cell, event) {
        if (column.no !== 2) {
          return false
        }
        await OrderDetail(row.id).then((res: any) => {
          const { orderTradeFlowNo, startTime, endTime } = res.result.chargeOrderVoList[0]
          res.result.orderTradeFlowNo1 = orderTradeFlowNo
          res.result.chargeStartTime1 = `${formatDate(startTime, 'Y-M-D h:m')} / ${formatDate(endTime, 'Y.M.D')}`

          const orderTradeFlowNo2 = res.result.chargeOrderVoList[1] || false
          if (orderTradeFlowNo2) {
            res.result.orderTradeFlowNo2 = orderTradeFlowNo2.orderTradeFlowNo
            res.result.chargeStartTime2 = `${formatDate(orderTradeFlowNo2.startTime, 'Y.M.D')}-${formatDate(
              orderTradeFlowNo2.endTime,
              'Y-M-D h:m'
            )}`
          }

          res.result.putGunTime = formatDate(res.result.putGunTime, 'Y-M-D h:m')
          res.result.pllGunTime = formatDate(res.result.pllGunTime, 'Y-M-D h:m')
          detailData.value = res.result
        })
        dialogRef.value.showDialog()
      },

      // 选择table
      selectionChange(val) {
        exportModel.value['params'] = val
      }
    }

    onBeforeMount(() => {
      methods.findOrderList()
    })

    return {
      dialogRef,
      detailData,
      dialongConfg,
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
    margin-top: 12px;
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
