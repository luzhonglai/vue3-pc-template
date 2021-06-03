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
        <SelectStation style="width: 100%" @EventChangeStation="changeStation" ref="resetName"></SelectStation>
      </template>
    </EvsSearchArea>

    <div class="list-switch">
      <div>
        <el-button @click="onRemoveAll()" plain>批量移除</el-button>
      </div>

      <!-- 配置表头 -->
      <configHeader
        type="text"
        style="color:#666666"
        :configData="tableData.data"
        @checked="
          (e) => {
            tableData.checked = e
          }
        "
      />
    </div>

    <!-- 表格 -->
    <EvsTablePage
      style="margin-top: 12px"
      :data="tableData"
      :border="false"
      :pagination="tableConfig"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @cell-click="handleClickChange"
    >
      <!-- 操作按钮逻辑 -->
      <template #scope="{scope}">
        <el-button @click="onRemoveItem(scope.row)" type="text" size="small">移除</el-button>
        <el-button @click="drawer = true" type="text" size="small">查看详情</el-button>
        <el-button @click="dialogVisible = true" type="text" size="small">操作日志</el-button>
      </template>
    </EvsTablePage>

    <!-- 操作日志 -->
    <el-dialog title="操作日志" v-model="dialogVisible" width="456px" :before-close="handleClose">
      <!-- 表格 -->
      <EvsTablePage
        style="margin-top:16px"
        :data="tableLogData"
        :border="false"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @cell-click="handleClickChange"
      />
    </el-dialog>

    <!-- 详情 -->
    <el-drawer title="查看数据" v-model="drawer" :modal="false" size="50%">
      <div class="content">
        <el-descriptions title="充电站" :column="2">
          <el-descriptions-item label="站编码：">{{detailInfo.address}}</el-descriptions-item>
          <el-descriptions-item label="站名称：">18100000000</el-descriptions-item>
          <el-descriptions-item label="省市区：">kooriookami</el-descriptions-item>
          <el-descriptions-item label="站地址：">18100000000</el-descriptions-item>
          <el-descriptions-item label="管理单位：">18100000000</el-descriptions-item>
          <el-descriptions-item label="经度：">kooriookami</el-descriptions-item>
          <el-descriptions-item label="纬度：">18100000000</el-descriptions-item>
          <el-descriptions-item label="管理单位：">18100000000</el-descriptions-item>
          <el-descriptions-item label="商户类型：">kooriookami</el-descriptions-item>
          <el-descriptions-item label="运营单位：">18100000000</el-descriptions-item>
          <el-descriptions-item label="站长电话：">18100000000</el-descriptions-item>
          <el-descriptions-item label="是否对外开放：">kooriookami</el-descriptions-item>
          <el-descriptions-item label="公专用：">18100000000</el-descriptions-item>
            <el-descriptions-item label="服务电话：">18100000000</el-descriptions-item>
        </el-descriptions>

        <el-descriptions title="停车区信息" :column="2">
          <el-descriptions-item label="是否停车收费：">32943898021309809423 </el-descriptions-item>
          <el-descriptions-item label="停车收费描述：">32943898021309809423</el-descriptions-item>
        </el-descriptions>
      
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, Ref, onMounted } from 'vue'
import { batchRemove, removeItem, findByPage ,createOverTimeStation ,queryStationOperationRecord} from '@/api/whiteList'
import { dateArrToNumArr } from '@/utils/date'

interface InputProps {
  value: string
}

