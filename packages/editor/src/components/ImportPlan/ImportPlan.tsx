import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ISelectPlanResponse } from "@scada/common";
import { MuiFileInput } from "mui-file-input";
import React, { useState } from "react";

interface IPropsImportPlan {
    open: boolean;
    onClose: () => void;
    savePlan: (dataFile: ISelectPlanResponse) => Promise<void>;
}

const ImportPlan: React.FC<IPropsImportPlan> = ({ open, onClose, savePlan }) => {
    const [file, setFile] = useState<File | null>(null);
    const [importIsError, setImportIsError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("");

    const closeDialog = () => {
        onClose();
        setFile(null);
        setImportIsError(false);
        setErrorText("");
    };

    const selectFile = (file: File | null) => {
        setFile(file);
        setImportIsError(false);
    };

    const errorImportPlan = (message: string) => {
        setErrorText(message);
        setImportIsError(true);
    };

    const saveFile = async () => {
        if (!file) return;
        try {
            const dataFile = await file.text();
            const dataFileJSON = JSON.parse(dataFile);
            await savePlan(dataFileJSON as ISelectPlanResponse);
            closeDialog();
        } catch (error) {
            if (error instanceof Error) {
                errorImportPlan(`Ошибка при импорте файла: ${error.message}`);
            }
        }
    };

    return (
        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Импорт плана</DialogTitle>
            <DialogContent>
                <DialogContentText>Выберите файл JSON с конфигурацией плана:</DialogContentText>
                <MuiFileInput value={file} onChange={selectFile} inputProps={{ accept: ".json" }} />
                {importIsError && <p>{errorText}</p>}
            </DialogContent>
            <Button onClick={saveFile} disabled={!file}>
                Сохранить план
            </Button>
            <Button variant="contained" onClick={closeDialog}>
                Отмена
            </Button>
        </Dialog>
    );
};

export default ImportPlan;
