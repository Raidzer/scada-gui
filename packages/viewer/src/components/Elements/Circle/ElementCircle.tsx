import { useElementInteractionViewer } from "@scada/common";
import { observer } from "mobx-react";
import { CircleModel } from "@scada/common";
import React from "react";
import { Circle } from "react-konva";

interface IPros {
    entity: CircleModel;
}

const ElementCircle: React.FC<IPros> = ({ entity }) => {
    const { onMove, openContextMenu, onPointerEnter, onPointerLeave } =
    useElementInteractionViewer(entity);

    return (
        <Circle
            x={entity.frame.x}
            y={entity.frame.y}
            {...entity.activeState}
            onPointerMove={onMove}
            onPointerLeave={onPointerLeave}
            onContextMenu={openContextMenu}
            onPointerEnter={onPointerEnter}
        />
    );
};

export default observer(ElementCircle);
