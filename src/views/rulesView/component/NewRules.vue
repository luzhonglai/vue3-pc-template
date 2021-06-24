<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-11 17:00:46
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-23 17:29:39
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
              height="auto"
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
              <template #scope="{scope}">
                <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">移出选择</el-button>
              </template>
            </EvsTablePage>
          </div>
          <el-button
            plain
            v-if="isNewAdd"
            style="border: 1px solid #DDDDDD;color:#333333;border-radius:8px"
            icon="el-icon-plus"
            @click="saveSubmit((dialogVisible = true))"
            >添加适用电站</el-button
          >
        </div>
      </div>
      <div class="form">
        <h4 class="h4">规则配置</h4>
        <div class="item">
          <el-form :model="ruleForm" ref="formRef" :rules="formRules" label-width="80px" label-position="top">
            <el-form-item label="起止时间" prop="startTime">
              <el-date-picker style="width:204px" type="date" v-model="ruleForm.startTime" placeholder="开始时间">
              </el-date-picker>
              <el-date-picker style="width:204px" type="date" v-model="ruleForm.endTime" placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="超时占位费单价" prop="price">
              <el-input v-model="ruleForm.price">
                <template #append>元/分钟</template>
              </el-input>
            </el-form-item>
            <el-form-item label="超时占位费减免时长" prop="reduceTime">
              <el-input v-model="ruleForm.reduceTime">
                <template #append>分钟</template>
              </el-input>
            </el-form-item>
            <el-form-item label="超时占位费减免次数" prop="reduceTimes">
              <el-input v-model="ruleForm.reduceTimes">
                <template #append>次</template>
              </el-input>
            </el-form-item>
            <el-form-item label="超时占位费封顶条件" prop="limit">
              <el-input v-model="ruleForm.limit">
                <template #append>元</template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="state">
        <h4 class="stateTitle">计费说明：</h4>
        <span class="text">
          1.一笔超时占位费的订单周期为一个插拔枪时间，所以一笔超时占位费订单可能对应多笔充电订单;
        </span>
        <span class="text">2.减免时长依据每笔超时占位费的订单时长减免；</span>
        <span class="text">3.减免次数依据用户的超时占位费的订单次数减免。</span>
      </div>
    </div>

    <!-- 添加适用电庄 -->
    <el-dialog title="添加适用电站" v-model="dialogVisible" center show-close width="1140px">
      <!-- 搜索top -->
      <EvsSearchArea
        ref="dialogRef"
        :formModel="formInline"
        :initData="initData"
        :hasFold="true"
        @search="saveSubmit"
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
        height="auto"
        :loading="tableLoading"
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
      <el-button @click="submitInt()" type="primary" size="small">提交</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { createOverModel, updateOverTimeFeeModel, findByPageNoAddRule, findByIdDetail } from '../service'
import { defineComponent, ref, Ref, onBeforeMount, watch, computed } from 'vue'
import { setStoreState } from '@/store/utils'
import cityJson from '@/utils/pca-code'
import wsCache from '@/utils/cache'

