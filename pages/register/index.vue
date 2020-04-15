<template>
  <el-container class="register-container">
    <el-header class="simpleHeader">
      <simple-header />
    </el-header>
    <el-main class="register">
      <div class="register-form-box">
        <el-form
          class="register-form"
          status-icon
          :rules="registerRules"
          ref="registerForm"
          :model="registerForm"
          label-width="0"
        >
          <div style="position: absolute; z-index: -1;opacity: 0">
            <input type="text" />
            <input type="password" />
          </div>
          <el-form-item>
            <h4 class="register-title">注册</h4>
          </el-form-item>
          <el-form-item prop="tenantName">
            <el-input
              @keyup.enter.native="submit"
              v-model="registerForm.tenantName"
              autocomplete="off"
              maxlength="50"
              placeholder="请输入公司名称（可简称）"
              @input="
                registerForm.tenantName = registerForm.tenantName.replace(
                  /\s/g,
                  ''
                )
              "
            ></el-input>
          </el-form-item>
          <el-form-item prop="contactNumber">
            <el-input
              class="contactNumber"
              @keyup.enter.native="submit"
              v-model="registerForm.contactNumber"
              auto-complete="off"
              maxlength="11"
              placeholder="请输入手机号码"
              @input="
                registerForm.contactNumber = registerForm.contactNumber.replace(
                  /[^0-9]/g,
                  ''
                )
              "
            >
              <el-select
                class="tel-code"
                v-model="telCode"
                slot="prepend"
                placeholder="请选择"
                style="width: 80px;"
              >
                <el-option label="+86" value="86">+86</el-option>
                <el-option label="+120" value="120">+120</el-option>
                <el-option label="+107" value="107">+107</el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              @keyup.enter.native="submit"
              v-model="registerForm.code"
              autocomplete="off"
              maxlength="6"
              placeholder="请输入验证码"
              ><el-button
                type="text"
                :disabled="!canGetcode"
                slot="append"
                class="get-code"
                :class="canGetcode ? 'canGetcode' : ''"
                @click.stop="getCode"
                @input="
                  registerForm.code = registerForm.code.replace(/\s/g, '')
                "
                >{{ codeTip }}</el-button
              ></el-input
            >
          </el-form-item>
          <el-form-item prop="account">
            <el-input
              @keyup.enter.native="submit"
              v-model="registerForm.account"
              autocomplete="off"
              maxlength="20"
              placeholder="请输入用户名"
              @input="
                registerForm.account = registerForm.account.replace(
                  /[^0-9A-z]/g,
                  ''
                )
              "
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" ref="password">
            <el-input
              @keyup.enter.native="submit"
              :type="showPassword ? 'text' : 'password'"
              v-model="registerForm.password"
              auto-complete="off"
              maxlength="15"
              placeholder="请输入登录密码"
              @input="
                registerForm.password = registerForm.password.replace(
                  /\s|[\u4e00-\u9fa5]/g,
                  ''
                )
              "
            >
              <i
                class="el-icon-view el-input__icon"
                :class="showPassword ? 'font-color' : ''"
                slot="suffix"
                @click="showPassword = !showPassword"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="nextPassword" ref="nextPassword">
            <el-input
              @keyup.enter.native="submit"
              :type="showNextPassword ? 'text' : 'password'"
              v-model="registerForm.nextPassword"
              autocomplete="off"
              maxlength="15"
              placeholder="请再次输入密码"
              @input="
                registerForm.password = registerForm.password.replace(
                  /\s[\u4e00-\u9fa5]/g,
                  ''
                )
              "
            >
              <i
                class="el-icon-view el-input__icon"
                :class="showNextPassword ? 'font-color' : ''"
                slot="suffix"
                @click="showNextPassword = !showNextPassword"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item
            style="margin: -10px 0 0 0; text-align: left"
            prop="checked"
          >
            <el-checkbox v-model="registerForm.checked">
              <span style="font-size: 12px">
                我已阅读并同意
                <a
                  href="javascript:void(0)"
                  class="font-color"
                  @click.stop="supplierAgreement"
                  >《商家注册账户协议》</a
                >
              </span>
            </el-checkbox>
          </el-form-item>
          <el-form-item style="margin: 10px 0 0 0">
            <el-button
              plain
              @click.native.prevent="submit"
              class="register-submit"
              >注册</el-button
            >
          </el-form-item>
          <el-form-item style="text-align: center">
            <span style="color: #333;font-size: 12px">
              已有账户，
              <nuxt-link to="/login" class="toLogin">去登陆</nuxt-link>
            </span>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SimpleHeader from '~/components/SimpleHeader/index.vue'
