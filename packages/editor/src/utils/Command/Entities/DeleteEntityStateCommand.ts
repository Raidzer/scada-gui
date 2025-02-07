import { BaseEntity, IBaseStateOption, ICommand } from "@scada/common";

export class DeleteEntityStateCommand implements ICommand {
    private _entity: BaseEntity<IBaseStateOption>;
    private _stateId: number;

    constructor(entity: BaseEntity<IBaseStateOption>, stateId: number) {
        this._entity = entity;
        this._stateId = stateId;
    }

    do(): void {
        this._entity.removeState(this._stateId);
        this._entity.activeLastState();
    }
    undo(): void {
        this._entity.addNewState(this._stateId);
        this._entity.updateActiveState(this._stateId);
    }
}
