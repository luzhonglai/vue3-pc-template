<template>
  <el-breadcrumb class="breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item">
        {{ item }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue'
import { useRouter, RouteLocationMatched } from 'vue-router'
import { arrUnique } from '@/utils/utils'

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const { currentRoute } = useRouter()
    const breadcrumbList = ref<any[]>([])

    // matched array，包含当前路由的所有嵌套路径片段的路由记录
    watchEffect(() => {
      const matchedNames = currentRoute.value.matched.map((item: RouteLocationMatched) => item.meta?.title)
      const index = matchedNames.findIndex((item) => item === '首页模块')
      index > -1 && matchedNames.splice(index, 1)

      // 判断是否非菜单路由， 用于breadcrumbList展示
      // const matchedNamesLast = matchedNames[matchedNames.length - 1]
      // if (matchedNamesLast.includes(',')) {
      //   matchedNames = matchedNamesLast.split(',')
      // }

      breadcrumbList.value = arrUnique(matchedNames)
    })

    return {
      breadcrumbList
    }
  }
})
</script>
<style lang="less" scoped>
.breadcrumb {
  padding-left: 17px;
  line-height: 36px;
  font-size: 12px;
  color: #999999;

  :last-child {
    font-size: 14px;
    color: #666666;
    font-weight: 500;
  }
}
</style>
