import React from "react";
import { observer } from "mobx-react";
import { Text } from "react-konva";
import { useElementInteractionViewer } from "@scada/common";
import { AnalogValueModel } from "@scada/common";

interface IProps {
    entity: AnalogValueModel;
}

const ElementAnalogValue: React.FC<IProps> = ({ entity }) => {
    const { onMove, openContextMenu, onPointerEnter, onPointerLeave } =
        useElementInteractionViewer(entity);

    return (
        <Text
            {...entity.frame}
            {...entity.activeState}
            text={
                entity.value.length > 0
                    ? `${entity.value} ${entity.activeState.text}`
                    : `0.0 ${entity.activeState.text}`
            }
            onPointerMove={(event) => onMove(event)}
            onPointerLeave={onPointerLeave}
            onContextMenu={openContextMenu}
            onPointerEnter={onPointerEnter}
        />
    );
};

export default observer(ElementAnalogValue);
