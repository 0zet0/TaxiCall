<template>
  <ion-page class="events-none">
    <ion-menu
      class="events-auto"
      side="end"
      :menu-id="contentId"
      :content-id="contentId"
      @ionWillOpen="menuStore.toggle(true)"
      @ionDidClose="menuStore.toggle(false)"
    >
      <div class="home__drawer size-full flex flex-col gap-50">
        <div
          class="flex w-full gap-20 items-center"
          @click="profileStore.isLogged ? menuStore.showPage('profile-page') : menuStore.showPage('auth', false, true)"
        >
          <ion-avatar class="circle min-h-40">
            <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          </ion-avatar>
          <div v-if="profileStore.isLogged" class="flex w-full truncate flex-col">
            <span class="home__drawer_text truncate">{{ profileStore.profile.first_name }} {{ profileStore.profile.last_name }}</span>
            <span v-if="profileStore.profile.phone" class="home__drawer_number truncate">+{{ profileStore.profile.phone }}</span>
          </div>
          <div v-else class="flex flex-col">
            <span class="home__drawer_text truncate">Авторизация</span>
          </div>
        </div>
        <a class="flex gap-20 items-center auto-truncate" href="tel:0220">
          <img src="@/assets/images/icons/call.svg" alt="" />
          <span class="home__drawer_text">Позвонить оператору</span>
        </a>
        <!-- <div class="flex gap-20 items-center">
          <img src="@/assets/images/icons/star.svg" alt="" />
          <span class="home__drawer_text truncate events-auto">Мои адреса</span>
        </div>
        <div class="flex gap-20 items-center">
          <img src="@/assets/images/icons/history.svg" alt="" />
          <span class="home__drawer_text truncate events-auto">История заказов</span>
        </div>
        <div class="flex gap-20 items-center">
          <img src="@/assets/images/icons/promocode.svg" alt="" />
          <span class="home__drawer_text truncate events-auto">Промокоды</span>
        </div>
        <div class="flex gap-20 items-center">
          <img src="@/assets/images/icons/support.svg" alt="" />
          <span class="home__drawer_text truncate events-auto">Поддержка</span>
        </div>
        <div class="flex gap-20 items-center">
          <img src="@/assets/images/icons/options.svg" alt="" />
          <span class="home__drawer_text truncate events-auto">Параметры</span>
        </div>
        <div class="flex gap-20 items-center">
          <img src="@/assets/images/icons/info.svg" alt="" />
          <span class="home__drawer_text truncate events-auto">О приложении</span>
        </div> -->
      </div>
    </ion-menu>
    <ion-page :id="contentId">
      <ion-menu-toggle>
        <ToggleButton class="absolute events-auto top-20 right-15 w-50 h-50" style="top: 60px">
          <img src="@/assets/images/icons/menu.svg" alt="" />
        </ToggleButton>
      </ion-menu-toggle>
    </ion-page>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonMenuToggle } from '@ionic/vue';
import { ToggleButton } from '@/components/button';
import { ref } from 'vue';
import { profileModel } from '@/entities/profile';
import { menuModel } from '@/entities/menu';
import { useRouter } from 'vue-router';

const props = defineProps({
  contentId: { type: String, default: 'ID' },
});

const profileStore = profileModel();
const menuStore = menuModel();
const router = useRouter();
</script>

<style lang="scss" scoped>
.home {
  &__drawer {
    padding: 70px 20px 0 40px;
    background: #343434;

    &_text {
      color: #fff;
      font-size: 20px;
      font-weight: 400;
    }

    &_number {
      color: #fff;
      font-size: 14px;
      font-weight: 300;
    }
  }

  &__address {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translate(-50%);
    border-radius: 25px;
    background: #eee;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.25);
    width: 177px;
    height: 50px;
    padding: 0 20px;
    z-index: 3;
  }

  &__rotate {
    transform: rotate(180deg);
  }

  &__text {
    color: #343434;
    font-size: 12px;
    font-weight: 400;

    &.bold {
      font-weight: 700;
    }
  }
}
</style>
