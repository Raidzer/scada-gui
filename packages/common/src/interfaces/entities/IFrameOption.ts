import { EntityType } from "@scada/common/src/enums/entity/EntityType";

export interface IFrameOption {
    x: number;
    y: number;
    type: EntityType;
    scaleX: number;
    scaleY: number;
    rotation: number;
    width: number;
    height: number;
}
