<template>
  <div text="切换语言">
    <el-dropdown @command="handleClick">
      <div>
        <svg-icon :icon-class="iconClass" class-name="icon-language"></svg-icon>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh" :disabled="language === 'zh'">
          <svg-icon icon-class="language-zh"></svg-icon> 简体中文
        </el-dropdown-item>
        <el-dropdown-item command="en" :disabled="language === 'en'">
          <svg-icon icon-class="language-en"></svg-icon> English
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['language']),
    iconClass() {
      return 'language-' + this.language
    }
  },
  methods: {
    handleClick(language) {
      this.$i18n.locale = language
      this.$store.dispatch('SetLanguage', language)
      this.$message({
        message: this.$t('switchLanguageTxt'),
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
