<template>
  <router-view class="content" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App'
})
</script>

<style lang="less">
@import '../src/styles/variables.less';

.size {
  min-width: @minWidth;
  width: 100;
  height: 100%;
}
html,
body {
  .size;
  margin: 0;
  padding: 0;
}

.content {
  padding: 24px;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fff;
  overflow-y: auto;
}

#app {
  .size;
  background: @appBg;
}
.grey__mode {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
}
</style>
