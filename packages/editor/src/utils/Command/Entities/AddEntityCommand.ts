import { BaseEntity, IBaseStateOption, ICommand } from "@scada/common";
import { EditorSelectPlanStore } from "@scada/state";

export class AddEntityCommand implements ICommand {
    private _editorStore: EditorSelectPlanStore;
    private _entity: BaseEntity<IBaseStateOption>;

    constructor(editorStore: EditorSelectPlanStore, newEntity: BaseEntity<IBaseStateOption>) {
        this._editorStore = editorStore;
        this._entity = newEntity;
    }

    do(): void {
        this._editorStore.addEntity(this._entity);
    }
    undo(): void {
        this._editorStore.deleteEntity(this._entity);
    }
}
