import {
    Button,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import { BaseEntity, IBaseStateOption } from "@scada/common";
import { AddNewEntityStateCommand } from "@scada/editor/utils/Command/Entities/AddNewEntityStateCommand";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";

interface IPropsSelectState {
    selectEntity: BaseEntity<IBaseStateOption>;
}

const SetupState = ({ selectEntity }: IPropsSelectState) => {
    const [idState, setIdState] = useState<number>(selectEntity.activeState.idState);
    const store = useStore();

    const handleChange = (e: SelectChangeEvent) => {
        const selectIdState = Number(e.target.value);
        if (idState !== selectIdState) {
            store.commandEditor.resetCommands();
            setIdState(Number(selectIdState));
            selectEntity.updateActiveState(Number(selectIdState));
        }
    };

    const addState = () => {
        store.commandEditor.execute(new AddNewEntityStateCommand(selectEntity));
        setIdState(Number(selectEntity.activeState.idState));
    };

    useEffect(() => {
        setIdState(selectEntity.activeState.idState);
    }, [selectEntity]);

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>Состояние</TableCell>
                    <TableCell>
                        <InputLabel id="select-state-entity-label"></InputLabel>
                        <Select
                            id="select-state-entity"
                            labelId="select-state-entity-label"
                            value={selectEntity.activeState.idState.toString()}
                            onChange={handleChange}
                        >
                            {selectEntity.states.map((state) => {
                                return (
                                    <MenuItem key={state.idState} value={state.idState}>
                                        {state.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        <Button onClick={addState}>Добавить состояние</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default observer(SetupState);
