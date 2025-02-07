import { ILineState } from "@scada/common/interfaces/entities/customState/ILineState";
import { BaseEntity } from "./BaseEntity";
import { LineStateModel } from "../States/LineStateModel";
import { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";

export class LineModel extends BaseEntity<ILineState> {
    states: LineStateModel[] = [];

    constructor(option: IBaseEntityOption, states: ILineState[]) {
        super(option);
        states.forEach((state) => this.states.push(new LineStateModel(state)));
    }

    get activeState(): LineStateModel {
        return this.findActiveState(this.states);
    }
}
