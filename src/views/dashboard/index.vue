<template>
  <div style="margin-top: 50px; text-align: center;">
    <img src="../../assets/images/avatar.jpg" alt="">
    <h1>{{account}}, {{$t('greeting.' + timeFlag)}}!</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Locale from './locale.js'

export default {
  data() {
    return {
      account: '',
      timeFlag: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'language'
    ])
  },
  created() {
    this.account = JSON.parse(this.userInfo).account

    if (this.$i18n.getLocaleMessage(this.language)['greeting'] === undefined) {
      for (let locale in Locale) {
        this.$i18n.mergeLocaleMessage(locale, Locale[locale])
      }
    }

    const hour = new Date().getHours()
    if (hour >= 0 && hour < 12) {
      this.timeFlag = 'morning'
    } else if (hour >=12 && hour < 18) {
      this.timeFlag = 'afternoon'
    } else if (hour >= 18 && hour <=23) {
      this.timeFlag = 'evening'
    }
  }
}
</script>
