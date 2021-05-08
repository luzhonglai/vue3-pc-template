/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-08 10:41:31
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-08 10:41:57
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
    return () => <div>1231321</div>
  }
})
