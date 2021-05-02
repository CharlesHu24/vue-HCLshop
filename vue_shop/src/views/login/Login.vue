<template>
  <div id="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img src="@/assets/logo.png" alt="">
      </div>
      <!-- 表单区域 -->
      <el-form label-width="0px" class="login-form">
<!--        用户名-->
        <el-form-item>
          <el-input type="text" prefix-icon="iconfont el-icon-user" v-model="username"></el-input>
        </el-form-item>
<!--        密码-->
        <el-form-item>
          <el-input type="password" prefix-icon="iconfont el-icon-lock" v-model="password"></el-input>
        </el-form-item>
<!--        用户名-->
        <el-form-item class="login-form-btns">
          <el-button type="primary">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
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
