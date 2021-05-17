<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-11 15:02:56
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-17 14:10:58
-->
<template>
  <component :is="isNewRules ? 'NewRules' : 'RoleList'"></component>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, Ref, computed } from 'vue'
import RoleList from './component/roleList.vue'
import NewRules from './component/newRules.vue'
import { getStoreGetter, setStoreState } from '@/store/utils'
import store from '@/store'
export default defineComponent({
  name: 'index',
  components: {
    RoleList,
    NewRules
  },
  setup(props, { emit }) {
    const data: object = reactive({})
    const methods: object = {}
    const isNewRules = computed(() => store.state.app.isNewRules)
    return {
      isNewRules,
      ...toRefs(data),
      ...methods
    }
  }
})
</script>

<style lang="less" scoped></style>
