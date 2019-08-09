<template>
  <div class="login-wrap">
    <!-- 导航头 -->
    <van-nav-bar
      title="登录"
    />
    <!-- 表单内容 -->
    <van-cell-group>
    <van-field
        v-validate="'required|digits:11'"
        name="mobile"
        left-icon="phone-o"
        v-model="user.mobile"
        label="手机号"
        placeholder="请输入手机号"
        clearable
        :error-message="errors.first('mobile')"
    />
    <van-field
        v-validate="'required|digits:6'"
        name="code"
        left-icon="like-o"
        v-model="user.code"
        label="验证码"
        placeholder="请输入验证码"
        clearable
        :error-message="errors.first('code')"
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
      }
    }
  },
  methods: {
    handleLogin () {
      try {
        // 进行表单验证
        this.$validator.validate().then(async valid => {
          if (!valid) {
          // do stuff if not valid.
            return
          }
          const data = await login(this.user)
          this.$store.commit('setuser', data)
          this.$router.push({ name: 'home' })
        })
      } catch (err) {
        console.log('登录失败' + err)
      }
    }
  },
  created () {
    const dict = {
      custom: {
        mobile: {
          required: '手机号不能为空',
          digits: '手机号必须为11位数字'
        },
        code: {
          required: '验证码不能为空',
          digits: '验证码必须为6位数字'
        }
      }
    }
    // or use the instance method
    this.$validator.localize('zh_cn', dict)
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
