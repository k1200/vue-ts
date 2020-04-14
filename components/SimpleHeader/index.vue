<template>
  <el-header class="simpleHeader">
    <div class="header-main">
      <span class="top-logo"><img src="~assets/images/logo.png" alt=""/></span>
      <span class="top-title">商家后台</span>
    </div>
  </el-header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class SimpleHeader extends Vue {}
</script>

<style scoped lang="scss">
.simpleHeader {
  width: 100%;
  height: 80px !important;
  line-height: 80px;
  background-color: #fff;
}
.header-main {
  width: $width;
  margin: auto;
}
.top-logo img {
  height: 50px;
  vertical-align: middle;
}
.top-title {
  font-size: 28px;
  font-weight: bold;
  color: #666;
  margin: 0;
  vertical-align: middle;
  &::before {
    content: '';
    display: inline-block;
    height: 35px;
    vertical-align: middle;
    margin: 0 30px;
    border-right: 1px solid #dcdfe6;
  }
}
</style>
