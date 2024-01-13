<template>
  <div class="input-location flex flex-col">
    <div class="flex items-center h-60 gap-17">
      <img v-if="selectedInput === 0" src="@/assets/images/icons/search.svg" alt="" />
      <span v-else class="input-location__circle"></span>
      <input
        ref="firstAddress"
        class="input-location__text size-full"
        type="text"
        @focus="onFocus(0)"
        @input="onSearch"
        placeholder="Откуда едем"
      />
      <div
        v-if="selectedInput === 0"
        class="h-full --center"
        @click="
          createOrderStore.activateInput = 0;
          menuStore.showPage('select-address', false);
        "
      >
        <span class="input-location__line-v"></span>
        <span class="input-location__map pl-15">Карта</span>
      </div>
    </div>
    <div class="input-location__line"></div>
    <div class="flex items-center h-60 gap-17">
      <img v-if="selectedInput === 1" src="@/assets/images/icons/search.svg" alt="" />
      <span v-else class="input-location__rect"></span>
      <input
        ref="secondAddress"
        class="input-location__text size-full"
        type="text"
        @focus="onFocus(1)"
        @input="onSearch"
        placeholder="Куда едем"
      />
      <div
        v-if="selectedInput === 1"
        class="--center h-full"
        @click="
          createOrderStore.activateInput = 1;
          menuStore.showPage('select-address', false);
        "
      >
        <span class="input-location__line-v"></span>
        <span class="input-location__map pl-15">Карта</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addressesModel } from '@/entities/addresses';
import { createOrderModel } from '@/entities/create-order';
import { menuModel } from '@/entities/menu';
import { nextTick, onMounted, Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  onSearch: { type: Function, default: () => {} },
  onFocus: { type: Function, default: () => {} },
});

const addressesStore = addressesModel();
const createOrderStore = createOrderModel();
const menuStore = menuModel();

const selectedInput = ref(null) as Ref<null | number>;
const firstAddress = ref();
const secondAddress = ref();
const router = useRouter();

watch(
  () => addressesStore.selectedAddresses[0],
  (val) => {
    firstAddress.value.value = val?.city || '';

    secondAddress.value.focus();
  }
);

watch(
  () => addressesStore.selectedAddresses[addressesStore.selectedAddresses.length - 1],
  (val) => {
    if (addressesStore.selectedAddresses.length <= 1) return;

    secondAddress.value.value = val?.city;
    menuStore.showPage('create-order', false);
  }
);

const onFocus = (input: number) => {
  props.onFocus(input);
  selectedInput.value = input;
};

onMounted(() => {
  firstAddress.value.value = addressesStore.selectedAddresses[0]?.city || '';
  secondAddress.value.value = addressesStore.selectedAddresses[1]?.city || '';
  selectedInput.value = createOrderStore.activateInput;

  props.onFocus(createOrderStore.activateInput);

  setTimeout(() => {
    if (createOrderStore.activateInput) secondAddress.value.focus();
    else firstAddress.value.focus();
  }, 500);
});
</script>

<style lang="scss" scoped>
.input-location {
  border-radius: 15px;
  background: #fff;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.15);
  padding: 0 15px;
  font-family: Inter, sans-serif;

  &__circle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 3px solid #0cf;
    aspect-ratio: 1/1;
  }

  &__rect {
    width: 15px;
    height: 15px;
    border: 3px solid #343434;
    aspect-ratio: 1/1;
  }

  &__text {
    color: #343434;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__line {
    width: 100%;
    height: 1px;
    background: #d9d9d9;

    &-v {
      width: 1px;
      height: 80%;
      background: #d9d9d9;
    }
  }

  &__map {
    color: #989898;
    font-size: 12px;
    font-weight: 400;
  }
}
</style>
