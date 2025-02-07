import { ImageModel } from "@scada/common";
import { useElementInteractionEditor } from "@scada/editor/hooks/useElementInteractionEditor";
import { useEntityHotkeys } from "@scada/editor/hooks/useEntityHotKeys";
import { useStore } from "@scada/state";
import Konva from "konva";
import { Vector2d } from "konva/lib/types";
import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";
import { Image as ImageKonva, Transformer } from "react-konva";
import useImage from "use-image";
import TransformWithHints from "../../TransformWithHints/TransformWithHints";

interface IKonvaImageProps {
    entity: ImageModel;
}

const KonvaImage: React.FC<IKonvaImageProps> = ({ entity }) => {
    const shapeRef = useRef<Konva.Image>(null);
    const store = useStore();
    const [image] = useImage(store.icon.getImage(entity.activeState.imageId).url);
    const {
        dragEntity,
        handleClickContext,
        handleDoubleClick,
        selectEntity,
        endTransformEntity,
        unmountEntity,
        boundBoxFunctionWithLimitResize,
        dragElementLimit,
        transformingSizeEntity
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
            <ImageKonva
                ref={shapeRef}
                image={image}
                {...entity.frame}
                {...entity.activeState}
                fillEnabled={true}
                fill={entity.activeState.fillEnabled ? entity.activeState.fill : "transparent"}
                draggable={entity.isSelect}
                dragBoundFunc={(pos: Vector2d) =>
                    dragElementLimit(pos, shapeRef.current?.getSize())
                }
                onPointerClick={selectEntity}
                onDragEnd={dragEntity}
                onTransformEnd={endTransformEntity}
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

export default observer(KonvaImage);
