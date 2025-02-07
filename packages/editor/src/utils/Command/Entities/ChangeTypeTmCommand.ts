import { BaseEntity, IBaseStateOption, ICommand, TypeTm } from "@scada/common";

export class ChangeTypeTmCommand implements ICommand {
    private _entity: BaseEntity<IBaseStateOption>;
    private _oldType: TypeTm;
    private _newType: TypeTm;

    constructor(entity: BaseEntity<IBaseStateOption>, newType: TypeTm) {
        this._entity = entity;
        this._oldType = entity.descriptions.typeTm;
        this._newType = newType;
    }

    do(): void {
        this._entity.changeTypeTm(this._newType);
    }

    undo(): void {
        this._entity.changeTypeTm(this._oldType);
    }
}
