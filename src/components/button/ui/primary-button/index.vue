<template>
  <button class="ion-activatable button --center" :class="{ 'event-none': loading }">
    <transition name="slide-up">
      <div class="abs-center size-full --center" v-if="loading">
        <span class="spinner"></span>
      </div>
      <slot v-else />
    </transition>
    <ion-ripple-effect class="custom-ripple" type="unbounded"></ion-ripple-effect>
  </button>
</template>
<script setup lang="ts">
defineProps({
  loading: { type: Boolean, default: false },
});
</script>
<style lang="scss" scoped>
.button {
  position: relative;
  border-radius: 15px;
  background: #343434;
  padding: 15px;

  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  overflow: hidden;

  .custom-ripple {
    color: #ffffff;
  }

  .spinner {
    border-radius: 50%;
    height: calc(100% - 20px);
    border: 0.215em solid transparent;
    border-top-color: white;
    animation: spin 1s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite;
    aspect-ratio: 1/1;
  }
}
</style>
