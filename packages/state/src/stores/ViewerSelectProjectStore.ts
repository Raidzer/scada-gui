import {
    getPlan,
    getProject,
    IPlanListResponse,
    ISelectPlanResponse,
    PlanModel,
} from "@scada/common";
import axios from "axios";
import { makeAutoObservable } from "mobx";
import { AppStore } from "./AppStore";

export class ViewerSelectProjectStore {
    private _store: AppStore;
    private _planList = new Map<string, PlanModel>();

    constructor(store: AppStore) {
        this._store = store;
        makeAutoObservable(this);
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

    getPlanById(idPlan: string): PlanModel | null {
        return this._planList.get(idPlan) ?? null;
    }

    addPlan(plan: PlanModel): void {
        this._planList.set(plan.idMnemonicScheme.toString(), plan);
    }

    get firstPlan(): PlanModel | null {
        const firstPlan = this._planList.values().next().value;
        if (firstPlan) {
            return firstPlan;
        }
        return null;
    }

    get allPlans(): PlanModel[] {
        return [...this._planList.values()];
    }
}
