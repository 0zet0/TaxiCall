import { computed } from 'vue';
import { useStore } from 'vuex';

export default function useGetSlots(zone = 0, slotsCount = 0) {
  const { inventories, config } = useStore().state.Inventory;

  const slots = computed(() => (Array.isArray(inventories[zone]) ? inventories[zone] : []));
  const getCount = computed(() => {
    return slots.value.reduce((count, item) => {
      if (typeof item === 'object' && item.id !== null) count++;
      return count;
    }, 0);
  });
  const getSlotsCount = computed(() => (slotsCount > 0 ? slotsCount : getCount.value > 0 ? slots.value.length : 0));
  const weight = computed(() => {
    let sum = 0;

    slots.value.forEach((item) => {
      if (item && item.id === null) return;
      const _item = { ...item, ...config.find((i) => i.id === item.id) };
      const res = _item.weight * (_item.count > 0 ? _item.count : 1);
      if (!isNaN(res)) sum += res;
    });

    return Math.floor(sum);
  });

  return {
    getSlotsCount,
    weight,
    getCount,
  };
}
