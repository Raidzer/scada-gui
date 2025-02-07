import { ICommand, PlanModel } from "@scada/common";

export class UpdateSizePlanCommand implements ICommand {
    private _Plan: PlanModel;
    private _oldSize: { width: number; height: number };
    private _newSize: { width: number; height: number };

    constructor(selectedPlan: PlanModel, newSize: { width: number; height: number }) {
        this._Plan = selectedPlan;
        this._oldSize = { width: selectedPlan.width, height: selectedPlan.height };
        this._newSize = newSize;
    }

    do(): void {
        this._Plan.updateSize(this._newSize.width, this._newSize.height);
    }
    undo(): void {
        this._Plan.updateSize(this._oldSize.width, this._oldSize.height);
    }
}
