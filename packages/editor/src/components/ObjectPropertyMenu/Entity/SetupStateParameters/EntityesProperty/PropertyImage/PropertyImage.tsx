import { Button, TableCell, TableRow } from "@mui/material";
import { ImageModel } from "@scada/common";
import ImageLibrary from "@scada/editor/components/ImageLibrary/ImageLibrary";
import { UpdateImageIdCommand } from "@scada/editor/utils/Command/Entities/Image/UpdateImageIdCommand";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";
import React from "react";

interface IPropertyImageProps {
    entity: ImageModel;
}

const PropertyImage: React.FC<IPropertyImageProps> = ({ entity }) => {
    const store = useStore();

    const handleClickChangeImage = () => {
        store.icon.openImageLibrary();
    };

    const handleOk = (imageId: string) => {
        store.commandEditor.execute(new UpdateImageIdCommand(entity, imageId));
    };

    return (
        <>
            <TableRow>
                <TableCell>Выберите изображение</TableCell>
                <TableCell>
                    <Button onClick={handleClickChangeImage}>
                        {store.icon.getImage(entity.activeState.imageId).name}
                    </Button>
                </TableCell>
            </TableRow>
            <ImageLibrary entity={entity} saveChange={handleOk} />
        </>
    );
};

export default observer(PropertyImage);
