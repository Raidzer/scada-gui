import { IAnalogValueState } from "@scada/common/interfaces/entities/customState/IAnalogValueState";
import { BaseState } from "./BaseState";
import { action, makeObservable, observable } from "mobx";

export class AnalogValueStateModel
    extends BaseState<IAnalogValueState>
    implements IAnalogValueState
{
    text: string;
    fontFamily: string;
    fontSize: number;
    fontStyle: string;
    align: string;
    verticalAlign: string;

    constructor(state: IAnalogValueState) {
        super(state);
        this.fontFamily = state.fontFamily;
        this.fontSize = state.fontSize;
        this.fontStyle = state.fontStyle;
        this.align = state.align;
        this.verticalAlign = state.verticalAlign;
        this.text = state.text ?? "";
        makeObservable(this, {
            fontStyle: observable,
            text: observable,
            fontSize:observable,
            updateFontStyle: action,
            updateFontSize: action,
            updateText: action,
        })
    }

    get state(): IAnalogValueState {
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
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            fontStyle: this.fontStyle,
            align: this.align,
            verticalAlign: this.verticalAlign,
            name: this.name,
            text: this.text,
        };
    }

    updateFontStyle(style: string): void {
        this.fontStyle = style;
    }

    updateFontSize(fontSize: number): void {
        this.fontSize = fontSize;
    }

    updateText(text: string): void {
        this.text = text;
    }
}
