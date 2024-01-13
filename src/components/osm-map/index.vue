<template>
  <ol-map class="map" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" :controls="[]" ref="map">
    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-geolocation v-if="isMounted" :projection="projection" @change:position="geoLocChange" ref="geolocation">
      <template>
        <ol-vector-layer :zIndex="2">
          <ol-source-vector>
            <ol-feature ref="positionFeature">
              <ol-geom-point :coordinates="position"></ol-geom-point>
              <ol-style>
                <ol-style-icon :src="useGetIcon('gps', 'icons', 'svg')" :scale="1"></ol-style-icon>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </template>
    </ol-geolocation>
    <ol-overlay v-if="isMounted && mapController.showMarker && time" :position="markerPos">
      <div class="relative">
        <transition name="bounce" appear>
          <div v-show="!animate" class="map__time --center">
            <span class="map__time__text">{{ time }}</span>
            <svg class="map__time__arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="4" viewBox="0 0 12 4" fill="none">
              <path d="M5.99995 4L0 0L12 0L5.99995 4Z" fill="#343434" />
            </svg>
          </div>
        </transition>
        <svg
          class="marker"
          :style="{ transform: `translate3d(0, -${animate ? transform : 35}px, 0)` }"
          width="40"
          height="47"
          viewBox="0 0 40 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect opacity="0.01" width="40" height="40" fill="white" />
          <path
            d="M20.0217 38.7281C22.3249 38.7281 24.192 36.861 24.192 34.5578C24.192 32.2548 22.3249 30.3877 20.0217 30.3877C17.7186 30.3877 15.8516 32.2548 15.8516 34.5578C15.8516 36.861 17.7186 38.7281 20.0217 38.7281Z"
            fill="#3E4958"
          />
          <path
            fill-rule="evenodd"
            d="M20.022 31.4137C18.2853 31.4137 16.8775 32.8215 16.8775 34.5582C16.8775 36.2949 18.2853 37.7027 20.022 37.7027C21.7587 37.7027 23.1665 36.2949 23.1665 34.5582C23.1665 32.8215 21.7587 31.4137 20.022 31.4137ZM14.8262 34.5582C14.8262 31.6886 17.1524 29.3623 20.022 29.3623C22.8916 29.3623 25.2179 31.6886 25.2179 34.5582C25.2179 37.4278 22.8916 39.754 20.022 39.754C17.1524 39.754 14.8262 37.4278 14.8262 34.5582Z"
            fill="#FDFDFD"
          />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.0107 21.9517H20.8707V33.8218H19.0107V21.9517Z" fill="#3E4958" />
          <path
            d="M20.0222 22.4642C26.0103 22.4642 30.8647 17.61 30.8647 11.6218C30.8647 5.63365 26.0103 0.779297 20.0222 0.779297C14.034 0.779297 9.17969 5.63365 9.17969 11.6218C9.17969 17.61 14.034 22.4642 20.0222 22.4642Z"
            fill="#343434"
          />
          <path
            fill-rule="evenodd"
            d="M20.0223 1.29218C14.3174 1.29218 9.69263 5.91694 9.69263 11.6219C9.69263 17.3267 14.3174 21.9515 20.0223 21.9515C25.7273 21.9515 30.3519 17.3267 30.3519 11.6219C30.3519 5.91694 25.7273 1.29218 20.0223 1.29218ZM8.66699 11.6219C8.66699 5.35055 13.7509 0.266602 20.0223 0.266602C26.2937 0.266602 31.3777 5.35055 31.3777 11.6219C31.3777 17.8933 26.2937 22.9772 20.0223 22.9772C13.7509 22.9772 8.66699 17.8933 8.66699 11.6219Z"
            fill="#343434"
          />
          <path
            d="M20.0227 14.9585C21.8651 14.9585 23.3589 13.4647 23.3589 11.6223C23.3589 9.77977 21.8651 8.28613 20.0227 8.28613C18.1802 8.28613 16.6865 9.77977 16.6865 11.6223C16.6865 13.4647 18.1802 14.9585 20.0227 14.9585Z"
            fill="#F9FFFF"
          />
        </svg>
      </div>
    </ol-overlay>
  </ol-map>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Geolocation as GeolocationOsm, Map, View } from 'ol';
import type { ObjectEvent } from 'ol/Object';
import { useMapControllerStore } from '@/entities/map-controller';
import useGetIcon from '@/shared/lib/get-icon';
import { getDistance } from 'ol/sphere';
import { getFullTimeText } from '@/shared/lib';

