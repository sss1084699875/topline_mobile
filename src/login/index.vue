<template>
  <div class="login-wrap">
    <!-- 导航头 -->
    <van-nav-bar
      title="登录"
    />
    <!-- 表单内容 -->
    <van-cell-group>
    <van-field
        left-icon="phone-o"
        v-model="user.mobile"
        label="手机号"
        placeholder="请输入手机号"
        clearable
        :error-message="mobileErrorMsg"
    />
    <van-field
        left-icon="like-o"
        v-model="user.code"
        label="验证码"
        placeholder="请输入验证码"
        clearable
    >
    <van-button round  slot="button" size="small" type="default">发送验证码</van-button>
    </van-field>
    </van-cell-group>

    <!-- 登录按钮 -->
    <div class="login-btn">
        <van-button type="info" class="btn" @click="handleLogin">登录</van-button>
    </div>
  </div>

</template>

<script>
import { login } from '@/api/user.js'

export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      mobileErrorMsg: ''
    }
  },
  methods: {
    async handleLogin () {
      // 验证表单的输入
      if (this.user.mobile.trim().length === 0) {
        this.mobileErrorMsg = '请输入手机号码'
        return
      } else {
        this.mobileErrorMsg = ''
      }

      try {
        const data = await login(this.user)

        this.$store.commit('setuser', data)

        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log('登录失败' + err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
    margin:  20px;
.btn {
    width: 100%;
}
}
</style>
