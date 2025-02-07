import LayerModel from "src/models/layer/LayerModel";
import { ICommand } from "../ICommand";

export class UpdateLayerRangeScaleCommand implements ICommand {
    private _layer: LayerModel;
    private _oldScaleRange: number[];
    private _newScaleRange: number[];

    constructor(layer: LayerModel, newScaleRange: number[]) {
        this._layer = layer;
        this._oldScaleRange = layer.rangeScale;
        this._newScaleRange = newScaleRange;
    }
    do(): void {
        this._layer.updateScaleRange(this._newScaleRange);
    }
    undo(): void {
        this._layer.updateScaleRange(this._oldScaleRange);
    }
}
