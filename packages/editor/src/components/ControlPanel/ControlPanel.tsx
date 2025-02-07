import { Button, IconButton, Popover, Tooltip } from "@mui/material";
import style from "./style.module.css";
import { useCustomHistory } from "@algont/m7-custom-history";
import { MouseEvent, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";
import { ExitToApp, Redo, Undo } from "@mui/icons-material";
import { KeyboardEventType } from "@scada/common";
import SaveIcon from "@mui/icons-material/Save";
import ConstructionIcon from "@mui/icons-material/Construction";
import { saveAs } from "file-saver";
import { ISelectPlanResponse } from "@scada/common";
import ImportPlan from "../ImportPlan/ImportPlan";

const ControlPanel = () => {
    const history = useCustomHistory();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openProjectMenu, setOpenProjectMenu] = useState<boolean>(false);
    const idListener = useRef<string>("");
    const idListenerSave = useRef<string>("");
    const store = useStore();

    const onClickClose = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (history) {
            history.go("/");
        }
    };

    const onClickOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenProjectMenu(true);
    };

    const closeProjectMenu = () => {
        setAnchorEl(null);
        setOpenProjectMenu(false);
    };

    const savePlan = async () => {
        store.commandEditor.resetCommands();
        await store.editorSelectPlan.saveData();
    };

    const saveFile = () => {
        closeProjectMenu();
        const data = store.editorSelectPlan.saveFilePlan();
        if (!data) return;
        const blob = new Blob([data], { type: "application/json" });
        saveAs(blob, `${store.editorSelectPlan.selectPlan?.idMnemonicScheme}.json`);
    };

    const handleClickUndo = () => {
        store.commandEditor.undo();
    };

    const handleClickRedo = () => {
        store.commandEditor.redo();
    };

    const onMount = () => {
        const { id } = store.sharedEventBus.eventBus.add(KeyboardEventType.KeyZWithCtrl, () =>
            handleClickUndo(),
        );

        store.sharedEventBus.eventBus.add(KeyboardEventType.KeyYWithCtrl, () => handleClickRedo());

        const saveListener = store.sharedEventBus.eventBus.add(KeyboardEventType.KeySWithCtrl, () =>
            savePlan(),
        );

        idListener.current = id;
        idListenerSave.current = saveListener.id;
    };

    const onUnmount = () => {
        store.sharedEventBus.eventBus.remove(idListener.current);
        store.sharedEventBus.eventBus.remove(idListenerSave.current);
    };

    useEffect(() => {
        onMount();

        return () => {
            onUnmount();
        };
    }, []);

    const handleClickOpenWindowLibraryEntity = () => {
        store.editorInterface.openWindowLibraryEntity();
    };

    const openImportDialog = (): void => {
        closeProjectMenu();
        setOpenDialog(true);
    };

    const closeImportDialog = (): void => {
        setOpenDialog(false);
    };

    const saveImportPlan = async (dataPlan: ISelectPlanResponse) => {
        try {
            await store.editorSelectPlan.importPlan(dataPlan);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    };

    return (
        <>
            <div className={style.containerPanel}>
                <div className={style.leftAlignedButtons}>
                    <Button
                        className={style.panelButton}
                        variant="contained"
                        onClick={onClickOpenPopover}
                    >
                        Проект
                    </Button>
                    <Popover
                        open={openProjectMenu}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        onClose={closeProjectMenu}
                    >
                        <div className={style.containerPopover}>
                            <Button variant="contained" onClick={savePlan} endIcon={<SaveIcon />}>
                                Сохранить план
                            </Button>
                            <Button variant="contained" onClick={saveFile} endIcon={<SaveIcon />}>
                                Сохранить файл
                            </Button>
                            <Button variant="contained" onClick={() => openImportDialog()}>
                                Импортировать план
                            </Button>
                            <Button
                                variant="contained"
                                onClick={(event) => onClickClose(event)}
                                endIcon={<ExitToApp />}
                            >
                                Выйти
                            </Button>
                        </div>
                    </Popover>
                    <Tooltip title="Библиотека объектов">
                        <span>
                            <Button
                                variant="text"
                                disabled={store.editorInterface.isOpenWindowLibraryEntity}
                                onClick={handleClickOpenWindowLibraryEntity}
                                startIcon={<ConstructionIcon />}
                            />
                        </span>
                    </Tooltip>
                    <Tooltip title="Назад (Ctrl + Z)">
                        <span>
                            <Button
                                variant="text"
                                disabled={store.commandEditor.undoEnable}
                                onClick={handleClickUndo}
                                startIcon={<Undo />}
                            />
                        </span>
                    </Tooltip>
                    <Tooltip title="Вперед (Ctrl + Y)">
                        <span>
                            <Button
                                variant="text"
                                disabled={store.commandEditor.doEnable}
                                onClick={handleClickRedo}
                                startIcon={<Redo />}
                            />
                        </span>
                    </Tooltip>
                </div>
                <Tooltip title="Выйти">
                    <span>
                        <IconButton
                            className={`${style.panelButton} ${style.rightAlignedButton}`}
                            aria-label="exit"
                            color="default"
                            onClick={(event) => onClickClose(event)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </div>
            <div>
                <ImportPlan
                    open={openDialog}
                    onClose={() => closeImportDialog()}
                    savePlan={(dataPlan) => saveImportPlan(dataPlan)}
                />
            </div>
        </>
    );
};

export default observer(ControlPanel);
