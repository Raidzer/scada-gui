import { MAX_SCALE_PLAN, MIN_SCALE_PLAN } from "@scada/common/constants";
import { IBasePlanOption } from "@scada/common/interfaces/entities/IBasePlanOption";
import { IBaseStateOption } from "@scada/common/interfaces/entities/IBaseStateOption";
import { ISubscriptionsTm } from "@scada/common/interfaces/entities/SubscriptionsTm/ISubscriptionsTm";
import { IDataSavePlan } from "@scada/common/interfaces/request/IDataSavePlan";
import { ILayerRequest } from "@scada/common/interfaces/request/ILayerRequest";
import { ILayerResponse } from "@scada/common/interfaces/response/ILayerResponse";
import { ISelectPlanResponse } from "@scada/common/interfaces/response/ISelectPlanResponse";
import { IOptionsLayer } from "@scada/common/interfaces/viewer/OptionsLayer/OptionsLayer";
import { IScrollLimit } from "@scada/common/interfaces/viewer/ScrollLimit/IScrollLimit";
import { ISocketStateUpdate } from "@scada/common/interfaces/WebSocket/ISocketStateUpdate";
import { Vector2d } from "konva/lib/types";
import { action, makeObservable, observable } from "mobx";
import FieldOfView from "../Canvas/FieldOfView/FieldOfView";
import { BaseEntity } from "../Elements/BaseEntity";
import LayerModel from "../layer/LayerModel";

export class PlanModel implements IBasePlanOption {
    idMnemonicScheme: string;
    name: string;
    width: number;
    height: number;
    backgroundColor: string;
    subscriptionsTm: ISubscriptionsTm[];
    fieldOfView: FieldOfView;
    layers: LayerModel[];

    private _activeLayerId: string;
    private _activeLayer: LayerModel | null;
    unselectEntities = false;
    visibilityEntities: BaseEntity<IBaseStateOption>[] = [];
    optionLayer: IOptionsLayer;
    scrollLimit: IScrollLimit;

    constructor(option: ISelectPlanResponse) {
        this.height = option.height;
        this.idMnemonicScheme = option.idMnemonicScheme;
        this.name = option.name;
        this.width = option.width;
        this.backgroundColor = option.backgroundColor ?? "white";
        this.subscriptionsTm = option.subscriptionsTm ?? [];
        this.fieldOfView = new FieldOfView(option.fieldOfView);
        this.layers = option.layers.map((layer) => new LayerModel(layer, option.subscriptionsTm));
        this._activeLayerId = option.layers.find((layer) => layer.enable)?.id ?? "0";
        this._activeLayer = this.layers.find((layer) => layer.id === this._activeLayerId) ?? null;
        this.visibilityEntities =
            this.layers.find((layer) => layer.id === this._activeLayerId)?.allEntities ?? [];
        this.optionLayer = {
            scale: option.fieldOfView.scale,
            x: option.fieldOfView.x,
            y: option.fieldOfView.y,
            width: option.width,
            height: option.height,
        };
        this.scrollLimit = {
            maxX: 0,
            minX: 0,
            maxY: 0,
            minY: 0,
        };
        makeObservable(this, {
            backgroundColor: observable,
            visibilityEntities: observable,
            width: observable,
            height: observable,
            name: observable,
            layers: observable,
            unselectEntities: observable,
            updateBackgroundColor: action,
            updateName: action,
            updateSize: action,
            changeScalePlan: action,
            updateVisibilityEntities: action,
            addNewLayer: action,
            deleteLayer: action,
            updateActiveStateEntities: action,
            importPlanConfiguration: action,
        });
    }

    private _getLayersObject(): ILayerRequest[] {
        return this.layers.reduce(
            (acc: ILayerRequest[], layer: LayerModel) => [...acc, layer.layer],
            [],
        );
    }

    private _getAllSubscriptionsTm(): ISubscriptionsTm[] {
        return this.layers.reduce(
            (acc: ISubscriptionsTm[], layer: LayerModel) => [
                ...acc,
                ...layer.allSubscriptionsEntities,
            ],
            [],
        );
    }

    get plan(): IDataSavePlan {
        const plan: IDataSavePlan = {
            idMnemonicScheme: this.idMnemonicScheme,
            name: this.name,
            height: this.height,
            width: this.width,
            backgroundColor: this.backgroundColor,
            subscriptionsTm: this._getAllSubscriptionsTm(),
            fieldOfView: this.fieldOfView.fieldOfView,
            layers: this._getLayersObject(),
        };
        return plan;
    }

    updateBackgroundColor(color: string): void {
        this.backgroundColor = color;
    }

    updateName(name: string): void {
        this.name = name;
    }

    updateSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    get sizePlan(): { width: number; height: number } {
        return { width: this.width, height: this.height };
    }

    get entities(): BaseEntity<IBaseStateOption>[] {
        return this._activeLayer?.allEntities ?? [];
    }

    updateVisibilityEntities(): void {
        this.visibilityEntities = this._activeLayer?.allEntities ?? [];
        this.unselectEntities = !this.unselectEntities;
    }

    updateVisibilityEntitiesWithoutUnselectEntities(): void {
        this.visibilityEntities = this._activeLayer?.allEntities ?? [];
    }

    updateActiveStateEntities(state: ISocketStateUpdate): void {
        this.layers.forEach((layer) => {
            layer.updateActiveStateEntities(state);
        });
    }

    changeScalePlan(scale: Vector2d): void {
        const idActiveLayer = this.layers.find((layer) => layer.isActive(scale))?.id;
        if (idActiveLayer !== this._activeLayerId) {
            this._activeLayerId = idActiveLayer ?? this._activeLayerId;
            this._activeLayer =
                this.layers.find((layer) => layer.id === this._activeLayerId) ?? null;
            this.updateVisibilityEntities();
        }
    }

    unselectPlan(optionLayer: IOptionsLayer, scrollLimit: IScrollLimit): void {
        this.optionLayer = optionLayer;
        this.scrollLimit = scrollLimit;
    }

    addEntityFromLayer(entity: BaseEntity<IBaseStateOption>): void {
        this.layers.find((layer) => layer.id === this._activeLayerId)?.addEntity(entity);
        this.updateVisibilityEntities();
    }

    deleteEntityFromLayer(entity: BaseEntity<IBaseStateOption>): void {
        this.layers.find((layer) => layer.id === entity.idLayer)?.deleteEntity(entity);
        this.updateVisibilityEntities();
    }

    importPlanConfiguration(option: ISelectPlanResponse): void {
        this.height = option.height;
        this.width = option.width;
        this.backgroundColor = option.backgroundColor ?? "white";
        this.subscriptionsTm = option.subscriptionsTm ?? [];
        this.fieldOfView = new FieldOfView(option.fieldOfView);
        this.layers = option.layers.map((layer) => new LayerModel(layer, option.subscriptionsTm));
        this._activeLayerId = option.layers.find((layer) => layer.enable)?.id ?? "1";
        this.visibilityEntities =
            this.layers.find((layer) => layer.id === this._activeLayerId)?.allEntities ?? [];
        this.optionLayer = {
            scale: option.fieldOfView.scale,
            x: option.fieldOfView.x,
            y: option.fieldOfView.y,
            width: option.width,
            height: option.height,
        };
        this.scrollLimit = {
            maxX: 0,
            minX: 0,
            maxY: 0,
            minY: 0,
        };
    }

    addNewLayer(): void {
        const dataLayer: ILayerResponse = {
            id: `${this.layers.length + 1}`,
            enable: true,
            scaleMax: MAX_SCALE_PLAN,
            scaleMin: MIN_SCALE_PLAN,
            entities: [],
        };
        const newLayer = new LayerModel(dataLayer, []);
        this.layers.push(newLayer);
    }

    deleteLayer(layerId: string): void {
        if (this.layers.length < 2) {
            console.error("Невозможно удалить последний слой!");
            return;
        }
        const index = this.layers.findIndex((layer) => layer.id === layerId);
        if (index !== -1) {
            this.layers.splice(index, 1);
            this._activeLayerId = this.layers[0].id;
            this._activeLayer =
                this.layers.find((layer) => layer.id === this._activeLayerId) ?? null;
            this.updateVisibilityEntities();
        }
    }

    moveEntityToTop(id: string): void {
        this._activeLayer?.moveEntityToTop(id);
        this.updateVisibilityEntitiesWithoutUnselectEntities();
    }

    moveEntityToDown(id: string): void {
        this._activeLayer?.moveEntityToDown(id);
        this.updateVisibilityEntitiesWithoutUnselectEntities();
    }

    moveEntityToTopOneIndex(id: string): void {
        this._activeLayer?.moveEntityToTopOneIndex(id);
        this.updateVisibilityEntitiesWithoutUnselectEntities();
    }

    moveEntityToDownOneIndex(id: string): void {
        this._activeLayer?.moveEntityToDownOneIndex(id);
        this.updateVisibilityEntitiesWithoutUnselectEntities();
    }

    entitiesAtTop(id: string): boolean {
        if (!this._activeLayer) return true;
        return this._activeLayer?.entitiesAtTop(id);
    }

    entitiesAtBottom(id: string): boolean {
        if (!this._activeLayer) return true;
        return this._activeLayer.entitiesAtBottom(id);
    }
}
