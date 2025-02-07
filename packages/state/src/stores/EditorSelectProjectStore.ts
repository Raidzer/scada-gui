import {
    deletePlan,
    getPlan,
    getProject,
    IDataSavePlan,
    IErrorResponse,
    IPlanListResponse,
    ISelectPlanResponse,
    MAX_SCALE_PLAN,
    MIN_SCALE_PLAN,
    PlanModel,
    savePlan,
} from "@scada/common";
import axios, { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import { IRequestDeletePlan } from "../interface/request/IRequestDeletePlan";
import { AppStore } from "./AppStore";

export class EditorSelectProjectStore {
    private store: AppStore;
    private _planList = new Map<string, PlanModel>();

    constructor(store: AppStore) {
        this.store = store;
        makeAutoObservable(this);
    }

    _deletePlanListKey(idPlan: string): void {
        this._planList.delete(idPlan);
    }

    async fetchDataPlan(planId: string) {
        try {
            const { data } = await axios.get<ISelectPlanResponse>(getPlan(planId));
            this.addPlan(new PlanModel(data));
        } catch (error) {
            console.warn(`Ошибка получения данных из плана ${planId}!`);
        }
    }

    async fetchData() {
        let mnemonicSchemes: string[] = [];
        try {
            const { data } = await axios.get<IPlanListResponse>(getProject());
            mnemonicSchemes = data.mnemonicSchemes;
        } catch (error) {
            throw new Error("Ошибка получения данных с сервера!");
        }
        if (mnemonicSchemes.length > 0) {
            mnemonicSchemes.sort((a, b) => {
                const regex = /(\D+)(\d*)/;

                const [, textA, numberA] = a.match(regex) || [];
                const [, textB, numberB] = b.match(regex) || [];

                const textComparison = textA.localeCompare(textB);
                if (textComparison !== 0) {
                    return textComparison;
                }

                return (parseInt(numberA) || 0) - (parseInt(numberB) || 0);
            });

            for (const planId of mnemonicSchemes) {
                await this.fetchDataPlan(planId);
            }
        }
    }

    get allPlans(): PlanModel[] {
        return [...this._planList.values()];
    }

    get firstPlan(): PlanModel | null {
        const firstPlan = this._planList.values().next().value;
        if (firstPlan) {
            return firstPlan;
        }
        return null;
    }

    get lastPlan(): PlanModel | null {
        const lastPlan = Array.from(this._planList.values()).pop();
        if (lastPlan) {
            return lastPlan;
        }
        return null;
    }

    getPlanById(idPlan: string): PlanModel | null {
        return this._planList.get(idPlan) ?? null;
    }

    addPlan(plan?: PlanModel): string {
        if (plan) {
            this._planList.set(plan.idMnemonicScheme.toString(), plan);
            return plan.idMnemonicScheme;
        } else {
            const newPlan = new PlanModel({
                idMnemonicScheme: `Plan_${this.allPlans.length + 1}`,
                name: `План №${this.allPlans.length + 1}`,
                width: 1920,
                height: 1080,
                backgroundColor: "white",
                subscriptionsTm: [],
                fieldOfView: { x: 0, y: 0, scale: 1 },
                layers: [
                    {
                        id: "1",
                        enable: true,
                        scaleMax: MAX_SCALE_PLAN,
                        scaleMin: MIN_SCALE_PLAN,
                        entities: [],
                    },
                ],
            });
            this._planList.set(newPlan.idMnemonicScheme.toString(), newPlan);
            return newPlan.idMnemonicScheme;
        }
    }

    prepareDataJSON(data: IDataSavePlan | ISelectPlanResponse): string {
        const dataFromJSON = JSON.stringify(data);
        return dataFromJSON;
    }

    async savePlan(idPlan: string): Promise<void> {
        const plan = this._planList.get(idPlan);
        if (!plan) return;
        try {
            const dataSelectPlan: IDataSavePlan = plan.plan;
            const dataString = this.prepareDataJSON(dataSelectPlan);
            await axios.post(savePlan(), dataString, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });
        } catch (error) {
            console.warn(error);
        }
    }

    async deletePlan(plan: PlanModel): Promise<void> {
        const idPlan = plan.idMnemonicScheme;
        try {
            await axios<IRequestDeletePlan>(deletePlan(idPlan));
            this._deletePlanListKey(idPlan);
        } catch (error) {
            console.warn(error);
        }
    }

    exportPlan(idPlan: string): string | null {
        const plan = this._planList.get(idPlan);
        if (!plan) return null;
        const exportData = this.prepareDataJSON(plan.plan);
        return exportData;
    }

    async importPlan(data: ISelectPlanResponse) {
        let newPlan = null;
        if (this._planList.has(data.idMnemonicScheme)) {
            newPlan = this._planList.get(data.idMnemonicScheme);
            if (!newPlan) return;
            newPlan?.importPlanConfiguration(data);
        } else {
            newPlan = new PlanModel(data);
            this.addPlan(newPlan);
        }
        try {
            const dataString = this.prepareDataJSON(newPlan.plan);
            await axios.post(savePlan(), dataString, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });
        } catch (error) {
            const axiosError = error as AxiosError<IErrorResponse>;
            const errorMessage = axiosError.response?.data.errors[0].message;
            throw new Error(errorMessage);
        }
    }
}
