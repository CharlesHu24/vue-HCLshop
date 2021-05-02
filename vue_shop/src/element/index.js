import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import { Button, Form, FormItem, Input, Icon } from 'element-ui'

const element = {
  install: function (Vue) {
    Vue.use(Button)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Icon)
  }
}

export default element
