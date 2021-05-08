<template>
  <i v-if="icon && icon.includes('el-icon')" :class="[icon, 'sub-el-icon', 'anticon']" />
  <svg-icon v-else-if="icon" :icon-class="icon" class="anticon" />
  <slot name="title">
    <span>{{ title }}</span>
  </slot>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Item',
  props: {
    icon: {
      type: String as PropType<string>,
      default: ''
    },
    title: {
      type: String as PropType<string>,
      default: ''
    }
  }
})
</script>
