<template>
  <el-container>
    <simple-header />
    <el-main class="regiser">
      <el-form
        class="register-form"
        status-icon
        :rules="registerRules"
        ref="registerForm"
        :model="registerForm"
        label-width="0"
      >
        <div style="position: absolute; z-index: -1;opacity: 0">
          <input type="text" /> <input type="password" />
        </div>
        <el-form-item prop="tenantName">
          <el-input
            size="small"
            @keyup.enter.native="handleRegister"
            v-model="registerForm.tenantName"
            autocomplete="off"
            maxlength="50"
            placeholder="请输入公司名称（可简称）"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="account">
          <el-tooltip
            class="item"
            effect="dark"
            content="4~20个字符，需以字母开头，不支持中文及特殊字符"
            placement="bottom"
          >
            <el-input
              size="small"
              @keyup.enter.native="handleRegister"
              v-model="registerForm.account"
              autocomplete="off"
              maxlength="20"
              placeholder="请输入用户名"
            >
            </el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="password" ref="password">
          <el-tooltip
            class="item"
            effect="dark"
            content="最少6位最多15位，并且不含特殊字符"
            placement="bottom"
          >
            <el-input
              size="small"
              @keyup.enter.native="handleRegister"
              :type="passwordType"
              v-model="registerForm.password"
              auto-complete="off"
              maxlength="15"
              placeholder="请输入登录密码"
            >
              <i
                class="el-icon-view el-input__icon"
                slot="suffix"
                @click="showPassword"
              ></i>
            </el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="nextPassword" ref="nextPassword">
          <el-tooltip
            class="item"
            effect="dark"
            content="最少6位最多15位，并且不含特殊字符"
            placement="bottom"
          >
            <el-input
              size="small"
              @keyup.enter.native="handleRegister"
              :type="nextPasswordType"
              v-model="registerForm.nextPassword"
              autocomplete="off"
              maxlength="15"
              placeholder="请再次输入密码"
            >
              <i
                class="el-icon-view el-input__icon"
                slot="suffix"
                @click="showNextPassword"
              ></i>
            </el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="contactNumber">
          <el-input
            class="contactNumber"
            size="small"
            @keyup.enter.native="handleRegister"
            v-model="registerForm.contactNumber"
            auto-complete="off"
            maxlength="11"
            placeholder="请输入手机号码"
          >
            <el-button
              type="text"
              :disabled="!canGetcode"
              slot="append"
              class="get-code"
              @click.stop="getCode"
              >{{ codeTip }}</el-button
            >
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            size="small"
            @keyup.enter.native="handleRegister"
            v-model="registerForm.code"
            autocomplete="off"
            maxlength="6"
            placeholder="请输入验证码"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="margin: -10px 0 0 0" prop="checked">
          <el-checkbox v-model="registerForm.checked"
            ><span style="font-size: 12px"
              >我已阅读并同意
              <a
                href="javascript:void(0)"
                class="jxg-link"
                style="text-decoration: none"
                @click.stop="supplierAgreement"
                >《商家注册账户协议》</a
              >
            </span></el-checkbox
          >
        </el-form-item>
        <el-form-item style="margin: 10px 0 0 0">
          <el-button
            type="primary"
            size="small"
            @click.native.prevent="handleRegister"
            class="register-submit"
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item style="text-align: center"
          ><span style="color: #333;font-size: 12px"
            >已有账户，<router-link
              to="/login"
              class="jxg-link"
              style="text-decoration: none"
              >去登陆</router-link
            ></span
          ></el-form-item
        >
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SimpleHeader from '~/components/SimpleHeader/index.vue'
const validatePass = (
  rule: object,
  value: string,
  callback: Function,
  $form: any
) => {
  console.log(rule)
  let reg = /^[0-9a-zA-Z]{6,}$/
  if (reg.test(value)) {
    if ($form.nextPassword) {
      if (value !== $form.nextPassword) {
        callback(new Error('两次输入密码不一致!'))
      }
      $form.nextPassword = $form.nextPassword || ''
    }
    callback()
  } else {
    callback(new Error('密码格式错误!'))
  }
}
const validatePass2 = (
  rule: object,
  value: string,
  callback: Function,
  $form: any
) => {
  let reg = /^[0-9a-zA-Z]{6,}$/
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (!reg.test(value)) {
    callback(new Error('密码格式错误!'))
  } else if (value !== $form.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
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
      { min: 1, message: '密码长度最少为6位', trigger: 'blur' },
      { validator: validatePass, trigger: 'blur' }
    ],
    nextPassword: [
      {
        required: true,
        message: '请再次输入密码',
        trigger: 'blur'
      },
      { min: 1, message: '密码长度最少为6位', trigger: 'blur' },
      { validator: validatePass2, trigger: 'blur' }
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
}
</script>

<style scoped lang="scss"></style>
