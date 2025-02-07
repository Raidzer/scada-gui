import { BaseEntity, IBaseStateOption, ICommand, PlanModel } from "@scada/common";
import { EditorSelectPlanStore } from "@scada/state";

export class DeleteEntityCommand implements ICommand {
    private _plan: PlanModel;
    private _entity: BaseEntity<IBaseStateOption>;

    constructor(entity: BaseEntity<IBaseStateOption>, plan: PlanModel) {
        this._plan = plan;
        this._entity = entity;
    }

    do(): void {
        this._plan.deleteEntityFromLayer(this._entity);
    }
    undo(): void {
        this._plan.addEntityFromLayer(this._entity);
    }
}
