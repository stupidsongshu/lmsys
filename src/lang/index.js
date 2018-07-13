import Vue from 'vue'
import Cookies from 'js-cookie'
import VueI18n from 'vue-i18n'
import elementEnLocal from 'element-ui/lib/locale/lang/en'
import elementZhLocal from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const messages = {
  en: {
    ...elementEnLocal,
    message: 'hello'
  },
  zh: {
    ...elementZhLocal,
    message: '你好'
  }
}

const i18n = new VueI18n({
  // set locale
  locale: Cookies.get('language') || 'en',
  // set locale messages
  messages
})

export default i18n
