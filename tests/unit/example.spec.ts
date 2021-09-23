import { shallowMount } from '@vue/test-utils'
import demo from '@/components/demo.vue'

describe('demo', () => {
  it('测试输入demo组件用例', () => {
    const msg = 'new message'
    const wrapper = shallowMount(demo, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
