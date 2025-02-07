import { Delete } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
} from "@mui/material";
import { ImageModel } from "@scada/common";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";
import { MuiFileInput } from "mui-file-input";
import React, { MouseEvent, useState } from "react";
import style from "./style.module.css";

interface IImageLibraryProps {
    entity?: ImageModel;
    saveChange?: (imageId: string) => void;
}

const ImageLibrary: React.FC<IImageLibraryProps> = ({ entity, saveChange }) => {
    const [selectedImageId, setSelectedImageId] = useState(entity?.activeState.imageId);
    const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [idDeleteImage, setIdDeleteImage] = useState<string | null>(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const store = useStore();

    const closeImageLibrary = () => {
        store.icon.closeImageLibrary();
        setFile(null);
        setIdDeleteImage(null);
        setShowConfirmDelete(false);
    };

    const handleCancel = () => {
        closeImageLibrary();
    };

    const handleOk = () => {
        if (selectedImageId && selectedImageId !== entity?.activeState.imageId && saveChange) {
            saveChange(selectedImageId);
        }
        closeImageLibrary();
    };

    const handleFileChange = (newFile: File | null) => {
        setFile(newFile);
        if (newFile) {
            store.icon.saveImage(newFile);
        }
    };

    const handleClickDeleteImage = (e: MouseEvent<HTMLButtonElement>, idDeleteItem: string) => {
        e.stopPropagation();
        setIdDeleteImage(idDeleteItem);
        setShowConfirmDelete(true);
    };

    const confirmDelete = async () => {
        if (idDeleteImage) {
            try {
                await store.icon.deleteImageFromServer(idDeleteImage);
                setIsFadingOut(true);
                setTimeout(() => {
                    store.icon.deleteImage(idDeleteImage);
                    setIdDeleteImage(null);
                    setShowConfirmDelete(false);
                    setIsFadingOut(false);
                }, 1000);
            } catch (error) {
                console.warn(error);
            }
        }
    };

    const cancelDelete = () => {
        setIdDeleteImage(null);
        setShowConfirmDelete(false);
    };

    return (
        <Dialog open={store.icon.openDialog} onClose={handleCancel}>
            <DialogTitle>Выберите изображение</DialogTitle>
            <DialogContent>
                <ImageList>
                    {store.icon.getImageArray().map((image) => {
                        const isDeleting = idDeleteImage === image.id && showConfirmDelete;
                        return (
                            <ImageListItem
                                key={image.id}
                                onClick={() => setSelectedImageId(image.id)}
                                onMouseEnter={() => setHoveredImageId(image.id)}
                                onMouseLeave={() => setHoveredImageId(null)}
                                className={`
                                    ${style.imageItem}
                                    ${hoveredImageId === image.id ? style.imageItemHover : ""}
                                    ${selectedImageId === image.id ? style.imageItemSelected : ""}
                                    ${isDeleting && isFadingOut ? style.fadeOut : ""}
                                    `}
                            >
                                {isDeleting && (
                                    <div className={style.overlay}>
                                        <div className={style.confirmation}>
                                            <p>Точно ли удалить?</p>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={confirmDelete}
                                            >
                                                Да
                                            </Button>
                                            <Button variant="contained" onClick={cancelDelete}>
                                                Нет
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                <img src={image.url} loading="lazy" />
                                <ImageListItemBar
                                    title={image.name}
                                    actionIcon={
                                        image.id !== "default" && (
                                            <IconButton
                                                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                                aria-label="Удалить"
                                                onClick={(e) => handleClickDeleteImage(e, image.id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        )
                                    }
                                />
                            </ImageListItem>
                        );
                    })}
                </ImageList>
            </DialogContent>
            <DialogActions>
                <MuiFileInput
                    value={file}
                    onChange={handleFileChange}
                    label="Загрузить изображение"
                    InputProps={{
                        endAdornment: (
                            <IconButton color="primary" component="span">
                                <AttachFileIcon />
                            </IconButton>
                        ),
                    }}
                />
                <Button autoFocus onClick={handleCancel}>
                    Отмена
                </Button>
                <Button onClick={handleOk}>Выбрать</Button>
            </DialogActions>
        </Dialog>
    );
};

export default observer(ImageLibrary);
