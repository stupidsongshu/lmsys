<template>
  <span>
    <el-input
      class="btn-multi"
      v-if="inputVisible"
      v-model.trim="inputValue"
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
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
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
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue !== '') {
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].text === inputValue) {
            this.$message({
              showClose: true,
              message: '标签已存在',
              type: 'error'
            })
            break
          } else {
            this.$emit('tagInputEmit', {name: this.name, value: inputValue})
          }
        }
      }
      this.inputVisible = false
      this.inputValue = ''
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
