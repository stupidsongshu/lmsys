<template>
  <div>
    <h1>{{$t('message')}} {{account}}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      account: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.account = JSON.parse(this.userInfo).account
    // console.log(this.$i18n.getLocaleMessage)
    // console.log(this.$i18n.mergeLocaleMessage)
  }
}
</script>
