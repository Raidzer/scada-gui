import { IRectangleState } from "@scada/common/interfaces/entities/customState/IRectangleState";
import { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";
import DefaultShapeRectangle from "@scada/common/utils/DefaultShape/DefaultShapeRectangle";
import { RectangleStateModel } from "../States/RectangleStateModel";
import { BaseEntity } from "./BaseEntity";

export class RectangleModel extends BaseEntity<IRectangleState> {
    states: RectangleStateModel[] = [];

    constructor(option: IBaseEntityOption, states: IRectangleState[]) {
        super(option);
        states.forEach((state) => this.states.push(new RectangleStateModel(state)));
    }

    get activeState(): RectangleStateModel {
        return this.findActiveState(this.states);
    }

    addNewState(id?: number): void {
        this.states.push(
            new RectangleStateModel(DefaultShapeRectangle.state(id ?? this.states.length + 1)),
        );
    }
}
