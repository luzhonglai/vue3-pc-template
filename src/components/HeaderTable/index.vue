<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-10 17:11:08
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-09 17:19:16
-->
<template>
  <!-- 配置表头弹框 -->
  <el-popover placement="bottom" :width="200" trigger="click">
    <div class="config_table_title">
      <div class="title">
        配置表头
      </div>
      <el-checkbox-group class="check_box" v-model="checkedList">
        <div v-for="item in allTable" :key="item.prop">
          <el-checkbox v-if="item.isShow != undefined" :key="item.prop" :checked="item.isShow" :label="item.prop"
            >{{ item.label }}
          </el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
    <template #reference>
      <el-button :type="type">
        <i class="el-icon-circle-plus"></i>
        配置表头
      </el-button>
    </template>
  </el-popover>
</template>
<script lang="ts">
import { defineComponent, watch, onBeforeMount, reactive, toRefs } from 'vue'
import wsCache from '@/utils/cache'
export default defineComponent({
  name: 'headerTable',

  props: ['allTable', 'type'],

  emits: ['checked'],

  setup(props: any, { emit }: any) {
    const data: any = reactive({
      checkedList: props.allTable.map((item) => item.prop)
    })

    watch(
      () => {
        return data.checkedList
      },
      (valArr) => {
        const tableColumn = props.allTable.filter((item) => item.isShow == undefined || valArr.indexOf(item.prop) >= 0)
        emit('handleCheckedChangelist', tableColumn)
      },
      {
        immediate: true
      }
    )

    return {
      ...toRefs(data)
    }
  }
})
</script>
<style lang="less" scoped>
.config_table_title {
  .title {
    border-bottom: 1px solid rgba(195, 195, 195, 0.5);
    font-size: 14px;
    padding: 0 0 7px 10px;
    margin-bottom: 5px;
  }
  .check_box {
    line-height: 20px;
    padding: 0 0 0 10px;
    max-height: 40vh;
    overflow-y: scroll;

    :deep(.el-checkbox__label) {
      font-size: 12px;
    }
  }
}
</style>
