<template>
  <div class="top-right">
    <i class="el-icon-message" style="font-size: 25px;cursor: pointer"></i>
    <div class="top-right-user">
      <el-dropdown>
        <div class="el-dropdown-link">
          <img class="top-right-img"
               src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="" width="30"
               height="30">
          集需购
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <nuxt-link to="/">首页</nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <nuxt-link to="/">个人信息</nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
	export default {
		name: "topRight",
    data () {
			return {

      }
    },
		methods: {
			logout() {

			}
		}
	}
</script>

<style scoped lang="scss">
  .top-right {
    display: flex;
    align-items: center;
  }
  .top-right-user {
    margin-left: 8px;
  }
  .top-right-img {
    padding: 2px;
    border-radius: 50%;
    border: 1px solid #fff;
    vertical-align: middle;
  }
  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }
</style>
