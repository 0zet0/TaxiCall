import { defineStore } from "pinia";
import { ref } from "vue";
import { Axios } from "@/shared/api";
import { MessageLogType, consoleLog, setData } from "@/shared/lib";
import { Data } from "@/shared/types";
import getParams from "@/shared/lib/get-params";
import { socket } from "@/socket";

export const useProfileStore = defineStore("profile", () => {
    const profile = ref({}) as any;
    const authData = ref({
        client_register_id: "",
        sms_code: "",
        access_token: "",
        phoneNumber: ""
    });
    const loading = ref(false);
    const isLoaded = ref(false);
    const isLogged = ref(false);

    async function getProfile() {
        try {
            isLogged.value = false;
            loading.value = true;

            const response = await Axios.get('/profile');

            profile.value = await response.data.result;

            loading.value = false;
            isLoaded.value = true;
            isLogged.value = true;
            consoleLog('Success [loadProfile]', MessageLogType.Success);
        } catch (error: any) {
            consoleLog(`Error [loadProfile]: ${error}`, MessageLogType.Error);
            loading.value = false;
            isLogged.value = false;
        }
    }

    async function sendPhoneNumber(phoneNumber: string) {
        try {
            loading.value = true;

            const params = getParams({
                phone_number: phoneNumber
            });

            const response = await Axios.post(`/auth/client-registers`, null, params);

            authData.value = { ...authData.value, ...await response.data.result };

            loading.value = false;
            authData.value.phoneNumber = phoneNumber;
            consoleLog('Success [sendPhoneNumber]', MessageLogType.Success);
            return true;
        } catch (error: any) {
            consoleLog(`Error [sendPhoneNumber]: ${error}`, MessageLogType.Error);
            loading.value = false;
            return false;
        }
    }

    async function sendPincode(smsCode: String) {
        try {
            loading.value = true;

            const { client_register_id } = authData.value;

            const params = getParams({
                client_register_id,
                sms_code: smsCode
            });

            const response = await Axios.post(`auth/client-registers/2`, null, params);

            authData.value = { ...authData.value, ...await response.data.result };

            loading.value = false;
            await setData<Data>('token', { value: authData.value.access_token })
            consoleLog('Success [sendPincode]', MessageLogType.Success);
            return true;
        } catch (error: any) {
            consoleLog(`Error [sendPincode]: ${error}`, MessageLogType.Error);
            loading.value = false;
            return false;
        }
    }

    async function logout() {
        try {
            loading.value = true;

            // const response = await Axios.get('/profile');

            await setData('token', { value: null })

            // profile.value = await response.data.result;

            socket.disconnect()

            loading.value = false;
            isLoaded.value = true;
            isLogged.value = false;
            consoleLog('Success [logout]', MessageLogType.Success);
        } catch (error: any) {
            consoleLog(`Error [logout]: ${error}`, MessageLogType.Error);
            loading.value = false;
        }
    }

    async function updateProfile(first_name: String, last_name: String) {
        try {
            loading.value = true;

            const params = getParams({
                first_name,
                last_name
            });

            await Axios.post(`/profile`, null, params);

            profile.value.first_name = first_name
            profile.value.last_name = last_name

            loading.value = false;
            consoleLog('Success [updateProfile]', MessageLogType.Success);
            return true;
        } catch (error: any) {
            consoleLog(`Error [updateProfile]: ${error}`, MessageLogType.Error);
            loading.value = false;
            return false;
        }
    }

    return {
        getProfile,
        sendPhoneNumber,
        sendPincode,
        logout,
        updateProfile,
        loading,
        profile,
        authData,
        isLoaded,
        isLogged
    };
});