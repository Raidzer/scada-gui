import {
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TableCell,
    TableRow,
    TextField,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useInput } from "@scada/common";
import { useStore } from "@scada/state";
import { AnalogValueModel } from "@scada/common";
import { UpdateTextEntityCommand } from "@scada/editor/utils/Command/Entities/Text/UpdateTextEntityCommand";
import { UpdateFontStyleCommand } from "@scada/editor/utils/Command/Entities/Text/UpdateFontStyleCommand";
import { UpdateFontSizeCommand } from "@scada/editor/utils/Command/Entities/Text/UpdateFontSizeCommand";

interface IPropsPropertyAnalogValue {
    entity: AnalogValueModel;
}

const PropertyAnalogValue: React.FC<IPropsPropertyAnalogValue> = ({ entity }) => {
    const store = useStore();
    const [text, setText] = useState(entity.activeState.text);
    const fontSize = useInput<number>(entity.activeState.fontSize);

    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setText(() => e.target.value);
        store.commandEditor.execute(new UpdateTextEntityCommand(entity, e.target.value));
    };

    const handleChangeTextStyle = (e: SelectChangeEvent) => {
        if (entity.activeState.fontStyle !== e.target.value) {
            store.commandEditor.execute(new UpdateFontStyleCommand(entity, e.target.value));
        }
    };

    useEffect(() => {
        if (entity.activeState.fontSize !== fontSize.value) {
            store.commandEditor.execute(new UpdateFontSizeCommand(entity, fontSize.value));
        }
    }, [fontSize.value]);

    return (
        <>
            <TableRow>
                <TableCell>Единицы измерения</TableCell>
                <TableCell>
                    <TextField value={text} variant="outlined" onChange={handleChangeText} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Размер шрифта</TableCell>
                <TableCell>
                    <TextField variant="outlined" {...fontSize} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Стиль шрифта</TableCell>
                <TableCell>
                    <InputLabel id="select-font-entity-label" />
                    <Select
                        id="select-font-entity"
                        labelId="select-font-entity-label"
                        value={entity.activeState.fontStyle}
                        onChange={handleChangeTextStyle}
                    >
                        <MenuItem value="normal">Нормальный</MenuItem>
                        <MenuItem value="italic">Italic</MenuItem>
                        <MenuItem value="bold">Жирный</MenuItem>
                    </Select>
                </TableCell>
            </TableRow>
        </>
    );
};

export default observer(PropertyAnalogValue);
