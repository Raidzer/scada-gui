import { IImageState } from "@scada/common/interfaces/entities/customState/IImageState";
import { action, makeObservable, observable } from "mobx";
import { BaseState } from "./BaseState";

export class ImageStateModel extends BaseState<IImageState> implements IImageState {
    imageId: string;

    constructor(state: IImageState) {
        super(state);

        this.imageId = state.imageId ?? "default";
        makeObservable(this, {
            imageId: observable,
            updateImageId: action,
        });
    }

    get state(): IImageState {
        return {
            active: this.active,
            fill: this.fill,
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
            fillEnabled: this.fillEnabled,
            strokeEnabled: this.strokeEnabled,
            visible: this.visible,
            opacity: this.opacity,
            idState: this.idState,
            priority: this.priority,
            name: this.name,
            imageId: this.imageId,
        };
    }

    updateImageId(id: string): void {
        this.imageId = id;
    }
}
