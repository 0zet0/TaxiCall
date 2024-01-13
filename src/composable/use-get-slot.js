import { useGetIcon, nullSlot } from '@/composable';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default function useGetSlot(zone, index) {
  const { inventories, config } = useStore().state.Inventory;

  const getSlot = computed(() => {
    let item = nullSlot;
    if (Array.isArray(inventories[zone])) item = { ...item, ...inventories[zone][index] };

    return {
      ...item,
      ...config.find((i) => i.id === item.id),
    };
  });
  const getWeight = computed(() => {
    const res = (getSlot.value.weight * getSlot.value.count).toFixed(1);
    return isNaN(res) ? 0.0 : res;
  });

  const getIcon = computed(() => useGetIcon(getSlot.value.icon));

  return {
    getSlot,
    getIcon,
    getWeight,
  };
}
