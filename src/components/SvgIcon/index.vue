<template>
  <svg class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      require: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return '#icon-' + this.iconClass
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

