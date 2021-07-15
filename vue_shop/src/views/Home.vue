<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" plain @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="aisde-collapse" @click="handleToCollapse">|||</div>
        <el-menu
                background-color="#313743"
                text-color="#fff"
                active-text-color="#ffd04b"
                unique-opened
                :collapse="isCollapse"
                :collapse-transition="false"
                router
                :default-active="activePath">
          <!-- :index传入的类型是string，而index是number类型，加个空字符转换成string -->
          <el-submenu :index="item.id + ''" v-for="(item) in asideList" :key="item.id">
            <template slot="title">
              <i class="submenu-icon" :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>

            <el-menu-item :index="'/' + subItem.path" v-for="(subItem) in item.children" :key="subItem.id"
                          @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主要内容 -->
      <el-main>
        <!-- 路由占位 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { aside } from '../network/asideApi'

export default {
  name: 'home',
  data() {
    return {
      asideList: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpingouwudai2',
        102: 'iconfont icon-danju-tianchong',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created() {
    this.getAside()
    // 每次打开时激活上次退出时的地址
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 退出功能
    logout() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    getAside() {
      aside().then(res => {
        if (res.meta.status !== 200) return this.$message.error('侧边栏数据获取失败')
        this.asideList = res.data
      })
    },
    // 展开与折叠
    handleToCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存被激活的地址
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    height: 100vh;
    /*background-color: #B3C0D1;*/
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    color: #fff;
    background: #363d40;
    font-size: 20px;

    > div {
      flex: 1;
      display: flex;
      align-items: center;
    }

    img {
      width: 60px;
      height: 60px;
    }
  }

  .el-aside {
    background-color: #313743;

    ul {
      border-right: none;
    }
  }

  .el-main {
    background-color: #E9EEF3;
  }

  .submenu-icon {
    margin-right: 10px;
  }

  .aisde-collapse {
    background: #475163;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: .2em;
    cursor: pointer;
  }
</style>
