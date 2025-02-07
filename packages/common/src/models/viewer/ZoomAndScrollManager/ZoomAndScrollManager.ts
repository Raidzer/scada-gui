import { MAX_SCALE_PLAN, MIN_SCALE_PLAN, SCALE_FACTOR_PLAN } from "@scada/common/constants/index";
import { IOptionsLayer } from "@scada/common/interfaces/viewer/OptionsLayer/OptionsLayer";
import { IScrollLimit } from "@scada/common/interfaces/viewer/ScrollLimit/IScrollLimit";
import { Vector2d } from "konva/lib/types";
import { makeAutoObservable } from "mobx";

const initialOptionsLayer: IOptionsLayer = {
    scale: 1,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};

const initialScrollLimit: IScrollLimit = {
    maxX: 0,
    minX: 0,
    maxY: 0,
    minY: 0,
};

export class ZoomAndScrollManager {
    private _optionsLayer: IOptionsLayer;
    private _scrollLimit: IScrollLimit;
    private _oldScale: number;
    private _newScale: number;
    private _mousePointTo: Vector2d;
    private _pointerPosition: Vector2d;
    private _backgroundPosition: Vector2d;
    private _newBackground: Vector2d;
    private _backgroundSize: { width: number; height: number };
    private _sizeParentDiv: { width: number; height: number };

    constructor() {
        this._optionsLayer = initialOptionsLayer;
        this._scrollLimit = initialScrollLimit;
        this._oldScale = initialOptionsLayer.scale;
        this._newScale = initialOptionsLayer.scale;
        this._mousePointTo = { x: 0, y: 0 };
        this._pointerPosition = { x: 0, y: 0 };
        this._backgroundPosition = { x: 0, y: 0 };
        this._newBackground = { x: 0, y: 0 };
        this._backgroundSize = { width: 0, height: 0 };
        this._sizeParentDiv = { width: 0, height: 0 };
        makeAutoObservable(this);
    }

    updateSettings(optionLayer: IOptionsLayer, scrollLimit: IScrollLimit): void {
        this._oldScale = optionLayer.scale;
        this._newScale = optionLayer.scale;
        this._scrollLimit = scrollLimit;
        this._optionsLayer = {
            ...optionLayer,
            width:
                this._sizeParentDiv.width > optionLayer.width
                    ? optionLayer.width
                    : this._sizeParentDiv.width,
            height:
                this._sizeParentDiv.height > optionLayer.height
                    ? optionLayer.height
                    : this._sizeParentDiv.height,
        };
        this.calculateLimitScrollResize();
    }

    calculateMousePointTo(): void {
        this._mousePointTo = {
            x:
                this._pointerPosition.x / this._optionsLayer.scale -
                this._backgroundPosition.x / this._optionsLayer.scale,
            y:
                this._pointerPosition.y / this._optionsLayer.scale -
                this._backgroundPosition.y / this._optionsLayer.scale,
        };
    }

    calculateCoordinateLayerZoom(): void {
        this._newBackground = {
            x: -(this._mousePointTo.x - this._pointerPosition.x / this._newScale) * this._newScale,
            y: -(this._mousePointTo.y - this._pointerPosition.y / this._newScale) * this._newScale,
        };
    }

    calculateLimitScrollZoom = (scaleUp: boolean): void => {
        const limits: IScrollLimit = { maxX: 0, minX: 0, maxY: 0, minY: 0 };
        const lwi = this._backgroundSize.width * this._oldScale;
        const lhi = this._backgroundSize.height * this._oldScale;
        if (scaleUp) {
            limits.minX = Math.ceil(this._optionsLayer.width - lwi * SCALE_FACTOR_PLAN);
            limits.minY = Math.ceil(this._optionsLayer.height - lhi * SCALE_FACTOR_PLAN);
        } else {
            limits.minX = Math.ceil(this._optionsLayer.width - lwi / SCALE_FACTOR_PLAN);
            limits.minY = Math.ceil(this._optionsLayer.height - lhi / SCALE_FACTOR_PLAN);
        }
        this._scrollLimit = limits;
    };

