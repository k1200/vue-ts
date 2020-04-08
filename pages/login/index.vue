<template>
  <div class="login">
    <div class="jxg-login">
      <login-left/>
      <login-right/>
    </div>
  </div>
</template>

<script>
  import LoginLeft from "~/components/Login/LoginLeft.vue"
  import LoginRight from "~/components/Login/LoginRight.vue"
	export default {
		name: "login",
    components: {
      LoginLeft,
      LoginRight
    }
	}
</script>

<style scoped lang="scss">
  .login {
    width: 100%;
    height: 100%;
    background-image: url("~assets/images/login/bg.jpg");
    background-size: cover;
    background-position: center;
  }
  .jxg-login {
    width: 90vw;
    height: 38vw;
    margin: auto;
    border-radius: 2.5vw;
    background: #fff;
    overflow: hidden;
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
