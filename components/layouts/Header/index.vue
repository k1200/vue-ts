<template>
  <div class="jxg-top">
    <top-left/>
    <top-title/>
    <top-right/>
  </div>
</template>

<script>
  import topLeft from "./components/topLeft"
  import topRight from "./components/topRight"
  import topTitle from "./components/topTitle"
	export default {
		name: "jxgTop",
    components: {
	    topLeft,
	    topRight,
	    topTitle
    },
		data() {
			return {

			}
		}
	}
</script>

<style scoped lang="scss">
  .jxg-top {
    background-color: #409EFF;
    position: relative;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
    color: #fff;
    height: 64px;
    line-height: 64px;
    margin: 0 -20px;
    padding: 0 60px;
    display: flex;
    align-items: center;
    .top-title {
      margin-right: auto;
      margin-left: 45px;
    }
  }
</style>
