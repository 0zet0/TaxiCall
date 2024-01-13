import { menuModel } from "@/entities/menu";
import { Axios } from "@/shared/api";
import { MessageLogType, consoleLog } from "@/shared/lib";
import getParams from "@/shared/lib/get-params";
import { socket } from "@/socket";
import { defineStore } from "pinia";
import { Ref, ref, watch } from "vue";

export const useCreateOrderStore = defineStore("createOrder", () => {
    const vehicles = ref([]) as Ref<Array<any>>;
    const selectedVehicle = ref({}) as any;
    const activeOrders = ref([]) as Ref<Array<any>>;
    const selectedActiveOrders = ref({}) as Ref<any>;

    const loading = ref(false);
    const isLoaded = ref(false);
    const comment = ref('');
    const phoneNumber = ref('');
    const orderTime = ref('');
    const activateInput = ref(0);
    const showTarifInfo = ref(false);
    const modalEl = ref();
    const meetingInfo = ref('');

    const menuStore = menuModel();

    socket.on('client-mob-app:orders', async () => {
        await fetchActiveOrders();
    });
    socket.on('client-mob-app:cancel-orders', async () => {
        await fetchActiveOrders();
    });
    socket.on('client-mob-app:complete-orders', async () => {
        await fetchActiveOrders();
    });

    watch(() => activeOrders.value.length, (v: number) => {
        if (v === 0)
            menuStore.showPage('home', false, true);
    })

    async function getTariffs() {
        try {
            loading.value = true;

            const response = await Axios.get('/orders/tariffs');

            vehicles.value = await response.data.result;

            loading.value = false;
            isLoaded.value = true;
            consoleLog('Success [getTariffs]', MessageLogType.Success);
        } catch (error: any) {
            consoleLog(`Error [getTariffs]: ${error}`, MessageLogType.Error);
            loading.value = false;
        }
    }

    async function calculate(addresses: Array<any>) {
        try {
            loading.value = true;

            const tariff_ids = JSON.stringify(vehicles.value.map(v => ({ tariff_id: v.id })));
            const search_address_id = addresses[0]?.id
            const to_addresses = JSON.stringify(addresses.slice(1).map(a => ({ search_address_id: a.id })));

            const params = getParams({ tariff_ids, search_address_id, to_addresses });

            const response = await Axios.post('/orders/calculate', null, params);

            const tariffs = await response.data.result;
            for (const tariff of tariffs) {
                const idx = vehicles.value.findIndex(i => i.id === tariff.tariff_id);
                if (idx === -1)
                    continue;

                vehicles.value[idx].min_price = tariff.amount;
            }

            loading.value = false;
            consoleLog('Success [calculate]', MessageLogType.Success);
        } catch (error: any) {
            consoleLog(`Error [calculate]: ${error}`, MessageLogType.Error);
            loading.value = false;
        }
    }

    async function createNewOrder(addresses: Array<any>) {
        try {
            loading.value = true;

            const dop_phone = phoneNumber.value;
            const search_address_id = addresses[0]?.id;
            const to_addresses = JSON.stringify(addresses.slice(1).filter(i => i.id).map(a => ({ search_address_id: a.id })));
            const tariff_id = selectedVehicle.value.id;
            const date_time = orderTime.value;
            let from_address = null;
            if (addresses[0]?.point)
                from_address = JSON.stringify(addresses[0]?.point)

            const params = getParams({
                dop_phone,
                search_address_id,
                to_addresses,
                comment: comment.value,
                tariff_id,
                meeting_info: meetingInfo.value,
                date_time,
                from_address
            });

            const response = await Axios.post('/orders', null, params);
            if (response.status !== 200)
                throw new Error("Bad request");

            loading.value = false;
            consoleLog('Success [createNewOrder]', MessageLogType.Success);

            return true;
        } catch (error: any) {
            consoleLog(`Error [createNewOrder]: ${error}`, MessageLogType.Error);
            loading.value = false;

            return false;
        }
    }

    async function fetchActiveOrders() {
        try {
            loading.value = true;

            const response = await Axios.get('/orders/active');

            activeOrders.value = await response.data.result;

            loading.value = false;
            consoleLog('Success [fetchActiveOrders]', MessageLogType.Success);
        } catch (error: any) {
            consoleLog(`Error [fetchActiveOrders]: ${error}`, MessageLogType.Error);
            loading.value = false;
        }
    }

    async function cancelOrders(orderId: number) {
        try {
            loading.value = true;

            const params = getParams({
                order_id: orderId,
                reason_cancel_order: 'x'
            });

            await Axios.post('/orders/cancel', null, params);

            loading.value = false;
            
            const idx = activeOrders.value.findIndex(i => i.id === orderId);
            if (idx !== -1)
                activeOrders.value.splice(idx, 1);

            consoleLog('Success [cancelOrders]', MessageLogType.Success);
            return true;
        } catch (error: any) {
            consoleLog(`Error [cancelOrders]: ${error}`, MessageLogType.Error);
            loading.value = false;
            return false;
        }
    }

    async function connectClientPerformer(orderId: number) {
        try {
            loading.value = true;

            await Axios.post('/orders/connect-client-performer/' + orderId);

            loading.value = false;
            consoleLog('Success [connectClientPerformer]', MessageLogType.Success);
            return true;
        } catch (error: any) {
            consoleLog(`Error [connectClientPerformer]: ${error}`, MessageLogType.Error);
            loading.value = false;
            return false;
        }
    }



    return {
        loading,
        isLoaded,
        vehicles,
        comment,
        phoneNumber,
        orderTime,
        activateInput,
        selectedVehicle,
        activeOrders,
        selectedActiveOrders,
        showTarifInfo,
        modalEl,
        meetingInfo,
        fetchActiveOrders,
        createNewOrder,
        getTariffs,
        calculate,
        cancelOrders,
        connectClientPerformer
    };
});