<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-06-04 15:56:19
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-04 16:56:10
-->

<template>
  <el-drawer :title="dialogTitle" v-model="isShow" :modal="modal" :size="size">
    <div class="content">
      <el-descriptions v-for="(options, index) of keyLabel" :key="index" :title="options.title" :column="2">
        <el-descriptions-item v-for="item of options.keyArr" :key="item.key" :label="item.lable">
          {{ data[item.key] }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, watch, ref, Ref } from 'vue'

export default defineComponent({
  name: 'EvsDialog',
  props: {
    dialogTitle: {
      type: String,
      default: 'dialogTitle'
    },
    data: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    isShow: {
      type: Boolean,
      default: () => false
    },
    size: {
      type: String
    },
    modal: Boolean,
    keyLabel: {
      type: Array
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setup(props) {}
})
</script>

<style scoped lang="less">
.content {
  padding: 0 24px;
  box-sizing: border-box;
  display: block;
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
