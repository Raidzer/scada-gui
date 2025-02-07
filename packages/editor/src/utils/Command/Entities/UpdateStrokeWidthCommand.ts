import { BaseEntity, IBaseStateOption, ICommand } from "@scada/common";

export class UpdateStrokeWidthCommand implements ICommand {
    private _entity: BaseEntity<IBaseStateOption>;
    private _oldStrokeWidth: number;
    private _newStrokeWidth: number;

    constructor(entity: BaseEntity<IBaseStateOption>, newStrokeWidth: number) {
        this._entity = entity;
        this._newStrokeWidth = newStrokeWidth;
        this._oldStrokeWidth = entity.activeState.strokeWidth;
    }

    do(): void {
        this._entity.updateWidthStroke(this._newStrokeWidth);
    }
    undo(): void {
        this._entity.updateWidthStroke(this._oldStrokeWidth);
    }
}
