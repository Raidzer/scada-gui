import { PlanModel } from "@scada/common";
import { ICommand } from "../ICommand";

export class MoveEntityToDownOneStepCommand implements ICommand {
    id:string;
    plan: PlanModel;
    
    constructor(idEntity: string, plan: PlanModel) {
        this.id = idEntity;
        this.plan = plan;
    }
    
    do(): void {
        this.plan.moveEntityToDownOneIndex(this.id);
    }
    undo(): void {
        this.plan.moveEntityToTopOneIndex(this.id)
    }
    
}