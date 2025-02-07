import { BaseEntity, ButtonMouseType, IBaseStateOption } from "@scada/common";
import { useStore } from "@scada/state";
import { KonvaEventObject } from "konva/lib/Node";
import { Box } from "konva/lib/shapes/Transformer";
import { Vector2d } from "konva/lib/types";
import { useState } from "react";
import { DragElementCommand } from "../utils/Command/Entities/DragElementCommand";
import { TransformCommand } from "../utils/Command/Entities/TransformCommand";

export const useElementInteractionEditor = (entity: BaseEntity<IBaseStateOption>) => {
    const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
    const store = useStore();
    const { contextMenu } = store.editorInterface;

    const dragEntity = (e: KonvaEventObject<DragEvent>) => {
        const position = e.target.getPosition();
        store.commandEditor.execute(new DragElementCommand(entity, position));
    };

    const endTransformEntity = (e: KonvaEventObject<Event>) => {
        const shape = e.target;
        const { width, height } = shape.getSize();
        const rotation = shape.getAbsoluteRotation();
        const position = shape.getPosition();

        const transformOption = {
            rotation,
            scaleX: 1,
            scaleY: 1,
            position,
            width,
            height,
        };
        store.commandEditor.execute(new TransformCommand(entity, transformOption));
    };

    const transformingSizeEntity = (e: KonvaEventObject<Event>) => {
        const shape = e.target;
        if (shape) {
            const scaleX = shape.scaleX();
            const scaleY = shape.scaleY();

            const newWidth = shape.width() * scaleX;
            const newHeight = shape.height() * scaleY;

            shape.width(newWidth);
            shape.height(newHeight);
            entity.setSizeFrame({ height: newHeight, width: newWidth });

            shape.scaleX(1);
            shape.scaleY(1);
        }
    };

    const handleDoubleClick = (e: KonvaEventObject<PointerEvent>) => {
        console.log("Double click");
    };

    const selectEntity = (e: KonvaEventObject<PointerEvent>) => {
        if (e.evt.button === ButtonMouseType.Left) {
            if (clickTimer) {
                clearTimeout(clickTimer);
                setClickTimer(null);
                return;
            }

            const timer = setTimeout(() => {
                setClickTimer(null);
                if (!entity.isSelect) {
                    entity.selectEntity();
                    if (e.evt.ctrlKey) {
                        store.editorSelectPlan.addSelectEntityWithCtrl(entity);
                    } else {
                        store.editorSelectPlan.addSelectEntityWithoutCtrl(entity);
                    }
                }
            }, 200);
            setClickTimer(timer);
        }
    };

    const handleClickContext = (e: KonvaEventObject<PointerEvent>) => {
        e.evt.preventDefault();
        if (e.evt.button === ButtonMouseType.Right) {
            const position = { x: e.evt.clientX, y: e.evt.clientY };
            contextMenu.show([""], position, entity);
        }
    };

    const unmountEntity = () => {
        store.sharedEventBus.eventBus.remove(entity.id);
    };

    const boundBoxFunctionWithLimitResize = (oldBox: Box, newBox: Box): Box => {
        const offsetLayer = store.editorInterface.optionsLayer;
        const sizeStage = store.editorInterface.backgroundSize;
        const scale = store.editorInterface.optionsLayer.scale;
        const limitDragDistance =
            Math.round(newBox.x) < Math.round(offsetLayer.x) ||
            Math.round(newBox.y) < Math.round(offsetLayer.y) ||
            newBox.width + (newBox.x - offsetLayer.x) > sizeStage.width * scale ||
            newBox.height + (newBox.y - offsetLayer.y) > sizeStage.height * scale;
        if (limitDragDistance) {
            return oldBox;
        }
        return newBox;
    };

    const dragElementLimit = (
        pos: Vector2d,
        sizeEntity:
            | {
                  width: number;
                  height: number;
              }
            | undefined,
    ): Vector2d => {
        const offsetX = store.editorInterface.optionsLayer.x;
        const offsetY = store.editorInterface.optionsLayer.y;
        const maxX = store.editorInterface.backgroundSize.width;
        const maxY = store.editorInterface.backgroundSize.height;
        const scale = store.editorInterface.optionsLayer.scale;
        if (!sizeEntity) return pos;
        const newPos: Vector2d = {
            x: Math.min(
                Math.max(0 + offsetX, pos.x),
                maxX * scale - sizeEntity.width * entity.frame.scaleX + offsetX,
            ),
            y: Math.min(
                Math.max(0 + offsetY, pos.y),
                maxY * scale - sizeEntity.height * entity.frame.scaleY + offsetY,
            ),
        };
        return newPos;
    };

    return {
        dragEntity,
        endTransformEntity,
        handleDoubleClick,
        selectEntity,
        handleClickContext,
        unmountEntity,
        boundBoxFunctionWithLimitResize,
        dragElementLimit,
        transformingSizeEntity,
    };
};
