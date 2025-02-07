import { IRectangleState } from "@scada/common/interfaces/entities/customState/IRectangleState";
import { BaseState } from "./BaseState";

export class RectangleStateModel extends BaseState<IRectangleState> implements IRectangleState {
    constructor(state: IRectangleState) {
        super(state);
    }

    get state(): IRectangleState {
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
            name: this.name,
        };
    }
}
