<template>
  <el-container class="simple-container">
    <el-header class="simpleHeader page-simple-header">
      <simple-header />
    </el-header>
    <el-main id="simple-container-main">
      <div id="simple-components">
        <nuxt />
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SimpleHeader from '~/components/layouts/SimpleHeader/index.vue'
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
}
</script>
<style scoped lang="scss">
.simple-container {
  height: 100%;
}
.simpleHeader {
  width: 100%;
  background-color: #fff;
  @media screen and (min-width: 851px) {
    height: 80px !important;
    line-height: 80px;
  }
  @media screen and (min-width: 750px) and (max-width: 850px) {
    height: 60px !important;
    line-height: 60px;
  }
}
#simple-container-main {
  padding: 0;
}
#simple-components {
  height: 100%;
  padding: 42px 0 0;
  @media screen and (max-width: 750px) {
    padding: 18px 0 0;
  }
}
</style>
