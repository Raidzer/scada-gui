import { BaseEntity, IBaseStateOption, ICommand } from "@scada/common";

export class UpdateOpacityEntityCommand implements ICommand {
    private _entity: BaseEntity<IBaseStateOption>;
    private _oldOpacity: number;
    private _newOpacity: number;

    constructor(entity: BaseEntity<IBaseStateOption>, newOpacity: number | number[]) {
        this._entity = entity;
        this._oldOpacity = entity.activeState.opacity;
        if (Array.isArray(newOpacity)) {
            this._newOpacity = newOpacity[0];
        } else {
            this._newOpacity = newOpacity;
        }
    }

    do(): void {
        this._entity.updateOpacity(this._newOpacity);
    }
    undo(): void {
        this._entity.updateOpacity(this._oldOpacity);
    }
}
