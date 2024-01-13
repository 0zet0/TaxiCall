<template>
  <div class="location-item flex">
    <img class="location-item__icon" :src="getIcon" alt="" />
    <div class="location-item__block flex flex-col">
      <span class="location-item__text w-full truncate">{{ city }}</span>
      <span class="location-item__text small w-full truncate">
        {{ address }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import getAddress from '@/shared/lib/get-address';
import useGetIcon from '@/shared/lib/get-icon';
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      address: '',
      city: '',
      icon: '',
    }),
  },
});

const getIcon = useGetIcon(props.item.icon, 'icons', 'svg');

const city = computed(() => getAddress(props.item, true));
const address = computed(() => getAddress(props.item, false));
</script>
<style lang="scss" scoped>
.location-item {
  &__icon {
    width: 62px;
    height: 62px;
    padding: 20px;
  }

  &__block {
    width: calc(100% - 62px);
    padding: 20px 0;
    border-bottom: 1px solid #d9d9d9;
  }

  &__text {
    color: #343434;
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &.small {
      color: #989898;
      font-size: 12px;
    }
  }
}
</style>
