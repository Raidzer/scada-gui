import { BaseEntity } from "@scada/common";
import { useStore } from "@scada/state";
import { IBaseStateOption } from "@scada/common";
import { KeyboardEventType } from "@scada/common";
import { DragElementCommand } from "../utils/Command/Entities/DragElementCommand";
import { DeleteEntityCommand } from "../utils/Command/Entities/DeleteEntityCommand";

export const useEntityHotkeys = (entity: BaseEntity<IBaseStateOption>) => {
    const store = useStore();
    const DELTA = 2;

    const eventHotkey = () => {
        store.sharedEventBus.eventBus.add(
            KeyboardEventType.ArrowDownWithCtrl,
            () => dragElementDown(),
            entity.id,
        );

        store.sharedEventBus.eventBus.add(
            KeyboardEventType.ArrowUpWithCtrl,
            () => dragElementUp(),
            entity.id,
        );

        store.sharedEventBus.eventBus.add(
            KeyboardEventType.ArrowLeftWithCtrl,
            () => dragElementLeft(),
            entity.id,
        );

        store.sharedEventBus.eventBus.add(
            KeyboardEventType.ArrowRightWithCtrl,
            () => dragElementRight(),
            entity.id,
        );

        store.sharedEventBus.eventBus.add(
            KeyboardEventType.DeleteWithCtrl,
            () => deleteElement(),
            entity.id,
        );

        store.sharedEventBus.eventBus.add(
            KeyboardEventType.Escape,
            () => store.editorSelectPlan.unselectEntities(),
            entity.id,
        );
    };

    const dragElementDown = () => {
        store.commandEditor.execute(
            new DragElementCommand(entity, {
                x: entity.frame.x,
                y: entity.frame.y + DELTA,
            }),
        );
    };

    const dragElementUp = () => {
        store.commandEditor.execute(
            new DragElementCommand(entity, {
                x: entity.frame.x,
                y: entity.frame.y - DELTA,
            }),
        );
    };

    const dragElementLeft = () => {
        store.commandEditor.execute(
            new DragElementCommand(entity, {
                x: entity.frame.x - DELTA,
                y: entity.frame.y,
            }),
        );
    };

    const dragElementRight = () => {
        store.commandEditor.execute(
            new DragElementCommand(entity, {
                x: entity.frame.x + DELTA,
                y: entity.frame.y,
            }),
        );
    };

    const deleteElement = () => {
        store.commandEditor.execute(new DeleteEntityCommand(store.editorSelectPlan, entity));
        store.editorSelectPlan.unselectEntities();
    };

    return {
        eventHotkey,
    };
};
