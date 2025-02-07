import { Button, Popover } from "@mui/material";
import { DeleteEntityCommand } from "@scada/editor/utils/Command/Entities/DeleteEntityCommand";
import { MoveEntityToDownCommand } from "@scada/editor/utils/Command/Entities/MoveEntityToDownCommand";
import { MoveEntityToDownOneStepCommand } from "@scada/editor/utils/Command/Entities/MoveEntityToDownOneStepCommand";
import { MoveEntityToTopCommand } from "@scada/editor/utils/Command/Entities/MoveEntityToTopCommand";
import { MoveEntityToTopOneStepCommand } from "@scada/editor/utils/Command/Entities/MoveEntityToTopOneStepCommand";
import { useStore } from "@scada/state";
import { ChevronDown, ChevronsDown, ChevronsUp, ChevronUp, Layers, Trash2 } from "lucide-react";
import { observer } from "mobx-react";
import React, { useState } from "react";
import style from "./style.module.css";

const CanvasEditorToolbar = () => {
    const store = useStore();
    const [anchorButtonPosition, setAnchorButtonPosition] = useState<HTMLButtonElement | null>(
        null,
    );
    const open = Boolean(anchorButtonPosition);
    const id = open ? "simple-popover" : undefined;
    const selectEntity = store.editorSelectPlan.selectEntitiesList[0];
    const plan = store.editorSelectPlan.selectPlan;
    const selectEntityIsEmpty = Boolean(store.editorSelectPlan.selectEntitiesListIsEmpty());

    const handleClickOpenPositionPopover = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorButtonPosition(e.currentTarget);
    };

    const handleClosePositionPopover = () => {
        setAnchorButtonPosition(null);
    };

    const handleClickMoveEntityToTop = (): void => {
        if (!plan) return;
        store.commandEditor.execute(new MoveEntityToTopCommand(selectEntity.id, plan));
    };

    const handleClickMoveEntityToDown = (): void => {
        if (!plan) return;
        store.commandEditor.execute(new MoveEntityToDownCommand(selectEntity.id, plan));
    };

    const handleClickMoveEntityToTopOneStep = (): void => {
        if (!plan) return;
        store.commandEditor.execute(new MoveEntityToTopOneStepCommand(selectEntity.id, plan));
    };

    const handleClickMoveEntityToDownOneStep = (): void => {
        if (!plan) return;
        store.commandEditor.execute(new MoveEntityToDownOneStepCommand(selectEntity.id, plan));
    };

    const handleClickDeleteEntities = (): void => {
        if (!plan) return;
        store.commandEditor.execute(new DeleteEntityCommand(selectEntity, plan));
    };

    return (
        <div className={style.controlPanel}>
            <div>
                <Button
                    aria-describedby={id}
                    onClick={handleClickOpenPositionPopover}
                    disabled={selectEntityIsEmpty}
                >
                    <Layers className={style.iconButton} />
                    Позиция
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorButtonPosition}
                    onClose={handleClosePositionPopover}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <div className={style.popoverContent}>
                        <div className={style.toolbarPopover}>
                            <Button onClick={handleClickMoveEntityToTopOneStep}>
                                <ChevronUp />
                                Выше
                            </Button>
                            <Button onClick={handleClickMoveEntityToTop}>
                                <ChevronsUp />
                                Поверх
                            </Button>
                        </div>
                        <div className={style.toolbarPopover}>
                            <Button onClick={handleClickMoveEntityToDownOneStep}>
                                <ChevronDown />
                                Ниже
                            </Button>
                            <Button onClick={handleClickMoveEntityToDown}>
                                <ChevronsDown />
                                Под
                            </Button>
                        </div>
                    </div>
                </Popover>
                <Button disabled={selectEntityIsEmpty} onClick={handleClickDeleteEntities}>
                    <Trash2 />
                </Button>
            </div>
        </div>
    );
};

export default observer(CanvasEditorToolbar);
