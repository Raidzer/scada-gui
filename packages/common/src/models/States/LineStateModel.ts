import { ILineState } from "@scada/common/interfaces/entities/customState/ILineState";
import { BaseState } from "./BaseState";
import { makeObservable, observable } from "mobx";

export class LineStateModel
    extends BaseState<ILineState>
    implements ILineState
{
    points: number[];
    tension: number;
    closed: boolean;

    constructor(state: ILineState) {
        super(state);
        this.points = state.points;
        this.tension = state.tension;
        this.closed = state.closed;
        makeObservable(this, {
            points: observable,
            tension: observable,
            closed: observable,
        });
    }

    get state(): ILineState {
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
            points: this.points,
            tension: this.tension,
            closed: this.closed,
            name: this.name,
        };
    }
}
