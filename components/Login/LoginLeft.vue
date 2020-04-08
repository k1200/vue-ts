<template>
  <div class="login-left">
    <span class="login-left-logo"><img src="~assets/images/login/logo.png" alt="" width="145"></span>
    <img class="login-left-bg" src="~assets/images/login/sign.jpg" alt="" >
  </div>
</template>

<script>
  export default {
    name: "LoginLeft"
  }
</script>

<style scoped lang="scss">
  .login-left {
    position: relative;
    width: 60%;
  }
  .login-left-logo {
    position: absolute;
    left: 4vw;
    top: 2vw;
  }
  .login-left-bg {
    width: 85%;
    transform: translate(15%, 35%);
  }
</style>