@Component({
  components: {
    SimpleHeader
  }
})
export default class Regiser extends Vue {
  // @Model
  // @Inject
  // @Provice
  // @Prop
  // @Emit
  // @Watch
  // @Prop
  passwordType: string = 'password'
  nextPasswordType: string = 'password'
  checked: boolean = false
  time: number = 0
  showPassword: boolean = false
  showNextPassword: boolean = false
  canGetcode: boolean = false
  codeTip: string = '获取验证码'
  telCode: string = '86'
  registerForm: object = {
    tenantName: '',
    account: '',
    password: '',
    nextPassword: '',
    contactNumber: '',
    code: '',
    checked: false
  }

  registerRules: object = {
    tenantName: [
      {
        required: true,
        message: '请输入公司名称（可简称）',
        trigger: 'blur'
      }
    ],
    account: [
      { required: true, validator: this.validateAccount, trigger: 'blur' }
    ],
    password: [
      {
        required: true,
        message: '请输入登录密码',
        trigger: 'blur'
      },
      { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
      { validator: this.validatePass, trigger: 'blur' }
    ],
    nextPassword: [
      {
        required: true,
        message: '请再次输入密码',
        trigger: 'blur'
      },
      { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
      { validator: this.validatePass2, trigger: 'blur' }
    ],
    contactNumber: [
      { required: true, validator: this.validatePhone, trigger: 'blur' }
    ],
    code: [
      {
        required: true,
        message: '请输入验证码',
        trigger: 'blur'
      },
      { min: 6, message: '验证码长度为6位', trigger: 'blur' }
    ],
    checked: [
      {
        validator: (rule: object, value: string, callback: Function) => {
          if (!value) callback(new Error('请先阅读用户注册协议'))
          callback()
        },
        trigger: 'change'
      }
    ]
  }
  validatePhone(rule: object, value: string, callback: Function) {
    let reg: RegExp = /^1[3456789]\d{9}$/
    if (value === '') {
      this.canGetcode = false
      callback(new Error('请输入手机号'))
    } else if (!reg.test(value)) {
      this.canGetcode = false
      callback(new Error('手机号格式错误!'))
    } else {
      this.canGetcode = true
      callback()
    }
  }
  validateAccount(rule: object, value: string, callback: Function) {
    let reg = /^[A-z][A-z0-9]{3,}$/
    if (value === '') {
      callback(new Error('请输入用户名'))
    } else if (!reg.test(value)) {
      callback(
        new Error('用户名应为4~20个字符，需以字母开头，不支持中文及特殊字符')
      )
    } else {
      callback()
    }
  }
  validatePass(rule: object, value: string, callback: Function) {
    let reg = /(\d[^\d]+)|([A-z][^A-z]+)/
    let $registerForm: any = this.registerForm
    if (reg.test(value)) {
      if ($registerForm.nextPassword) {
        if (value !== $registerForm.nextPassword) {
          callback(new Error('两次输入密码不一致!'))
        }
        $registerForm.nextPassword = $registerForm.nextPassword || ''
        let nextPassword: any = this.$refs.nextPassword
        nextPassword.validateState = 'success'
      }
      callback()
    } else {
      callback(new Error('密码应至少包含两种不同类型的值!'))
    }
  }
  validatePass2(rule: object, value: string, callback: Function) {
    let reg = /(\d[^\d]+)|([A-z][^A-z]+)/
    let $registerForm: any = this.registerForm
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (!reg.test(value)) {
      callback(new Error('密码应至少包含两种不同类型的值!'))
    } else if (value !== $registerForm.password) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      let password: any = this.$refs.password
      password.validateState = 'success'
      callback()
    }
  }

  getCode() {}
  supplierAgreement() {}
  submit() {
    console.log(this)
  }
}
</script>
<style lang="scss">
.register-form-box {
  .tel-code {
    .el-input__validateIcon {
      display: none !important;
    }
  }
}
</style>
<style scoped lang="scss">
.register-container {
  height: 100%;
}
.simpleHeader {
  width: 100%;
  height: 80px !important;
  line-height: 80px;
  background-color: #fff;
}
.register {
  padding: 42px 0 0;
}
.register-form-box {
  width: $width;
  @media screen and (min-width: 750px) and (max-width: 1080px) {
    width: 700px;
  }
  margin: auto;
  background-color: #fff;
  padding: 32px 0;
  height: 100%;
}
.register-form {
  width: 365px;
  margin: auto;
  text-align: center;
}
.register-title {
  color: $color;
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  letter-spacing: 4px;
}
.register-submit {
  width: 100%;
}
.toLogin {
  color: $color;
  text-decoration: $color;
  text-decoration-line: underline;
}
.get-code {
  margin: 0 -20px;
  padding: 0 20px;
  line-height: 38px;
}
.el-icon-view.el-input__icon {
  cursor: pointer;
}
.canGetcode {
  background: $color !important;
  color: #fff !important;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
