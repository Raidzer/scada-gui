import { IEllipseState } from "@scada/common/interfaces/entities/customState/IEllipseState";
import { BaseState } from "./BaseState";
import { makeObservable, observable } from "mobx";

export class EllipseStateModel extends BaseState<IEllipseState> implements IEllipseState {
    radiusX: number;
    radiusY: number;

    constructor(states: IEllipseState) {
        super(states);
        this.radiusX = states.radiusX;
        this.radiusY = states.radiusY;
        makeObservable(this, {
            radiusX: observable,
            radiusY: observable,
        });
    }

    get state(): IEllipseState {
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
            radiusX: this.radiusX,
            radiusY: this.radiusY,
            name: this.name,
        };
    }
}
