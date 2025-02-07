import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface ISaveImageProps {
    open: boolean;
    onClose: () => void;
}

const SaveImage: React.FC<ISaveImageProps> = ({ onClose, open }) => {
    
    const saveImage = () => {
        console.log("Save image");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Загрузка изображения</DialogTitle>
            <DialogContent>Загрузка изображения на сервер...</DialogContent>
            <DialogActions>
                <Button>Сохранить изображение</Button>
                <Button>Отмена</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SaveImage;
