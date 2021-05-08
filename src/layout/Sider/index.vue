<template>
  <div
    :class="{
      'has-logo': showLogo
    }"
    class="sidebar-container"
  >
    <el-scrollbar>
      <!-- <el-button class="primary" @click="triggerCollapsed">切换</el-button> -->
      <div class="collapse" @click="triggerCollapsed">
        <i :class="collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        :unique-opened="true"
        :mode="mode"
        @select="selectMenu"
      >
        <sider-item v-for="route in routers" :key="route.path" :item="route" :basePath="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SiderItem from './SiderItem.vue'
import { isExternal } from '@/utils/validate'
import { RouteRecordRaw } from 'vue-router'
import router, { constantRouterMap } from '@/router'
import store from '@/store'
import { AppGetterType } from '@/store/modules/app/getters'
import { getStoreGetter, setStoreState } from '@/store/utils'

export default defineComponent({
  name: 'Sider',
  components: { SiderItem },
  props: {
    mode: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'vertical'
    }
  },
  setup() {
    const { currentRoute, push } = useRouter()
    const routers = constantRouterMap
    const activeMenu = computed(() => {
      const { meta, path } = currentRoute.value
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    const collapsed = computed(() => getStoreGetter<AppGetterType>('app', 'collapsed'))
    const showLogo = true

    onMounted(() => {
      console.log(routers)
    })

    function selectMenu(path: string) {
      if (isExternal(path)) {
        window.open(path)
      } else {
        push(path)
      }
    }

    const triggerCollapsed = () => {
      setStoreState('app', 'collapsed', !collapsed.value)
    }

    return {
      routers,
      activeMenu,
      collapsed,
      showLogo,
      selectMenu,
      triggerCollapsed
    }
  }
})
</script>

<style lang="less" scoped>
.sidebar-container {
  height: 100%;
  :deep(.svg-icon) {
    margin-right: 16px;
  }
  :deep(.el-scrollbar) {
    width: 100%;
    height: 100%;
    .el-scrollbar__wrap {
      overflow: scroll;
      overflow-x: hidden;
      .el-menu {
        width: 100%;
        border: none;
      }
    }
  }
}

.collapse {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid rgba(221, 221, 221, 0.2);
  font-size: 22px;
  text-align: right;
  padding-right: 18px;

  i {
    color: #dddddd;
  }
}
</style>
