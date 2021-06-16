<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-10 17:11:08
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-10 11:24:50
-->
<template>
  <!-- 配置表头弹框 -->
  <el-popover placement="bottom" :width="200" trigger="click" v-model:visible="visible">
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
    <div class="hea-button">
      <el-button @click="visible = false" trigger="click" size="mini">取消</el-button>
      <el-button @click="visible = false" trigger="click" type="primary" size="mini">确定</el-button>
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
export default defineComponent({
  name: 'headerTable',

  props: ['allTable', 'type'],

  emits: ['checked'],

  setup(props: any, { emit }: any) {
    const data: any = reactive({
      checkedList: props.allTable.map((item) => item.prop),
      visible: false
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
  margin-bottom: 76px;
}
.hea-button {
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
  height: 76px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  background: #ffffff;
}
</style>
