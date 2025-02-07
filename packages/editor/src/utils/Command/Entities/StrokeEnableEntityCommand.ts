import { BaseEntity, IBaseStateOption, ICommand } from "@scada/common";

export class StrokeEnableEntityCommand implements ICommand {
    private _entity: BaseEntity<IBaseStateOption>;
    private _strokeEnabled: boolean;
    private _oldStrokeEnabled: boolean;

    constructor(entity: BaseEntity<IBaseStateOption>, strokeEnabled: boolean) {
        this._entity = entity;
        this._strokeEnabled = strokeEnabled;
        this._oldStrokeEnabled = entity.activeState.strokeEnabled;
    }

    do(): void {
        this._entity.activeState.updateStrokeEnabled(this._strokeEnabled);
    }
    undo(): void {
        this._entity.activeState.updateStrokeEnabled(this._oldStrokeEnabled);
    }
}
