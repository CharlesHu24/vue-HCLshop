import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入iconfont图标库
import '@/assets/font/iconfont.css'
// 引入全局样式表
import '@/assets/css/global.css'

// 引入elementUI
import element from '@/element'

Vue.config.productionTip = false

Vue.use(element)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
