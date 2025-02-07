import { TableContainer } from "@mui/material";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";
import PropertyMenuEntity from "./Entity/PropertyMenuEntity";
import PropertyMenuPlan from "./Plan/PropertyMenuPlan";

const ObjectPropertyMenu = () => {
    const store = useStore();
    return (
        <TableContainer>
            {store.editorSelectPlan.selectEntitiesList.length === 1 ? (
                <PropertyMenuEntity selectEntity={store.editorSelectPlan.selectEntitiesList[0]} />
            ) : (
                <PropertyMenuPlan />
            )}
        </TableContainer>
    );
};

export default observer(ObjectPropertyMenu);