import { addressesModel } from '@/entities/addresses';
import getAddress from '@/shared/lib/get-address';
import { createOrderModel } from '@/entities/create-order';
import { Geolocation } from '@capacitor/geolocation';

const addressesStore = addressesModel();
const mapController = useMapControllerStore();
const createOrderStore = createOrderModel();

const center = ref([69.61851723482943, 40.28762123915877]);
const projection = ref('EPSG:4326');
const zoom = ref(12);
const rotation = ref(0);
const view = ref<View>();
const map = ref<Map>() as any;
const position = ref([]) as any;
const geolocation = ref<{ geoLoc: GeolocationOsm }>();
const markerPos = ref([0, 0]) as any;
const animate = ref(false);
const transform = ref(35);
const time = ref<Number | String>(0);
const isMounted = ref(false);

const geoLocChange = (event: ObjectEvent) => {
  position.value = event.target.getPosition();
  // const oldCenter = view.value?.getCenter();

  // if (!oldCenter || !position.value) return;

  // view.value?.setCenter(oldCenter);
  // view.value?.animate({ center: position.value });
};

const setTimeDistance = () => {
  if (!isMounted.value) {
    return;
  }

  const geoLocation = geolocation.value?.geoLoc;
  const locationSpeed = geoLocation?.getSpeed() || 0;
  const speed = locationSpeed < 40 / 3.6 ? 40 / 3.6 : locationSpeed;

  const minutes = getDistance(position.value, markerPos.value) / (speed * 60) || 0;

  time.value = getFullTimeText(minutes);
};

const checkAppPermissions = async () => {
  const permissions = await Geolocation.checkPermissions();
  if (permissions.location === 'granted') {
    isMounted.value = true;
  } else if (permissions.coarseLocation === 'granted') {
    isMounted.value = true;
  } else {
    const status = await Geolocation.requestPermissions();
    if (status.location === 'granted') {
      isMounted.value = true;
    } else if (status.coarseLocation === 'granted') {
      isMounted.value = true;
    }
  }
};

mapController.setCenter = async () => {
  if (!isMounted.value) {
    await checkAppPermissions();
    return;
  }

  const geoLocation = geolocation.value?.geoLoc;
  const newCenter = geoLocation?.getPosition();
  const oldCenter = view.value?.getCenter();

  if (!oldCenter || !newCenter) return;

  view.value?.setCenter(oldCenter);
  view.value?.animate({ center: newCenter });
  position.value = newCenter;
};

onMounted(() => {
  let start: number = 0;

  const animateMarker = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;

    if (!animate.value) return (start = 0);

    if (progress - 500 > 0) {
      start = timestamp;

      transform.value = transform.value === 45 ? 35 : 45;
    }

    window.requestAnimationFrame(animateMarker);
  };

  const mapInstance = map.value?.map;
  if (!mapInstance) return;

  mapInstance.on('postrender', () => {
    const pos = view.value?.getCenter();

    if (!pos) return;

    markerPos.value = pos;
    transform.value = 35;
  });

  mapInstance.on('movestart', () => {
    animate.value = true;

    if (mapController.showMarker) window.requestAnimationFrame(animateMarker);
  });

  mapInstance.on('moveend', async () => {
    animate.value = false;

    setTimeDistance();

    if (!mapController.showMarker) return;

    const point = view.value?.getCenter();
    if (!point) return;

    const address = await addressesStore.getAddressByPoint(point[0], point[1]);
    if (address) {
      addressesStore.selectAddress(address, createOrderStore.activateInput);
    } else {
      addressesStore.selectAddressByPoint(point, createOrderStore.activateInput);
    }
    
    if (createOrderStore.activateInput === 0) {
      addressesStore.lastAddress = addressesStore.selectedAddresses[createOrderStore.activateInput].city;
      createOrderStore.meetingInfo = '';
    }
  });
});
</script>

<style lang="scss" scoped>
.marker {
  position: absolute;
  left: -20px;
  top: 0;
  transition: 0.5s;
}

.map {
  &__time {
    position: relative;
    left: -50%;
    top: -70px;
    min-width: 70px;
    padding: 0 10px;
    height: 29px;
    border-radius: 25px;
    background-color: #343434;
    transform-origin: center bottom;

    &__arrow {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -4px;
    }

    &__text {
      color: #fff;
      text-align: center;
      font-family: Inter;
      font-size: 13px;
      font-weight: 700;
    }
  }
}
</style>