export default defineComponent({
  name: 'newRules',
  props: {
    newRules: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => {
        //
      }
    }
  },
  setup(props: any, { emit }: any) {
    const formRef: Ref<any> = ref(null)
    const dialogRef: Ref<any> = ref(null)
    const dialogVisible: Ref<boolean> = ref(false)
    const tableLoading: Ref<boolean> = ref(false)
    const formInline = ref([
      {
        name: 'seniorSearch',
        label: '高级筛选',
        type: 'input',
        placeholder: '请输入站编码、站名称'
      },
      {
        name: 'address',
        label: '站地址',
        type: 'input',
        placeholder: '请输入站ID'
      },
      { name: 'administrative', label: '行政单位', type: 'cascader', placeholder: '请选择', options: cityJson },
      {
        name: 'operateState',
        label: '运营态',
        type: 'select',
        placeholder: '请选择',
        options: [
          { label: '待投运', value: 2 },
          { label: '运行', value: 3 },
          { label: '停运', value: 10 },
          { label: '退运', value: 11 },
          { label: '维修', value: 8 }
        ]
      },
      {
        name: 'manageOrganization',
        label: '管理单位',
        type: 'select',
        placeholder: '请选择',
        options: wsCache.get('manageOrganization') || []
      }
    ])
    // 提现正则
    const formRules: Ref<object> = ref({
      startTime: [
        {
          required: true,
          message: '请选择',
          trigger: 'blur'
        }
      ],
      price: [
        {
          required: true,
          message: '请输入',
          trigger: 'blur'
        }
      ],
      reduceTime: [
        {
          required: true,
          message: '请输入',
          trigger: 'blur'
        }
      ],
      reduceTimes: [
        {
          required: true,
          message: '请输入',
          trigger: 'blur'
        }
      ],
      limit: [
        {
          required: true,
          message: '请输入',
          trigger: 'blur'
        }
      ]
    })
    const arrowUp: Ref<boolean> = ref(false)
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
          label: '管理单位',
          prop: 'manageOrganization'
        }
      ],
      data: []
    })
    const ruleForm: Ref<object> = ref({
      stationNo: '',
      id: 0,
      startTime: '',
      endTime: '',
      price: '',
      reduceTime: '',
      reduceTimes: '',
      limit: ''
    })
    const isNewAdd: Ref<boolean> = ref(true)
    const selectTable: Ref<object> = ref({
      tableColumn: [
        {
          label: '电站编号',
          prop: 'stationNo'
        },
        {
          label: '电站名称',
          prop: 'stationName'
        },
        {
          label: '电站地址',
          prop: 'address'
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

    // 列表查询参数配置
    const findListParams: any = {
      // bean: {
      //   address: '',
      //   area: 'sing',
      //   belongOrganization: '',
      //   city: '',
      //   endTime: 0,
      //   manageOrganization: '',
      //   operateState: 0,
      //   province: '',
      //   seniorSearch: '',
      //   startTime: 0,
      //   stationName: '',
      //   stationNo: ''
      // },
      page: 1,
      pageSize: 10,
      sorts: {
        additionalProp1: '',
        additionalProp2: '',
        additionalProp3: ''
      }
    }
    const methods = {
      // 返回勤换视图
      closeEvent() {
        emit('setComponents', '')
        setStoreState('app', 'isNewRules', false)
        isNewAdd.value = false
      },

      // 重置
      async resetSubmit(form) {
        findListParams.bean = { ...form }
      },

      // 查询
      async saveSubmit(from: any = {}) {
        const { time = false, administrative = false, manageOrganization = false } = from
        const bean = findListParams.bean

        if (time) {
          const startTime = new Date(time[0]).getTime()
          const endTime = new Date(time[1]).getTime()
          bean.startTime = startTime
          bean.endTime = endTime
        }

        // 行政单位 --- 省市区
        if (administrative.length > 0) {
          bean['provinceCode'] = administrative && administrative[0]
          bean['cityCode'] = administrative && administrative[1]
          bean['areaCode'] = administrative && administrative[2]
        }

        // 管理单位code
        if (manageOrganization) {
          from.manageOrganizationCode = manageOrganization.pop()
        }
        findListParams.page = 1
        findListParams.bean = { ...bean, ...from }

        try {
          tableLoading.value = true
          const {
            result,
            result: { total, pageNumber: pageSize, list }
          } = await findByPageNoAddRule(findListParams).catch((e) => null)
          if (result == null) return
          tableData.value['data'] = list
          tableLoading.value = false
        } catch (e) {
          tableLoading.value = false
          dialogVisible.value = true
        }
      },

      // 提交信息
      submitInt() {
        formRef.value.validate(async (result: boolean) => {
          const params: any = Object.assign({}, ruleForm.value)
          if (!result) {
            return
          }
          params.startTime = new Date(params.startTime).getTime()
          params.endTime = new Date(params.endTime).getTime()

          if (isNewAdd.value == true) {
            // 批量创建规则
            params.stationNoList = selectTable.value['data'].map((item) => item.stationNo)
            try {
              await createOverModel(params)
              this.$message.success({
                message: '新规则提交成功',
                type: 'success'
              })
              methods.closeEvent()
              methods.resetFormData()
            } catch (error) {
              return false
            }
          } else {
            try {
              // 修改规则
              await updateOverTimeFeeModel(params)
              this.$message.success({
                message: '修改则提交成功',
                type: 'success'
              })
              methods.closeEvent()
              methods.resetFormData()
            } catch (error) {
              return false
            }
          }
        })
      },

      resetFormData() {
        const formInit: any = ruleForm.value
        for (let key in formInit) {
          formInit[key] = ''
        }
        isNewAdd.value = true
        selectTable.value['data'] = []
      },

      selectionChange(val) {
        selectData = val
      },

      // 移除选择
      handleDelete(index, row) {
        selectTable.value['data'].splice(index, 1)
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
    onBeforeMount(async () => {
      const { id } = props.newRules
      if (Object.keys(props.newRules).length > 0) {
        const { result }: any = await findByIdDetail(id)
        result.id = id
        selectTable.value['data'].push(result)
        selectTable.value['tableColumn'].pop()
        Object.assign(ruleForm.value, result)
        isNewAdd.value = false
      }
    })
    watch(
      () => ruleForm.value['reduceTime'],
      (val) => {
        if (Math.floor(val) != val) {
          ruleForm.value['reduceTime'] = Math.floor(val)
        }
      }
    )
    return {
      dialogRef,
      isNewAdd,
      formRules,
      formRef,
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
  position: absolute;
  left: 0;
  bottom: 0;
  ::before {
    display: tabel;
    content: '';
    width: 100%;
    height: 20px;
    background: #f5f5f5;
  }
}
.content {
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
    margin-bottom: 72px;
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
      :deep(.el-form) {
        .el-form-item__content::after,
        .el-form-item__content::before {
          display: none;
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
