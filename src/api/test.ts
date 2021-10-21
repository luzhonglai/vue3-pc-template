import fetch from '@/plugins/axios'

const test = (params) => fetch({ url: '/cloudmusic/', method: 'get', params })

export default { test }
