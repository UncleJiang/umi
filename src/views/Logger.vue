<template>
  <div class="logger">
    <!-- 登录注册页框架 -->
    <h1>
      <img alt="Vue logo" src="../assets/logo.png" width="50" align="top">
      用户管理系统
    </h1>
    <p>blahblahblahblahblahblahblahblahblahblahblahblahblahblah</p>

    <!-- 登录组件，与注册组件的切换由noRegister值控制 -->
    <div v-if="noRegister">
      <el-menu
        :default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect">
        <!-- 两种登录类型的切换由loginType值控制 -->
        <el-menu-item index="1" @click="loginType = 'username'">账户密码登录</el-menu-item>
        <el-menu-item index="2" @click="loginType = 'phone'">手机号登录</el-menu-item>
      </el-menu>
      <Login1 v-if="loginType === 'username'" />
      <Login2 v-else/>
      <el-button type="text" @click="noRegister = false">注册用户</el-button>
    </div>
    <!-- 注册组件页 -->
    <Register1 v-else/>

    <p>copyright&nbsp;&nbsp;©&nbsp;April.Jiang</p>
  </div>
</template>

<script>
import Login1 from '@/components/Login1.vue'
import Login2 from '@/components/Login2.vue'
import Register1 from '@/components/Register1.vue'

export default {
  name: 'Logger',
  components: {
    Login1,
    Login2,
    Register1
  },
  data () {
    return {
      loginType: 'username',
      noRegister: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.logger {
  margin: 80px auto;
  max-width: 460px;
  min-width: 300px;
}
.el-menu-item {
  width: 230px;
  padding:10px 0;
}
</style>
