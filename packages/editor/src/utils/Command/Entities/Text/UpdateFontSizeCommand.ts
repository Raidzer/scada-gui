import { AnalogValueModel, ICommand, TextModel } from "@scada/common";

export class UpdateFontSizeCommand implements ICommand {
    private _entity: TextModel | AnalogValueModel;
    private _oldFontSize: number;
    private _newFontSize: number;

    constructor(entity: TextModel | AnalogValueModel, newFontSize: number) {
        this._entity = entity;
        this._oldFontSize = entity.activeState.fontSize;
        this._newFontSize = newFontSize;
    }

    do(): void {
        this._entity.updateFontSize(this._newFontSize);
    }

    undo(): void {
        this._entity.updateFontSize(this._oldFontSize);
    }
}
