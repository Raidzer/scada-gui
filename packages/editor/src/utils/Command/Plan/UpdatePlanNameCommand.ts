import { ICommand, PlanModel } from "@scada/common";

export class UpdatePlanNameCommand implements ICommand {
    private _plan: PlanModel;
    private _oldName: string;
    private _newName: string;

    constructor(plan: PlanModel, newName: string) {
        this._plan = plan;
        this._oldName = plan.name;
        this._newName = newName;
    }

    do(): void {
        this._plan.updateName(this._newName);
    }
    undo(): void {
        this._plan.updateName(this._oldName);
    }
}
