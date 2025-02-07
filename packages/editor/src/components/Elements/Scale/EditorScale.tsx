import { ScaleModel } from "@scada/common";
import { useElementInteractionEditor } from "@scada/editor/hooks/useElementInteractionEditor";
import { useEntityHotkeys } from "@scada/editor/hooks/useEntityHotKeys";
import { useStore } from "@scada/state";
import Konva from "konva";
import { Vector2d } from "konva/lib/types";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { Group, Rect } from "react-konva";
import TransformWithHints from "../../TransformWithHints/TransformWithHints";

interface IProps {
    entity: ScaleModel;
}

const EditorScale = ({ entity }: IProps) => {
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const store = useStore();
    const {
        dragEntity,
        handleClickContext,
        handleDoubleClick,
        selectEntity,
        endTransformEntity,
        unmountEntity,
        boundBoxFunctionWithLimitResize,
        dragElementLimit,
        transformingSizeEntity,
    } = useElementInteractionEditor(entity);
    const { eventHotkey } = useEntityHotkeys(entity);

    useEffect(() => {
        if (entity.isSelect) {
            eventHotkey();
        } else {
            store.sharedEventBus.eventBus.remove(entity.id);
        }
    }, [entity.isSelect]);

    useEffect(() => {
        return () => unmountEntity();
    }, []);

    return (
        <>
            <Group
                ref={shapeRef}
                {...entity.frame}
                width={entity.frame.width}
                height={entity.frame.height}
                draggable={entity.isSelect}
                dragBoundFunc={(pos: Vector2d) =>
                    dragElementLimit(pos, shapeRef.current?.getSize())
                }
                onPointerClick={selectEntity}
                onDragEnd={dragEntity}
                onContextMenu={handleClickContext}
                onPointerDblClick={handleDoubleClick}
            >
                <Rect
                    x={0}
                    y={0}
                    width={entity.frame.width}
                    height={entity.frame.height}
                    stroke={entity.activeState.stroke}
                    strokeWidth={entity.activeState.strokeWidth}
                />
                <Rect
                    x={entity.startCoordScale.x}
                    y={entity.startCoordScale.y}
                    width={entity.widthScale}
                    height={entity.heightScale}
                    fill={entity.activeState.fill}
                />
            </Group>
            <TransformWithHints
                isShow={entity.isSelect}
                shapeRef={shapeRef.current}
                boundBoxFunc={boundBoxFunctionWithLimitResize}
                onTransformEnd={endTransformEntity}
                onTransform={transformingSizeEntity}
            />
        </>
    );
};

export default observer(EditorScale);
