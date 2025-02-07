import { BaseEntity } from "./BaseEntity";
import { AnalogValueStateModel } from "../States/AnalogValueStateModel";
import { IAnalogValueState } from "@scada/common/interfaces/entities/customState/IAnalogValueState";
import { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";

export class AnalogValueModel extends BaseEntity<IAnalogValueState> {
    states: AnalogValueStateModel[] = [];

    constructor(option: IBaseEntityOption, states: IAnalogValueState[]) {
        super(option);
        states.forEach((state) => this.states.push(new AnalogValueStateModel(state)));
    }

    get activeState(): AnalogValueStateModel {
        return this.findActiveState(this.states);
    }

    updateFontStyle(style: string): void {
        this.activeState.updateFontStyle(style);
    }

    updateFontSize(fontSize: number): void {
        this.activeState.fontSize = fontSize;
    }

    updateText(text: string): void {
        this.activeState.updateText(text);
    }
}
