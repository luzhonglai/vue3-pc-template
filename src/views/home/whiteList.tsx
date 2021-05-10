/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-04-29 17:20:29
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-10 16:46:24
 */

import { defineComponent } from 'vue'
interface InputProps {
  value: string
  onChange: (value: string) => void
}

export default defineComponent({
  name: 'home',
  setup(props: InputProps) {
    const handleChange = (event: any) => {
      props.onChange(event.target.value)
    }
    return () => <div>111111</div>
  }
})
