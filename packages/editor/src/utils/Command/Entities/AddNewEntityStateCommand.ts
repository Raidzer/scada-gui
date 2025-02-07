import { BaseEntity, IBaseStateOption, ICommand } from "@scada/common";

export class AddNewEntityStateCommand implements ICommand {
    private _entity: BaseEntity<IBaseStateOption>;
    private _stateId: number;

    constructor(entity: BaseEntity<IBaseStateOption>) {
        this._entity = entity;
        this._stateId = 0;
    }

    do(): void {
        this._entity.addNewState();
        this._entity.activeLastState();
        this._stateId = this._entity.activeState.idState;
    }
    undo(): void {
        this._entity.removeState(this._stateId);
        this._entity.activeLastState();
    }
}
