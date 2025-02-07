import { Vector2d } from "konva/lib/types";
import { BaseEntity } from "./BaseEntity";
import { ScaleStateModel } from "../States/ScaleStateModel";
import { IScaleState } from "@scada/common/interfaces/entities/customState/IScaleState";
import { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";

export class ScaleModel extends BaseEntity<IScaleState> {
    states: ScaleStateModel[] = [];

    constructor(option: IBaseEntityOption, states: IScaleState[]) {
        super(option);
        states.forEach((state) => this.states.push(new ScaleStateModel(state)));
    }

    get activeState(): ScaleStateModel {
        return this.findActiveState(this.states);
    }

    get startCoordScale(): Vector2d {
        const a = 2;
        const activeState = this.activeState;
        return {
            x: activeState.strokeWidth / a,
            y: this.frame.height - activeState.strokeWidth / a,
        };
    }

    get widthScale(): number {
        const activeState = this.activeState;
        return this.frame.width - activeState.strokeWidth;
    }

    get heightScale(): number {
        if (this.value) {
            const activeState = this.activeState;
            const heightScale = this.frame.height - activeState.strokeWidth;
            const minValue = activeState.minValue;
            const maxValue = activeState.maxValue;
            let value = Number(this.value);
            if (value > maxValue) value = maxValue;
            return value * (heightScale / (maxValue - minValue)) * -1;
        } else {
            return 0;
        }
    }

    updateMinValue(newMinValue: number): void {
        this.activeState.updateMinValue(newMinValue);
    }

    updateMaxValue(newMaxValue: number): void {
        this.activeState.updateMaxValue(newMaxValue);
    }
}
