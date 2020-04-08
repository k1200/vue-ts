<template>
  <el-container class="body-container">
    <el-header class="page-header">
      <Header/>
    </el-header>
    <el-container class="page-container">
      <el-aside class="page-aside" width="240px">
        <Aside/>
      </el-aside>
      <el-container class="main-container">
        <el-header class="main-header">
          <Tags/>
        </el-header>
        <el-main id="page-main">
           <div id="main-scrollbar">
             <el-scrollbar style="height: calc(100% - 5px)">
               <div id="components">
                <nuxt/>
               </div>
            </el-scrollbar>
           </div>
        </el-main>
        <el-footer id="page-footer">dfa</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
  import Header from "~/components/Header"
  import Aside from "~/components/Aside"
  import Tags from "~/components/Tags"

  export default {
    name: "contail",
    components: {
      Header,
      Aside,
      Tags
    }
  }
</script>

<style scoped lang="scss">

</style>
