import { ScaleModel } from "@scada/common";
import { ICommand } from "../../ICommand";

export class UpdateMinValueCommand implements ICommand {
    private _entity: ScaleModel;
    private _oldMinValue: number;
    private _newMinValue: number;

    constructor(entity: ScaleModel, newMinValue: number) {
        this._entity = entity;
        this._oldMinValue = entity.activeState.minValue;
        this._newMinValue = newMinValue;
    }

    do(): void {
        this._entity.updateMinValue(this._newMinValue);
    }

    undo(): void {
        this._entity.updateMinValue(this._oldMinValue);
    }
}
