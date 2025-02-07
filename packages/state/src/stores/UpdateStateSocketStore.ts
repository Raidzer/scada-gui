import { ISocketStateUpdate } from "@scada/common";
import { Client, StompSubscription } from "@stomp/stompjs";
import { AppStore } from "./AppStore";

export class UpdateStateSocketStore {
    private _store: AppStore;
    private _client: Client | null;
    private _isConnected: boolean;
    private _debug: boolean;
    private _subscribe: StompSubscription | null;
    private _topic: string;

    constructor(store: AppStore) {
        this._store = store;
        this._client = null;
        this._isConnected = false;
        this._debug = false;
        this._subscribe = null;
        this._topic = "";
    }

    private _debugSocket(msg: string) {
        if (this._debug) {
            console.log(`log socket: ${msg}`);
        }
    }

    private _disconnectSocket() {
        console.log("disconnect socket");
        this._client?.deactivate();
        this._client = null;
        this._isConnected = false;
    }

    private _unsubscribeTopic() {
        this._subscribe?.unsubscribe();
        this._subscribe = null;
        this._topic = "";
    }

    connectToUpdateStateSocket(brokerURL: string, initialTopic: string, debug?: boolean) {
        if (debug) {
            this._debug = true;
        }
        if (!this._client) {
            this._client = new Client({
                brokerURL,
                debug: (msg) => {
                    this._debugSocket(msg);
                },
                onConnect: () => {
                    this._isConnected = true;
                    this._topic = initialTopic;
                    this.subscribeToUpdateStateTopic(this._topic);
                },
                reconnectDelay: 5000,
            });
            this._client.activate();
        }
    }

    subscribeToUpdateStateTopic(topic: string) {
        if (!this._client || !this._isConnected) return;
        if (this._subscribe) {
            this._unsubscribeTopic();
        }
        this._topic = topic;

        const subscribe = this._client.subscribe(this._topic, (message) => {
            const dataUpdate: ISocketStateUpdate[] = JSON.parse(message.body);
            if (localStorage.getItem("websocketDebug") === "true") console.table(dataUpdate);
            dataUpdate.forEach((state) => {
                this._store.viewerSelectProject.allPlans.forEach((plan) => {
                    plan.updateActiveStateEntities(state);
                });
            });
        });
        this._subscribe = subscribe;
    }
}
