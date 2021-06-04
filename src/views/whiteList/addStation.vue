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
        ref="multipleTable"
        :data="tableData"
        :border="false"
        @selection-change="selectionChange"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @cell-click="handleClickChange"
      >
      </EvsTablePage>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="mini" @click="hideDialog(false)">取 消</el-button>
          <el-button size="mini" type="primary" @click="hideDialog(true)">确 定</el-button>
        </span>
      </template>
    </el-dialog>

  
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, Ref, onMounted, watch, computed } from 'vue'
import store from '@/store'
import { setStoreState } from '@/store/utils'
import { shallowMount } from '_@vue_test-utils@2.0.0-rc.6@@vue/test-utils'
import { createOverTimeStation } from '@/api/whiteList'

export default defineComponent({
  name: 'addStation',
  setup(props, { emit }) {
       
    const  dialogVisible: Ref<boolean> = ref(true)
    const formInline: Ref<object> = ref([
      { name: 'stationCode', label: '高级筛选', type: 'selectStation', placeholder: '请输入站编码、站名称' },
      { name: 'stationCode', label: '站地址', type: 'input', placeholder: '请输入站ID' },
      { name: 'stationCode', label: '行政单位', type: 'select', placeholder: '请选择' },
      { name: 'stationCode', label: '运营态', type: 'select', placeholder: '请选择' },
      { name: 'stationCode', label: '管理单位', type: 'select', placeholder: '请选择' },
      { name: 'stationCode', label: '产权单位', type: 'select', placeholder: '请选择' }
    ])
    const arrowUp: Ref<boolean> = ref(false)
    const tableData: Ref<object> = ref({
      tableColumn: [
        {
          type: 'selection',
          width: '55'
        },
        { type: 'index', label: '序号' },
        {
          label: '电站编号',
          prop: 'num'
        },
        {
          label: '站名称',
          prop: 'name'
        },
        {
          label: '电站地址',
          prop: 'date'
        },
        {
          label: '运营态',
          prop: 'date'
        },
        {
          label: '站地址',
          prop: 'date'
        },
        {
          label: '产权单位',
          prop: 'date'
        },
        {
          label: '管理单位',
          prop: 'date',
          with: 123
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
    const methods: object = {
      selectionChange(val) {
        selectData = val
      },
         handleCancle () {
        emit('close','')
        dialogVisible.value = false
         this.$refs.multipleTable.clearSelection()
      },
      // 表格弹窗逻辑 true 添加选择数据 false 清除选择数据
      hideDialog(isPushItem: boolean) {
         if (isPushItem == true) {
            console.log('selectTable',selectTable)
          selectTable.value['data'] = selectData
        createOverTimeStation(selectTable.value['data']).then(res=>{
        emit('close','')
        dialogVisible.value = false
        })
        }else{
            emit('close','')
        dialogVisible.value = false 
        }

        this.$refs.multipleTable.clearSelection()
      }
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
    
    onMounted(async () => {})
    return {
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
