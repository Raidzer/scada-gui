import { AnalogValueModel, ICommand, TextModel } from "@scada/common";

export class UpdateFontStyleCommand implements ICommand {
    private _entity: TextModel | AnalogValueModel;
    private _oldFontStyle: string;
    private _newFontStyle: string;

    constructor(entity: TextModel | AnalogValueModel, newFontStyle: string) {
        this._entity = entity;
        this._oldFontStyle = entity.activeState.fontStyle;
        this._newFontStyle = newFontStyle;
    }

    do(): void {
        this._entity.updateFontStyle(this._newFontStyle);
    }

    undo(): void {
        this._entity.updateFontStyle(this._oldFontStyle);
    }
}
