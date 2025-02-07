import { ImageModel, useElementInteractionViewer } from "@scada/common";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";
import React from "react";
import { Image as ImageKonva } from "react-konva";
import useImage from "use-image";

interface IKonvaImageProps {
    entity: ImageModel;
}

const KonvaImage: React.FC<IKonvaImageProps> = ({ entity }) => {
    const { onMove, openContextMenu, onPointerEnter, onPointerLeave } =
        useElementInteractionViewer(entity);
    const store = useStore();
    const [image] = useImage(store.icon.getImage(entity.activeState.imageId).url);

    return (
        <ImageKonva
            id={`${entity.id}`}
            image={image}
            {...entity.frame}
            {...entity.activeState}
            fillEnabled={true}
            fill={entity.activeState.fillEnabled ? entity.activeState.fill : "transparent"}
            onPointerMove={(event) => onMove(event)}
            onPointerLeave={onPointerLeave}
            onContextMenu={(event) => openContextMenu(event)}
            onPointerEnter={onPointerEnter}
        />
    );
};

export default observer(KonvaImage);
