<template>
  <div class="welcome-screen size-full">
    <img class="welcome-screen__logo" src="@/assets/images/auth/logo.svg" alt="" />
    <div class="--center">
      <img class="w-10" src="@/assets/images/auth/phone.png" alt="" />
    </div>
    <div class="welcome-screen__block">
      <span class="welcome-screen__title">Закажи такси</span>
      <span>Никаких звонков - никаких проблем</span>
    </div>
    <div class="welcome-screen__block">
      <PrimaryButton @click="activeScreen = 1">Авторизация</PrimaryButton>
      <button class="welcome-screen__btn" @click="() => menuStore.showPage('home', false, true)">Пропустить</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PrimaryButton } from '@/components/button';
import { menuModel } from '@/entities/menu';

import { inject } from 'vue';

const activeScreen = inject('activeScreen');
const menuStore = menuModel();
</script>
<style lang="scss" scoped>
.welcome-screen {
  display: grid;
  grid-template-rows: auto calc(100% - 380px) auto auto;
  gap: 60px;

  color: #343434;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.36px;

  @media only screen and (max-width: 294px) {
    gap: 20px;
  }

  &__title {
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 0.6px;
  }

  &__logo {
    width: 127px;
    height: 34px;
  }

  &__block {
    display: flex;
    flex-direction: column;
  }

  &__btn {
    background: transparent;
    color: #1c1c1c;
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 16px;
    font-weight: 400;
    padding: 17px;
  }
}
</style>
