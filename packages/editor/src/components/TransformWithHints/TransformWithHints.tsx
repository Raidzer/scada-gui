import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Box } from "konva/lib/shapes/Transformer";
import React, { useEffect, useRef, useState } from "react";
import { Group, Rect, Text, Transformer } from "react-konva";

interface IPropsTransformWithHints {
    isShow: boolean;
    shapeRef: Konva.Shape | null | Konva.Group;
    onTransform: (e: KonvaEventObject<Event>) => void;
    boundBoxFunc: (oldBox: Box, newBox: Box) => Box;
    onTransformEnd: (e: KonvaEventObject<Event>) => void;
}

const TransformWithHints: React.FC<IPropsTransformWithHints> = ({
    isShow,
    shapeRef,
    boundBoxFunc,
    onTransform,
    onTransformEnd,
}) => {
    const trRef = useRef<Konva.Transformer>(null);
    const positionTextRef = useRef<Konva.Text>(null);
    const [showSizeBox, setShowSizeBox] = useState<boolean>(false);
    const [sizeSizeBox, setSizeSizeBox] = useState({ w: 0, h: 20 });
    const [positionSizeBox, setPositionSizeBox] = useState({ x: 0, y: 0 });
    const [rotationShape, SetRotationShape] = useState<number>(0);
    const [showRotationBox, setShowRotationBox] = useState<boolean>(false);
    const [positionRotationBox, setPositionRotationBox] = useState({ x: 0, y: 0 });
    const [sizeEntity, setSizeEntity] = useState({ w: 0, h: 0 });

    const updateRotationBoxPosition = (
        scaleLayer: number,
        posLayer: { x: number; y: number },
    ): void => {
        const transformer = trRef.current;
        if (!transformer) return;
        const anchor = transformer.findOne(".rotater");

        if (anchor) {
            const anchorPosition = anchor.getClientRect();
            const posX = anchorPosition.x - 20;
            const posY = anchorPosition.y - 40;

            setPositionRotationBox({
                x: posX - (posX - posX / scaleLayer) - posLayer.x / scaleLayer,
                y: posY - (posY - posY / scaleLayer) - posLayer.y / scaleLayer,
            });
        }
    };

    const updateSizeBoxPosition = (
        e: Konva.KonvaEventObject<Event>,
        scaleLayer: number,
        posLayer: { x: number; y: number },
    ) => {
        const shape = e.target;
        const clientRect = shape.getClientRect();
        const posX = clientRect.x + clientRect.width / 2 - 30;
        const posY = clientRect.y + clientRect.height + 10;
        const sizeText = positionTextRef.current?.getSize();

        if (sizeText) {
            if (
                Math.round(sizeSizeBox.w) !== Math.round(sizeText.width + 15) ||
                Math.round(sizeSizeBox.h) !== Math.round(sizeText.height + 8)
            ) {
                setSizeSizeBox({ w: sizeText.width + 15, h: sizeText.height + 8 });
            }
        }

        setPositionSizeBox({
            x: posX - (posX - posX / scaleLayer) - posLayer.x / scaleLayer,
            y: posY - (posY - posY / scaleLayer) - posLayer.y / scaleLayer,
        });
    };

    const startTransformEntity = (e: Konva.KonvaEventObject<Event>) => {
        const shape = e.target;
        const transformer = trRef.current;
        const layer = shape.getLayer();
        if (!layer || !transformer) return;
        const anchor = transformer.getActiveAnchor();
        const scaleLayer = layer.scaleX();
        const posLayer = layer.position();

        if (anchor === "rotater") {
            updateRotationBoxPosition(scaleLayer, posLayer);
            const rotation = shape.rotation();
            SetRotationShape(Math.round(rotation));
            setShowRotationBox(true);
        } else {
            const { width, height } = shape.getSize();
            updateSizeBoxPosition(e, scaleLayer, posLayer);
            setSizeEntity({ w: Math.round(width), h: Math.round(height) });
            setShowSizeBox(true);
        }
        onTransform(e);
    };

    const stopTransformEntity = (e: Konva.KonvaEventObject<Event>) => {
        onTransformEnd(e);
        setShowSizeBox(false);
        setShowRotationBox(false);
    };

    const entityIsSelected = () => {
        if (trRef.current && shapeRef) {
            trRef.current.nodes([shapeRef]);
            const layerEntity = trRef.current.getLayer();
            if (layerEntity) {
                layerEntity.batchDraw();
            }
        }
    };

    useEffect(() => {
        if (isShow) {
            entityIsSelected();
        }
    }, [isShow]);

    return (
        <>
            {isShow && (
                <>
                    <Transformer
                        ref={trRef}
                        flipEnabled={false}
                        boundBoxFunc={boundBoxFunc}
                        onTransform={startTransformEntity}
                        onTransformEnd={stopTransformEntity}
                        rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315, 360]}
                    />
                    {showSizeBox && (
                        <Group x={positionSizeBox.x} y={positionSizeBox.y}>
                            <Rect
                                width={sizeSizeBox.w}
                                height={sizeSizeBox.h}
                                fill="blue"
                                cornerRadius={5}
                            />
                            <Text
                                ref={positionTextRef}
                                x={8}
                                y={5}
                                text={`${sizeEntity.w}x${sizeEntity.h}`}
                                fill="white"
                            />
                        </Group>
                    )}
                    {showRotationBox && (
                        <Group x={positionRotationBox.x} y={positionRotationBox.y}>
                            <Rect width={60} height={20} fill="blue" cornerRadius={5} />
                            <Text x={19} y={5} text={`${rotationShape}°`} fill="white" />
                        </Group>
                    )}
                </>
            )}
        </>
    );
};

export default TransformWithHints;
