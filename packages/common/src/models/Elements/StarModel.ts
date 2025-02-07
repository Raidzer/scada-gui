import { BaseEntity } from "./BaseEntity";
import { StarStateModel } from "../States/StarStateModel";
import { IStarState } from "@scada/common/interfaces/entities/customState/IStarState";
import { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";

export class StarModel extends BaseEntity<IStarState> {
    states: StarStateModel[] = [];

    constructor(option: IBaseEntityOption, states: IStarState[]) {
        super(option);
        states.forEach((state) => this.states.push(new StarStateModel(state)));
    }

    get activeState(): StarStateModel {
        return this.findActiveState(this.states);
    }
}
