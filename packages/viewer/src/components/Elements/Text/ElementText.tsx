import React from "react";
import { Text } from "react-konva";
import { observer } from "mobx-react";
import { TextModel } from "@scada/common";
import { useElementInteractionViewer } from "@scada/common";

interface IProps {
    entity: TextModel;
}

const ElementText: React.FC<IProps> = ({ entity }) => {
    const { onMove, openContextMenu, onPointerEnter, onPointerLeave } =
        useElementInteractionViewer(entity);

    return (
        <Text
            id={`${entity.id}`}
            {...entity.frame}
            {...entity.activeState}
            onPointerMove={(event) => onMove(event)}
            onPointerLeave={onPointerLeave}
            onContextMenu={openContextMenu}
            onPointerEnter={onPointerEnter}
        />
    );
};

export default observer(ElementText);
