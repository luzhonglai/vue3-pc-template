import { createStore, createLogger, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate' // vuex缓存
import modules from './modules'
import mutations from './mutations'
import { StateType } from '@/types'

const store: Store<StateType> = createStore({
  strict: true,
  mutations,
  modules: { ...modules },
  plugins:
    process.env.NODE_ENV !== 'production'
      ? [
          createLogger(),
          createPersistedState({
            paths: ['permission']
          })
        ]
      : [
          createPersistedState({
            paths: ['permission']
          })
        ]
})

export default store
