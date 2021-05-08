<template>
  <div class="app__wrap app__wrap--LeftTop">
    <div id="sidebar__wrap" class="sidebar__wrap" :class="{ 'sidebar__wrap--collapsed': collapsed }">
      <sider mode="vertical" />
    </div>

    <!-- Top -->
    <div class="sidebar__wrap--Top">
      <div class="header-title">
        <img src="@/assets/icons/logo.png" />
        <span>商户运营管理平台</span>
      </div>
      <div class="navbar-userInfo">
        <img src="@/assets/icons/avatar.png" />
        <el-dropdown size="medium" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            你好，{{ userName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">
                <svg-icon icon-class="edit-pwd" class="svg__icon"></svg-icon>
                <span>修改登录密码</span>
              </el-dropdown-item>
              <el-dropdown-item command="2">
                <svg-icon icon-class="edit-pay-pwd" class="svg__icon"></svg-icon>
                <span>{{ isPayPwd ? '修改支付密码' : '设置支付密码' }}</span>
              </el-dropdown-item>
              <el-dropdown-item command="3">
                <svg-icon icon-class="logout" class="svg__icon"></svg-icon>
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- Top -->

    <div
      class="main__wrap"
      :class="{
        'main__wrap--collapsed': collapsed
      }"
    >
      <el-scrollbar class="main__wrap--content">
        <app-main />
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, reactive, ref, toRefs } from 'vue'

import AppMain from './AppMain/index.vue'
import Sider from './Sider/index.vue'
import { useRouter } from 'vue-router'
import wsCache from '@/utils/cache'
import store from '@/store'
import { getStoreGetter, setStoreState } from '@/store/utils'
import { npNull, awaitWrap } from '@/utils/utils'
import { isPhone } from '@/utils/validate'
import { PasswordStrength } from '@/utils/validate'

enum UserCommand {
  LoginPwd = '1',
  PayPwd = '2',
  Logout = '3'
}

export default defineComponent({
  name: 'Layout',
  components: {
    Sider,
    AppMain
  },
  setup() {
    const collapsed = computed(() => getStoreGetter('app', 'collapsed'))
    const { replace } = useRouter()
    const userName = wsCache.get('userName') || '哈哈哈库哈库'
    const data: any = reactive({
      setPayPwdFlag: false
    })

    // 退出登录
    const logout = () => {
      wsCache.clear()
      replace('/login')
      // 清空vuex
      window.location.reload()
    }

    const handleCommand = (command: UserCommand) => {
      switch (command) {
        case UserCommand.LoginPwd:
        case UserCommand.PayPwd:
          break
        case UserCommand.Logout:
          logout()
          break
        default:
          ''
      }
    }
    onMounted(() => {})

    return {
      ...toRefs(data),
      collapsed,
      userName,
      handleCommand
    }
  }
})
</script>
<style>
/* @media screen and (min-width: 1366px) {
  .merchantList .el-table__empty-text {
    left: 0;
  }
} */
</style>
<style lang="less" scoped>
@import './style.less';

.header-title {
  display: inline-block;
  line-height: 60px;
  font-size: 18px;
  color: #333333;
  font-weight: 500;

  img {
    width: 28px;
    height: 28px;
    vertical-align: middle;
    margin-right: 12px;
  }
}
.merchant {
  width: 210px;
  position: absolute;
  top: 0;
  right: 250px;
  line-height: 60px;
  font-size: 14px;
  color: #606266;
  text-align: right;
}
.super {
  cursor: pointer;
  color: #5587f0;
  font-size: 14px;
  vertical-align: middle;
  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
}
.navbar-userInfo {
  position: absolute;
  top: 0;
  right: 28px;
  line-height: 60px;
  font-size: 14px;
  color: #333333;

  img:first-child {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 8px;
  }

  img:last-child {
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-right: 4px;
  }
}

:deep(.el-dropdown-menu__item) {
  line-height: 40px;

  .svg__icon {
    margin-right: 12px;
  }

  span {
    padding-right: 19px;
  }
}

// 修改密码弹
.update-password {
  :deep(.el-dialog) {
    .el-input__inner {
      height: 32px;
      width: 232px;
    }
    .el-button {
      font-size: 14px;
      box-sizing: border-box;
    }
    .el-dialog__header {
      border-bottom: 1px solid rgba(220, 220, 220, 1);
    }
    .el-dialog__body {
      display: flex;
      flex-direction: column;
      align-items: center;

      .alignEnd {
        align-self: flex-end;
        button:nth-child(1) {
          background: #fff;
          border: 1px solid #5587f0;
          color: rgba(85, 135, 240, 1);
        }
      }
    }

    .phone-code {
      position: absolute;
      right: 0;
      top: 0;
      width: 72px;
      height: 100%;
      background: #5587f0;
      border-radius: 2px;
      font-size: 12px;
      font-weight: 400;
      color: #ffffff;
      line-height: 32px;
      text-align: center;
    }
    .el-form-item__label {
      font-size: 14px;
      font-weight: 500;
      color: #333333;
      line-height: 32px;
    }
    .el-input__inner {
      height: 32px;
      width: 204px;
    }
    .el-button--mini {
      width: 72px;
      height: 32px;
      background: #5587f0;
      border-radius: 2px;
      color: #fff;
    }
    .el-link--inner {
      margin-right: 40px;
      font-size: 14px;
      font-weight: 500;
      line-height: 32px;
    }
    .el-form-item__label {
      font-size: 14px;
      font-weight: 500;
      color: #333333;
      line-height: 32px;
    }
    .el-form-item__content {
      line-height: 32px;
    }
    .el-input--medium {
      height: 32px;
      line-height: 32px;
    }
    .el-input__inner {
      height: 32px;
      width: 232px;
    }
    .el-button--mini {
      width: 72px;
      height: 32px;
      background: #5587f0;
      border-radius: 2px;
      color: #fff;
    }
  }
}
</style>
