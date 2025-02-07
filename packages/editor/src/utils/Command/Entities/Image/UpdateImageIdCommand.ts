import { ImageModel } from "@scada/common";
import { ICommand } from "../../ICommand";

export class UpdateImageIdCommand implements ICommand {
    private _entity: ImageModel;
    private _oldId: string;
    private _newId: string;

    constructor(entity: ImageModel, newUrl: string) {
        this._entity = entity;
        this._oldId = entity.activeState.imageId;
        this._newId = newUrl;
    }

    do(): void {
        this._entity.updateImageId(this._newId);
    }
    undo(): void {
        this._entity.updateImageId(this._oldId);
    }
}
