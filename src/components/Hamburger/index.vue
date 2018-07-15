<template>
  <!-- <div>
    <svg t="1492500959545" @click="toggleClick" class="svg-icon hamburger" :class="{'is-active':isActive}" style="" viewBox="0 0 1024 1024"
      version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
      <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
        p-id="1692"></path>
      <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
        p-id="1693"></path>
      <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
        p-id="1694"></path>
    </svg>
  </div> -->

  <div class="hanburger-wrapper" @click="toggleClick">
    <div class="hamburger" :class="{'is-active':isActive}">
      <div class="bar bar1"></div>
      <div class="bar bar2"></div>
      <div class="bar bar3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
/* .hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  transform: rotate(0deg);
  transition: .38s;
  transform-origin: 50% 50%;
}

.hamburger.is-active {
  transform: rotate(90deg);
} */

.hanburger-wrapper {
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.hamburger .bar {
  float: left;
  width: 2px;
  height: 20px;
  margin: 0 2px;
  background-color: #666;
  transition: all .38s;
}
.hamburger.is-active .bar1 {
  transform: translateX(6px) rotate(-45deg);
}
.hamburger.is-active .bar2 {
  opacity: 0;
}
.hamburger.is-active .bar3 {
  transform: translateX(-6px) rotate(45deg);
}
</style>
