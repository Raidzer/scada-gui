import { BaseEntity, IBaseStateOption, ICommand, IPoint2D } from "@scada/common";

interface ITransformParameters {
    scaleX: number;
    scaleY: number;
    rotation: number;
    position: IPoint2D;
    width: number;
    height: number;
}

export class TransformCommand implements ICommand {
    private _entity: BaseEntity<IBaseStateOption>;
    private _transform: ITransformParameters;
    private _oldTransform: ITransformParameters;

    constructor(entity: BaseEntity<IBaseStateOption>, transform: ITransformParameters) {
        this._entity = entity;
        this._transform = transform;
        this._oldTransform = {
            scaleX: entity.frame.scaleX,
            scaleY: entity.frame.scaleY,
            rotation: entity.frame.rotation,
            position: {
                x: entity.frame.x,
                y: entity.frame.y,
            },
            width: entity.frame.width,
            height: entity.frame.height,
        };
    }

    do(): void {
        this._entity.transform(
            this._transform.rotation,
            this._transform.scaleX,
            this._transform.scaleY,
            this._transform.position,
            this._transform.width,
            this._transform.height,
        );
    }
    undo(): void {
        this._entity.transform(
            this._oldTransform.rotation,
            this._oldTransform.scaleX,
            this._oldTransform.scaleY,
            this._oldTransform.position,
            this._oldTransform.width,
            this._oldTransform.height,
        );
    }
}
