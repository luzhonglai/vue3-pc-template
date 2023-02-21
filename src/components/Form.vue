<!--
 * @Description: 
 * @Author: luzhonglai
 * @Date: 2023-02-21 10:34:26
 * @LastEditors: luzhonglai
 * @LastEditTime: 2023-02-21 18:32:29
 * @FilePath: \vue3-pc-template\src\components\Form.vue
-->
<template>
  <div class="header"><slot name="header"> </slot></div>
  <el-form ref="ruleFormRef" :label-position="labelPosition" :label-width="labelWidth" status-icon :model="modelValue">
    <el-row>
      <template v-for="item in formItems" :key="item.label">
        <el-col v-if="item.label == '标的名称(鲸)'">{{ item.boxTitle || '基本信息' }}</el-col>
        <el-col v-bind="itemColLayout">
          <el-form-item
            v-if="!item.isHidden"
            :label="item.label"
            :rules="item.rules"
            :style="itemStyle"
            :prop="item.field"
          >
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :placeholder="item.placeholder || '请输入' + item.label"
                :show-password="item.type === 'password'"
                :disabled="item.config.disabled || false"
                :model-value="modelValue[`${item.field}`]"
                clearable
                @update:modelValue="valueChange($event, item.field)"
              />
            </template>
            <template v-if="item.type === 'textarea'">
              <el-input
                :placeholder="item.placeholder || '请输入' + item.label"
                :disabled="item.config.disabled || false"
                :model-value="modelValue[`${item.field}`]"
                autosize
                :maxlength="item.config.maxAreaHeight"
                :minlength="item.config.minAreaHeight" 
                :type="item.type"
        
              />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                :model-value="modelValue[`${item.field}`]"
                :disabled="item.config.disabled || false"
                style="width: 100%"
                clearable
                @update:modelValue="valueChange($event, item.field)"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                />
              </el-select>
            </template>
            <template v-else-if="item.type === 'date'">
              <el-date-picker
                unlink-panels
                type="date"
                :disabled="item.config.disabled || false"
                style="width: 100%"
                v-bind="item.otherOptions"
                :model-value="modelValue[`${item.field}`]"
                :format="item.dateFormat || ''"
                @update:modelValue="valueChange($event, item.field)"
              />
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>

  <div class="footer"><slot name="footer"></slot></div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, ref, defineEmits, defineExpose } from 'vue'
import type { FormInstance } from 'element-plus'

interface Props {
  formItems: [] // 表单配置项
  labelWidth?: string // 每个表单标题宽度
  itemStyle?: object // 每个表单样式
  itemColLayout?: object // 表单布局
  modelValue: object //绑定表单的每个数据
  isHidden?: boolean
  labelPosition: 'right' //表单域标签的位置
}

const props = withDefaults(defineProps<Props>(), {
  formItems: () => [],
  labelWidth: '120px',
  itemStyle: () => ({ padding: '10px 20px' }),
  itemColLayout: () => ({
    xl: 6, // >=1920px
    lg: 8, // >=1200px
    md: 12, // >=992px
    sm: 24, // >=768px
    xs: 24 // <768px
  })
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const ruleFormRef = ref<FormInstance>()

const valueChange = (value: any, field: string) => {
  debugger
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
// 表单重置方法
const resetForm = () => {
  ruleFormRef.value?.resetFields()
}

defineExpose({
  resetForm
})
</script>

<style scoped lang="less">
::deep(.el-form-item) {
  margin-top: 18px;
}
</style>
​
