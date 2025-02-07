import Konva from "konva";
import { Vector2d } from "konva/lib/types";

export class TooltipKonva {
    private _tooltipLayer: Konva.Layer;
    private _tooltip: Konva.Label;
    private _tag: Konva.Tag;
    private _text: Konva.Text;
    private _isOpen: boolean;

    constructor(layer: Konva.Layer) {
        this._tooltipLayer = layer;
        this._tooltip = new Konva.Label({
            visible: false,
            listening: false,
            opacity: 0.75,
        });
        this._tag = new Konva.Tag({
            fill: "black",
            pointerDirection: "up",
            pointerWidth: 10,
            pointerHeight: 10,
            lineJoin: "round",
            shadowColor: "black",
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.2,
        });
        this._text = new Konva.Text({
            text: "Я подсказко",
            fontFamily: "Calibri",
            fontSize: 18,
            padding: 5,
            fill: "white",
        });
        this._tooltip.add(this._tag);
        this._tooltip.add(this._text);
        this._tooltipLayer.add(this._tooltip);
        this._isOpen = false;
    }

    show(str: string) {
        this.updateText(str);
        this._tooltip.show();
        this._isOpen = true;   
    }

    hide() {
        this._tooltip.hide();
        this._isOpen = false;
    }

    updateCoordinates(pos: Vector2d) {
        this._tooltip.position({
            x: pos.x,
            y: pos.y + 10,
        });
    }

    updateText(str: string) {
        this._text.setText(str);
    }

    get isOpen () {
        return this._isOpen;
    }
}
