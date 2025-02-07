import {
    BaseEntity,
    IBaseStateOption,
    ISocketStateUpdate,
    PlanModel,
    socketTopic,
} from "@scada/common";
import { makeAutoObservable, observable, reaction } from "mobx";
import { AppStore } from "./AppStore";

export class ViewerSelectPlanStore {
    private _isLoading: boolean;
    private _store: AppStore;

    selectPlan: PlanModel | null = null;
    entitiesAllList: BaseEntity<IBaseStateOption>[] = [];

    constructor(store: AppStore) {
        this._store = store;
        this._isLoading = true;
        makeAutoObservable(this, {
            entitiesAllList: observable,
        });

        reaction(
            () => this.selectPlan?.visibilityEntities,
            (entities) => {
                if (entities) {
                    this.entitiesAllList = entities;
                }
            },
        );
    }

    private _clearEntitiesList() {
        this.selectPlan = null;
        this.entitiesAllList = [];
    }

    getFirstPlan(): PlanModel | null {
        return this._store.viewerSelectProject.firstPlan;
    }

    selectFirstPlan(): void {
        this.setStartLoading();
        const firstPlan = this.getFirstPlan();
        this.selectPlan = firstPlan;
        if (firstPlan) {
            const entitiesSelectPlan = firstPlan.entities;
            this.entitiesAllList = entitiesSelectPlan;
        }

        this.setFinishLoading();
    }

    setStartLoading() {
        this._isLoading = true;
    }

    setFinishLoading() {
        this._isLoading = false;
    }

    get loading(): boolean {
        return this._isLoading;
    }

    updateActiveStateEntities(dataUpdateStates: ISocketStateUpdate[]) {
        dataUpdateStates.forEach((state) => {
            this.selectPlan?.updateActiveStateEntities(state);
        });
    }

    changeSelectPlan(idPlan: string) {
        this.getPlanById(idPlan);
    }

    selectNewPlan(plan: PlanModel): void {
        const oldPlan = this.selectPlan;
        if (oldPlan)
            oldPlan.unselectPlan(
                this._store.viewerInterface.optionsLayer,
                this._store.viewerInterface.scrollLimit,
            );
        this.selectPlan = plan;
        this._store.viewerInterface.updateSettingsFromSelectedPlan(plan);
        this._store.commandEditor.resetCommands();
        const topic = socketTopic(plan.idMnemonicScheme);
        this._store.updateStateSocket.subscribeToUpdateStateTopic(topic);
    }

    async getPlanById(idPlan: string): Promise<void> {
        const plan = this._store.viewerSelectProject.getPlanById(`${idPlan}`);
        if (plan) {
            this.selectNewPlan(plan);
        } else {
            this._clearEntitiesList();
        }
    }
}
