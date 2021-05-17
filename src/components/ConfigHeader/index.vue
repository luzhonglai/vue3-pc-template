<template>
  <!-- 配置表头弹框 -->
  <el-popover placement="bottom" :width="200" trigger="click">
    <div class="config_table_title">
      <div class="title">
        配置表头
      </div>
      <el-checkbox-group class="check_box" v-model="unUseParams.hasChecked">
        <div v-for="(item, index) in configData.tableData" :key="index">
          <el-checkbox :label="item.val">{{ item.label }}</el-checkbox>
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
import { defineComponent, onMounted, reactive, watch } from 'vue'
import wsCache from '@/utils/cache'
export default defineComponent({
  name: 'configHeader',
  props: ['configData', 'type'],
  emits: ['checked'],
  setup(props: any, { emit }) {
    const unUseParams = reactive({
      hasChecked: []
    })

    onMounted(() => {
      const key = 'configHeader' + props.configData.name
      const isStorage = props.configData.isStorage == false ? false : true
      const val = wsCache.get(key)
      if (val && isStorage) {
        unUseParams.hasChecked = val
      } else {
        unUseParams.hasChecked = props.configData.checked
      }
    })
    watch(
      () => {
        return unUseParams.hasChecked
      },
      (val: any) => {
        wsCache.set('configHeader' + props.configData.name, val)
        emit('checked', val)
      }
    )
    return {
      unUseParams
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
