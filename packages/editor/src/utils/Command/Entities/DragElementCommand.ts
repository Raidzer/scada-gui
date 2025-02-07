import { BaseEntity, IBaseStateOption, ICommand, IPoint2D } from "@scada/common";

export class DragElementCommand implements ICommand {
    private _entity: BaseEntity<IBaseStateOption>;
    private _oldPosition: IPoint2D;
    private _newPosition: IPoint2D;

    constructor(entity: BaseEntity<IBaseStateOption>, position: IPoint2D) {
        this._entity = entity;
        this._oldPosition = entity.frame.positionFrame;
        this._newPosition = position;
    }

    do(): void {
        this._entity.updateCoord(this._newPosition);
    }
    undo(): void {
        this._entity.updateCoord(this._oldPosition);
    }
}
