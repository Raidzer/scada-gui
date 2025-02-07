import { BaseEntity } from "./BaseEntity";
import { EllipseStateModel } from "../States/EllipseStateModel";
import { IEllipseState } from "@scada/common/interfaces/entities/customState/IEllipseState";
import { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";

export class EllipseModel extends BaseEntity<IEllipseState> {
    states: EllipseStateModel[] = [];

    constructor(option: IBaseEntityOption, states: IEllipseState[]) {
        super(option);
        states.forEach((state) => this.states.push(new EllipseStateModel(state)))
    }

    get activeState(): EllipseStateModel {
        return this.findActiveState(this.states);
    }
}
