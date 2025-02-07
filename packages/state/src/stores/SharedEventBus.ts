import { makeAutoObservable } from "mobx";
import { EventBus } from "@scada/common";
import { AppStore } from "./AppStore";

export class SharedEventBus {
    private store: AppStore;

    readonly eventBus: EventBus;

    constructor(store: AppStore) {
        this.store = store;

        this.eventBus = new EventBus();

        makeAutoObservable(this);
    }
}
