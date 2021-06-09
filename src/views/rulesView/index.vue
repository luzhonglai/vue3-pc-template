<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-11 15:02:56
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-08 16:15:55
-->
<template>
  <component
    :is="isNewRules ? 'NewRules' : 'RoleList'"
    :newRules="newRulesData"
    @setComponents="setComponent"
  ></component>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, Ref, computed } from 'vue'
import RoleList from './component/RoleList.vue'
import NewRules from './component/NewRules.vue'
import { getStoreGetter, setStoreState } from '@/store/utils'
import store from '@/store'
export default defineComponent({
  name: 'index',
  components: {
    RoleList,
    NewRules
  },
  setup(props, { emit }) {
    const data: any = reactive({
      newRulesData: {}
    })
    const methods: object = {
      setComponent(val) {
        debugger
        data.newRulesData = val
      }
    }
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
