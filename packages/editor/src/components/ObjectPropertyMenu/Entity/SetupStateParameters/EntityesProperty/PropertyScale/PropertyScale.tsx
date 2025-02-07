import { TableCell, TableRow, TextField } from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useInput } from "@scada/common";
import { useStore } from "@scada/state";
import { ScaleModel } from "@scada/common";
import { UpdateMinValueCommand } from "@scada/editor/utils/Command/Entities/Scale/UpdateMinValueCommand";
import { UpdateMaxValueCommand } from "@scada/editor/utils/Command/Entities/Scale/UpdateMaxValueCommand";

interface IPropsPropertyScale {
    entity: ScaleModel;
}

const PropertyScale: React.FC<IPropsPropertyScale> = ({ entity }) => {
    const store = useStore();
    const minValue = useInput<number>(entity.activeState.minValue);
    const maxValue = useInput<number>(entity.activeState.maxValue);

    useEffect(() => {
        if (entity.activeState.minValue !== minValue.value) {
            console.log(minValue.value)
            store.commandEditor.execute(new UpdateMinValueCommand(entity, minValue.value));
        }
    }, [minValue.value]);

    useEffect(() => {
        if (entity.activeState.maxValue !== maxValue.value) {
            store.commandEditor.execute(new UpdateMaxValueCommand(entity, maxValue.value));
        }
    }, [maxValue.value]);

    return (
        <>
            <TableRow>
                <TableCell>Минимальное значение</TableCell>
                <TableCell>
                    <TextField variant="outlined" {...minValue} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Максимальное значение</TableCell>
                <TableCell>
                    <TextField variant="outlined" {...maxValue} />
                </TableCell>
            </TableRow>
        </>
    );
};

export default observer(PropertyScale);
