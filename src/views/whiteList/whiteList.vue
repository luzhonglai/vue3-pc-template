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
      <template #othersBtn>
        <el-button @click="addModal=true">添加</el-button>
      </template>
    </EvsSearchArea>
    <addStation v-if="addModal" @close="closeModal"></addStation>
    <div class="list-switch">
      <div>
        <el-button @click="onRemoveAll()" plain>批量移除</el-button>
      </div>
      <!-- 配置表头 -->
      <HeaderTable
        type="text"
        style="color:#666666"
        :allTable="allTable"
        @handleCheckedChangelist="handleCheckedChangelist"
      />
     <!-- <configHeader
        type="text"
        style="color:#666666"
        :configData="tableData.data"
        @checked="
          (e) => {
            tableData.checked = e
          }
        "
      /> -->
    </div>

    <!-- 表格 -->
    <EvsTablePage
      id="whiteList"
      style="margin-top: 12px"
      :data="tableData"
      :border="false"
      :pagination="tableConfig"
      ref="inittable"
      @selection-change="selectionChange"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @cell-click="handleClickChange"
    >
      <!-- 操作按钮逻辑 -->
    
      <template #scope="{scope}">
        <el-button @click="onRemoveItem(scope.row.id)" type="text" size="small">移除</el-button>
        <el-button @click="opendrawer(scope.row.id)" type="text" size="small">查看详情</el-button>
        <el-button @click="opendialogVisible(scope.row.id)" type="text" size="small">操作日志</el-button>
      </template>
    </EvsTablePage>
       <!-- 配置表头 -->
      
    <!-- 操作日志 -->
    <el-dialog title="操作日志" v-model="dialogVisible" width="456px" :before-close="handleClose" >
      <!-- 表格 -->
      <EvsTablePage
        style="margin-top:16px;"
        :data="tableLogData"
        :border="false" 
        class="handleDialog"
      />
    </el-dialog>
    <!-- 详情 -->
    <el-drawer title="查看数据" v-model="drawer" :modal="false" size="50%">
      <div class="content">
        <el-descriptions title="充电站" :column="2">
          <el-descriptions-item label="站编码：">{{detailInfo['stationNo']}}</el-descriptions-item>
          <el-descriptions-item label="站名称：">{{detailInfo['stationName']}}</el-descriptions-item>
          <el-descriptions-item label="省市区：">{{detailInfo['province']}}{{detailInfo['city']}}{{detailInfo['area']}}</el-descriptions-item>
          <el-descriptions-item label="站地址：">{{detailInfo['address']}}</el-descriptions-item>
          <el-descriptions-item label="管理单位：">{{detailInfo['manageOrganization']}}</el-descriptions-item>
          <el-descriptions-item label="经度：">{{detailInfo['lng']}}</el-descriptions-item>
          <el-descriptions-item label="纬度：">{{detailInfo['lat']}}</el-descriptions-item>
          <el-descriptions-item label="商户类型："></el-descriptions-item>
          <el-descriptions-item label="运营单位：">{{detailInfo['belongOrganization']}}</el-descriptions-item>
          <el-descriptions-item label="站长电话："></el-descriptions-item>
          <el-descriptions-item label="是否对外开放："></el-descriptions-item>
          <el-descriptions-item label="公专用："></el-descriptions-item>
            <el-descriptions-item label="服务电话："></el-descriptions-item>
        </el-descriptions>

        <el-descriptions title="停车区信息" :column="2">
          <el-descriptions-item label="是否停车收费："> </el-descriptions-item>
          <el-descriptions-item label="停车收费描述："></el-descriptions-item>
        </el-descriptions>
      
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, Ref, onMounted ,onBeforeMount} from 'vue'
import { batchRemove, removeItem, findByPage ,findByIdDetail,createOverTimeStation ,queryStationOperationRecord,findBelongOrganizationList} from '@/api/whiteList'
import { dateArrToNumArr } from '@/utils/date'
import  administrativeUnits  from '@/utils/pca-code'
import { formatDate ,deepClone} from '@/utils/utils'
import addStation from './addStation.vue'
interface InputProps {
  value: string
}

