<template>
  <div class="userList">
    <!-- 新增和搜索行 -->
    <div>
      <el-button type="primary" @click="addUser">新增用户</el-button>
      <el-input
        size="small"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="userlistsearch">
      </el-input>
    </div>

    <!-- 用户列表 -->
    <el-table
      :data="userData"
      height="450"
      >
      <!-- 序号自增 -->
      <el-table-column
        label="序号"
        type="index"
        width="180"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>

      <el-table-column
        prop="name"
        label="用户名"
        width="180">
      </el-table-column>

      <el-table-column
        prop="password"
        label="密码">
      </el-table-column>

      <el-table-column
        prop="adminOp"
        label="操作">
        <template scope="scope">
          <!-- scope.row 代表当前对应行 -->
          <el-button type="text" @click="userEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" style="color:red;" @click="userDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    //新增用户框
    <el-dialog title="新增用户信息" :visible="adduserForm" size="tiny" :modal-append-to-body='false' @close='closeDialog'>
      <el-form id="#addsForm" ref="addsForm" :model="addsForm" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
         <el-input v-model="addsForm.pass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userAdd()">确定</el-button>
          <el-button @click="adduserForm = false;canceladdT('formt')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { apiUserList, apiAddUser, apiDelUser } from '@/request/api'
// import { mapMutations } from 'vuex'

export default {
  name: 'UserList',
  data () {
    return {
      userData: [],
      userlistsearch: '',
      adduserForm: false,
      addsForm: {
        name: '',
        pass: ''
      }
    }
  },
  mounted () {
    this.init()
    // 页面内初始加载时调用
  },
  methods: {
    // ...mapMutations(['changeLogin']),
    init () {
      this.userData = [
        {
          id: 1,
          name: 'yooo',
          password: '233333'
        }
      ]

      // 请求方法
      apiUserList().then(res => {
        // 获取数据成功后的操作
        /*
        this.userToken = res.data.data.body.token

        // 将token存到vuex中
        this.changeLogin({ Authorization: this.userToken })
        alert('成功')
        */
        const userArray = res.data.userlist
        this.userData = userArray
      }).catch(error => {
        alert('错误' + error)
      })
    },
    // 关闭模态框
    closeDialog () {
      this.adduserForm = false
    },
    // 点击新增按钮
    addUser () {
      // 显示新增模态框
      this.adduserForm = true
    },
    // 模态框内确认新增
    userAdd () {
      // const userList1 = this.addsForm
      var { name, pass } = this.addsForm
      // 判断数据是否为空
      if (name === '' || pass === '') {
        this.$message.error('数据不能为空')
      } else {
        apiAddUser({
          name: name,
          password: pass
        }).then(res => {
          if (res.code === '200') {
            this.$set(this.addsForm, {})
            this.init()
            this.adduserForm = false
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    userEdit (index, row) {
      // 功能待完善
    },
    // 删除选中用户
    userDel (user) {
      this.$confirm('确认删除此用户？', '提示', { type: 'warning' }).then(() => {
        // 请求删除
        apiDelUser(user.id).then(res => {
          this.$message.success('删除成功')
          this.init()
        }).catch(res => {
          this.$message.error('删除失败')
        }).catch(() => {
          this.$message.info('操作取消')
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
