<template>
  <div id="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img src="~@/assets/logo.png" alt="">
      </div>
      <!-- 表单区域 -->
      <el-form :model="loginForm" ref="loginFormRef" :rules="rules" label-width="0px" class="login-form">
        <!--        用户名-->
        <el-form-item prop="username">
          <el-input type="text" prefix-icon="iconfont el-icon-user" v-model="loginForm.username"
                    @keyup.enter.native="login(loginForm)"></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont el-icon-lock" v-model="loginForm.password"
                    @keyup.enter.native="login(loginForm)"></el-input>
        </el-form-item>
        <!--        按钮-->
        <el-form-item class="login-form-btns">
          <el-button type="primary" @click="login(loginForm)">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../network/loginApi'

export default {
  name: 'Login',
  data() {
    return {
      // 登录表单数据对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // document.onkeyup = ev => {
    //   const key = window.event.keyCode
    //
    //   if (key === 13) {
    //     this.login(this.loginForm)
    //   }
    // }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login(loginData) {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        login(loginData).then(res => {
          console.log(res)
          if (res.meta.status !== 200) {
            return this.msgError()
          }
          this.msgSuccess()
          // 存储token
          window.sessionStorage.setItem('token', res.data.token)
          // 路由跳转
          this.$router.push('/home')
        })
      })
    },
    msgSuccess() {
      this.$message({
        message: '登录成功',
        type: 'success'
      })
    },
    msgError() {
      this.$message({
        message: '登录失败',
        type: 'error'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #login-container {
    height: 100%;
    background-color: #2d4d6d;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-box {
    width: 450px;
    height: 300px;
    background: #fff;
    border-radius: 3px;

    .avatar-box {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    .login-form {
      padding: 100px 30px 10px;

      /deep/ .el-form-item__content {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
