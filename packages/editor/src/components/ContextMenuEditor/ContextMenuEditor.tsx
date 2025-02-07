import { Menu, MenuItem } from "@mui/material";
import { DeleteEntityCommand } from "@scada/editor/utils/Command/Entities/DeleteEntityCommand";
import { MoveEntityToDownCommand } from "@scada/editor/utils/Command/Entities/MoveEntityToDownCommand";
import { MoveEntityToDownOneStepCommand } from "@scada/editor/utils/Command/Entities/MoveEntityToDownOneStepCommand";
import { MoveEntityToTopCommand } from "@scada/editor/utils/Command/Entities/MoveEntityToTopCommand";
import { MoveEntityToTopOneStepCommand } from "@scada/editor/utils/Command/Entities/MoveEntityToTopOneStepCommand";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";

const ContextMenuEditor = () => {
    const store = useStore();
    const { contextMenu } = store.editorInterface;
    const plan = store.editorSelectPlan.selectPlan;
    const handleClose = () => {
        contextMenu.hide();
    };

    const handleClickDelete = () => {
        contextMenu.invokeWithClose(() => {
            if (!contextMenu.entity || !plan) return;
            store.commandEditor.execute(
                new DeleteEntityCommand(contextMenu.entity, plan),
            );
        });
    };

    const handleClickMoveEntityToTop = () => {
        contextMenu.invokeWithClose(() => {
            if (!contextMenu.entity || !plan) return;
            store.commandEditor.execute(new MoveEntityToTopCommand(contextMenu.entity.id, plan));
        });
    };

    const handleClickMoveEntityToDown = () => {
        contextMenu.invokeWithClose(() => {
            if (!contextMenu.entity || !plan) return;
            store.commandEditor.execute(new MoveEntityToDownCommand(contextMenu.entity.id, plan));
        });
    };

    const handleClickMoveEntityToTopOneStep = () => {
        contextMenu.invokeWithClose(() => {
            if (!contextMenu.entity || !plan) return;
            store.commandEditor.execute(
                new MoveEntityToTopOneStepCommand(contextMenu.entity.id, plan),
            );
        });
    };

    const handleClickMoveEntityToDownOneStep = () => {
        contextMenu.invokeWithClose(() => {
            if (!contextMenu.entity || !plan) return;
            store.commandEditor.execute(
                new MoveEntityToDownOneStepCommand(contextMenu.entity.id, plan),
            );
        });
    };

    return (
        <Menu
            anchorReference="anchorPosition"
            anchorPosition={{
                top: contextMenu.pointerPosition.y,
                left: contextMenu.pointerPosition.x,
            }}
            open={contextMenu.isShow}
            onClose={handleClose}
        >
            <MenuItem
                disabled={store.editorSelectPlan.entitiesAtTop(contextMenu.entity?.id)}
                onClick={handleClickMoveEntityToTop}
            >
                На передний план
            </MenuItem>
            <MenuItem
                disabled={store.editorSelectPlan.entitiesAtBottom(contextMenu.entity?.id)}
                onClick={handleClickMoveEntityToDown}
            >
                На задний план
            </MenuItem>
            <MenuItem
                disabled={store.editorSelectPlan.entitiesAtTop(contextMenu.entity?.id)}
                onClick={handleClickMoveEntityToTopOneStep}
            >
                Вверх
            </MenuItem>
            <MenuItem
                disabled={store.editorSelectPlan.entitiesAtBottom(contextMenu.entity?.id)}
                onClick={handleClickMoveEntityToDownOneStep}
            >
                Вниз
            </MenuItem>
            <MenuItem onClick={handleClickDelete}>Удалить</MenuItem>
        </Menu>
    );
};

export default observer(ContextMenuEditor);
