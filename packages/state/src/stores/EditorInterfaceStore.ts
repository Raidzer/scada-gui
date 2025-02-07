import {
    ContextMenu,
    IOptionsLayer,
    IScrollLimit,
    PlanModel,
    ZoomAndScrollManager,
} from "@scada/common";
import Konva from "konva";
import { Vector2d } from "konva/lib/types";
import { makeAutoObservable } from "mobx";
import { AppStore } from "./AppStore";

export class EditorInterfaceStore {
    private _store: AppStore;
    private _zoomAndScrollManager: ZoomAndScrollManager;
    contextMenu: ContextMenu;
    isOpenWindowLibraryEntity: boolean;

    constructor(store: AppStore) {
        this._store = store;
        this._zoomAndScrollManager = new ZoomAndScrollManager();
        this.contextMenu = new ContextMenu();
        this.isOpenWindowLibraryEntity = false;
        makeAutoObservable(this);
    }

    closeWindowLibraryEntity() {
        this.isOpenWindowLibraryEntity = false;
    }

    openWindowLibraryEntity() {
        this.isOpenWindowLibraryEntity = true;
    }

    getPointerPosition(layer: Konva.Layer): Vector2d | null {
        const stage = layer.getStage();
        if (!stage) return null;
        return stage.getPointerPosition();
    }

    scaleUp(layer: Konva.Layer): void {
        const pointerPosition: Vector2d | null = this.getPointerPosition(layer);
        const layerPosition: Vector2d = layer.getPosition();
        if (!pointerPosition) return;
        this._zoomAndScrollManager.scaleUp(pointerPosition, layerPosition);
        this._store.editorSelectPlan.selectPlan?.changeScalePlan(this._zoomAndScrollManager.scale);
    }

    scaleDown(layer: Konva.Layer): void {
        const pointerPosition: Vector2d | null = this.getPointerPosition(layer);
        const layerPosition: Vector2d = layer.getPosition();
        if (!pointerPosition) return;
        this._zoomAndScrollManager.scaleDown(pointerPosition, layerPosition);
        this._store.editorSelectPlan.selectPlan?.changeScalePlan(this._zoomAndScrollManager.scale);
    }

    dragBounds(pos: Vector2d): Vector2d {
        return this._zoomAndScrollManager.dragBounds(pos);
    }

    firstLoadPage(width: number, height: number): void {
        this._zoomAndScrollManager.resizePlan(width, height);
    }

    updateSettingsFromSelectedPlan(plan: PlanModel): void {
        this._zoomAndScrollManager.updateSettings(plan.optionLayer, plan.scrollLimit);
    }

    setBackgroundSize(width: number, height: number): void {
        this._zoomAndScrollManager.setBackgroundSize({ width, height });
    }

    resizePlan(width: number, height: number): void {
        this._zoomAndScrollManager.resizePlan(width, height);
    }

    setSizeParentDiv(width: number, height: number): void {
        this._zoomAndScrollManager.setSizeParentDiv(width, height);
    }

    get zoomAndScrollManager(): ZoomAndScrollManager {

        return this._zoomAndScrollManager;
    }

    get optionsLayer(): IOptionsLayer {
        return this._zoomAndScrollManager.optionsLayer;
    }

    get scrollLimit(): IScrollLimit {
        return this._zoomAndScrollManager.scrollLimit;
    }

    get scale(): Vector2d {
        return this._zoomAndScrollManager.scale;
    }

    get sizePlan(): { width: number; height: number } | null {
        return this._store.editorSelectPlan.selectPlan?.sizePlan ?? null;
    }

    get backgroundSize(): { width: number; height: number } {
        return this._zoomAndScrollManager.backgroundSize;
    }
}
