import { createOrderModel } from "@/entities/create-order";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { useRouter } from "vue-router";

export const useMenuStore = defineStore("menu", () => {
    const toggle = ref((state: boolean) => { });
    const show = ref(true);
    const showMenu = ref(false);
    const isMounted = ref(false);
    const showMyAddress = ref(true);
    const pagesHistories = ref([]) as Ref<Array<string>>;
    const activeSliders = ref(0);
    const router = useRouter();
    const createOrderStore = createOrderModel();

    const showPage = (route: string, pushPath: boolean = true, tryClear: boolean = false) => {
        if (!pagesHistories.value.includes(router.currentRoute.value.path) && pushPath)
            pagesHistories.value.push(router.currentRoute.value.path);

        if (tryClear)
            pagesHistories.value = []

        router.replace(route);
    }

    const backPage = () => {
        while (pagesHistories.value.length > 0) {
            const path = pagesHistories.value.pop();
            if (path === router.currentRoute.value.path)
                continue;

            if (!path) {
                if (createOrderStore.activeOrders.length > 0)
                    showPage('active-order', false, true);
                else
                    showPage('home', false, true);
            }
            else
                router.replace(path);

            return;
        }

        if (createOrderStore.activeOrders.length > 0)
            showPage('active-order', false, true);
        else
            showPage('home', false, true);
    }

    return {
        toggle,
        show,
        showMenu,
        isMounted,
        showMyAddress,
        activeSliders,
        showPage,
        backPage
    };
});