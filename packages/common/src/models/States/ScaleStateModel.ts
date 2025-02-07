import { IScaleState } from "@scada/common/interfaces/entities/customState/IScaleState";
import { BaseState } from "./BaseState";

export class ScaleStateModel extends BaseState<IScaleState> implements IScaleState {
    minValue: number;
    maxValue: number;
    fillScale: string;

    constructor(state: IScaleState) {
        super(state);
        this.minValue = state.minValue;
        this.maxValue = state.maxValue;
        this.fillScale = state.fillScale;
    }

    get state(): IScaleState {
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
            minValue: this.minValue,
            maxValue: this.maxValue,
            fillScale: this.fillScale,
            name: this.name,
        };
    }

    updateMinValue(newMinValue: number): void {
        this.minValue = newMinValue;
    }

    updateMaxValue(newMaxValue: number): void {
        this.maxValue = newMaxValue;
    }
}
