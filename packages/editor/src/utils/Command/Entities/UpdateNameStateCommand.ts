import { BaseEntity, IBaseStateOption, ICommand } from "@scada/common";

export class UpdateNameStateCommand implements ICommand {
    private _entity: BaseEntity<IBaseStateOption>;
    private _oldName: string;
    private _newName: string;

    constructor(entity: BaseEntity<IBaseStateOption>, newName: string) {
        this._entity = entity;
        this._oldName = entity.activeState.name;
        this._newName = newName;
    }

    do(): void {
        this._entity.activeState.name = this._newName;
    }

    undo(): void {
        this._entity.activeState.name = this._oldName;
    }
}
