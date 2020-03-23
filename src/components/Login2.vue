<template>
  <div class="login2">
    <el-form ref="login2form" :model="login2form">
      <el-form-item>
        <el-input v-model="login2form.phoneNum" placeholder="手机号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="login2form.phoneCode" placeholder="验证码" style="width:70%;float:left;"></el-input>
        <el-button style="float:right;">获取验证码</el-button>
      </el-form-item>

      <el-form-item>
        <el-checkbox label="自动登录" v-model="login2form.autoLogin" name="autoL"></el-checkbox>
        <el-checkbox label="管理员" v-model="login2form.type" @click="login1form.type = 1" name="isAdmin"></el-checkbox>
        <el-button id="forgetPwd" type="text">忘记密码</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:100%">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login2',
  data () {
    return {
      login2form: {
        phoneNum: '',
        phoneCode: '',
        autoLogin: false,
        type: 2
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login2 {
  margin: 20px;
}
.el-input__inner {
    &::placeholder {
        color: #606266;
    }

    &::-webkit-input-placeholder {
        /* WebKit browsers 适配谷歌 */
        color: #606266;
    }

    &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 适配火狐 */
        color: #606266;
    }

    &::-moz-placeholder {
        /* Mozilla Firefox 19+ 适配火狐 */
        color: #606266;
    }

    &:-ms-input-placeholder {
        /* Internet Explorer 10+  适配ie*/
        color: #606266;
    }
}
.el-checkbox {
  float: left;
}
#forgetPwd {
  float: right;
}
</style>
