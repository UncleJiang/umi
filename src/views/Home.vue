<template>
  <div class="home">
    <!-- 系统页面布局 -->
    <el-container>
      <el-header style="padding:0"><PageHeader/></el-header>
      <el-container>
        <el-aside :style="{width:collapseWidth}"><MainMenu @mmWidth="getWidth"/></el-aside>
        <el-container class="centercontent">
          <el-main><router-view/></el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import MainMenu from '@/components/MainMenu.vue'

export default {
  name: 'Home',
  components: {
    PageHeader,
    MainMenu
  },
  data () {
    return {
      collapseWidth: ''
    }
  },
  methods: {
    getWidth (val) {
      this.collapseWidth = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  height: 100%;
}
.centercontent {
  background: #f7f7f794;
}
.el-container {
  height: 100%;
}
.el-main {
  background: #fff;
  margin: 20px;
}
</style>
