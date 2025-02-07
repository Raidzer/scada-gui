import { IOptionsLayer } from "@scada/common/interfaces/viewer/OptionsLayer/OptionsLayer";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";
import { Layer } from "react-konva";

interface IDraggableLayerProps {
    children: React.ReactNode;
    scaleUp: (layer: Konva.Layer) => void;
    scaleDown: (layer: Konva.Layer) => void;
    dragBounds: (pos: Vector2d) => Vector2d;
    resizePlan: (width: number, height: number) => void;
    setBackgroundSize: (width: number, height: number) => void;
    firstLoadPage: (width: number, height: number) => void;
    optionsLayer: IOptionsLayer;
    scale: Vector2d;
    id?: string;
    sizePlan: { width: number; height: number } | null;
    parentDiv: HTMLDivElement | null;
    setupSizeParentDiv: (width: number, height: number) => void;
}

const DraggableLayer: React.FC<IDraggableLayerProps> = ({
    children,
    dragBounds,
    firstLoadPage,
    resizePlan,
    scaleDown,
    scaleUp,
    setBackgroundSize,
    optionsLayer,
    scale,
    id,
    sizePlan,
    parentDiv,
    setupSizeParentDiv,
}) => {
    const layerRef = useRef<Konva.Layer>(null);

    const onMount = () => {
        if (layerRef.current) {
            setBackgroundSize(sizePlan?.width || 1920, sizePlan?.height || 1080);
        }
        firstLoadPage(window.innerWidth, window.innerHeight);
    };

    const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        if (!layerRef.current) return;

        const layer = layerRef.current;

        if (e.evt.deltaY < 0) {
            scaleUp(layer);
        } else {
            scaleDown(layer);
        }
    };

    const dragBoundsFunc = (pos: Vector2d) => {
        return dragBounds(pos);
    };

    useEffect(() => {
        if (!parentDiv) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                resizePlan(width, height);
                setupSizeParentDiv(width, height);
            }
        });

        resizeObserver.observe(parentDiv);

        return () => {
            resizeObserver.unobserve(parentDiv);
        };
    }, [parentDiv]);

    useEffect(() => {
        onMount();
    }, []);

    return (
        <Layer
            id={id ?? ""}
            draggable
            onWheel={handleWheel}
            ref={layerRef}
            x={optionsLayer.x}
            y={optionsLayer.y}
            scale={scale}
            dragBoundFunc={dragBoundsFunc}
        >
            {children}
        </Layer>
    );
};

export default observer(DraggableLayer);
