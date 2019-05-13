<template>
  <div id="app">
    <router-link to="/" class="link">
      <base-svg-icon name="home-icon" width="70" height="70" class="home-icon"></base-svg-icon>
    </router-link>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '@/scss/base.scss';

.home-icon {
  position: absolute;
  left: 50%;
  z-index: 999;
  margin: 20px 0 20px -35px;
  filter: drop-shadow(3px 3px 3px #444);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1) rotate(10deg);
    filter: drop-shadow(4px 4px 4px #444);
  }
}

.list {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 240px 50px 0;
  list-style: none;
}
</style>
