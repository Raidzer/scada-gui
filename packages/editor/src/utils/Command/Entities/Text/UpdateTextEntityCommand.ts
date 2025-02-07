import { AnalogValueModel, ICommand, TextModel } from "@scada/common";

export class UpdateTextEntityCommand implements ICommand {
    private _entity: TextModel | AnalogValueModel;
    private _oldText: string;
    private _newText: string;

    constructor(entity: TextModel | AnalogValueModel, newText: string) {
        this._entity = entity;
        this._oldText = entity.activeState.text;
        this._newText = newText;
    }

    do(): void {
        this._entity.updateText(this._newText);
    }

    undo(): void {
        this._entity.updateText(this._oldText);
    }
}
