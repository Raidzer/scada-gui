import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { BaseEntity, IBaseStateOption } from "@scada/common";
import { observer } from "mobx-react";
import SetupFrameParameters from "./SetupFrameParameters/SetupFrameParameters";
import SetupState from "./SetupState/SetupState";
import SetupStateParameters from "./SetupStateParameters/SetupStateParameters";

interface IPropsPropertyMenuEntity {
    selectEntity: BaseEntity<IBaseStateOption>;
}

const PropertyMenuEntity = ({ selectEntity }: IPropsPropertyMenuEntity) => {
    return (
        <>
            <Accordion>
                <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                    <Typography> Настройка параметров фрейма</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SetupFrameParameters entity={selectEntity} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                    <Typography> Настройка состояния</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SetupState selectEntity={selectEntity} />
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                    <Typography> Настройка параметров состояния</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SetupStateParameters selectEntity={selectEntity} />
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default observer(PropertyMenuEntity);
