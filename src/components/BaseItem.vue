<template>
  <div class="border-item">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.border-item {
  @include fp(center, center);
  width: 345px;
  height: 100px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  text-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.8);
  color: #fff;
  background: #9fe7a4;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}
</style>
