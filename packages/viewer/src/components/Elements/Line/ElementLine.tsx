import { useElementInteractionViewer } from "@scada/common";
import { observer } from "mobx-react";
import { LineModel } from "@scada/common";
import React from "react";
import { Line } from "react-konva";

interface IProps {
    entity: LineModel;
}

const ElementLine: React.FC<IProps> = ({ entity }) => {
    const { onMove, openContextMenu, onPointerEnter, onPointerLeave } =
        useElementInteractionViewer(entity);

    return (
        <Line
            {...entity.activeState}
            onPointerMove={(event) => onMove(event)}
            onPointerLeave={onPointerLeave}
            onContextMenu={(event) => openContextMenu(event)}
            onPointerEnter={onPointerEnter}
        />
    );
};

export default observer(ElementLine);
