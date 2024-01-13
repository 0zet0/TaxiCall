import { defineStore } from "pinia";
import { ref } from "vue";

export const useMapControllerStore = defineStore("mapController", () => {
    const show = ref(true);
    const showMarker = ref(false);
    const tryDrawRoute = ref(false);

    const setCenter = ref(() => { });
    const drawRoutes = ref(() => { });
    const drawActiveOrderRoutes = ref(() => { });
    const clearRoutes = ref(() => { });

    return {
        show,
        showMarker,
        setCenter,
        drawRoutes,
        tryDrawRoute,
        clearRoutes,
        drawActiveOrderRoutes
    };
});