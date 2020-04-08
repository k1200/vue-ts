<template>
  <el-input v-model="nativeInputValue" autocomplete="off" v-bind="$attrs"></el-input>
</template>

<script>
	export default {
    name: 'NormalInput',
    inheritAttrs: false,
    props: {
      value: [Number, String],
      isTrim: {
        type: Boolean,
        default: true
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
          this.$emit("input", this.isTrim ? val.replace(/\s/g, '') : '')
        }
      }
    }
  }
</script>

<style scoped>

</style>
