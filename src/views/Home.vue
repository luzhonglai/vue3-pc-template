<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-04-29 17:20:29
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-04-29 17:54:45
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  }
})
</script>
