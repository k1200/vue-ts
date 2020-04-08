<template>
  <el-input :type="passwordType" v-model="nativeInputValue" autocomplete="off" v-bind="$attrs">
    <i class="el-icon-view el-input__icon"
       slot="suffix"
       @click="showPassword"></i>
  </el-input>
</template>

<script>
  export default {
    name: "passwordInput",
    inheritAttrs: false,
    props: {
      value: [Number, String],
      isTrim: {
        type: Boolean,
        default: true
      },
      pattern: {
        type: RegExp,
        default(){
          return /(?=.*[0-9])(?=.*[A-z]).{6, 30}/
        }
      },
      prop: {
        type: String,
        default: ''
      },
    },
    computed: {
      nativeInputValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit("input", this.isTrim ? (val.replace(/\s/g, '').replace(/[\u4e00-\u9fa5]/g, '')) : '')
        }
      }
    },
    data() {
      return {
        passwordType: 'password'
      }
    },
    methods: {
      showPassword () {
        this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
      }
    }
  }
</script>

<style scoped>

</style>
