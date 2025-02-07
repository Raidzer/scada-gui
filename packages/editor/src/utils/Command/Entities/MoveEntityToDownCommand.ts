import { PlanModel } from "@scada/common";
import { ICommand } from "../ICommand";

export class MoveEntityToDownCommand implements ICommand {
    id: string;
    plan: PlanModel;

    constructor(idEntity: string, plan: PlanModel) {
        this.id = idEntity;
        this.plan = plan;
    }

    do(): void {
        this.plan.moveEntityToDown(this.id);
    }
    undo(): void {
        this.plan.moveEntityToTop(this.id);
    }
}
