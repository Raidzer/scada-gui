import { RectangleModel } from "@scada/common";
import { useElementInteractionEditor } from "@scada/editor/hooks/useElementInteractionEditor";
import { useEntityHotkeys } from "@scada/editor/hooks/useEntityHotKeys";
import { useStore } from "@scada/state";
import Konva from "konva";
import { Vector2d } from "konva/lib/types";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { Rect } from "react-konva";
import TransformWithHints from "../../TransformWithHints/TransformWithHints";

interface IProps {
    entity: RectangleModel;
}

const EditorRectangle = ({ entity }: IProps) => {
    const shapeRef = useRef<Konva.Rect>(null);
    const store = useStore();
    const {
        dragEntity,
        handleClickContext,
        handleDoubleClick,
        selectEntity,
        unmountEntity,
        dragElementLimit,
        boundBoxFunctionWithLimitResize,
        endTransformEntity,
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
            <Rect
                ref={shapeRef}
                id={`${entity.id}`}
                {...entity.frame}
                {...entity.activeState}
                draggable={entity.isSelect}
                dragBoundFunc={(pos: Vector2d) =>
                    dragElementLimit(pos, shapeRef.current?.getSize())
                }
                onPointerClick={selectEntity}
                onDragEnd={dragEntity}
                onContextMenu={handleClickContext}
                onPointerDblClick={handleDoubleClick}
            />
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

export default observer(EditorRectangle);
