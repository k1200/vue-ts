<template>
  <el-form
    :model="loginForm"
    v-error-focus="validateState"
    status-icon
    :rules="rules"
    ref="loginForm"
    class="userLogin"
  >
    <el-form-item label="用户名" prop="username">
      <el-input
        v-model="loginForm.username"
        placeholder="请输入账号"
        @input="loginForm.username = loginForm.username.replace(/\s/g, '')"
      />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginForm.password"
        prop="password"
        placeholder="请输入密码"
        @input="
          loginForm.password = loginForm.password
            .replace(/\s/g, '')
            .replace(/[\u4e00-\u9fa5]/g, '')
        "
      />
    </el-form-item>
    <el-form-item class="login-submit">
      <el-button
        class="login-btn"
        type="primary"
        @click="submitForm('loginForm')"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
const validateUserName = (rule: object, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    callback()
  }
}
const validatePass = (rule: object, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

@Component({})
export default class UserLogin extends Vue {
  loginForm: object = {
    username: '',
    password: ''
  }
  rules: object = {
    username: [{ validator: validateUserName, trigger: 'blur' }],
    password: [{ validator: validatePass, trigger: 'blur' }]
  }
  validateState: Boolean = true

  submitForm(formName: string) {
    let refs: any = this.$refs
    refs[formName].validate((valid: Boolean) => {
      if (valid) {
        this.$router.push('/')
      } else {
        this.validateState = !this.validateState
        return false
      }
    })
  }
}
</script>

<style lang="scss">
.userLogin {
  .el-form-item__label {
    color: #a8a8a8;
    line-height: initial;
  }

  .el-input__inner {
    border: none;
    border-bottom: 1px solid #a8a8a8;
    border-radius: 0;
    padding: 0;
    transition: none;
  }
}
</style>
<style scoped lang="scss">
.login-btn {
  width: 100%;
}
</style>
