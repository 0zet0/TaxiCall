import { reactive } from "vue";
import { io } from "socket.io-client";
import { MessageLogType, consoleLog, getData } from "@/shared/lib";
import { Data } from "@/shared/types";

export const socketStates = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
}) as {
    connected: boolean,
    fooEvents: Array<any>,
    barEvents: Array<any>
};

const URL = 'https://api.server.com/';

export const socket = io(URL, {
    transports: ["websocket"],
    forceNew: true,
    auth: async (cb) => {
        const token = await getData<Data>('token');
        cb({ token: token?.value });
    }
});

socket.on("connect", () => {
    socketStates.connected = true;
    consoleLog('Success [connect]', MessageLogType.Success);
});

socket.on("connect_error", () => {
    setTimeout(() => {
        socket.connect();
    }, 1000);
});

socket.on("disconnect", () => {
    socketStates.connected = false;
    consoleLog('Success [disconnect]', MessageLogType.Success);
});
