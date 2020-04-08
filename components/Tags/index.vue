<template>
  <div class="jxg-tags">
<!--    <div-->
<!--            v-if="contextmenuFlag"-->
<!--            class="avue-tags__contentmenu"-->
<!--            :style="{left:contentmenuX+'px',top:contentmenuY+'px'}"-->
<!--    >-->
<!--      <div class="item">关闭其它</div>-->
<!--      <div class="item">关闭所有</div>-->
<!--    </div>-->
    <div class="jxg-tags__box">
      <el-tabs v-model="active" type="card" >
        <template v-for="(item, index) in tagList">
          <el-tab-pane
                  :key="item.value"
                  :label="item.label"
                  :name="item.value"
                  :closable="index > 0"
          ></el-tab-pane>
        </template>

      </el-tabs>
      <el-dropdown class="jxg-tags__menu">
        <el-button type="primary" size="mini"> 更多 <i class="el-icon-arrow-down el-icon--right"></i> </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>关闭其它</el-dropdown-item>
          <el-dropdown-item>关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
	export default {
		name: "tags",
    data () {
	    return {
		    active: "1",
		    tagList: [
			    {
			    	value: '1',
            label: '首页'
          },
			    {
				    value: '2',
				    label: '商品列表'
			    },
			    {
				    value: '3',
				    label: '订单详情'
			    }
		    ]
      }
    },
		async asyncData() {
			const res = await new Promise(resolve => setTimeout(() => resolve({ data: ['菜单一', '菜单二'] }), 300));
			return { items: res.data.map((index, item) => ({ name: item, parentId: index, icon: '' })) };
		}
	}
</script>

<style lang="scss">
  .jxg-tags {
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs--card>.el-tabs__header, .el-tabs--card>.el-tabs__header .el-tabs__nav, .el-tabs__item {
      border: none !important;
    }
    .el-tabs__nav-scroll::after, .el-tabs__nav-wrap::after {
      display: none;
    }
    .el-tabs__item {
      border: none;
    }
    .el-tabs__item.is-active {
      border-bottom: 2px solid !important;
    }
  }
</style>
<style scoped lang="scss">
  .jxg-tags {
    height: 40px;
    padding: 0 12px;
    background-color: #fff;
  }
  .jxg-tags__box {
    display: flex;
    align-items: center;
  }
  .el-tabs {
    margin-right: auto;
  }
</style>
