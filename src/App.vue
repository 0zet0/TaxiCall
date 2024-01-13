<template>
  <ion-app id="parent" style="--overflow: hidden">
    <transition name="top-in">
      <div v-if="menuStore.show" style="z-index: 40000" class="w-full absolute --center h-05 bottom-0 left-0">
        <div class="footer">
          <CreateOrderFooter v-if="router.currentRoute.value.name === 'CreateOrderPage'" />
          <ActiveOrderFooter v-else-if="router.currentRoute.value.name === 'ActiveOrderPage'" />
        </div>
      </div>
    </transition>
    <div v-show="mapController.show" style="z-index: 1" class="absolute bottom-0 left-0 size-full">
      <OsrmMap class="size-full" />
    </div>
    <transition name="fade" appear>
      <MainMenu
        v-if="menuStore.showMenu"
        style="z-index: 20004"
        class="absolute bottom-0 left-0 size-full"
        ref="menu"
        content-id="create-order-page"
      />
    </transition>
    <transition name="top-in" appear>
      <SplashScreen v-if="showSplashScreen" />
    </transition>
    <ion-router-outlet style="--overflow: hidden" />
  </ion-app>
</template>
<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import { profileModel } from '@/entities/profile';
import { menuModel } from '@/entities/menu';
import { useMapControllerStore } from '@/entities/map-controller';
import { getData } from './shared/lib';
import { Axios } from './shared/api';
import { Data } from './shared/types';
import { RouteMeta, useRouter } from 'vue-router';
import { App } from '@capacitor/app';

import { CreateOrderFooter, ActiveOrderFooter } from '@/components/footer';
import { OsmMap } from '@/components/osm-map';
import { OsrmMap } from '@/components/osrm-map';
import { MainMenu } from '@/components/menu';
import { SplashScreen } from '@/views/splash-screen';
import { createOrderModel } from './entities/create-order';

import { socket } from '@/socket';
import { useBackButton } from '@ionic/vue';

const profileStore = profileModel();
const menuStore = menuModel();
const mapController = useMapControllerStore();
const createOrderStore = createOrderModel();

const router = useRouter();

const isShowLoader = ref(false);
const showSplashScreen = ref(true);

App.addListener('backButton', () => menuStore.backPage());

async function init() {
  menuStore.showPage('default-page', false, true);

  const token = await getData<Data>('token');
  if (!token || !token.value) {
    menuStore.showPage('auth', false, true);
    showSplashScreen.value = false;
    return;
  }

  socket.connect();

  Axios.defaults.headers.common = {
    Authorization: 'Bearer ' + token.value,
  };

  if (!profileStore.isLoaded) await profileStore.getProfile();

  menuStore.showMenu = true;

  await createOrderStore.fetchActiveOrders();

  showSplashScreen.value = false;

  if (createOrderStore.activeOrders.length > 0) return menuStore.showPage('active-order', false, true);

  menuStore.showPage('home', false, true);
}

const getTransitionName = (transitionMeta: RouteMeta) => {
  if (transitionMeta && typeof transitionMeta === 'object' && transitionMeta.transition && typeof transitionMeta.transition === 'string') {
    return transitionMeta.transition;
  }
  return 'fade';
};

router.beforeEach(() => {
  isShowLoader.value = true;
});
router.afterEach(() => {
  isShowLoader.value = false;
});

init();
</script>

<style lang="scss">
main {
  --overflow: hidden;
}

.picker-highlight {
  --wheel-highlight-background: #f5f4f2;
}

ion-modal {
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  --backdrop-opacity: var(--ion-backdrop-opacity, 0.32);
  --border-radius: 30px;
  --overflow: initial;
}

ion-menu {
  --width: calc(100% - 30px);
  --max-width: 340px;
}

.footer {
  width: 100%;
}

@media only screen and (min-width: 1168px) {
  ion-router-outlet {
    width: 600px;
    margin: 0 auto;
  }
}

@media only screen and (min-width: 768px) {
  .footer {
    width: 600px;
  }
}

.modal-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 30px;
  width: 100%;
  background: #fff;
}
</style>
