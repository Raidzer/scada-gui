import AddIcon from "@mui/icons-material/Add";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Menu,
    MenuItem,
    Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { PlanModel } from "@scada/common";
import { CreatePlanCommand } from "@scada/editor/utils/Command/Plan/CreatePlanCommand";
import { DeletePlanCommand } from "@scada/editor/utils/Command/Plan/DeletePlanCommand";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";
import React, { useState } from "react";
import style from "./style.module.css";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PlanSelectionPanel = () => {
    const store = useStore();
    const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false);
    const [selectedPlanForContextMenu, setSelectedPlanForContextMenu] = useState<PlanModel | null>(
        null,
    );
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

    const unselectEntities = () => {
        store.editorSelectPlan.unselectEntities();
    };

    const handleClickChangePlan = (idPlan: string) => {
        unselectEntities();
        store.editorSelectPlan.changeSelectPlan(idPlan);
    };

    const handleClickAddPlan = () => {
        unselectEntities();
        store.commandEditor.execute(new CreatePlanCommand(store.editorSelectPlan));
    };

    const handleClickOpenContextMenu = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        plan: PlanModel,
    ) => {
        e.preventDefault();
        setSelectedPlanForContextMenu(plan);
        setAnchorElement(e.currentTarget);
        setContextMenuOpen(true);
    };

    const handleClickConfirmDelete = () => {
        if (selectedPlanForContextMenu) {
            store.commandEditor.execute(
                new DeletePlanCommand(store.editorSelectProject, selectedPlanForContextMenu),
            );
            if (
                selectedPlanForContextMenu.idMnemonicScheme ===
                store.editorSelectPlan.selectPlan?.idMnemonicScheme
            ) {
                store.editorSelectPlan.getFirstPlan();
            }
        }
        confirmDialogClose();
    };

    const contextMenuClose = () => {
        setContextMenuOpen(false);
        setAnchorElement(null);
    };

    const confirmDialogClose = () => {
        setOpenConfirmDialog(false);
    };

    const handleClickDeleteSelectedPlan = () => {
        contextMenuClose();
        setOpenConfirmDialog(true);
    };

    return (
        <>
            <div className={style.controlPanel}>
                {store.editorSelectProject.allPlans.map((plan) => {
                    return (
                        <Button
                            key={plan.idMnemonicScheme}
                            variant={
                                store.editorSelectPlan.selectPlan?.idMnemonicScheme ===
                                plan.idMnemonicScheme
                                    ? "contained"
                                    : "outlined"
                            }
                            className={style.buttonPlan}
                            onClick={() => handleClickChangePlan(plan.idMnemonicScheme)}
                            onContextMenu={(e) => handleClickOpenContextMenu(e, plan)}
                        >
                            {plan.name}
                        </Button>
                    );
                })}
                <Button
                    className={style.buttonAddPlan}
                    onClick={handleClickAddPlan}
                    variant="outlined"
                >
                    <AddIcon />
                </Button>
            </div>
            <Menu open={contextMenuOpen} onClose={contextMenuClose} anchorEl={anchorElement}>
                <MenuItem onClick={handleClickDeleteSelectedPlan}>Удалить</MenuItem>
            </Menu>
            <Dialog
                open={openConfirmDialog}
                onClose={confirmDialogClose}
                keepMounted
                TransitionComponent={Transition}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogTitle>
                        {`Вы уверены что хотите удалить ${selectedPlanForContextMenu?.name}?`}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={confirmDialogClose}>Отмена</Button>
                        <Button onClick={handleClickConfirmDelete}>Удалить</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default observer(PlanSelectionPanel);
