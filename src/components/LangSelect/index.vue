<template>
  <div>
    <el-dropdown @command="handleClick">
      <div>
        <svg-icon icon-class="language" class-name="icon-language"></svg-icon>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh" :disabled="language === 'zh'">简体中文</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="language === 'en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['language'])
  },
  methods: {
    handleClick(language) {
      console.log(this.$i18n)
      this.$i18n.locale = language
      this.$store.dispatch('SetLanguage', language)
      this.$message({
        message: 'switch language success',
        type: 'success',
        showClose: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-language {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px!important;
}
</style>
