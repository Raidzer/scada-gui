import { EntityType } from "@scada/common/enums/entity/EntityType";
import { IFrameOption } from "@scada/common/interfaces/entities/IFrameOption";
import { IPoint2D } from "@scada/common/interfaces/entities/IPoint2D";
import { action, makeObservable, observable } from "mobx";

export class FrameModel implements Required<IFrameOption> {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    type: EntityType;
    rotation: number;
    width: number;
    height: number;

    constructor(option: IFrameOption) {
        this.x = option.x;
        this.y = option.y;
        this.scaleX = option.scaleX;
        this.scaleY = option.scaleY;
        this.type = option.type;
        this.rotation = option.rotation;
        this.width = option.width;
        this.height = option.height;
        makeObservable(this, {
            x: observable,
            y: observable,
            scaleX: observable,
            scaleY: observable,
            type: observable,
            width: observable,
            height: observable,
            setX: action,
            setY: action,
            setScaleX: action,
            setScaleY: action,
            setType: action,
            setSize: action,
        });
    }

    setX(x: number) {
        this.x = x;
    }

    setY(y: number) {
        this.y = y;
    }

    setScaleX(scaleX: number) {
        this.scaleX = scaleX;
    }

    setScaleY(scaleY: number) {
        this.scaleY = scaleY;
    }

    setType(type: EntityType) {
        this.type = type;
    }

    setRotation(rotation: number) {
        this.rotation = rotation;
    }

    setSize(width: number, height: number) {
        this.height = height;
        this.width = width;
    }

    get positionFrame(): IPoint2D {
        return {
            x: this.x,
            y: this.y,
        };
    }

    get dataObjectFrame(): IFrameOption {
        return {
            x: this.x,
            y: this.y,
            type: this.type,
            scaleX: this.scaleX,
            scaleY: this.scaleY,
            rotation: this.rotation,
            width: this.width,
            height: this.height,
        };
    }

    get size(): { width: number; height: number } {
        return {
            width: this.width,
            height: this.height,
        };
    }
}
