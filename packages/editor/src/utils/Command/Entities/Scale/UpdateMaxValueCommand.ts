import { ScaleModel } from "@scada/common";
import { ICommand } from "../../ICommand";

export class UpdateMaxValueCommand implements ICommand {
    private _entity: ScaleModel;
    private _oldMaxValue: number;
    private _newMaxValue: number;

    constructor(entity: ScaleModel, newMinValue: number) {
        this._entity = entity;
        this._oldMaxValue = entity.activeState.maxValue;
        this._newMaxValue = newMinValue;
    }

    do(): void {
        this._entity.updateMaxValue(this._newMaxValue);
    }

    undo(): void {
        this._entity.updateMaxValue(this._oldMaxValue);
    }
}
