<template>
  <div class="register1">
    <h2>注册</h2>
    <el-form :model="formData" status-icon :rules="rules" ref="ruleForm" class="register-ruleForm">
      <el-form-item prop="name">
        <el-input v-model="formData.name" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item prop="pass">
        <el-input type="password" v-model="formData.pass" placeholder="6-16位密码，区分大小写" autocomplete="off">
        </el-input>
      </el-form-item>

      <el-form-item prop="checkPass">
        <el-input type="password" v-model="formData.checkPass" placeholder="确认密码" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="phoneNum">
        <el-input v-model="formData.phoneNum" placeholder="11位手机号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="formData.phoneCode" placeholder="验证码" style="width:70%;float:left;"></el-input>
        <el-button style="float:right;">获取验证码</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:60%;float:left;" @click="submitForm('ruleForm')">注册</el-button>
        <el-link type="primary" href="/login" style="float:right;">使用已有账户登录</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isvalidName, isvalidPass } from '@/utils/validate'
import { apiRegister } from '@/utils/request/api'

export default {
  name: 'Register1',
  data () {
    // 表单数据校验
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
        if (this.formData.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.pass) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    return {
      formData: {
        name: '',
        pass: '',
        checkPass: '',
        phoneNum: '',
        phoneCode: ''
      },
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          // 注册请求
          const userR = {
            name: this.formData.name,
            password: this.formData.pass
          }
          apiRegister(userR).then(res => {
            // 1个bug：因为login组件和register组件共用一个url,所以跳转不到login组件，暂时先跳index界面
            if (res.code === '200') {
              this.$message.success('注册成功')
              this.$router.push('/index')
            } else {
              this.$message.error('注册失败: ' + res.msg)
            }
          }).catch(error => {
            this.$message.error('注册失败' + error)
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
</style>
