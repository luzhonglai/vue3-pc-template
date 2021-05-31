<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-31 11:14:49
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-31 12:13:27
-->

<template>
  <div>asdsadss</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { findByPage } from '@/api/whiteList'
export default defineComponent({
  name: 'Test',
  setup() {
    const asyncRequestTest = async () => {
      const ResData = await findByPage({})
    }

    onMounted(async () => {
      asyncRequestTest()
    })
    return {
      asyncRequestTest
    }
  }
})
</script>

<style scoped></style>