export default defineComponent({
  name: 'whiterList',
  components: {
    addStation
  },
  setup(props: InputProps, { emit }) {
     onBeforeMount(async () => {
       methods.getData()
       methods.nowHeaderClass()
       methods.getList()
    })
    let arr=[]
    let selectData=[]
    const allTable:any = ref([
         {
          type: 'selection',
          width: '55'
        },
        { type: 'index', label: '序号' },
        {
          label: '站编码',
          prop: 'stationNo',
         
        },
        {
          label: '站名称',
          prop: 'stationName'
        },
        {
          label: '运营态',
          prop: 'operateState',
          width:60,
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
          prop: 'province',
          width:60,
        },
         {
          label: '运营商',
          prop: 'operator'
        },
        {
          label: '管理单位',
          prop: 'manageOrganization'
        },
        // {
        //   label: '产权单位',
        //   prop: 'belongOrganization'
        // },
         {
          label: '所属模型',
          prop: 'owningModel'
        },
         {
          label: '添加时间',
          prop: 'createdAt',
          width:120,
        },
        {
          label: '操作',
          fixed: 'right',
          scope: true,
          width: 192
        }
    ])
    const operateStateArr= [
          {
            label: '待投运',
            value: "2"
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
      { name: 'seniorSearch', label: '高级筛选', type: 'input', placeholder: '请输入站编码、站名称' },
      { name: 'address', label: '站地址', type: 'input', placeholder: '请输入站地址' },
      { name: 'administrative', label: '行政单位', type: 'cascader', placeholder: '请选择',options:administrativeUnits},
      { name: 'operateState', label: '运营态', type: 'select', placeholder: '请选择', options:operateStateArr },
      { name: 'manageOrganizationCode', label: '管理单位', type: 'cascader', placeholder: '请选择' ,options:arr},
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
          prop: 'stationNo',
         
        },
        {
          label: '站名称',
          prop: 'stationName'
        },
        {
          label: '运营态',
          prop: 'operateState',
           width:60,
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
          prop: 'city',
        },
        {
          label: '省',
          prop: 'province',
           width:60,
        },
         {
          label: '运营商',
          prop: 'operator'
        },
        {
          label: '管理单位',
          prop: 'manageOrganization'
        },
        // {
        //   label: '产权单位',
        //   prop: 'belongOrganization'
        // },
         {
          label: '所属模型',
          prop: 'owningModel'
        },
         {
          label: '添加时间',
          prop: 'createdAt',
          width:120,
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
    const resetName = ref(null)
    const dialogVisible: Ref<boolean> = ref(false)
    const addModal: Ref<boolean> = ref(false)
    const tableLogData: Ref<object>= ref({
      tableColumn: [
        {
          label: '操作帐号',
          prop: 'operatorAccount'
        },
        {
          label: '操作时间',
          prop: 'createdAt',
          width:150
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
    const tableConfig = ref({
      currentPage: 1,
      pageSizes: [10, 20, 30],
      pageSize: 10,
      total: 0
    })
    const drawer: Ref<boolean> = ref(false)
    const detailInfo:Ref<object>= ref({
    })
    const stationInfo = reactive({
    })
    function closeModal(val){
      addModal.value=false
      if(val){
        methods.getData()
      }
      } 
    const methods = {
      getList(){
        findBelongOrganizationList().then(res=>{
           arr= methods.getChildren(res['result'])
           console.log('1234',arr)
        })   
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
      hand(val){
        console.log('1234',val)
      },
       selectionChange(val) {
        selectData = val
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
        tableData.value['tableColumn'] = newArr
      },
      // checkchange(e){
      //   console.log('rrrr',e)
      // },
      opendrawer(id){
        console.log('drawer',id)
         findByIdDetail(id).then(res=>{
              detailInfo.value=res['result']
              drawer.value=true
         })
     
      },
      opendialogVisible(id){
         queryStationOperationRecord({
           bean:{
             operationTableId:id
           },
          page:1,
          pageSize:999
         }).then(res=>{
            dialogVisible.value=true
            tableLogData.value['data']=res['result'].list.map(item=>({
              ...item,
              createdAt:formatDate(item.createdAt,'Y/M/D h:m:s')
            }))
         })
      },
      getData(): void{
        console.log('tableconfig',tableConfig)
         for(let key in stationInfo){
         if(!stationInfo[key]||stationInfo[key]===null){delete stationInfo[key]};
        }
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
        // stationInfo['manageOrganization']= stationInfo['manageOrganization']&& stationInfo['manageOrganization'][2]
        stationInfo['manageOrganizationCode']=stationInfo['manageOrganizationCode']&& stationInfo['manageOrganizationCode'][2]
        findByPage({
          bean:key.length<=0?undefined:stationInfo,
          page:tableConfig.value.currentPage,
          pageSize:tableConfig.value.pageSize
        }).then(res=>{
         tableData.value['data']= res['result'].list.map(item=>({
                 ...item,
                 operateState:item.operateState&&operateStateArr.filter(o=>o.value===item.operateState)[0]?operateStateArr.filter(o=>o.value===item.operateState)[0].label:'',
                 createdAt:item.createdAt&&formatDate(item.createdAt,'Y/M/D')
               })
               )
          tableConfig.value.total=res['result'].total
          tableConfig.value.currentPage=res['result'].pageNumber+1
          methods.resetSubmit()
        })
      },
      changeStations(obj?: any) {
        console.log('obj',obj)
        for(let key in obj){
        if(!obj[key]||obj[key]===null){delete obj[key]};
        }
        Object.assign(stationInfo, obj)
        methods.getData()
    },
  
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      resetSubmit() {
        for(let key in stationInfo){
          delete stationInfo[key];
        }
      },
      changeStation() {
        console.log(resetName.value, '213123')
      },
      handleClickChange(row, column, cell, event) {
        if (column.no == 2) {
           findByIdDetail(row['id']).then(res=>{
              detailInfo.value=res['result']
              drawer.value=true
         })
        }
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

      /**
       * 移除item
       *
       */
      async onRemoveItem(id) {
        console.log('item',id)
        // 调用弹窗
        let isNext = await this.onRemoveMassage(false,id)
      },

      /**
       * 移除删除提示
       *
       */
      async onRemoveMassage(isAll,id) {
        const title = isAll ? '批量移除' : '移除'
        if(isAll&&selectData.length<=0){
          this.$message({
             message: '请先选择要移除的数据',
            type: 'warning'
             })
        }
        else if(isAll&&tableConfig.value.total<=0){
          this.$message({
             message: '暂无数据',
            type: 'warning'
             })
        }
        else{
        return await this.$messageBox({
          title: title,
          type: 'warning',
          message:
            '从白名单内移除的充电站不能在进行超时占位费的配置，且已配置完成超时占位费的充电站从白名单内移除后将会自动禁用超时占位费，确认从白名单内移除当前所选充电站？',
          showCancelButton: true
        })
          .then(() => {
             if(isAll){
               let idList=selectData.map(item=>item.id)
               batchRemove({
                 idList:idList,
                 validState:false,
                 isBatch:true
               })
               .then(res=>{
                this.$message({
                 message: res['msg'],
                  type: 'success'
                  })
                  this.$refs.inittable.clearSelection()
                  console.log('data',selectData)
                  methods.getData()
               }).catch(rej=>{
                   console.log('remove2',rej)
               })
             }else{
               batchRemove({
                 idList:[id],
                 validState:false,
                 isBatch:false
               }).then(res=>{
                  this.$message({
                   message: '移除成功',
                   type: 'success'
                  })
                   methods.getData()
               })
               
             }
          })
          .catch(() => {
             
          })
        }
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
      arr,
      allTable,
      closeModal,
      addModal,
      detailInfo,
      dialogVisible,
      drawer,
      resetName,
      tableConfig,
      formInline,
      tableData,
      operateStateArr,
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
  /deep/.handleDialog{
    max-height:500px;
    overflow-y:scroll
  }
  /deep/#whiteList .el-table {
    // .cell {
    //   padding-right: 10px;
    // }
    .el-table__row {
      td:nth-child(3) {
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
