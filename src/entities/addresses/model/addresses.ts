import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { Axios } from "@/shared/api";
import { MessageLogType, consoleLog } from "@/shared/lib";
import getParams from "@/shared/lib/get-params";
import getAddress from "@/shared/lib/get-address";
import { createOrderModel } from "@/entities/create-order";

export const useAddressesStore = defineStore("addresses", () => {
    const createOrderStore = createOrderModel();

    const addresses = ref([]);
    const popularAddresses = ref([]);

    const selectedAddresses = ref([]) as Ref<Array<{ id: number | null, city: String, address: String, point?: { lng: number, lat: number } }>>;

    const loading = ref(false);
    const isLoaded = ref(false);
    const popularAddressesIsLoaded = ref(false);
    const searchValue = ref('');
    const lastAddress = ref('') as any;

    const selectAddress = (address: any, idx: number) => {
        selectedAddresses.value[idx] = {
            id: address.id,
            city: getAddress(address, true),
            address: getAddress(address, false),
            point: {
                lat: +address.lat,
                lng: +address.lng,
            },
        };

        if (selectedAddresses.value.length > 1)
            createOrderStore.calculate(selectedAddresses.value);
    };

    const selectAddressByPoint = (point: any, idx: number) => {
        selectedAddresses.value[idx] = {
            id: null,
            city: 'Метка на карте',
            address: '',
            point: { lat: point[0], lng: point[1] },
        };

        if (selectedAddresses.value.length > 1)
            createOrderStore.calculate(selectedAddresses.value);
    };

    async function fetchAddresses(search: string) {
        try {
            loading.value = true;
            searchValue.value = search;

            const params = getParams({ search });

            const response = await Axios.post(`/mob-app/orders/search-addresses`, null, params);

            addresses.value = await response.data.result;

            loading.value = false;
            isLoaded.value = true;
            consoleLog('Success [fetchAddresses]', MessageLogType.Success);
        } catch (error: any) {
            consoleLog(`Error [fetchAddresses]: ${error}`, MessageLogType.Error);
            loading.value = false;
        }
    }

    async function fetchPopularAddresses() {
        if (popularAddressesIsLoaded.value)
            return;

        try {
            loading.value = true;

            const response = await Axios.get(`/mob-app/popular-addresses`);

            popularAddresses.value = await response.data.result;

            loading.value = false;
            popularAddressesIsLoaded.value = true;
            consoleLog('Success [fetchPopularAddresses]', MessageLogType.Success);
        } catch (error: any) {
            consoleLog(`Error [fetchPopularAddresses]: ${error}`, MessageLogType.Error);
            loading.value = false;
        }
    }

    async function getAddressByPoint(lng: string | number, lat: string | number) {
        try {
            loading.value = true;

            const params = getParams({ lng, lat });

            const response = await Axios.post(`/get-address-by-point`, null, params);

            loading.value = false;
            consoleLog('Success [getAddressByPoint]', MessageLogType.Success);

            return await response.data.result;
        } catch (error: any) {
            consoleLog(`Error [getAddressByPoint]: ${error}`, MessageLogType.Error);
            loading.value = false;

            return null;
        }
    }

    return {
        loading,
        addresses,
        isLoaded,
        selectedAddresses,
        popularAddresses,
        lastAddress,
        fetchAddresses,
        fetchPopularAddresses,
        getAddressByPoint,
        selectAddress,
        selectAddressByPoint
    };
});