<template>
  <div class="phone-number-screen">
    <img class="phone-number-screen__arrow" src="@/assets/images/auth/arrow.svg" alt="" @click="activeScreen = 0" />
    <span class="phone-number-screen__title"
      >Подтвердите номер <br />
      телефона</span
    >
    <div class="phone-number-screen__container">
      <img class="phone-number-screen__arrow" src="@/assets/images/auth/tj.svg" />
      <span>(+992)</span>
      <input
        class="phone-number-screen__input"
        type="number"
        placeholder="Введите номер"
        v-model="phoneNumber"
        @keyup.enter="sendPhoneNumber"
      />
      <img
        v-if="phoneNumber !== ''"
        class="phone-number-screen__clear"
        src="@/assets/images/auth/clear.svg"
        alt=""
        @click="phoneNumber = ''"
      />
    </div>
    <div class="phone-number-screen__line"></div>
    <div class="flex justify-between items-centerv mt-20" @click="menuStore.showPage('home', false, true)">
      <span>Сделаю это позже</span>
      <img class="phone-number-screen__arrow rotate-180" src="@/assets/images/auth/arrow.svg" alt="" />
    </div>
    <div class="flex w-full justify-end">
      <ToggleButton v-if="phoneNumber" class="phone-number-screen__next w-50 h-50 mt-20" @click="sendPhoneNumber">
        <img src="@/assets/images/auth/next.svg" alt="" />
      </ToggleButton>
    </div>
    <ion-toast style="--background: #fff; --background-rgb: #fff" ref="toast" message="Ошибка!" :duration="3000"></ion-toast>
  </div>
</template>
<script setup lang="ts">
import { inject, Ref, ref, watch } from 'vue';

import { ToggleButton } from '@/components/button';
import { profileModel } from '@/entities/profile';
import { menuModel } from '@/entities/menu';

const activeScreen = inject('activeScreen') as Ref<number>;

const phoneNumber = ref('');
const profileStore = profileModel();
const menuStore = menuModel();

const toast = ref();

watch(phoneNumber, () => {
  if (phoneNumber.value.toString().length > 9) phoneNumber.value = phoneNumber.value.toString().slice(0, 9);
});

async function sendPhoneNumber() {
  if (phoneNumber.value.toString().length < 9) return;

  const result = await profileStore.sendPhoneNumber(`992${phoneNumber.value}`);
  if (result) activeScreen.value = 2;
  else toast.value.$el.present();
}
</script>
<style lang="scss" scoped>
.phone-number-screen {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  color: #343434;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;

  &__title {
    margin-top: 30px;
    font-size: 24px;
    font-weight: 400;
    line-height: 140%;
  }

  &__arrow {
    width: 24px;
    height: 24px;

    &.rotate {
      transform: rotateZ(270deg);

      &-180 {
        transform: rotateZ(180deg);
      }
    }
  }

  &__container {
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 12px 15px;
    margin-top: 25px;

    border-radius: 5px;
    background: #f3f3f3;
  }

  &__text {
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 16px;
    line-height: 24px;
  }

  &__input {
    width: 100%;
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;

    &::placeholder {
      color: #989898;
    }
  }

  &__clear {
    width: 13.333px;
    height: 13.333px;
  }

  &__line {
    height: 1px;
    background: #f3f3f3;
    margin-top: 20px;
  }

  &__next {
    transition: 0.3s;
  }
}
</style>
