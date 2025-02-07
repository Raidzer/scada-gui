import { BaseEntity, IBaseStateOption, ICommand } from "@scada/common";

export class UpdateColorStrokeEntityCommand implements ICommand {
    private _entity: BaseEntity<IBaseStateOption>;
    private _oldColorStroke: string;
    private _newColorStroke: string;

    constructor(entity: BaseEntity<IBaseStateOption>, newColorStroke: string) {
        this._entity = entity;
        this._oldColorStroke = entity.activeState.stroke;
        this._newColorStroke = newColorStroke;
    }
    do(): void {
        this._entity.activeState.updateColorStroke(this._newColorStroke);
    }
    undo(): void {
        this._entity.activeState.updateColorStroke(this._oldColorStroke);
    }
}
