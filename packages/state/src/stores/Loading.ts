import { makeAutoObservable } from "mobx";
import { AppStore } from "./AppStore";

export class Loading {
    private isLoading: boolean;
    private progressLoading: number;

    private store: AppStore;
    constructor(store: AppStore) {
        this.store = store;
        makeAutoObservable(this);
        this.isLoading = false;
        this.progressLoading = 0;
    }

    start() {
        this.isLoading = true;
    }

    finish() {
        this.isLoading = false;
    }

    setProgress(value: number) {
        this.progressLoading = value;
    }

    get state(): boolean {
        return this.isLoading;
    }

    get progress(): number {
        return this.progressLoading;
    }
}
