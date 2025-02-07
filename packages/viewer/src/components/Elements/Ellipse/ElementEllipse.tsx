import { useElementInteractionViewer } from "@scada/common";
import { observer } from "mobx-react";
import { EllipseModel } from "@scada/common";
import React from "react";
import { Ellipse } from "react-konva";

interface IProps {
    entity: EllipseModel;
}

const ElementEllipse: React.FC<IProps> = ({ entity }) => {
    const { onMove, openContextMenu, onPointerEnter, onPointerLeave } =
    useElementInteractionViewer(entity);

    return (
        <Ellipse
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

export default observer(ElementEllipse);
