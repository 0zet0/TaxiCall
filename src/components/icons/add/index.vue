<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.8337 9.1665H18.3337V10.8332H10.8337V18.3332H9.16699V10.8332H1.66699V9.1665H9.16699V1.6665H10.8337V9.1665Z"
      :fill="color"
    />
  </svg>
</template>
<script setup lang="ts">
defineProps({
  color: { type: String, default: '#989898' },
});
</script>
