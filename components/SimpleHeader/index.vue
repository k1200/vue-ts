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
  @media screen and (min-width: 750px) and (max-width: 1080px) {
    width: 700px;
  }
  @media screen and(min-width: 500px) and (max-width: 750px) {
    width: 500px;
  }
  margin: auto;
}
.top-logo img {
  height: 50px;
  @media screen and (max-width: 750px) {
    height: 24px;
  }
  vertical-align: middle;
}
.top-title {
  font-size: 28px;
  @media screen and (max-width: 750px) {
    font-size: 18px;
  }
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
    @media screen and (max-width: 750px) {
      height: 20px;
      margin: 0 12px;
    }
  }
}
</style>
