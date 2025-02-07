import { TypeCommand } from "@scada/common/enums/entity/TypeCommand";
import { TypeTm } from "@scada/common/enums/TypeTm/TypeTm";
import { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";
import { IBaseStateOption } from "@scada/common/interfaces/entities/IBaseStateOption";
import { IPoint2D } from "@scada/common/interfaces/entities/IPoint2D";
import { ISubscriptionsTm } from "@scada/common/interfaces/entities/SubscriptionsTm/ISubscriptionsTm";
import { IChangeTmRequest } from "@scada/common/interfaces/request/ChangeTm/IChangeTmRequest";
import { KonvaEventObject } from "konva/lib/Node";
import _ from "lodash";
import { action, makeObservable, observable } from "mobx";
import { BaseState } from "../States/BaseState";
import { SubscriptionsTm } from "../SubscriptionsTm/SubscriptionsTm";
import { FrameModel } from "./FrameModel";

export abstract class BaseEntity<T extends IBaseStateOption> implements IBaseEntityOption {
    id: string;
    idGroup: number;
    idPlan: string;
    idLayer: string;
    name: string;
    frame: FrameModel;
    value: string;
    tooltip?: string;
    states: BaseState<T>[] = [];
    commands: string[];
    subscriptionsTm: SubscriptionsTm;

    isSelect: boolean;

    constructor(option: IBaseEntityOption) {
        this.id = option.id;
        this.idGroup = option.idGroup;
        this.idPlan = option.idPlan;
        this.name = option.name;
        this.frame = new FrameModel(option.frame);
        this.value = option.value ?? "";
        if (option.tooltip) this.tooltip = option.tooltip;
        this.commands = option.commands;
        this.isSelect = false;
        this.subscriptionsTm = new SubscriptionsTm(option);
        this.idLayer = option.idLayer ?? "1";

        makeObservable(this, {
            value: observable,
            states: observable,
            isSelect: observable,
            frame: observable,
            name: observable,
            updateValue: action,
            updateActiveState: action,
            selectEntity: action,
            unselectEntity: action,
            transform: action,
            updateWidthStroke: action,
            activeLastState: action,
            addNewState: action,
        });
    }

    abstract get activeState(): BaseState<IBaseStateOption>;

    get dataObjectEntity(): Omit<IBaseEntityOption, "idLayer"> {
        return {
            id: this.id,
            idGroup: this.idGroup,
            idPlan: this.idPlan,
            name: this.name,
            frame: this.frame.dataObjectFrame,
            value: this.value,
            tooltip: this.tooltip,
            states: this.states.map((state) => state.state),
            commands: this.commands,
        };
    }

    get subscriptionsEntity(): ISubscriptionsTm {
        return this.subscriptionsTm.fullDescription;
    }

    dataForChangeTmRequest(value: boolean): IChangeTmRequest[] {
        return [
            {
                idTm: this.subscriptionsEntity.idTm,
                typeCommand: TypeCommand.ChangeTm,
                typeTm: this.subscriptionsTm.typeTm,
                time: Date.now(),
                bvalue: value,
            },
        ];
    }

    addNewState(id?: number): void {
        console.log("ЗАГЛУШКА!! НУЖНО СДЕЛАТЬ АБСТРАКТНЫЙ МЕТОД!!!");
    }

    findActiveState<P extends BaseState<IBaseStateOption>>(states: P[]): P {
        const activeState = states.find((state: P) => state.active);
        if (activeState) {
            return activeState;
        } else {
            throw new Error("Ошибка! Нет активного состояния");
        }
    }

    private deactivateStates() {
        this.states.forEach((state: BaseState<T>) => {
            if (state.active) {
                state.deactivateState();
            }
        });
    }

    private activateState(idState: number) {
        const targetState = this.states.find((state) => state.idState === idState);
        if (targetState) {
            targetState.activateState();
        }
    }

    updateActiveState(idState: number) {
        this.deactivateStates();
        this.activateState(idState);
    }

    activeLastState() {
        const lastStateId = _.last(this.states)?.idState;
        if (lastStateId) {
            this.updateActiveState(lastStateId);
        }
    }

    removeState(id: number) {
        _.remove(this.states, (state) => state.idState === id);
    }

    updateValue(str: string) {
        this.value = str;
    }

    getPointerPositionAfterClick(event: KonvaEventObject<PointerEvent>) {
        const pointerPositionClick = event.target.getStage()?.getPointerPosition();
        if (pointerPositionClick) {
            return pointerPositionClick;
        } else {
            return null;
        }
    }

    updateCoord(position: IPoint2D) {
        this.frame.setX(position.x);
        this.frame.setY(position.y);
    }

    updateFillColor(color: string) {
        const state = this.activeState;
        if (state) {
            state.updateBackgroundColor(color);
        }
    }

    updateEnabledFill(enabled: boolean) {
        const state = this.activeState;
        if (state) {
            state.updateFillEnabled(enabled);
        }
    }

    updateEnabledStroke(enabled: boolean) {
        const state = this.activeState;
        if (state) {
            state.updateStrokeEnabled(enabled);
        }
    }

    updateWidthStroke(width: number) {
        const state = this.activeState;
        if (state) {
            state.updateWidthStroke(width);
        }
    }

    updateColorStroke(color: string) {
        const state = this.activeState;
        if (state) {
            state.updateColorStroke(color);
        }
    }

    updateOpacity(opacity: number) {
        const state = this.activeState;
        if (state) {
            state.updateOpacity(opacity);
        }
    }

    transform(
        rotation: number,
        scaleX: number,
        scaleY: number,
        position: IPoint2D,
        width: number,
        height: number,
    ) {
        this.frame.setRotation(rotation);
        this.frame.setScaleX(scaleX);
        this.frame.setScaleY(scaleY);
        this.updateCoord(position);
        this.frame.setSize(width, height);
    }

    selectEntity() {
        this.isSelect = true;
    }

    unselectEntity() {
        this.isSelect = false;
    }

    setScale(scaleX: number, scaleY: number): void {
        this.frame.setScaleX(scaleX);
        this.frame.setScaleY(scaleY);
    }

    get descriptions(): ISubscriptionsTm {
        return this.subscriptionsTm.fullDescription;
    }

    changeTypeTm(newTypeTm: TypeTm) {
        this.subscriptionsTm.changeTypeTm(newTypeTm);
    }

    changeIdTm(newIdTm: string) {
        this.subscriptionsTm.changeIdTm(newIdTm);
    }

    updateLayerId(newLayerId: string): void {
        this.idLayer = newLayerId;
    }

    setSizeFrame({ width, height }: { width: number; height: number }): void {
        this.frame.setSize(width, height);
    }
}
