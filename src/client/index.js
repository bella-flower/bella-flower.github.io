/*脚本入口*/
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import awesome from 'vue-awesome'
import 'element-ui/lib/theme-chalk/index.css'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import echarts from 'echarts'
import store from './vuex/index'
import login from './components/login.vue'
import header from './components/header.vue'
import footer from './components/footer.vue'
import dialog from './components/dialog.vue'


Vue.prototype.ajax = axios
Vue.prototype.echarts = echarts
Vue.config.productionTip = false //关闭生产提示
/*Vue.prototype.localhost = packagejsonread.localhost*/

Vue.use(awesome)
Vue.use(VueI18n)
Vue.use(ElementUI) //使用element组件
Vue.config.lang = 'zh-cn'
Vue.locale('zh-cn', zhLocale)
Vue.locale('en', enLocale)
//注册全局组件
Vue.use({
  install:function (vue) {
    vue.component('loadheader',header);
    vue.component('loadfooter',footer);
    vue.component('ycdialog',dialog);
    vue.component('loadlogin',login);
  }
});
/* 生成Vue实例 */
var app = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App,
  }
})
