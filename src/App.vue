<!--
 * @Description: 
 * @Author: luzhonglai
 * @Date: 2022-12-04 22:01:00
 * @LastEditors: luzhonglai
 * @LastEditTime: 2022-12-05 01:58:23
 * @FilePath: \vue3-pc-template\src\App.vue
-->
<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { ElConfigProvider } from 'element-plus'




import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  // components: {
  //   ElConfigProvider
  // },
  setup() {
    return {
      locale: zhCn,
      zIndex: 3000,
      size: 'medium',
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
}
</style>
