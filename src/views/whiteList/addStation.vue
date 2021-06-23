<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-11 17:00:46
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-20 09:21:21
-->

<template>
  <div class="content">
    <!-- 添加充电站 -->
    <el-dialog title="添加充电站" v-model="dialogVisible" center show-close width="1140px" @close='handleCancle'>
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
      </EvsSearchArea>
      <!-- 表格 -->
      <EvsTablePage
        ref="addmultipleTable"
        :data="tableData"
        :pagination="tableConfig"
        :border="false"
        @selection-change="selectionChange"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @cell-click="handleClickChange"
      >
      </EvsTablePage>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="mini" @click="hideDialog(false)">取消</el-button>
          <el-button size="mini" type="primary" @click="hideDialog(true)">确定添加</el-button>
        </span>
      </template>
    </el-dialog>

  
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, Ref, onMounted, watch, computed } from 'vue'
import store from '@/store'
import { setStoreState } from '@/store/utils'
import { createOverTimeStation,findByPage ,getStationList,findBelongOrganizationList} from '@/api/whiteList'
import { formatDate } from '@/utils/utils'
import  administrativeUnits  from '@/utils/pca-code'
export default defineComponent({
  name: 'addStation',
  setup(props, { emit }) {
      onMounted(()=>{
        methods.getList()
        methods.getData()
       
    })
    let arr=[]
    const  dialogVisible: Ref<boolean> = ref(true)
    const arrowUp: Ref<boolean> = ref(false)
     const operateStateArr= [
          {
            label: '待投运',
            value: '2'
          },
          {
            label: '投运',
            value: '3'
          },
           {
            label: '停运',
            value: '10'
          },
          {
            label: '退运',
            value:'11'
          },
          {
            label: '维修',
            value: '8'
          }
        ]
    const formInline = ref([
      { name: 'nameOrCode', label: '高级筛选', type: 'input', placeholder: '请输入站编码、站名称' },
      { name: 'stationAddress', label: '站地址', type: 'input', placeholder: '请输入站ID' },
      { name: 'administrative ', label: '行政单位', type: 'cascader', placeholder: '请选择',options:administrativeUnits },
      { name: 'operateState', label: '运营态', type: 'select', placeholder: '请选择', options:operateStateArr },
      { name: 'managementCode', label: '管理单位', type: 'cascader', placeholder: '请选择' ,options:[]},
      {
        name: 'createAt',
        label: '添加时间',
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
          label: '站编码',
          prop: 'stationCode'
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
          prop: 'stationAddress'
        },
         {
          label: '区',
          prop: 'districtName'
        },
        {
          label: '市',
          prop: 'cityName'
        },
        {
          label: '省',
          prop: 'provinceName',
          width:60,
        },
         {
          label: '运营商',
          prop: 'orgOp'
        },
        {
          label: '管理单位',
          prop: 'management'
        },
        // {
        //   label: '产权单位',
        //   prop: 'belongOrganization'
        // },
      ],
      data: []
    })

      const stationInfo = reactive({})
      const tableConfig = ref({
      currentPage: 1,
      pageSizes: [10, 20, 30],
      pageSize: 10,
      total: 0
    })
    const selectTable: Ref<object> = ref({
      tableColumn: [
        {
          label: '电站编号',
          prop: 'num'
        },
        {
          label: '电站名称',
          prop: 'name'
        },
        {
          label: '电站地址',
          prop: 'date'
        },
        {
          label: '操作',
          scope: true,
          width: 192
        }
      ],
      data: []
    })
    let selectData = []
    const methods= {
      async getList() {
        const { result }: any = await findBelongOrganizationList()
        const managementCode = formInline.value.filter((item) => item.name == 'managementCode')[0]
        managementCode.options = methods.getChildren(result)
      },
      getChildren(list){
        return list.map(item=>{
          let obj={
          value:item.ouCode,
          label:item.ouName
          }
          if(item.listBean){
        obj['children']=methods.getChildren(item.listBean)
          }
        return obj  
        })
      },
      selectionChange(val) {
        selectData = val
      },
      handleCancle () {
        emit('close','')
        dialogVisible.value = false
      },
      getData(): void{
        for(let key in stationInfo){
         if(!stationInfo[key]||stationInfo[key]===null){delete stationInfo[key]};
        }
        console.log('tableconfig',tableConfig)
        let key=Object.keys(stationInfo)
        if(stationInfo['createAt']){
        let startTime=stationInfo['createAt']&&stationInfo['createAt'][0]
        let endTime=stationInfo['createAt']&&stationInfo['createAt'][1]
        stationInfo['startTime']=new Date(startTime).getTime()
        stationInfo['endTime']=new Date(endTime).getTime()
        stationInfo['createAt']=undefined
          }
         let administrative=stationInfo["administrative"]
        stationInfo['provinceCode']=administrative&&administrative[0]
        stationInfo['cityCode']=administrative&&administrative[1]
        stationInfo['areaCode']=administrative&&administrative[2]
        stationInfo['administrative']=undefined
        stationInfo['managementCode']=stationInfo['managementCode']&&stationInfo['managementCode'][2]
        getStationList({
          bean:key.length<=0?undefined:stationInfo,
          pageNumber :tableConfig.value.pageSize,
          offset: (tableConfig.value.currentPage - 1) * (tableConfig.value.pageSize)
        }).then(res=>{
          let data=res['result'].stationList
         tableData.value['data']= data.result.map(item=>({
                 ...item,
                 operateState:JSON.parse(item.lifeCStatus).operatingState
               }))
          tableConfig.value.total=data.totalNum
          tableConfig.value.currentPage=data.pageNum+1
          methods.resetSubmit()
        })
      },
      // 表格弹窗逻辑 true 添加选择数据 false 清除选择数据
      hideDialog(isPushItem: boolean) {
         if (isPushItem == true) {
            console.log('selectTable',selectTable)
          selectTable.value['data'] = selectData
        
          if(selectTable.value['data'].length>0){
             
            let list=selectData.map(item=>({      
                address:item.stationAddress,
                area: item.districtName,
                areaCode:item.areaCode,
                city: item.cityName,
                // cityCode:item.cityCode,
                // provinceCode:item.provinceCode,
                convertNum: item.convertNum,
                manageOrganization: item.management,
                manageOrganizationCode:item.managementCode,
                operateState:item.operateState&&operateStateArr.filter(o=>o.label===item.operateState)[0]?operateStateArr.filter(o=>o.label===item.operateState)[0].value:'',
                operator: item.orgOp,
                operatorCode:item.orgOpCode,
                // operatorAccount: "",
                province: item.provinceName,
                stationName: item.stationName,
                stationNo: item.stationCode 
            }))
        createOverTimeStation({list}).then(res=>{
             this.$message({
                message: '添加成功',
                type: 'success'
                  })
             emit('close',true)
             dialogVisible.value = false
        })
          }else if(tableConfig.value.total<=0){
             this.$message({
             message: '暂无数据',
              type: 'warning'
                  })  
          }
          else{
              this.$message({
             message: '请先选择要添加的数据',
             type: 'warning'
                  })
          }
        }else{
        emit('close','')
        dialogVisible.value = false 
        }
        this.$refs.addmultipleTable.clearSelection()
      },
      handleCurrentChange(val) {
         tableConfig.value.currentPage=val
         methods.getData()
      },
       handleSizeChange(val) {
        console.log(val)
        tableConfig.value.pageSize=val
        methods.getData()
      },
      resetSubmit() {
        for(let key in stationInfo){
        delete stationInfo[key];
        }
      },
     changeStations(obj?: any) {
        for(let key in obj){
        if(!obj[key]){delete obj[key]};
        }
       Object.assign(stationInfo, obj)
       methods.getData()
    },
    }
    watch(
      () => selectTable.value,
      (newValue, value) => {
        // if (arrowUp.value == false) {
        //   selectTable.value['data'] = selectTable.value['data'].slice(0, 3)
        // } else {
        //   selectTable.value['data'] = value
        // }
      },
      {
        deep: true
      }
    )
    return {
      arr,
      tableConfig,
      stationInfo,
      operateStateArr,
      selectTable,
      arrowUp,
      dialogVisible,
      tableData,
      formInline,
      ...methods
    }
  }
})
</script>

<style lang="less" scoped>
.fotter {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 0px 8px 0px #ebebeb;
}
.content {
  padding: 0 24px;
  box-sizing: border-box;
  display: block;

  :deep(.el-dialog__body) {
    width: 100%;
    border-radius: 1px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #dddddd;
    padding: 0 20px;
    padding-bottom: 20px;
    overflow-y: scroll;
  }
  :deep(.el-dialog__footer) {
    padding: 6px;
  }
  :deep(.el-dialog__body .el-table) {
    margin-top: 24px;
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
