import { IBaseStateOption } from "@scada/common/interfaces/entities/IBaseStateOption";
import { action, makeObservable, observable } from "mobx";

export abstract class BaseState<T extends IBaseStateOption> {
    idState: number;
    priority: number;
    active: boolean;
    fill: string;
    fillEnabled: boolean;
    stroke: string;
    strokeWidth: number;
    strokeEnabled: boolean;
    visible: boolean;
    opacity: number;
    name: string;

    constructor(states: IBaseStateOption) {
        this.idState = states.idState;
        this.priority = states.priority;
        this.active = states.active;
        this.fill = states.fill;
        this.fillEnabled = states.fillEnabled;
        this.stroke = states.stroke;
        this.strokeWidth = states.strokeWidth;
        this.strokeEnabled = states.strokeEnabled;
        this.visible = states.visible;
        this.opacity = states.opacity;
        this.name = states.name;
        makeObservable(this, {
            visible: observable,
            idState: observable,
            priority: observable,
            active: observable,
            fill: observable,
            fillEnabled: observable,
            stroke: observable,
            strokeWidth: observable,
            strokeEnabled: observable,
            opacity: observable,
            name: observable,
            updateBackgroundColor: action,
            updateFillEnabled: action,
            updateWidthStroke: action,
        });
    }

    abstract get state(): T;

    deactivateState() {
        this.active = false;
    }

    activateState() {
        this.active = true;
    }

    updateBackgroundColor(color: string) {
        this.fill = color;
    }

    updatePriority(priority: number) {
        this.priority = priority;
    }

    updateFillEnabled(enabled: boolean) {
        this.fillEnabled = enabled;
    }

    updateColorStroke(color: string) {
        this.stroke = color;
    }

    updateWidthStroke(width: number) {
        this.strokeWidth = width;
    }

    updateStrokeEnabled(enabled: boolean) {
        this.strokeEnabled = enabled;
    }

    enableVisible() {
        this.visible = true;
    }

    disableVisible() {
        this.visible = false;
    }

    updateOpacity(value: number) {
        this.opacity = value;
    }

    updateName(value: string) {
        this.name = value;
    }
}
