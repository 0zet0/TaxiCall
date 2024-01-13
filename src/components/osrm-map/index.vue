<template>
  <div id="map" class="map" style="height: 100vh; width: 100vw"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useMapControllerStore } from '@/entities/map-controller';
import useGetIcon from '@/shared/lib/get-icon';
import { getFullTimeText } from '@/shared/lib';

import { addressesModel } from '@/entities/addresses';
import getAddress from '@/shared/lib/get-address';
import { createOrderModel } from '@/entities/create-order';
import { Geolocation } from '@capacitor/geolocation';
// @ts-ignore
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';

const addressesStore = addressesModel();
const mapController = useMapControllerStore();
const createOrderStore = createOrderModel();

const time = ref<Number | String>(0);
const isMounted = ref(false);
const marker = ref();
const centerMarker = ref();
const zoomSatrted = ref(false);

const map = ref();

const routerController = ref();

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

const initializeRoute = () => {
  if (routerController.value) return;

  const satrtIcon = L.icon({
    iconUrl: useGetIcon('start', 'icons', 'svg'),
    iconSize: [18, 95],
  });

  const endIcon = L.icon({
    iconUrl: useGetIcon('end', 'icons', 'svg'),
    iconSize: [18, 95],
  });
  // @ts-ignore
  routerController.value = L.Routing.control({
    waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
    routeWhileDragging: false,
    show: false,
    units: 'imperial',
    addWaypoints: false,
    fitSelectedRoutes: false,
    serviceUrl: 'https://router.project-osrm.org/route/v1',
    lineOptions: {
      styles: [
        { color: '#9BE6F9', opacity: 1, weight: 9 },
        { color: '#00CCFF', opacity: 1, weight: 3 },
      ],
    },
    // @ts-ignore
    // router: L.Routing.graphHopper('e0cf0adb-0cd7-4a68-8905-08d32cd4076e'),
    createMarker: function (i: number, wp: any) {
      if (i === 0) {
        return L.marker(wp.latLng, {
          icon: satrtIcon,
        });
      } else {
        return L.marker(wp.latLng, {
          icon: endIcon,
        });
      }
    },
  }).addTo(map.value);

  routerController.value.on('routesfound', (e: any) => {
    const routes = e.routes;
    const summary = routes[0].summary;
    console.log(
      'Total distance is ' +
        summary.totalDistance / 1000 +
        ' km and total time is ' +
        Math.round((summary.totalTime % 3600) / 60) +
        ' minutes'
    );
  });
};

const setCenterMarker = () => {
  const center = map.value.getCenter();

  const point = map.value.latLngToContainerPoint(center);

  const newPoint = L.point([point.x, point.y - 16]);

  const newLatLng = map.value.containerPointToLatLng(newPoint);

  centerMarker.value.setLatLng(newLatLng);
};

const animateMarker = (timestamp: number) => {
  setCenterMarker();
  if (zoomSatrted.value) window.requestAnimationFrame(animateMarker);
};

mapController.setCenter = async () => {
  if (!isMounted.value) {
    await checkAppPermissions();
    return;
  }

  const location = await Geolocation.getCurrentPosition();

  if (!location) return;

  const latLng = L.latLng(location.coords.latitude, location.coords.longitude);

  marker.value.setLatLng(latLng);
  map.value.setView(latLng, map.value.getZoom(), { animation: true });
};

mapController.drawRoutes = () => {
  if (!mapController.tryDrawRoute) return;

  const points = [];

  for (const address of addressesStore.selectedAddresses) {
    if (address?.point) {
      points.push(L.latLng(address.point.lat, address.point.lng));
    }
  }

  routerController.value.setWaypoints(points);
};

mapController.clearRoutes = () => {
  routerController.value.setWaypoints([]);
};

