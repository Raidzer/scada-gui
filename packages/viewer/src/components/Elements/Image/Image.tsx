import { ImageModel } from "@scada/common";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";
import React from "react";
import KonvaGif from "./KonvaGif";
import KonvaImage from "./KonvaImage";

interface IImageProps {
    entity: ImageModel;
}

const Image: React.FC<IImageProps> = ({ entity }) => {
    const store = useStore();

    return (
        <>
            {!store.icon.getImage(entity.activeState.imageId).url.endsWith(".gif") && (
                <KonvaImage entity={entity} />
            )}
            {store.icon.getImage(entity.activeState.imageId).url.endsWith(".gif") && (
                <KonvaGif entity={entity} />
            )}
        </>
    );
};

export default observer(Image);
