<template>
  <div class="top-title">
    <div class="top-menu">
      <el-menu :default-active="activeIndex" mode="horizontal" background-color="#409EFF" active-text-color="#fff" text-color="#fff">
        <template v-for="(item,index) in items">
          <el-menu-item :index="item.parentId+''" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="top-search">

    </div>
  </div>
</template>

<script>
	export default {
		name: "topTitle",
    data () {
			return {
				activeIndex: "0",
				items: [{
					name: '菜单一',
          icon: '',
          parentId: 10000
        }, {
					name: '菜单二',
					icon: '',
					parentId: 10001
        }]
      }
    },
    methods: {

    },
		async asyncData() {
			const res = await new Promise(resolve => setTimeout(() => resolve({ data: ['菜单一', '菜单二'] }), 300));
			return { items: res.data.map((index, item) => ({ name: item, parentId: index, icon: '' })) };
		}
	}
</script>

<style scoped lang="scss">
  .el-menu::after, .el-menu::before {
    display: none
  }
  .el-menu--horizontal>.el-menu-item.is-active {
    font-weight: bold;
  }
</style>
