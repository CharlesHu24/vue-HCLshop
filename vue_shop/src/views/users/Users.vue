<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" @clear="searchUsers" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchUsers()"></el-button>
          </el-input>
        </el-col>

        <el-col :span="4">
          <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
        </el-col>

      </el-row>

      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="username" label="状态">
          <template slot-scope="scope">
            <el-switch
                    v-model="scope.row.mg_state"
            @change="switchStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="操作" width="180px">

          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
            <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>

        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pagenum"
              :page-sizes="[1, 2, 5, 10]"
              :page-size="queryInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close="addUserClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleToAddUser">添 加</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" @close="editUserClosed">
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleToEditUser">确 认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { users, usersState, addUser, editUserInfo, editUser, delUser } from '../../network/api'

export default {
  name: 'Users',
  data() {
    // 自定义验证
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-]+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]))+/
      if (regEmail.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }

    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      userList: [],
      total: 0,
      // 控制dialog显示
      dialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      editForm: {},
      editDialogVisible: false
    }
  },
  created() {
    this.getUsersList()
  },
  methods: {
    getUsersList() {
      users(this.queryInfo).then(res => {
        if (res.meta.status !== 200) return this.$message.error('获取管理员列表失败')
        this.userList = res.data.users
        this.total = res.data.total
      })
    },
    // 单页展示多少条
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUsersList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUsersList()
    },
    // 状态切换
    async switchStatus(value) {
      await usersState(value.id, value.mg_state).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('修改用户状态失败！')
        }
        return this.$message.success('修改用户状态成功！')
      })
    },
    // 用户查询
    searchUsers() {
      this.queryInfo.pagenum = 1
      this.getUsersList()
    },
    // 添加新用户
    handleToAddUser() {
      // 1. 先进行表单的预校验
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 2. 预校验成功后，发起请求
        await addUser(this.addForm).then(res => {
          if (res.meta.status !== 201) {
            return this.$message.error('添加用户失败！')
          }
          console.log(res)
          this.dialogFormVisible = false
          this.getUsersList()
          this.$message.success('添加用户成功！')
        })
      })
    },
    // 监听添加用户对话框关闭事件
    addUserClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 打开修改用户对话框
    async showEditDialog(id) {
      await editUserInfo(id).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('修改用户信息失败！')
        }
        this.editForm = res.data
      })
      this.editDialogVisible = true
    },
    // 监听关闭修改用户对话框事件
    editUserClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 确认修改用户
    handleToEditUser() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        await editUser(this.editForm.id, this.editForm.email, this.editForm.mobile).then(res => {
          this.editDialogVisible = false
          this.$message.success('修改用户信息成功！')
          this.getUsersList()
        })
      })
    },
    // 删除用户
    async deleteUser(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 确认 confirm
      // 取消 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      await delUser(id).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('删除用户失败！')
        }

        this.$message.success('删除用户成功！')
        this.getUsersList()
      })
    }
  }
}
</script>

<style scoped>

</style>
