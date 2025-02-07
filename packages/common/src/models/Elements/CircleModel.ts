import { BaseEntity } from "./BaseEntity";
import { CircleStateModel } from "../States/CircleStateModel";
import { ICircleState } from "@scada/common/interfaces/entities/customState/ICircleState";
import { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";

export class CircleModel extends BaseEntity<ICircleState> {
    states: CircleStateModel[] = [];

    constructor(option: IBaseEntityOption, states: ICircleState[]) {
        super(option);
        states.forEach((state) => this.states.push(new CircleStateModel(state)));
    }

    get activeState(): CircleStateModel {
        return this.findActiveState(this.states);
    }
}
