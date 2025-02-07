import { BaseEntity, IBaseStateOption, ICommand } from "@scada/common";

export class ChangeIdTmCommand implements ICommand {
    private _entity: BaseEntity<IBaseStateOption>;
    private _oldId: string;
    private _newId: string;

    constructor(entity: BaseEntity<IBaseStateOption>, newId: string) {
        this._entity = entity;
        this._oldId = entity.descriptions.idTm;
        this._newId = newId;
    }

    do(): void {
        this._entity.changeIdTm(this._newId);
    }

    undo(): void {
        this._entity.changeIdTm(this._oldId);
    }
}
