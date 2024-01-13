<template>
  <div class="confirim-screen size-full flex flex-col gap-17">
    <span class="confirim-screen__text font-600-22">Точка назначения</span>
    <span class="confirim-screen__line"></span>
    <div class="flex gap-20 items-center">
      <span class="confirim-screen__box"></span>
      <div class="flex flex-col gap-5">
        <span class="confirim-screen__text truncate font-400-16">{{ addressesStore.selectedAddresses[1]?.city }}</span>
        <span class="confirim-screen__text truncate font-400-13">{{ addressesStore.selectedAddresses[1]?.address }}</span>
      </div>
    </div>
    <PrimaryButton @click="menuStore.showPage('create-order')">Готово</PrimaryButton>
  </div>
</template>

<script setup lang="ts">
import { PrimaryButton } from '@/components/button';

import { inject, ref } from 'vue';
import { addressesModel } from '@/entities/addresses';
import { useRouter } from 'vue-router';
import { menuModel } from '@/entities/menu';

const activeScreen = inject('activeScreen');
const addressesStore = addressesModel();
const menuStore = menuModel();

const router = useRouter();
</script>

<style lang="scss" scoped>
.confirim-screen {
  &__line {
    height: 1px;
    width: 100%;
    background: #d9d9d9;
  }

  &__box {
    width: 15px;
    height: 15px;
    border: 3px solid #1c1c1c;
  }

  &__text {
    color: #000;
    font-family: Open Sans;
    font-style: normal;

    &.font-600-22 {
      font-weight: 600;
      font-size: 22px;
    }

    &.font-400-16 {
      color: #1c1c1c;
      font-size: 16px;
      font-weight: 400;
    }

    &.font-400-13 {
      color: #818181;
      font-size: 13px;
      font-weight: 400;
    }
  }
}
</style>
