<template>
    <div class="header-main">
      <span class="top-logo"><img src="~assets/images/logo.png" alt=""/></span>
      <span class="top-title">商家后台</span>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class SimpleHeader extends Vue {}
</script>

<style scoped lang="scss">

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
