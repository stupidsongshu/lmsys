import Vue from 'vue'
import Cookies from 'js-cookie'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'

import zhLocale from './zh'
import enLocale from './en'

Vue.use(VueI18n)

const messages = {
  en: {
    ...elementEnLocale,
    ...enLocale
  },
  zh: {
    ...elementZhLocale,
    ...zhLocale
  }
}

const i18n = new VueI18n({
  // set locale
  locale: Cookies.get('language') || 'zh',
  // set locale messages
  messages
})

export default i18n
