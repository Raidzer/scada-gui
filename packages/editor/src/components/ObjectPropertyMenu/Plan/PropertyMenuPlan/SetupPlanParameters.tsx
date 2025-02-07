import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { PlanModel, TIME_DEBOUNCE_MS, useInput } from "@scada/common";
import { UpdateBackgroundColorCommand } from "@scada/editor/utils/Command/Plan/UpdateBackgroundColorCommand";
import { UpdatePlanNameCommand } from "@scada/editor/utils/Command/Plan/UpdatePlanNameCommand";
import { UpdateSizePlanCommand } from "@scada/editor/utils/Command/Plan/UpdateSizePlanCommand";
import { useStore } from "@scada/state";
import { debounce } from "lodash";
import { observer } from "mobx-react";
import { MuiColorInput } from "mui-color-input";
import { useEffect, useState } from "react";

const SetupPlanParameters = () => {
    const store = useStore();
    const name = useInput<string>(store.editorSelectPlan.selectPlan?.name ?? "");
    const width = useInput<number>(store.editorSelectPlan.selectPlan?.width ?? 0);
    const height = useInput<number>(store.editorSelectPlan.selectPlan?.height ?? 0);
    const [selectPlan, setSelectPlan] = useState<PlanModel | null>(
        store.editorSelectPlan.selectPlan,
    );

    const onHandleChangeBackgroundColor = (color: string) => {
        if (selectPlan && selectPlan.backgroundColor !== color) {
            store.commandEditor.execute(new UpdateBackgroundColorCommand(selectPlan, color));
        }
    };

    useEffect(() => {
        const selectNewPlan = store.editorSelectPlan.selectPlan;
        if (selectNewPlan && selectPlan !== selectNewPlan) {
            setSelectPlan(selectNewPlan);
        }
    }, [store.editorSelectPlan.selectPlan]);

    useEffect(() => {
        if (selectPlan && selectPlan.name !== name.value) {
            const debouncedUpdateName = debounce(() => {
                store.commandEditor.execute(new UpdatePlanNameCommand(selectPlan, name.value));
            }, TIME_DEBOUNCE_MS);
            debouncedUpdateName();

            return () => debouncedUpdateName.cancel();
        }
    }, [name.value]);

    useEffect(() => {
        if (
            selectPlan &&
            (selectPlan.width !== width.value || selectPlan.height !== height.value)
        ) {
            const debouncedUpdateSize = debounce(() => {
                store.commandEditor.execute(
                    new UpdateSizePlanCommand(selectPlan, {
                        width: width.value,
                        height: height.value,
                    }),
                );
            }, TIME_DEBOUNCE_MS);

            debouncedUpdateSize();

            return () => debouncedUpdateSize.cancel();
        }
    }, [width.value, height.value, selectPlan]);

    return (
        <>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                    <Typography> Настройки параметров</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Название плана</TableCell>
                                <TableCell>
                                    <TextField variant="outlined" {...name} />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Высота</TableCell>
                                <TableCell>
                                    <TextField
                                        variant="outlined"
                                        {...height}
                                        InputProps={{
                                            inputProps: {
                                                pattern: "[0-9]*",
                                                inputMode: "numeric",
                                            },
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Ширина</TableCell>
                                <TableCell>
                                    <TextField
                                        variant="outlined"
                                        {...width}
                                        InputProps={{
                                            inputProps: {
                                                pattern: "[0-9]*",
                                                inputMode: "numeric",
                                            },
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Цвет фона</TableCell>
                                <TableCell>
                                    <MuiColorInput
                                        format="hex"
                                        value={
                                            store.editorSelectPlan.selectPlan?.plan
                                                .backgroundColor ?? "white"
                                        }
                                        onChange={onHandleChangeBackgroundColor}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default observer(SetupPlanParameters);
