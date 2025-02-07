import { BaseEntity, IBaseStateOption, ICommand } from "@scada/common";

export class UpdateFillColorEntityCommand implements ICommand {
    private _entity: BaseEntity<IBaseStateOption>;
    private _oldFillColor: string;
    private _newFillColor: string;

    constructor(entity: BaseEntity<IBaseStateOption>, newFillColor: string) {
        this._entity = entity;
        this._oldFillColor = this._entity.activeState.fill;
        this._newFillColor = newFillColor;
    }
    do(): void {
        this._entity.activeState.updateBackgroundColor(this._newFillColor);
    }
    undo(): void {
        this._entity.activeState.updateBackgroundColor(this._oldFillColor);
    }
}
