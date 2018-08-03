<template>
  <div id="app">
     <transition name="fade">
        <router-view/>
      </transition>
  </div>
</template>

<script>
export default {
	name: 'App'
};
</script>

<style lang="less">
@import url(./assets/css/define.less);
#app {
  height: 100%;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
