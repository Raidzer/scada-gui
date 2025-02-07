import { ICircleState } from "@scada/common/interfaces/entities/customState/ICircleState";
import { BaseState } from "./BaseState";
import { makeObservable, observable } from "mobx";

export class CircleStateModel extends BaseState<ICircleState> {
    radius: number;

    constructor(state: ICircleState) {
        super(state);
        this.radius = state.radius;
        makeObservable(this, {
            radius: observable,
        });
    }

    get state(): ICircleState {
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
            radius: this.radius,
            name: this.name,
        };
    }

}
