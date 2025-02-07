import { ICommand, ISelectPlanResponse, PlanModel } from "@scada/common";
import { EditorSelectPlanStore } from "@scada/state";

export class CreatePlanCommand implements ICommand {
    private _editorStore: EditorSelectPlanStore;
    private _plan: PlanModel | null = null;
    private _dataPlan: ISelectPlanResponse | null;

    constructor(editorStore: EditorSelectPlanStore, dataPlan?: ISelectPlanResponse) {
        this._editorStore = editorStore;
        this._dataPlan = dataPlan ?? null;
    }

    do(): void {
        this._editorStore.addPlan(this._dataPlan);
        this._plan = this._editorStore.selectPlan || null;
    }
    undo(): void {
        if (this._plan) {
            this._editorStore.deletePlan(this._plan);
        }
    }
}
