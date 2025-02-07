import { useElementInteractionViewer } from "@scada/common";
import { observer } from "mobx-react";
import { StarModel } from "@scada/common";
import React from "react";
import { Star } from "react-konva";

interface IProps {
    entity: StarModel;
}

const ElementStar: React.FC<IProps> = ({ entity }) => {
    const { onMove, openContextMenu, onPointerEnter, onPointerLeave } =
        useElementInteractionViewer(entity);

    return (
        <Star
            {...entity.activeState}
            onPointerMove={(event) => onMove(event)}
            onPointerLeave={onPointerLeave}
            onPointerEnter={onPointerEnter}
            onContextMenu={(event) => openContextMenu(event)}
        />
    );
};

export default observer(ElementStar);
