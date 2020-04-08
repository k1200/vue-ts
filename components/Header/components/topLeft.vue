<template>
  <div class="top-left">
    <img class="top-left-logo" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
         alt="" width="42" height="42">
    <span class="top-left-title" v-if="!showCollapse">集需购后台管理系统</span>
    <i class="el-icon-s-fold" @click="setCollapse" style="font-size: 18px;cursor: pointer"></i>
  </div>
</template>

<script>
	export default {
		name: "topLeft",
		data() {
			return {
				showCollapse: false,
				isCollapse: false
			}
		},
		methods: {
			setCollapse() {
				this.isCollapse = false
			}
		}
	}
</script>

<style scoped lang="scss">
  .top-left {
    display: flex;
    align-items: center;
  }
  .top-left-logo {
    border-radius: 50%;
    margin-right: 5px;
  }
  .top-left-title {
    font-size: 16px;
    cursor: default;
    margin-right: 5px;
  }
</style>
