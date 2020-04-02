<template>
  <div class="login1">
    <el-form ref="login1form" :model="login1form" :rules="rules" status-icon>
      <el-form-item prop="name">
        <el-input v-model="login1form.name" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="login1form.password" placeholder="密码" show-password></el-input>
      </el-form-item>

      <el-form-item>
        <el-checkbox label="自动登录" v-model="login1form.autoLogin" name="autoL"></el-checkbox>
        <el-checkbox label="管理员" v-model="login1form.type" :true-label="1" :false-label="2" name="isAdmin">
        </el-checkbox>
        <el-button id="forgetPwd" type="text">忘记密码</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:100%" @click="submitForm('login1form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isvalidName, isvalidPass } from '@/utils/validate'
import { apiLogin1 } from '@/utils/request/api'
// import { mapMutations } from 'vuex'

export default {
  name: 'Login1',
  data () {
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else if (!isvalidName(value)) {
        callback(
          new Error('6-12位（字母，数字，下划线）')
        )
      } else {
        callback()
      }
    }

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!isvalidPass(value)) {
        callback(
          new Error('长度在6-16之间，必须包含字母、数字、特殊字符')
        )
      } else {
        callback()
      }
    }

    return {
      login1form: {
        name: '',
        password: '',
        type: 2
      },
      // userToken: '',
      // userLInfo: {},
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // ...mapMutations(['changeLogin', 'handleUserInfo']),

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          // console.log(this.login1form.type)
          // 登录请求
          apiLogin1(this.login1form).then(res => {
            // 跳转到首页
            if (res.code === 200) {
              this.$message.success('登录成功')
              this.$router.push('/index')
            } else {
              this.$message.error('登录失败: ' + res.msg)
            }
          }).catch(error => {
            this.$message.error('账户或密码错误: ' + error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login1 {
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
