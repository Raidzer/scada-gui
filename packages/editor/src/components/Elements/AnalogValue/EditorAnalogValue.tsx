import { AnalogValueModel } from "@scada/common";
import { useElementInteractionEditor } from "@scada/editor/hooks/useElementInteractionEditor";
import { useEntityHotkeys } from "@scada/editor/hooks/useEntityHotKeys";
import { useStore } from "@scada/state";
import Konva from "konva";
import { Vector2d } from "konva/lib/types";
import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import { Text } from "react-konva";
import TransformWithHints from "../../TransformWithHints/TransformWithHints";

interface IProps {
    entity: AnalogValueModel;
}

const EditorAnalogValue = ({ entity }: IProps) => {
    const shapeRef = useRef<Konva.Text>(null);
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
            <Text
                ref={shapeRef}
                {...entity.frame}
                {...entity.activeState}
                text={`0.0 ${entity.activeState.text}`}
                draggable={entity.isSelect}
                dragBoundFunc={(pos: Vector2d) =>
                    dragElementLimit(pos, shapeRef.current?.getSize())
                }
                onPointerClick={selectEntity}
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

export default observer(EditorAnalogValue);
