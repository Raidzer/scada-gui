import { IStarState } from "@scada/common/interfaces/entities/customState/IStarState";
import { BaseState } from "./BaseState";

export class StarStateModel extends BaseState<IStarState> implements IStarState {
    numPoints: number;
    innerRadius: number;
    outerRadius: number;

    constructor(state: IStarState) {
        super(state);
        this.numPoints = state.numPoints;
        this.innerRadius = state.innerRadius;
        this.outerRadius = state.outerRadius;
    }

    get state(): IStarState {
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
            numPoints: this.numPoints,
            innerRadius: this.innerRadius,
            outerRadius: this.outerRadius,
            name: this.name,
        };
    }

}