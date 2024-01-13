<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="profile-page flex flex-col items-center">
        <div class="flex items-center w-full">
          <RippleButton class="absolute circle min-w-50 min-h-50" @click="menuStore.backPage">
            <img class="profile-page__arrow" src="@/assets/images/auth/arrow.svg" alt="" />
          </RippleButton>
          <div class="--center w-full">
            <span class="font-400-20">Профиль</span>
          </div>
        </div>
        <ion-avatar class="w-170 h-170 mt-40">
          <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
        </ion-avatar>
        <div class="flex flex-col gap-5 w-full mt-30">
          <span class="font-400-20">Имя</span>
          <input
            class="profile-page__wrapper w-full p-20 h-60 rounded-5 font-400-20"
            type="text"
            ref="firstNameInput"
            @change="updateProfile"
          />
        </div>
        <div class="flex flex-col gap-5 w-full mt-30">
          <span class="font-400-20">Фамимлия</span>
          <input
            class="profile-page__wrapper w-full p-20 h-60 rounded-5 font-400-20"
            type="text"
            ref="lastNameInput"
            @change="updateProfile"
          />
        </div>
        <div class="flex flex-col gap-5 w-full mt-30">
          <span class="font-400-20">Номер телефона</span>
          <span class="profile-page__wrapper w-full p-20 h-60 rounded-5 font-400-20">+{{ profileStore.profile.phone }}</span>
        </div>
        <div class="flex size-full flex-end">
          <div class="flex w-full flex-col gap-30 mt-30 mb-30">
            <PrimaryButton id="present-delete" class="w-full">Удалить учетную запись</PrimaryButton>
            <PrimaryButton id="present-logout" class="w-full">Выйти из профиля</PrimaryButton>
          </div>
        </div>
        <ion-alert trigger="present-logout" header="Выйти из профиля?" mode="ios" :buttons="alertButtons"></ion-alert>
        <ion-alert trigger="present-delete" header="Удалить учетную запись?" mode="ios" :buttons="alertButtons"></ion-alert>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { useMapControllerStore } from '@/entities/map-controller';
import { useRouter } from 'vue-router';
import { PrimaryButton, RippleButton } from '@/components/button';
import { profileModel } from '@/entities/profile';
import { menuModel } from '@/entities/menu';
import { nextTick, ref } from 'vue';

const mapController = useMapControllerStore();
const profileStore = profileModel();
const router = useRouter();
const menuStore = menuModel();

const firstNameInput = ref();
const lastNameInput = ref();

const alertButtons = [
  {
    text: 'Нет',
    role: 'cancel',
    handler: () => {},
  },
  {
    text: 'Да',
    role: 'confirm',
    handler: logout,
  },
];

async function logout() {
  await profileStore.logout();

  menuStore.showPage('auth', false, true);
}

async function updateProfile() {
  const first_name = firstNameInput.value.value || profileStore.profile.first_name;
  const last_name = lastNameInput.value.value || profileStore.profile.last_name;

  await profileStore.updateProfile(first_name, last_name);
}

onIonViewWillEnter(() => {
  mapController.show = false;

  nextTick(() => {
    firstNameInput.value.value = profileStore.profile.first_name;
    lastNameInput.value.value = profileStore.profile.last_name;
  });
});
</script>

<style lang="scss" scoped>
.profile-page {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 60px 27px 27px 27px;

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

  &__wrapper {
    background: #f3f3f3;
  }
}
</style>
