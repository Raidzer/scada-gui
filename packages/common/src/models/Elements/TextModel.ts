import { BaseEntity } from "./BaseEntity";
import { TextStateModel } from "../States/TextStateModel";
import { ITextState } from "@scada/common/interfaces/entities/customState/ITextState";
import { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";

export class TextModel extends BaseEntity<ITextState> {
    states: TextStateModel[] = [];

    constructor(option: IBaseEntityOption, states: ITextState[]) {
        super(option);
        states.forEach((state) => this.states.push(new TextStateModel(state)));
    }

    get activeState(): TextStateModel {
        return this.findActiveState(this.states);
    }

    updateText(text: string): void {
        const state = this.activeState;
        if (state) {
            state.updateText(text);
        }
    }

    updateFontSize(fontSize: number): void {
        const state = this.activeState;
        if (state) {
            state.updateFontSize(fontSize);
        }
    }

    updateFontStyle(fontStyle: string): void {
        const state = this.activeState;
        if (state) {
            state.updateFontStyle(fontStyle);
        }
    }
}
