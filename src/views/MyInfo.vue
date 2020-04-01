<template>
  <div class="myInfo">
    <BreadCrumb/>
    <!-- 更新除id外的所有信息的功能待完善 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="ID">
        <el-input v-model="form.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onModifyPass">修改密码</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 修改密码模态框 -->
    <el-dialog title="修改个人密码"
    :visible="modifyPassForm"
    size="tiny"
    :modal-append-to-body='false'
    @close='closeDialog'>
      <el-form id="#modifyForm" ref="modifyForm"
      :model="modifyForm" label-width="80px">
        <el-form-item label="原密码" prop="oldPass">
          <el-input v-model="modifyForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="modifyForm.newPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="infoModify()">确定</el-button>
          <el-button @click="modifyPassForm = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
import { apiPersonInfo, apiModify } from '@/utils/request/api'
import { getCookie } from '@/utils/cookie'
// import { mapMutations } from 'vuex'

export default {
  name: 'MyInfo',
  components: {
    BreadCrumb
  },
  data () {
    return {
      form: {
        name: '',
        id: '',
        type: 2
      },
      modifyPassForm: false,
      modifyForm: {
        oldPass: '',
        newPass: ''
      },
      userToken: '',
      userLInfo: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // ...mapMutations(['changeLogin', 'handleUserInfo']),
    init () {
      // this.form = this.$store.getters.getLogInfo
      const id = getCookie('id')
      // 个人信息请求
      apiPersonInfo(id).then(res => {
        /*
        this.userToken = res.data.token
        this.userLInfo = res.data
        this.changeLogin({ Authorization: this.userToken })
        this.handleUserInfo({ userLogInfo: this.userLInfo })
        this.$message.success('成功')
        */

        // this.form = this.userLInfo
        this.form = res.data
      }).catch(error => {
        this.$message.error('请求错误' + error)
      })
    },
    // 关闭删除密码模态框
    closeDialog () {
      this.modifyPassForm = false
    },
    // 点击修改密码按钮
    onModifyPass () {
      this.modifyPassForm = true
    },
    // 点击确认按钮修改密码
    infoModify () {
      var { oldPass, newPass } = this.modifyForm
      if (oldPass === '' || newPass === '') {
        this.$message.error('数据不能为空')
      } else {
        // 修改密码请求
        apiModify({
          id: this.form.id,
          name: this.form.name,
          old_password: oldPass,
          new_password: newPass,
          type: this.form.type
        }).then(res => {
          if (res.code === '200') {
            this.$set(this.modifyForm, {})
            this.init()
            this.modifyPassForm = false
          } else {
            this.$message.error('修改失败' + res.msg)
          }
        }).catch(error => {
          this.$message.error('修改失败' + error)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-form {
  width: 50%;
  padding: 50px;
  margin: 0 auto;
}
</style>
