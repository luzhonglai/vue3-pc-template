<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-11 17:00:46
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-18 17:37:43
-->

<template>
  <div class="content">
    <h3 class="title3">新建规则</h3>
    <div class="new-rules-view">
      <div class="form">
        <h4 class="h4">适用范围</h4>
        <div class="item">
          <div class="station-list" v-if="selectTable.data.length > 0">
            <h4>* 适用电站</h4>
            <span
              >已选择 <el-link type="danger">{{ selectTable.data.length }}</el-link> 家电站</span
            >
            <EvsTablePage
              class="rules-table"
              :data="selectTable"
              :border="false"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              @cell-click="handleClickChange"
            >
              <template #column>
                <div class="isput" @click="arrowUp = !arrowUp">
                  {{ arrowUp ? '收起' : '展开更多'
                  }}<i style="margin:0 4px" :class="arrowUp ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                </div>
              </template>

              <!-- 操作按钮逻辑 -->
              <template #scope>
                <el-button @click="removeItem(scope)" type="text" size="small">移出选择</el-button>
              </template>
            </EvsTablePage>
          </div>
          <el-button round icon="el-icon-plus" @click="dialogVisible = true">添加适用电站</el-button>
        </div>
      </div>
      <div class="form">
        <h4 class="h4">规则配置</h4>
        <div class="item">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="80px"
            label-position="top"
            :hide-required-asterisk="false"
          >
            <el-form-item label="起止时间" prop="name">
              <el-input class="item-input" placeholder="请选择起始时间" prefix-icon="el-icon-time" v-model="input1">
              </el-input>
              <el-input class="item-input" placeholder="请选择结束时间" prefix-icon="el-icon-time" v-model="input2">
              </el-input>
            </el-form-item>
            <el-form-item label="超时占位费单价" prop="region">
              <el-input v-model="ruleForm.name" type="text">
                <template #append>元/分钟</template>
              </el-input>
            </el-form-item>
            <el-form-item label="超时占位费减免时长" prop="region">
              <el-input v-model="ruleForm.name" type="text">
                <template #append>小时</template>
              </el-input>
            </el-form-item>
            <el-form-item label="超时占位费减免次数" prop="region">
              <el-input v-model="ruleForm.name" type="text">
                <template #append>次</template>
              </el-input>
            </el-form-item>
            <el-form-item label="超时占位费封顶条件" prop="region">
              <el-input v-model="ruleForm.name" type="text">
                <template #append>元</template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="state">
        <h4 class="stateTitle">计费说明：</h4>
        <span class="text"
          >1.一笔超时占位费的订单周期为一个插拔枪时间，所以一笔超时占位费订单可能对应多笔充电订单;</span
        >
        <span class="text">2.减免时长依据每笔超时占位费的订单时长减免；</span>
        <span class="text">3.减免次数依据用户的超时占位费的订单次数减免。</span>
      </div>
    </div>

    <!-- 添加适用电庄 -->
    <el-dialog title="添加适用电站" v-model="dialogVisible" center show-close width="1140px">
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

    <!-- 返回 保存 提交 -->
    <div class="fotter">
      <el-button @click="closeEvent()" plain size="small">返回</el-button>
      <el-button @click="setStoreData()" size="small">临时保存</el-button>
      <el-button @click="submitInt()" type="primary" size="small">提交</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, Ref, onMounted } from 'vue'
import store from '@/store'
import { setStoreState } from '@/store/utils'

export default defineComponent({
  name: 'newRules',
  setup(props, { emit }) {
    const dialogVisible: Ref<boolean> = ref(false)
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
    const ruleForm: Ref<object> = ref({
      name: '',
      region: '',
      date1: '',
      date2: '',
      desc: ''
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
      // 返回勤换视图
      closeEvent() {
        setStoreState('app', 'isNewRules', false)
      },

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      // 临时保存
      setStoreData() {
        this.$message.success({
          message: '临时保存成功',
          type: 'success'
        })
      },

      // 提交信息
      submitInt() {
        this.$message.success({
          message: '新规则提交成功',
          type: 'success'
        })
      },

      selectionChange(val) {
        console.log(val, '------item')
        selectData = val
      },

      // 移除选择
      removeItem(val) {
        console.log('移除第一个', val)
        // this.selected = val
      },

      // 表格弹窗逻辑 true 添加选择数据 false 清除选择数据
      hideDialog(isPushItem: boolean) {
        dialogVisible.value = false
        if (isPushItem == true) {
          selectTable.value['data'] = selectData
        }
        this.$refs.multipleTable.clearSelection()
      }
    }
    onMounted(async () => {})
    return {
      selectTable,
      arrowUp,
      ruleForm,
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
  .title3 {
    width: 64px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 22px;
    margin-right: auto;
    padding-top: 24px;
    padding-bottom: 17px;
    box-sizing: border-box;
  }
  .new-rules-view {
    padding-left: 24px;
    width: 100%;
    box-sizing: border-box;
    .form {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 24px;
      flex-wrap: wrap;

      .h4 {
        width: 56px;
        height: 20px;
        font-size: 14px;
        font-weight: 600;
        color: #333333;
        line-height: 20px;
        margin-right: 24px;
      }
      .item {
        flex: 1;
        border-bottom: 1px solid #ebebeb;
        padding-bottom: 40px;
        .item-input {
          width: 204px;
          &:nth-child(1) {
            margin-right: auto;
          }
          :deep(.el-input__icon) {
            line-height: 32px;
          }
        }
      }
      :deep(.el-form-item__content) {
        height: 32px;
        width: 428px;
        display: flex;
        justify-content: space-between;
      }
      :deep(.el-form-item__label) {
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        margin-bottom: 8px;
      }
    }

    .station-list {
      display: block;
      width: 100%;
      margin-bottom: 12px;
      h4 {
        display: block;
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        margin-bottom: 8px;
      }
      span {
        width: 88px;
        height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        line-height: 17px;
      }
      .rules-table {
        margin-top: 24px;
        width: 843px;
        margin-top: 14px;
        overflow: hidden;
        border-radius: 8px;
        border: 1px solid #ebebeb;
        .isput {
          margin-top: auto;
          height: 40px;
          text-align: center;
          color: #487ef0;
          line-height: 40px;
          font-size: 12px;
        }
      }
    }

    .state {
      margin-left: 80px;

      .stateTitle {
        border-radius: 2px;
        text-align: left;
        color: #666666;
      }
      .text {
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 20px;
        display: block;
        margin-top: 12px;
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
