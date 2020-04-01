<template>
  <div class="mainMenu">
    <!--default-active代表导航栏默认选中哪个index, :collapse决定导航栏是否展开，为boolean类型
    :router决定导航栏是否开启路由模式，即在菜单item上设置路由是否生效，值为boolean类型-->
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true"
    >
      <!--index设置当前item的下标，:route则是传一个对象进行，指定路由-->
      <el-menu-item index="0" :route="{name:'Index'}">
        <i class="el-icon-ice-drink"></i>
        <span slot="title">欢迎页</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-date"></i>
          <span>一级导航</span>
        </template>

        <el-menu-item index="1-1">二级导航</el-menu-item>
        <el-menu-item index="1-2">二级导航</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-data-line"></i>
          <span> 一级导航</span>
        </template>

        <el-menu-item index="2-1">二级导航</el-menu-item>
        <el-menu-item index="2-2">二级导航</el-menu-item>
      </el-submenu>

      <el-menu-item index="3" :route="{name:'UserList'}" v-if="showUserList">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>用户列表</span>
        </template>
      </el-menu-item>

      <el-menu-item index="4" v-model="isCollapse">
        <i v-show="!isCollapse" class="el-icon-s-fold" @click="isCollapse=true"></i>
        <i v-show="isCollapse" class="el-icon-s-unfold" @click="isCollapse=false"></i>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
import { getCookie } from '@/utils/cookie'

export default {
  name: 'MainMenu',
  data () {
    return {
      // 初始菜单时用户列表项不显示
      showUserList: false,
      // 初始菜单侧边导航栏不折叠
      isCollapse: false
    }
  },
  mounted () {
    // 获取当前用户类型
    // var type = this.$store.getters.getLogInfo.type
    var type = getCookie('type')
    if (type === 1) {
      // 用户类型为管理员，用户列表项显示
      this.showUserList = true
    } else {
      // 用户类型为用户，用户列表项不显示
      this.showUserList = false
    }
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      // 这里是设置点击浏览器后退按钮不会返回到登录页，为了防止用户点击在首页时点击浏览器后退按钮返回到登录页
      history.pushState(null, null, document.URL)
    })
  }
  /*
  methods: {
    pushWidth () {
      const width = {
        wh: this.isCollapse ? '50px' : '200px'
      }
      if (!this.isCollapse) {
        this.$emit('mmWidth', '50px')
      } else {
        this.$emit('mmWidth', '200px')
      }
      // this.$emit('mmWidth', '50px')
    }
  }
  */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mainMenu {
  min-width: 50px;
  max-width: 200px;
  overflow: hidden;
  height: 100%;
}
.el-menu-vertical-demo {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px
  }
</style>
