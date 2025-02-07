import { EntityFactory } from "@scada/common/factories/EntityFactory";
import { IBaseStateOption } from "@scada/common/interfaces/entities/IBaseStateOption";
import { ILayer } from "@scada/common/interfaces/entities/layer/ILayer";
import { ISubscriptionsTm } from "@scada/common/interfaces/entities/SubscriptionsTm/ISubscriptionsTm";
import { ILayerRequest } from "@scada/common/interfaces/request/ILayerRequest";
import { IEntityItemResponse } from "@scada/common/interfaces/response/IEntityItemResponse";
import { ILayerResponse } from "@scada/common/interfaces/response/ILayerResponse";
import { ISocketStateUpdate } from "@scada/common/interfaces/WebSocket/ISocketStateUpdate";
import { CustomMap } from "@scada/common/utils/CustomMap/CustomMap";
import { Vector2d } from "konva/lib/types";
import { action, makeObservable, observable } from "mobx";
import { BaseEntity } from "../Elements/BaseEntity";

class LayerModel implements ILayer {
    id: string;
    enable: boolean;
    scaleMax: number;
    scaleMin: number;

    entitiesAllList: CustomMap<string, BaseEntity<IBaseStateOption>> = new CustomMap<
        string,
        BaseEntity<IBaseStateOption>
    >();

    constructor(data: ILayerResponse, subscriptionsTm: ISubscriptionsTm[]) {
        this.id = data.id;
        this.enable = data.enable;
        this.scaleMax = data.scaleMax;
        this.scaleMin = data.scaleMin;

        this.firstLoadEntities(data.entities, subscriptionsTm);
        makeObservable(this, {
            scaleMax: observable,
            scaleMin: observable,
            updateScaleRange: action,
        });
    }

    get layer(): ILayerRequest {
        return {
            id: this.id,
            enable: this.enable,
            entities: this.allEntities.map((entity) => entity.dataObjectEntity),
            scaleMax: this.scaleMax,
            scaleMin: this.scaleMin,
        };
    }

    get allSubscriptionsEntities(): ISubscriptionsTm[] {
        return this.allEntities.reduce(
            (acc: ISubscriptionsTm[], entity) => [...acc, entity.subscriptionsEntity],
            [],
        );
    }

    get rangeScale(): number[] {
        return [this.scaleMin, this.scaleMax];
    }

    isActive(scale: Vector2d): boolean {
        const { x } = scale;
        return this.scaleMin <= x && x <= this.scaleMax;
    }

    firstLoadEntities(entities: IEntityItemResponse[], subscriptionsTm: ISubscriptionsTm[]): void {
        entities.map((entity) => {
            const baseEntity = EntityFactory.createEntity(
                entity,
                this.id,
                subscriptionsTm.find((sub) => sub.idFrame === entity.id),
            );
            if (baseEntity) {
                this.entitiesAllList.set(entity.id, baseEntity);
            }
        });
    }

    get allEntities(): BaseEntity<IBaseStateOption>[] {
        return [...this.entitiesAllList.values()];
    }

    getEntityById(id: string): BaseEntity<IBaseStateOption> | null {
        const entity = this.entitiesAllList.get(id);
        if (!entity) {
            return null;
        }
        return entity;
    }

    updateActiveStateEntities(state: ISocketStateUpdate) {
        const entity = this.getEntityById(state.idEntity);
        if (entity) {
            if (state.idActiveState) {
                entity.updateActiveState(state.idActiveState);
            }
            if (state.value) entity.updateValue(state.value);
            if (state.tooltip) entity.tooltip = state.tooltip;
        }
    }

    addEntity(entity: BaseEntity<IBaseStateOption>): void {
        const decimalPart: number = +this.scaleMin.toFixed(2).split(".")[1] / 100;
        const { height, width } = entity.frame.size;
        entity.updateLayerId(this.id);
        if (decimalPart > 0) {
            const widthAfterScaling = width - width * decimalPart;
            const heightAfterScaling = height - height * decimalPart;
            entity.setSizeFrame({ height: heightAfterScaling, width: widthAfterScaling });
        }

        this.entitiesAllList.set(entity.id, entity);
    }

    deleteEntity(entity: BaseEntity<IBaseStateOption>): void {
        this.entitiesAllList.delete(entity.id);
    }

    updateScaleRange(newScaleRange: number[]): void {
        this.scaleMin = newScaleRange[0];
        this.scaleMax = newScaleRange[1];
    }

    moveEntityToTop(id: string): void {
        this.entitiesAllList.moveToEnd(id);
    }

    moveEntityToDown(id: string): void {
        this.entitiesAllList.moveToStart(id);
    }

    moveEntityToTopOneIndex(id: string): void {
        this.entitiesAllList.moveToDown(id);
    }

    moveEntityToDownOneIndex(id: string): void {
        this.entitiesAllList.moveToUp(id);
    }

    entitiesAtTop(id: string): boolean {
        return this.entitiesAllList.isKeyAtBottom(id);
    }

    entitiesAtBottom(id: string): boolean {
        return this.entitiesAllList.isKeyAtTop(id);
    }
}

export default LayerModel;
