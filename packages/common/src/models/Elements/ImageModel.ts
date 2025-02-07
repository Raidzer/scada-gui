import { IImageState } from "@scada/common/interfaces/entities/customState/IImageState";
import { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";
import DefaultShapeImage from "@scada/common/utils/DefaultShape/DefaultShapeImage";
import { ImageStateModel } from "../States/ImageStateModel";
import { BaseEntity } from "./BaseEntity";

export class ImageModel extends BaseEntity<IImageState> {
    states: ImageStateModel[] = [];

    constructor(option: IBaseEntityOption, states: IImageState[]) {
        super(option);
        states.forEach((state) => this.states.push(new ImageStateModel(state)));
    }

    get activeState(): ImageStateModel {
        return this.findActiveState(this.states);
    }

    updateImageId(id: string): void {
        this.activeState.updateImageId(id);
    }

    addNewState(id?: number): void {
        this.states.push(
            new ImageStateModel(DefaultShapeImage.state(id ?? this.states.length + 1)),
        );
    }
}
