import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useState } from "react";
import { useStore } from "@scada/state";
import { BaseEntity } from "../models/Elements/BaseEntity";
import { IBaseStateOption } from "../interfaces/entities/IBaseStateOption";
import { ButtonMouseType } from "../enums/Konva/ButtonMouseType";

export const useElementInteractionViewer = (entity: BaseEntity<IBaseStateOption>) => {
    const [isPointerEnter, setIsPointerEnter] = useState<boolean>(false);
    const store = useStore();
    const { tooltip, contextMenu } = store.viewerInterface;

    const onMove = (event: KonvaEventObject<PointerEvent>) => {
        if (!tooltip) return;

        const stage = event.target.getStage();
        if (!stage) return;

        const mousePos = stage.getPointerPosition();
        if (!mousePos) return;

        tooltip.updateCoordinates(mousePos);
    };

    const hideTooltip = () => {
        if (!tooltip) return;
        tooltip.hide();
    };

    const showTooltip = () => {
        if (!entity.tooltip || !tooltip) return;
        tooltip.show(entity.tooltip);
    };

    const openContextMenu = (event: KonvaEventObject<PointerEvent>) => {
        event.evt.preventDefault();
        if (event.evt.button === ButtonMouseType.Right && entity.commands.length > 0) {
            hideTooltip();
            const position = { x: event.evt.clientX, y: event.evt.clientY };
            contextMenu.show(entity.commands, position, entity);
        }
    };

    const onPointerEnter = () => {
        setIsPointerEnter(true);
        showTooltip();
    };

    const onPointerLeave = () => {
        setIsPointerEnter(false);
        hideTooltip();
    };

    useEffect(() => {
        if (!tooltip) return;
        if (isPointerEnter && entity.tooltip && tooltip.isOpen) {
            tooltip.updateText(entity.tooltip);
        }
    }, [entity.tooltip]);

    return {
        onMove,
        onPointerLeave,
        onPointerEnter,
        openContextMenu,
    };
};
