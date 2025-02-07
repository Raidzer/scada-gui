import { ImageModel, useElementInteractionViewer } from "@scada/common";
import { useStore } from "@scada/state";
import Konva from "konva";
import { observer } from "mobx-react";
import React, { useEffect, useMemo, useRef } from "react";
import { Image as ImageKonva } from "react-konva";

declare global {
    interface Window {
        gifler: (src: string) => any;
    }
}

interface IKonvaGifProps {
    entity: ImageModel;
}

const KonvaGif: React.FC<IKonvaGifProps> = ({ entity }) => {
    const shapeRef = useRef<Konva.Image>(null);
    const animation = useRef<any>(null);
    const { onMove, openContextMenu, onPointerEnter, onPointerLeave } =
        useElementInteractionViewer(entity);
    const store = useStore();
    const canvas = useMemo(() => {
        const node = document.createElement("canvas");
        return node;
    }, []);

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

    return (
        <ImageKonva
            ref={shapeRef}
            id={`${entity.id}`}
            image={canvas}
            {...entity.frame}
            {...entity.activeState}
            fillEnabled={true}
            fill={entity.activeState.fillEnabled ? entity.activeState.fill : "transparent"}
            onPointerMove={(event) => onMove(event)}
            onPointerLeave={onPointerLeave}
            onContextMenu={(event) => openContextMenu(event)}
            onPointerEnter={onPointerEnter}
        />
    );
};

export default observer(KonvaGif);
