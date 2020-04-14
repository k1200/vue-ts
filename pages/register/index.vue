<template>
  <el-container>
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
              @keyup.enter.native="handleRegister"
              v-model="registerForm.tenantName"
              autocomplete="off"
              maxlength="50"
              placeholder="请输入公司名称（可简称）"
            ></el-input>
          </el-form-item>
          <el-form-item prop="contactNumber">
            <el-input
              class="contactNumber"
              @keyup.enter.native="handleRegister"
              v-model="registerForm.contactNumber"
              auto-complete="off"
              maxlength="11"
              placeholder="请输入手机号码"
            >
            <el-select class="tel-code" v-model="telCode" slot="prepend" placeholder="请选择" style="width: 80px;">
      <el-option label="+86" value="86">+86</el-option>
      <el-option label="+120" value="120">+120</el-option>
      <el-option label="+107" value="107">+107</el-option>
    </el-select>
              
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              @keyup.enter.native="handleRegister"
              v-model="registerForm.code"
              autocomplete="off"
              maxlength="6"
              placeholder="请输入验证码"
            ><el-button
                type="text"
                :disabled="!canGetcode"
                slot="append"
                class="get-code"
                @click.stop="getCode"
              >{{ codeTip }}</el-button></el-input>
          </el-form-item>
          <el-form-item prop="account">
            <el-tooltip
              class="item"
              effect="dark"
              content="4~20个字符，需以字母开头，不支持中文及特殊字符"
              placement="bottom"
            >
              <el-input
                @keyup.enter.native="handleRegister"
                v-model="registerForm.account"
                autocomplete="off"
                maxlength="20"
                placeholder="请输入用户名"
              ></el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item prop="password" ref="password">
            <el-tooltip class="item" effect="dark" content="最少6位最多15位，并且不含特殊字符" placement="bottom">
              <el-input
                @keyup.enter.native="handleRegister"
                :type="passwordType"
                v-model="registerForm.password"
                auto-complete="off"
                maxlength="15"
                placeholder="请输入登录密码"
              >
                <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item prop="nextPassword" ref="nextPassword">
            <el-tooltip class="item" effect="dark" content="最少6位最多15位，并且不含特殊字符" placement="bottom">
              <el-input
                @keyup.enter.native="handleRegister"
                :type="nextPasswordType"
                v-model="registerForm.nextPassword"
                autocomplete="off"
                maxlength="15"
                placeholder="请再次输入密码"
              >
                <i class="el-icon-view el-input__icon" slot="suffix" @click="showNextPassword"></i>
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item style="margin: -10px 0 0 0; text-align: left" prop="checked">
            <el-checkbox v-model="registerForm.checked">
              <span style="font-size: 12px">
                我已阅读并同意
                <a
                  href="javascript:void(0)"
                  @click.stop="supplierAgreement"
                >《商家注册账户协议》</a>
              </span>
            </el-checkbox>
          </el-form-item>
          <el-form-item style="margin: 10px 0 0 0">
            <el-button
              plain
              @click.native.prevent="handleRegister"
              class="register-submit"
            >注册</el-button>
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
// const validatePass = (
//   rule: object,
//   value: string,
//   callback: Function,
//   $form: any
// ) => {
//   console.log(rule)
//   let reg = /^[0-9a-zA-Z]{6,}$/
//   if (reg.test(value)) {
//     if ($form.nextPassword) {
//       if (value !== $form.nextPassword) {
//         callback(new Error('两次输入密码不一致!'))
//       }
//       $form.nextPassword = $form.nextPassword || ''
//     }
//     callback()
//   } else {
//     callback(new Error('密码格式错误!'))
//   }
// }
// const validatePass2 = (
//   rule: object,
//   value: string,
//   callback: Function,
//   $form: any
// ) => {
//   let reg = /^[0-9a-zA-Z]{6,}$/
//   if (value === '') {
//     callback(new Error('请再次输入密码'))
//   } else if (!reg.test(value)) {
//     callback(new Error('密码格式错误!'))
//   } else if (value !== $form.password) {
//     callback(new Error('两次输入密码不一致!'))
//   } else {
//     callback()
//   }
// }
const validatePhone = (rule: object, value: string, callback: Function) => {
  let reg: RegExp = /^1[3456789]\d{9}$/
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (!reg.test(value)) {
    callback(new Error('手机号格式错误!'))
  } else {
    callback()
  }
}
const validateAccount = (rule: object, value: string, callback: Function) => {
  let reg = /^[A-z][A-z0-9]{3,}$/
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!reg.test(value)) {
    callback(new Error('用户名格式错误!'))
  } else {
    callback()
  }
}
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
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      },
      { validator: validateAccount, trigger: 'blur' }
    ],
    password: [
      {
        required: true,
        message: '请输入登录密码',
        trigger: 'blur'
      },
      { min: 1, message: '密码长度最少为6位', trigger: 'blur' }
      // { validator: validatePass, trigger: 'blur' }
    ],
    nextPassword: [
      {
        required: true,
        message: '请再次输入密码',
        trigger: 'blur'
      },
      { min: 1, message: '密码长度最少为6位', trigger: 'blur' }
      // { validator: validatePass2, trigger: 'blur' }
    ],
    contactNumber: [
      {
        required: true,
        message: '请输入手机号码',
        trigger: 'blur'
      },
      { validator: validatePhone, trigger: 'blur' }
    ],
    code: [
      {
        required: true,
        message: '请输入验证码',
        trigger: 'blur'
      },
      { min: 1, message: '验证码长度为6位', trigger: 'blur' }
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
  passwordType: string = 'password'
  nextPasswordType: string = 'password'
  checked: boolean = false
  time: number = 0
  showPassword: boolean = false
  showNextPassword: boolean = false
  canGetcode: boolean = false
  codeTip: string = '获取验证码'
  telCode: string = '86'
  getCode() {}
}
</script>
<style lang="scss">
.register-form-box {
.tel-code {
.el-input__validateIcon {
    display: none;
  }
}
}
</style>
<style scoped lang="scss">
.simpleHeader {
  width: 100%;
  height: 80px !important;
  line-height: 80px;
  background-color: #fff;
}
.register-form-box {
  width: $width;
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
      text-decoration-line:underline
}
.get-code {
  padding: 0 12px;
}
</style>
