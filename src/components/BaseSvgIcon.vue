<template>
  <svg :width="width" :height="height">
    <use v-bind="{ 'xlink:href': '/feather-sprite.svg#' + name }"></use>
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    width: {
      type: [String, Number],
      default: 24
    },
    height: {
      type: [String, Number],
      default: 24
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
