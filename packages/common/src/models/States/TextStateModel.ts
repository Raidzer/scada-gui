import { ITextState } from "@scada/common/interfaces/entities/customState/ITextState";
import { BaseState } from "./BaseState";
import { action, makeObservable, observable } from "mobx";

export class TextStateModel extends BaseState<ITextState> implements ITextState {
    text: string;
    fontFamily: string;
    fontSize: number;
    fontStyle: string;
    align: string;
    verticalAlign: string;

    constructor(state: ITextState) {
        super(state);
        this.text = state.text;
        this.fontFamily = state.fontFamily;
        this.fontSize = state.fontSize;
        this.fontStyle = state.fontStyle;
        this.align = state.align;
        this.verticalAlign = state.verticalAlign;

        makeObservable(this, {
            text: observable,
            updateText: action,
            fontSize: observable,
            updateFontSize: action,
            fontStyle: observable,
            updateFontStyle: action,
        });
    }

    get state(): ITextState {
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
            text: this.text,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            fontStyle: this.fontStyle,
            align: this.align,
            verticalAlign: this.verticalAlign,
            name: this.name,
        };
    }

    get dataObjectState(): ITextState {
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
            text: this.text,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            fontStyle: this.fontStyle,
            align: this.align,
            verticalAlign: this.verticalAlign,
            name: this.name,
        };
    }

    updateText(text: string): void {
        this.text = text;
    }

    updateFontSize(fontSize: number): void {
        this.fontSize = fontSize;
    }

    updateFontStyle(fontStyle: string): void {
        this.fontStyle = fontStyle;
    }
}
