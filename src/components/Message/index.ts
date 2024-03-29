import { ElMessage, ElMessageBox } from 'element-plus'

let messageInstance: any | null = null

const resetMessage = (options: any) => {
  if (messageInstance) {
    messageInstance.close()
  }
  messageInstance = ElMessage(options)
}
;['error', 'success', 'info', 'warning'].forEach((type: string) => {
  resetMessage[type] = (options: any) => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return resetMessage(options)
  }
})
export const MessageAlert = (content: string, title: string, buttonName: string, callback: any): void => {
  ElMessageBox.alert(content, title, {
    confirmButtonText: buttonName,
    dangerouslyUseHTMLString: true,
    callback: callback,
    customClass: 'myClass'
  })
}
export const Message = resetMessage as any
