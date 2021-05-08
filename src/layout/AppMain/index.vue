<template>
  <section class="app-main">
    <breadcrumb />
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.fullPath" class="main__component" />
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Breadcrumb from '../Breadcrumb/index.vue'
export default defineComponent({
  name: 'AppMain',
  components: {
    Breadcrumb
  }
})
</script>

<style lang="less" scoped>
.app-main {
  // overflow: hidden;
  position: relative;
  height: 100%;
  // padding: 20px;
  background-color: #f5f5f5;

  .main__component {
    position: absolute;
    top: 36px;
    left: 12px;
    right: 12px;
    bottom: 12px;
    background: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(221, 221, 221, 0.3);
    border-radius: 2px;
    overflow: scroll;
  }
}
</style>
