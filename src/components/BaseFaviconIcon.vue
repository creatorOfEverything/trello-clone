<template>
  <div>
    <i :class="[type, icon]" :style="{ color: color }" class="base-icon"></i>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'fa'
    },
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style lang="scss" scoped>
.base-icon {
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2) rotate(-10deg);
  }
}
</style>
