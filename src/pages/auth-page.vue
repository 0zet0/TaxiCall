<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="auth">
        <component :is="screens[activeScreen]"></component>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { menuModel } from '@/entities/menu';

import { useMapControllerStore } from '@/entities/map-controller';
import { WelcomeScreen, PhoneNumberScreen, PincodeScreen } from '@/views/auth-page';

import { nextTick, provide, ref } from 'vue';
import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { Axios } from '@/shared/api';
import { getData } from '@/shared/lib';
import { Data } from '@/shared/types';
import { profileModel } from '@/entities/profile';
import { socket } from '@/socket';
import { createOrderModel } from '@/entities/create-order';
import { useRouter } from 'vue-router';

const menuStore = menuModel();
const profileStore = profileModel();
const useMapController = useMapControllerStore();
const createOrderStore = createOrderModel();

const router = useRouter();

const screens = [WelcomeScreen, PhoneNumberScreen, PincodeScreen];

const activeScreen = ref(0);

provide('activeScreen', activeScreen);

onIonViewWillEnter(async () => {
  await nextTick();

  useMapController.show = false;
  menuStore.showMenu = false;
});

onIonViewWillLeave(async () => {
  useMapController.show = true;
  menuStore.showMenu = true;

  activeScreen.value = 0;

  const token = await getData<Data>('token');
  if (!token || !token.value) return;

  Axios.defaults.headers.common = {
    Authorization: 'Bearer ' + token.value,
  };

  socket.connect();

  await profileStore.getProfile();
  await createOrderStore.fetchActiveOrders();

  if (createOrderStore.activeOrders.length > 0) menuStore.showPage('active-order', false, true);
  else menuStore.showPage('home', false, true);
});
</script>
<style lang="scss" scoped>
.auth {
  width: 100%;
  height: 100%;
  padding: 60px 27px 27px 27px;
  display: flex;
  flex-direction: column;
  gap: 60px;

  color: #343434;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.36px;

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
