<template>
  <div class="pageHeader">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :router="true">
      <el-menu-item index="1" :route="{name:'Index'}">
        <h1 style="color:black">
          <img alt="Vue logo" src="../assets/logo.png" width="30">
          用户管理系统
        </h1>
      </el-menu-item>

      <el-submenu index="2" style="float:right">
        <template slot="title"><i class="el-icon-user-solid"></i></template>
        <el-menu-item index="2-1" :route="{name:'MyInfo'}">个人信息</el-menu-item>
        <el-menu-item index="2-2">用户设置</el-menu-item>
        <el-menu-item index="2-3" @click="logout">退出登录</el-menu-item>
      </el-submenu>

      <el-menu-item index="3" style="float:right">
        <i class="el-icon-search"></i>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
import { apiLogout } from '@/utils/request/api'
import { delCookie } from '@/utils/cookie'

export default {
  name: 'PageHeader',
  methods: {
    // ...mapMutations(['changeLogin', 'handleUserInfo']),
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      // 退出登录请求
      apiLogout().then(res => {
        if (res.code === '200') {
          this.$message.success('退出登录成功')
          this.$router.push('/login')
        } else {
          this.$message.error('退出登录失败: ' + res.msg)
        }
      }).catch(() => {
        this.$message.error('退出登录失败')
      })
      // 清除cookie
      delCookie()
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pageHeader {
  background: pink;
}

h1 {
  margin: 0;
}
</style>