mapController.drawActiveOrderRoutes = () => {
  if (!mapController.tryDrawRoute) return;

  const from_address = createOrderStore.selectedActiveOrders?.from_address;
  if (!from_address) return;

  const points = [];

  points.push(L.latLng(from_address.lat, from_address.lng));

  const to_addresses = createOrderStore.selectedActiveOrders?.to_addresses;
  if (!to_addresses) return;

  for (const address of to_addresses) {
    if (address) {
      points.push(L.latLng(address.lat, address.lng));
    }
  }

  routerController.value.setWaypoints(points);
};

watch(
  () => mapController.showMarker,
  (v) => {
    if (v) {
      if (!map.value.hasLayer(centerMarker.value)) {
        map.value.addLayer(centerMarker.value);
      }
    } else {
      if (map.value.hasLayer(centerMarker.value)) {
        map.value.removeLayer(centerMarker.value);
      }
    }
  }
);

onMounted(() => {
  map.value = L.map('map', {
    zoomControl: false,
  });

  centerMarker.value = L.marker([57.74, 11.94], {
    icon: L.icon({
      iconUrl: useGetIcon('center-marker', 'icons', 'svg'),
      iconSize: [58, 95],
    }),
  });

  if (mapController.showMarker) map.value.addLayer(centerMarker.value);

  centerMarker.value.setZIndexOffset(1000);

  map.value.on('load', () => {
    setCenterMarker();
  });

  map.value.setView([40.28738283396792, 69.61624145507814], 10);

  map.value.setMinZoom(8);
  map.value.setMaxZoom(18);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map.value);

  const icon = L.icon({
    iconUrl: useGetIcon('gps', 'icons', 'svg'),
    iconSize: [58, 95],
  });

  marker.value = L.marker([57.74, 11.94], { icon: icon }).addTo(map.value);

  map.value.on('move', () => {
    setCenterMarker();
  });
  map.value.on('viewreset', () => {
    setCenterMarker();
  });
  map.value.on('zoomstart', () => {
    zoomSatrted.value = true;
    window.requestAnimationFrame(animateMarker);
  });
  map.value.on('zoomend', () => {
    zoomSatrted.value = false;
  });
  map.value.on('moveend', async () => {
    if (!mapController.showMarker) return;

    const point = map.value.getCenter();
    if (!point) return;

    const address = await addressesStore.getAddressByPoint(point.lng, point.lat);
    if (address) {
      addressesStore.selectAddress(address, createOrderStore.activateInput);
    } else {
      addressesStore.selectAddressByPoint([point.lat, point.lng], createOrderStore.activateInput);
    }
    if (createOrderStore.activateInput === 0) {
      addressesStore.lastAddress = addressesStore.selectedAddresses[createOrderStore.activateInput].city;
      createOrderStore.meetingInfo = '';
    }

    mapController.drawRoutes();
  });

  L.control
    .zoom({
      position: 'topright',
    })
    .addTo(map.value);

  initializeRoute();
});
</script>

<style lang="scss" scoped>
.marker {
  position: absolute;
  left: -20px;
  top: 0;
  transition: 0.5s;
}

.mapp {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
<style>
.leaflet-routing-container,
.leaflet-control-attribution {
  display: none;
}

.leaflet-control-zoom-in,
.leaflet-control-zoom-out {
  font: bold 18px 'Lucida Console', Monaco, monospace;
  text-indent: 1px;
  border-radius: 50% !important;
}
.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
  border: none;
}
.leaflet-control-zoom-out {
  margin-top: 10px;
}
.leaflet-touch .leaflet-bar a {
  width: 50px;
  height: 50px;
  line-height: 47px;
}
.leaflet-top {
  top: 50%;
  transform: translateY(-50%);
}
.leaflet-control {
  margin: 0 !important;
  margin-right: 15px !important;
}
.leaflet-touch .leaflet-control-zoom-in {
  font-size: 22px;
}
.leaflet-touch .leaflet-control-zoom-out {
  font-size: 24px;
}
</style>
