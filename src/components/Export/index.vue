<template>
  <el-button
    :type="type"
    @click="exportData"
    element-loading-text="导出中,请稍后..."
    element-loading-background="rgba(0, 0, 0, 0.7)"
    v-loading.fullscreen.lock="isLoading"
  >
    {{ exportTtitle }}
  </el-button>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import { exportExcel } from '@/api/Base'
export default defineComponent({
  name: 'Export',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    fileName: {
      type: String,
      default: 'download'
    },
    url: {
      type: String,
      default: ''
    },
    params: {
      type: Object
    },
    exportTtitle: {
      type: String,
      default: '导出'
    }
  },
  setup(props) {
    const isLoading = ref(false)
    const exportData = async () => {
      isLoading.value = true
      // eslint-disable-next-line no-undef
      const response = (await exportExcel(props.params, props.url)) || ''
      try {
        isLoading.value = false
        const link = document.createElement('a')
        const blob = new Blob([response], { type: 'application/vnd.ms-excel,charset=utf-8' })
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.download = props.fileName + '.xlsx' //下载的文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch {
        isLoading.value = false
      }
    }

    return {
      exportData,
      isLoading
    }
  }
})
</script>