    calculateLimitScrollResize() {
        const limits: IScrollLimit = { maxX: 0, minX: 0, maxY: 0, minY: 0 };
        const lwi = this._backgroundSize.width * this._oldScale;
        const lhi = this._backgroundSize.height * this._oldScale;
        limits.minX = Math.ceil(this._optionsLayer.width - lwi);
        limits.minY = Math.ceil(this._optionsLayer.height - lhi);

        this._scrollLimit = limits;
    }

    calculateCoordinateLayerResize(width: number, height: number): void {
        if (height - this._backgroundSize.height - this._optionsLayer.y > 0) {
            this._optionsLayer = {
                ...this._optionsLayer,
                y: Math.min(height - this._backgroundSize.height, 0),
            };
        }
        if (width - this._backgroundSize.width - this._optionsLayer.x > 0) {
            this._optionsLayer = {
                ...this._optionsLayer,
                x: Math.min(width - this._backgroundSize.width, 0),
            };
        }
    }

    private _scale(
        pointerPosition: Vector2d,
        backgroundPosition: Vector2d,
        newScale: number,
        scaleUp: boolean,
    ): void {
        this._oldScale = this._optionsLayer.scale;
        this._newScale = newScale;
        this._pointerPosition = pointerPosition;
        this._backgroundPosition = backgroundPosition;
        this.calculateMousePointTo();
        this.calculateCoordinateLayerZoom();
        this.calculateLimitScrollZoom(scaleUp);

        this._optionsLayer = {
            ...this._optionsLayer,
            scale: newScale,
            x: Math.max(
                Math.min(this._newBackground.x, this._scrollLimit.maxX),
                this._scrollLimit.minX,
            ),
            y: Math.max(
                Math.min(this._newBackground.y, this._scrollLimit.maxY),
                this._scrollLimit.minY,
            ),
        };
    }

    scaleUp(pointerPosition: Vector2d, backgroundPosition: Vector2d): void {
        const newScale = this._optionsLayer.scale * SCALE_FACTOR_PLAN;
        if (newScale > MAX_SCALE_PLAN) return;
        this._scale(pointerPosition, backgroundPosition, newScale, true);
    }

    scaleDown(pointerPosition: Vector2d, backgroundPosition: Vector2d): void {
        const newScale = this._optionsLayer.scale / SCALE_FACTOR_PLAN;
        if (newScale < MIN_SCALE_PLAN) return;
        this._scale(pointerPosition, backgroundPosition, newScale, false);
    }

    dragBounds(pos: Vector2d): Vector2d {
        pos.x = Math.max(Math.min(pos.x, this._scrollLimit.maxX), this._scrollLimit.minX);
        pos.y = Math.max(Math.min(pos.y, this._scrollLimit.maxY), this._scrollLimit.minY);
        this._optionsLayer = {
            ...this._optionsLayer,
            x: pos.x,
            y: pos.y,
        };
        return pos;
    }

    resizePlan(width: number, height: number): void {
        const newWidth = width > this._backgroundSize.width ? this._backgroundSize.width : width;
        const newHeight =
            height > this._backgroundSize.height ? this._backgroundSize.height : height;
        this._optionsLayer = {
            ...this._optionsLayer,
            width: newWidth,
            height: newHeight,
        };
        this.calculateLimitScrollResize();
        this.calculateCoordinateLayerResize(width, height);
    }

    get scale(): Vector2d {
        return { x: this._optionsLayer.scale, y: this._optionsLayer.scale };
    }

    get optionsLayer(): IOptionsLayer {
        return this._optionsLayer;
    }

    setBackgroundSize(size: { width: number; height: number }) {
        this._backgroundSize = size;
    }

    get scrollLimit(): IScrollLimit {
        return this._scrollLimit;
    }

    get backgroundSize(): { width: number; height: number } {
        return this._backgroundSize;
    }

    setSizeParentDiv(width: number, height: number): void {
        this._sizeParentDiv = { width, height };
    }
}
