import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import {
  IonContent, IonicVue, IonPage, IonApp, IonRouterOutlet,
  IonHeader, IonTitle, IonToolbar, IonModal, IonRippleEffect,
  IonToast, IonAvatar, IonProgressBar, IonAlert
} from '@ionic/vue';

import OpenLayersMap from "vue3-openlayers";

import "vue3-openlayers/styles.css";

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import '@/assets/styles/index.scss';

import 'swiper/css';

/* Theme variables */
// import './theme/variables.css';
// import './theme/dark.css';
// import './theme/default.css';
import { store } from './store';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(OpenLayersMap)
  .use(store);

app.component('ion-content', IonContent);
app.component('ion-page', IonPage);
app.component('ion-app', IonApp);
app.component('ion-header', IonHeader);
app.component('ion-title', IonTitle);
app.component('ion-toolbar', IonToolbar);
app.component('ion-router-outlet', IonRouterOutlet);
app.component('ion-modal', IonModal);
app.component('ion-ripple-effect', IonRippleEffect);
app.component('ion-toast', IonToast);
app.component('ion-avatar', IonAvatar);
app.component('ion-progress-bar', IonProgressBar);
app.component('ion-alert', IonAlert);

router.isReady().then(() => {
  app.mount('#app');
});