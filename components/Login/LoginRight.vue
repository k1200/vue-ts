<template>
  <div class="login-right">
    <div class="login-box">
      <div class="login-right-title">
        <h4>
          <div>你好！</div>
          <div>欢迎来到集需购</div>
        </h4>
      </div>
      <div class="login-right-form">
        <user-login />
      </div>
      <div class="login-right-footer">
        <el-row type="flex" justify="space-between">
          <nuxt-link to="/register">立即注册</nuxt-link>
          <span>忘记密码</span>
        </el-row>
        <el-row style="margin-top: 12px" type="flex" justify="flex-end">
          <span>—— 第三方登录</span>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import UserLogin from './UserLogin'
export default {
  name: 'LoginRight',
  components: {
    UserLogin
  }
}
</script>

<style scoped lang="scss">
.login-right {
  width: 40%;
  padding: 12px;
}
.login-box {
  width: 55%;
  margin: auto;
  transform: translateY(-50%);
  position: relative;
  top: 50%;
}
.login-right-title {
  color: #fd6905;
  letter-spacing: 5px;
  font-size: 2vw;
  white-space: nowrap;
  &::after {
    content: '';
    display: block;
    width: 16%;
    height: 2px;
    background-color: #fd6905;
    margin-top: 0.8vw;
  }
}
.login-right-form {
  padding: 2.5vh 0 0;
}
.login-right-footer {
  font-size: 12px;
  color: #484545;
  padding: 0 12px;
}
</style>
