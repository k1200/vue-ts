<template>
  <div class="aside">
    <el-scrollbar style="height: 100%">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :unique-opened="true" @open="handleOpen" @close="handleClose"
               :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item index="1-2">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="1-3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
            <el-menu-item index="1-4-2">选项2</el-menu-item>
            <el-menu-item index="1-4-3">选项3</el-menu-item>
            <el-menu-item index="1-4-4">选项4</el-menu-item>
            <el-menu-item index="1-4-5">选项5</el-menu-item>
            <el-menu-item index="1-4-6">选项6</el-menu-item>
          </el-submenu>
          <el-submenu index="1-5">
            <span slot="title">选项4</span>
            <el-menu-item index="1-5-1">选项1</el-menu-item>
            <el-menu-item index="1-5-2">选项2</el-menu-item>
            <el-menu-item index="1-5-3">选项3</el-menu-item>
            <el-menu-item index="1-5-4">选项4</el-menu-item>
            <el-menu-item index="1-5-5">选项5</el-menu-item>
            <el-menu-item index="1-5-6">选项6</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </template>
          <el-submenu index="2-4">
            <span slot="title">选项4</span>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
            <el-menu-item index="2-4-4">选项4</el-menu-item>
            <el-menu-item index="2-4-5">选项5</el-menu-item>
            <el-menu-item index="2-4-6">选项6</el-menu-item>
          </el-submenu>
          <el-submenu index="2-5">
            <span slot="title">选项4</span>
            <el-menu-item index="2-5-1">选项1</el-menu-item>
            <el-menu-item index="2-5-2">选项2</el-menu-item>
            <el-menu-item index="2-5-3">选项3</el-menu-item>
            <el-menu-item index="2-5-4">选项4</el-menu-item>
            <el-menu-item index="2-5-5">选项5</el-menu-item>
            <el-menu-item index="2-5-6">选项6</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
	export default {
		name: "Aside",
		data() {
			return {
				isCollapse: false
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style scoped lang="scss">
  .aside {
    user-select: none;
    position: relative;
    height: 100%;
    background-color: #fff;
    transition: width .2s;
    box-sizing: border-box;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.15);
    padding: 12px 0;
  }

  .el-menu-vertical-demo.el-menu {
    border: none;
  }
  .el-menu {
    padding-right: 17px;
  }
</style>
