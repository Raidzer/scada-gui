import { ImageModel } from "@scada/common";
import { useElementInteractionEditor } from "@scada/editor/hooks/useElementInteractionEditor";
import { useEntityHotkeys } from "@scada/editor/hooks/useEntityHotKeys";
import { useStore } from "@scada/state";
import "gifler";
import Konva from "konva";
import { Vector2d } from "konva/lib/types";
import { observer } from "mobx-react";
import React, { useEffect, useMemo, useRef } from "react";
import { Image as ImageKonva } from "react-konva";
import TransformWithHints from "../../TransformWithHints/TransformWithHints";

declare global {
    interface Window {
        gifler: (src: string) => any;
    }
}

interface IGifProps {
    entity: ImageModel;
}

const KonvaGif: React.FC<IGifProps> = ({ entity }) => {
    const shapeRef = useRef<Konva.Image>(null);
    const canvas = useMemo(() => {
        const node = document.createElement("canvas");
        return node;
    }, []);
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
    const animation = useRef<any>(null);

    useEffect(() => {
        const layer = shapeRef.current?.getLayer();
        if (layer) {
            window.gifler(store.icon.getImage(entity.activeState.imageId).url).get((a: any) => {
                animation.current = a;
                animation.current.animateInCanvas(canvas);
                animation.current.onDrawFrame = (ctx: any, frame: any) => {
                    ctx.drawImage(frame.buffer, frame.x, frame.y);
                    layer.draw();
                };
            });
        }

        return () => animation.current.stop();
    }, [store.icon.getImage(entity.activeState.imageId).url, canvas, entity]);

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
                image={canvas}
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

export default observer(KonvaGif);
