import { ScaleModel, useElementInteractionViewer } from "@scada/common";
import { observer } from "mobx-react";
import React from "react";
import { Group, Rect } from "react-konva";

interface IProps {
    entity: ScaleModel;
}

const ElementScale: React.FC<IProps> = ({ entity }) => {
    const { onMove, openContextMenu, onPointerEnter, onPointerLeave } =
        useElementInteractionViewer(entity);

    return (
        <Group
            {...entity.frame}
            width={entity.frame.width}
            height={entity.frame.height}
            onPointerMove={onMove}
            onPointerLeave={onPointerLeave}
            onPointerClick={onPointerLeave}
            onDragStart={onPointerLeave}
            onContextMenu={openContextMenu}
            onPointerEnter={onPointerEnter}
            rotation={entity.frame.rotation}
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
    );
};

export default observer(ElementScale);
