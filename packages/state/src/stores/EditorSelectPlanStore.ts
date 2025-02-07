import {
    BaseEntity,
    IBaseStateOption,
    IDataSavePlan,
    IErrorResponse,
    ISelectPlanResponse,
    PlanModel,
    savePlan,
} from "@scada/common";
import axios, { AxiosError } from "axios";
import { makeAutoObservable, observable, reaction } from "mobx";
import { AppStore } from "./AppStore";

export class EditorSelectPlanStore {
    private _selectedPlan: PlanModel | null = null;
    private _store: AppStore;
    private _selectEntitiesList: Set<BaseEntity<IBaseStateOption>> = new Set();
    isLoading: boolean;
    dataLoadingError: string | null;
    addNewEntity: BaseEntity<IBaseStateOption> | null = null;
    entitiesList: BaseEntity<IBaseStateOption>[] = [];

    constructor(store: AppStore) {
        this._store = store;
        this.isLoading = false;
        this.dataLoadingError = null;
        makeAutoObservable(this, {
            entitiesList: observable,
        });

        reaction(
            () => this._selectedPlan?.visibilityEntities,
            (entities) => {
                if (entities) {
                    this.entitiesList = entities;
                }
            },
        );

        reaction(
            () => this._selectedPlan?.unselectEntities,
            () => this.unselectEntities(),
        );
    }

    private _clearEntitiesList() {
        this._selectedPlan = null;
        this.entitiesList = [];
    }

    prepareDataJSON(data: IDataSavePlan | ISelectPlanResponse): string {
        const dataFromJSON = JSON.stringify(data);
        return dataFromJSON;
    }

    async saveData() {
        if (!this._selectedPlan) return;
        try {
            const idPlan = this._selectedPlan.idMnemonicScheme;
            this._store.editorSelectProject.savePlan(idPlan);
        } catch (error) {
            console.log(error);
        }
    }

    async saveImportData(data: ISelectPlanResponse) {
        try {
            data.idMnemonicScheme = this._selectedPlan?.idMnemonicScheme ?? data.idMnemonicScheme;
            data.name = this._selectedPlan?.name ?? data.name;
            const dataString = this.prepareDataJSON(data);
            await axios.post(savePlan(), dataString, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });
        } catch (error: unknown) {
            const axiosError = error as AxiosError<IErrorResponse>;
            const errorMessage = axiosError.response?.data.errors[0].message;
            throw new Error(errorMessage);
        }
    }

    saveFilePlan() {
        if (!this._selectedPlan) return;
        return this._store.editorSelectProject.exportPlan(this._selectedPlan.idMnemonicScheme);
    }

    async getPlanById(idPlan: string): Promise<void> {
        const plan = this._store.editorSelectProject.getPlanById(`${idPlan}`);
        if (plan) {
            this.selectNewPlan(plan);
        } else {
            this._clearEntitiesList();
        }
    }

    getFirstPlan() {
        const firstPlan = this._store.editorSelectProject.firstPlan;
        if (firstPlan) {
            this.selectNewPlan(firstPlan);
        }
    }

    getLastPlan() {
        const lastPlan = this._store.editorSelectProject.lastPlan;
        if (lastPlan) {
            this.selectNewPlan(lastPlan);
        } else {
            this._selectedPlan = null;
        }
    }

    addPlan(dataPlan?: ISelectPlanResponse | null) {
        if (dataPlan) {
            this._store.editorSelectProject.addPlan(new PlanModel(dataPlan));
        } else {
            this._store.editorSelectProject.addPlan();
        }
        this.getLastPlan();
    }

    deletePlan(plan: PlanModel) {
        this._store.editorSelectProject.deletePlan(plan);
        this.getLastPlan();
    }

    changeSelectPlan(idPlan: string) {
        this.getPlanById(idPlan);
    }

    selectNewPlan(plan: PlanModel): void {
        const oldPlan = this._selectedPlan;
        if (oldPlan)
            oldPlan.unselectPlan(
                this._store.editorInterface.optionsLayer,
                this._store.editorInterface.scrollLimit,
            );
        this._selectedPlan = plan;
        this._store.editorInterface.updateSettingsFromSelectedPlan(plan);
    }

    unselectPlan(): void {
        this._selectedPlan = null;
    }

    get selectPlan(): PlanModel | null {
        return this._selectedPlan;
    }

    get selectEntitiesList(): BaseEntity<IBaseStateOption>[] {
        const setFromArray = this._selectEntitiesList;
        return Array.from(setFromArray);
    }

    addSelectEntityWithCtrl(entity: BaseEntity<IBaseStateOption>): void {
        this._selectEntitiesList.add(entity);
    }

    addSelectEntityWithoutCtrl(entity: BaseEntity<IBaseStateOption>): void {
        this.unselectEntities();
        this._selectEntitiesList.add(entity);
    }

    unselectEntities() {
        this._selectEntitiesList.forEach((entity) => {
            entity.unselectEntity();
        });
        this._selectEntitiesList.clear();
    }

    setInitNewEntity(entity: BaseEntity<IBaseStateOption>) {
        this.addNewEntity = entity;
    }

    resetInitNewEntity() {
        this.addNewEntity = null;
    }

    get newEntity(): BaseEntity<IBaseStateOption> | null {
        return this.addNewEntity;
    }

    addEntity(entity: BaseEntity<IBaseStateOption>): void {
        this._selectedPlan?.addEntityFromLayer(entity);
    }

    deleteEntity(entity: BaseEntity<IBaseStateOption>): void {
        this._selectedPlan?.deleteEntityFromLayer(entity);
    }

    async importPlan(data: ISelectPlanResponse): Promise<void> {
        try {
            if (data.idMnemonicScheme === this._selectedPlan?.idMnemonicScheme) {
                await this.saveImportData(data);
                this._selectedPlan?.importPlanConfiguration(data);
            } else {
                this._store.editorSelectProject.importPlan(data);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                console.log("An unknown error occurred");
            }
        }
    }

    moveEntityToTop(id: string): void {
        this._selectedPlan?.moveEntityToTop(id);
    }

    moveEntityToDown(id: string): void {
        this._selectedPlan?.moveEntityToDown(id);
    }

    entitiesAtTop(id: string | undefined): boolean {
        if (!this._selectedPlan || typeof id === "undefined") return true;
        return this._selectedPlan?.entitiesAtTop(id);
    }

    entitiesAtBottom(id: string | undefined): boolean {
        if (!this._selectedPlan || typeof id === "undefined") return true;
        return this._selectedPlan.entitiesAtBottom(id);
    }

    selectEntitiesListIsEmpty(): boolean {
        return this._selectEntitiesList.size < 1;
    }
}