export default defineComponent({
  name: 'whiterList',
  components: {

  },
  setup(props: InputProps, { emit }) {
     
      onMounted(() => {
       methods.getData()
    })

    const formInline = ref([
      { name: 'stationCode', label: '高级筛选', type: 'input', placeholder: '请输入站编码、站名称' },
      { name: 'address', label: '站地址', type: 'input', placeholder: '请输入站ID' },
      { name: 'administrative ', label: '行政单位', type: 'cascader', placeholder: '请选择' },
      { name: 'operateState', label: '运营态', type: 'select', placeholder: '请选择', options: [
          {
            label: '待投运',
            value: 3
          },
          {
            label: '投运',
            value: 4
          },
           {
            label: '停运',
            value: 5
          },
          {
            label: '退运',
            value:6
          },
          {
            label: '维修',
            value: 7
          }
        ] },
      { name: 'manageOrganization', label: '管理单位', type: 'cascader', placeholder: '请选择' },
      { name: 'belongOrganization', label: '产权单位', type: 'cascader', placeholder: '请选择' },
      {
        name: 'createAt',
        label: '添加时间',
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
          label: '站编码',
          prop: 'stationNo'
        },
        {
          label: '站名称',
          prop: 'stationName'
        },
        {
          label: '运营态',
          prop: 'operateState'
        },
        {
          label: '站地址',
          prop: 'address'
        },
         {
          label: '区',
          prop: 'area'
        },
        {
          label: '市',
          prop: 'city'
        },
        {
          label: '省',
          prop: 'province'
        },
         {
          label: '运营商',
          prop: 'name'
        },
        {
          label: '管理单位',
          prop: 'manageOrganization'
        },
        {
          label: '产权单位',
          prop: 'belongOrganization'
        },
        {
          label: '操作',
          fixed: 'right',
          scope: true,
          width: 192
        }
      ],
      data: [
        {
         address: "23456",
          area: "345",
          belongOrganization: "佳节快乐",
          city: "2",
          createAt: '5',
          manageOrganization: "fgdsa",
          operateState: "2345",
          province: "345",
          stationName: "fgg",
          stationNo: "1234567"
        },
        
      ]
    })
    const resetName = ref(null)
    const dialogVisible: Ref<boolean> = ref(false)
    const tableLogData: object = ref({
      tableColumn: [
        {
          label: '操作帐号',
          prop: 'num'
        },
        {
          label: '操作时间',
          prop: 'date'
        },
        {
          label: '操作项',
          prop: 'name',
          fixed: 'left',
          align: 'left'
        }
      ],
      data: [
        {
          num: '12345678',
          date: '2016-05-02',
          name: '启用'
        },
        {
          num: '12345678',

          date: '2016-05-04',
          name: '批量禁用'
        },
        {
          num: '300003000600018405',
          date: '2016-05-01',
          name: '批量启用'
        },
        {
          num: '12345678',
          date: '2016-05-03',
          name: '修改'
        }
      ]
    })
    const tableConfig = ref({
      currentPage: 1,
      pageSizes: [10, 20, 30],
      pageSize: 10,
      total: 3
    })
    const drawer: Ref<boolean> = ref(false)
    const detailInfo:object=reactive({
      address:'123456'
    })
    const stationInfo = reactive({
      params: {
          address: "",
          area: "",
          belongOrganization: "",
          city: "",
          createAt: '',
          manageOrganization: "",
          operateState: "",
          province: "",
          stationName: "",
          stationNo: ""
      },
      // tableList: [],
      // tableTotal: 0,
      // totalPages: 0
    })

    const methods = {
      getData(): void{
        console.log('tableconfig',tableConfig)
        findByPage({
          bean:stationInfo.params,
          page:tableConfig.value.currentPage,
          pageSize:tableConfig.value.pageSize
        }).then(res=>{
   
        }) 
      },
      changeStations(obj?: any) {
      console.log('obj', obj)
      // stationInfo.params.bean.createAt = dateArrToNumArr(obj.time)[0]
      // // stationInfo.params.bean.createEndTime = dateArrToNumArr(obj.time)[1]
      // Object.assign(stationInfo.params.bean, obj)
      // stationInfo.params.page = 1
      methods.getData()
  
    },
    
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      resetSubmit() {},
      changeStation() {
        console.log(resetName.value, '213123')
      },
      handleClickChange(row, column, cell, event) {
        // if (column.no == 2) {
        //   drawer.value = true
        // }
      },
      handleCurrentChange(val) {
        console.log(val)
      },
      handleSizeChange(val) {
        console.log(val)
      },

      /**
       * 移除item
       *
       */
      async onRemoveItem(item) {
        console.log('item',item)
        // 调用弹窗
        let isNext = await this.onRemoveMassage(false)
      },

      /**
       * 移除删除提示
       *
       */
      async onRemoveMassage(isAll) {
        const title = isAll ? '批量移除' : '移除'
        return await this.$messageBox({
          title: title,
          type: 'warning',
          message:
            '从白名单内移除的充电站不能在进行超时占位费的配置，且已配置完成超时占位费的充电站从白名单内移除后将会自动禁用超时占位费，确认从白名单内移除当前所选充电站？',
          showCancelButton: true
        })
          .then(() => true)
          .catch(() => false)
      },

      /**
       * 批量移除item
       *
       */
      async onRemoveAll() {
        // 屌用弹窗
        let isNext = await this.onRemoveMassage(true)
      }
    }
    return {
      detailInfo,
      dialogVisible,
      drawer,
      resetName,
      tableConfig,
      formInline,
      tableData,
      tableLogData,
      stationInfo,
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
    // .cell {
    //   padding-right: 10px;
    // }
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
  .list-switch {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
  }
}
</style>
