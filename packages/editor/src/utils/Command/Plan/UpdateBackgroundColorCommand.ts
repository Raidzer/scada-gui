import { ICommand, PlanModel } from "@scada/common";

export class UpdateBackgroundColorCommand implements ICommand {
    private _Plan: PlanModel;
    private _oldColor: string;
    private _newColor: string;

    constructor(Plan: PlanModel, newColor: string) {
        this._Plan = Plan;
        this._oldColor = Plan.backgroundColor;
        this._newColor = newColor;
    }
    do(): void {
        this._Plan.updateBackgroundColor(this._newColor);
    }
    undo(): void {
        this._Plan.updateBackgroundColor(this._oldColor);
    }
}
