<template>
  <div>
    <el-button type="info" plain @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    // 退出功能
    logout() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
