import { Rect } from "react-konva";
import React from "react";
import { observer } from "mobx-react";
import { RectangleModel } from "@scada/common";
import { useElementInteractionViewer } from "@scada/common";

interface IProps {
    entity: RectangleModel;
}

const ElementRect: React.FC<IProps> = ({ entity }) => {
    const { onMove, openContextMenu, onPointerEnter, onPointerLeave } =
        useElementInteractionViewer(entity);

    return (
        <Rect
            id={`${entity.id}`}
            {...entity.activeState}
            {...entity.frame}
            onPointerMove={(event) => onMove(event)}
            onPointerLeave={onPointerLeave}
            onContextMenu={(event) => openContextMenu(event)}
            onPointerEnter={onPointerEnter}
        />
    );
};

export default observer(ElementRect);
