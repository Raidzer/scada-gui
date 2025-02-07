import { Menu, MenuItem } from "@mui/material";
import { IChangeTmRequest, scadaEvent } from "@scada/common";
import { useStore } from "@scada/state";
import axios from "axios";
import { observer } from "mobx-react";

const ContextMenuViewer = () => {
    const store = useStore();
    const { contextMenu } = store.viewerInterface;

    const closeContextMenu = () => {
        contextMenu.hide();
    };

    const sendEvent = async (data: IChangeTmRequest) => {
        try {
            await axios.post<IChangeTmRequest>(scadaEvent(), JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });
        } catch (e) {
            console.log("Failed to send event");
        }
    };

    const handleClickOn = () => {
        const data = contextMenu.entity?.dataForChangeTmRequest(true);
        if (data) {
            sendEvent(data);
        }
        closeContextMenu();
    };

    const handleClickOff = () => {
        const data = contextMenu.entity?.dataForChangeTmRequest(false);
        if (data) {
            sendEvent(data);
        }
        closeContextMenu();
    };

    return (
        <Menu
            anchorReference="anchorPosition"
            anchorPosition={{
                top: contextMenu.pointerPosition.y,
                left: contextMenu.pointerPosition.x,
            }}
            open={contextMenu.isShow}
            onClose={closeContextMenu}
        >
            <MenuItem onClick={handleClickOn}>Включить</MenuItem>
            <MenuItem onClick={handleClickOff}>Выключить</MenuItem>
        </Menu>
    );
};

export default observer(ContextMenuViewer);
