import { ICommand, PlanModel } from "@scada/common";
import { EditorSelectProjectStore } from "./../../../../../state/src/stores/EditorSelectProjectStore";

export class DeletePlanCommand implements ICommand {
    private _editorProjectStore: EditorSelectProjectStore;
    private _plan: PlanModel;

    constructor(editorStore: EditorSelectProjectStore, plan: PlanModel) {
        this._editorProjectStore = editorStore;
        this._plan = plan;
    }

    do(): void {
        this._editorProjectStore.deletePlan(this._plan);
    }
    undo(): void {
        const idPlan = this._editorProjectStore.addPlan(this._plan);
        this._editorProjectStore.savePlan(idPlan);
    }
}
