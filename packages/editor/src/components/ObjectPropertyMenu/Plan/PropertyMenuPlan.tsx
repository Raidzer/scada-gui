import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Accordion, AccordionSummary, Button, Typography } from "@mui/material";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";
import LayerMenuPlan from "./LayerMenuPlan/LayerMenuPlan";
import SetupPlanParameters from "./PropertyMenuPlan/SetupPlanParameters";

const PropertyMenuPlan = () => {
    const store = useStore();

    const handleClickAddLayer = () => {
        store.editorSelectPlan.selectPlan?.addNewLayer();
    };

    return (
        <>
            <SetupPlanParameters />
            <Accordion>
                <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                    <Typography> Настройка слоев</Typography>
                </AccordionSummary>
                <Button onClick={handleClickAddLayer}>Добавить слой</Button>
                {store.editorSelectPlan.selectPlan?.layers.map((layer) => {
                    return <LayerMenuPlan key={layer.id} layer={layer} />;
                })}
            </Accordion>
        </>
    );
};

export default observer(PropertyMenuPlan);
