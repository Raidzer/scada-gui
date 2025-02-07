import {
    ContextMenu,
    IOptionsLayer,
    IScrollLimit,
    PlanModel,
    TooltipKonva,
    ZoomAndScrollManager,
} from "@scada/common";
import Konva from "konva";
import { Vector2d } from "konva/lib/types";
import { makeAutoObservable } from "mobx";
import { AppStore } from "./AppStore";

export class ViewerInterfaceStore {
    private _store: AppStore;
    private _zoomAndScrollManager: ZoomAndScrollManager;
    tooltip: TooltipKonva | null;
    contextMenu: ContextMenu;

    constructor(store: AppStore) {
        this._store = store;
        this._zoomAndScrollManager = new ZoomAndScrollManager();
        this.tooltip = null;
        this.contextMenu = new ContextMenu();
        makeAutoObservable(this);
    }

    getPointerPosition(layer: Konva.Layer): Vector2d | null {
        const stage = layer.getStage();
        if (!stage) return null;
        return stage.getPointerPosition();
    }

    setBackgroundSize(width: number, height: number): void {
        this._zoomAndScrollManager.setBackgroundSize({ width, height });
    }

    firstLoadPage(width: number, height: number): void {
        this._zoomAndScrollManager.resizePlan(width, height);
    }

    scaleUp(layer: Konva.Layer): void {
        const pointerPosition: Vector2d | null = this.getPointerPosition(layer);
        const layerPosition: Vector2d = layer.getPosition();
        if (!pointerPosition) return;
        this._zoomAndScrollManager.scaleUp(pointerPosition, layerPosition);
        this._store.viewerSelectPlan.selectPlan?.changeScalePlan(this._zoomAndScrollManager.scale);
    }

    scaleDown(layer: Konva.Layer): void {
        const pointerPosition: Vector2d | null = this.getPointerPosition(layer);
        const layerPosition: Vector2d = layer.getPosition();
        if (!pointerPosition) return;

        this._zoomAndScrollManager.scaleDown(pointerPosition, layerPosition);
        this._store.viewerSelectPlan.selectPlan?.changeScalePlan(this._zoomAndScrollManager.scale);
    }

    dragBounds(pos: Vector2d): Vector2d {
        return this._zoomAndScrollManager.dragBounds(pos);
    }

    resizePlan(width: number, height: number): void {
        this._zoomAndScrollManager.resizePlan(width, height);
    }

    updateSettingsFromSelectedPlan(plan: PlanModel): void {
        this._zoomAndScrollManager.updateSettings(plan.optionLayer, plan.scrollLimit);
    }

    setSizeParentDiv(width: number, height: number): void {
        this._zoomAndScrollManager.setSizeParentDiv(width, height);
    }

    get zoomAndScrollManager(): ZoomAndScrollManager {
        return this._zoomAndScrollManager;
    }

    get planSizeLimit(): IScrollLimit {
        return this._zoomAndScrollManager.scrollLimit;
    }

    get scale(): Vector2d {
        return this._zoomAndScrollManager.scale;
    }

    get optionsLayer(): IOptionsLayer {
        return this._zoomAndScrollManager.optionsLayer;
    }

    setTooltip(tooltip: Konva.Layer): void {
        this.tooltip = new TooltipKonva(tooltip);
    }

    get sizePlan(): { width: number; height: number } | null {
        return this._store.viewerSelectPlan.selectPlan?.sizePlan ?? null;
    }

    get scrollLimit(): IScrollLimit {
        return this._zoomAndScrollManager.scrollLimit;
    }
}
