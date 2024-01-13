<template>
  <div class="active-order">
    <div
      class="active-order__location-btn ion-activatable flex items-center justify-between w-full h-50"
      @click="
        createOrderStore.activateInput = 0;
        menuStore.showPage('search-address');
      "
    >
      <div class="flex items-center gap-17">
        <img src="@/assets/images/cars/car-1.png" alt="" />
        <span class="active-order__font">Заказать ещё одну машину</span>
      </div>
      <div class="flex h-full gap-10" @click.prevent.stop="menuStore.showPage('create-order')">
        <div class="active-order__line"></div>
        <img src="@/assets/images/auth/next.svg" alt="" />
      </div>
      <ion-ripple-effect class="custom-ripple"></ion-ripple-effect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PrimaryButton } from '@/components/button';

import { addressesModel } from '@/entities/addresses';
import { createOrderModel } from '@/entities/create-order';
import { menuModel } from '@/entities/menu';
import { useRouter } from 'vue-router';

const createOrderStore = createOrderModel();
const addressesStore = addressesModel();
const menuStore = menuModel();
const router = useRouter();
</script>

<style lang="scss" scoped>
.active-order {
  width: 100%;
  box-shadow: 0px 0px 100px 0px rgba(0, 0, 0, 0.15);
  padding: 16px;
  border-radius: 25px 25px 0px 0px;
  background: #fff;

  &__location-btn {
    position: relative;
    min-height: 50px;
    border-radius: 20px;
    background: #343434;
    padding: 13px 13px 13px 0;
    overflow: hidden;

    .custom-ripple {
      color: #ffffff;
    }
  }

  &__font {
    color: #fff;
    font-size: 16px;
    font-weight: 600;

    &-12 {
      color: #343434;
      font-size: 12px;
      font-weight: 400;
    }
  }

  &__line {
    width: 1px;
    height: 100%;
    background: linear-gradient(0deg, #fff 0%, #fff 100%), #fff;
  }
}
</style>
