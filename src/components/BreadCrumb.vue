<template>
  <div class="BreadCrumb">
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <!--默认给一个首页的跳转-->
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <!--面包屑列表-->
      <el-breadcrumb-item
        v-for='item in breadList'
        :key='item.path'
        @click.native="breadcrumbClick(item)"
        style="cursor: pointer">
        {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data () {
    return {
      breadList: []
    }
  },
  watch: {
    // 监听路由的变化
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    // 面包屑数据处理
    getBreadcrumb () {
      const matched = this.$route.matched.filter(item => item.name)
      console.log(matched)
      this.breadList = matched.slice(1)
    },
    // 面包屑点击事件
    breadcrumbClick (item) {
      this.$router.push({
        path: item.path
      })
    }
  }
}
</script>
