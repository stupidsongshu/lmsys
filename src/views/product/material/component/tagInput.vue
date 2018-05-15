<template>
  <span>
    <el-input
      class="btn-multi"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="medium"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else size="medium" @click="showInput">+</el-button>
  </span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue.trim() !== '') {
        this.$emit(this.name + 'Emit', inputValue.trim())
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-multi {
  width: 100px;
  margin-left: 0 !important;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
