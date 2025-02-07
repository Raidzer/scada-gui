import {
    Checkbox,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
} from "@mui/material";
import { BaseEntity, IBaseStateOption, TypeTm, useInput } from "@scada/common";
import { PropertyEditorFactory } from "@scada/editor/factories/PropertyEditorFactory";
import { ChangeIdTmCommand } from "@scada/editor/utils/Command/Entities/ChangeIdTmCommand";
import { ChangeTypeTmCommand } from "@scada/editor/utils/Command/Entities/ChangeTypeTmCommand";
import { StrokeEnableEntityCommand } from "@scada/editor/utils/Command/Entities/StrokeEnableEntityCommand";
import { UpdateColorStrokeEntityCommand } from "@scada/editor/utils/Command/Entities/UpdateColorStrokeEntityCommand";
import { UpdateFillColorEntityCommand } from "@scada/editor/utils/Command/Entities/UpdateFillColorCommand";
import { UpdateNameStateCommand } from "@scada/editor/utils/Command/Entities/UpdateNameStateCommand";
import { UpdateOpacityEntityCommand } from "@scada/editor/utils/Command/Entities/UpdateOpacityEntityCommand";
import { UpdateStrokeWidthCommand } from "@scada/editor/utils/Command/Entities/UpdateStrokeWidthCommand";
import { useStore } from "@scada/state";
import { observer } from "mobx-react";
import { MuiColorInput } from "mui-color-input";
import { ChangeEvent, useEffect } from "react";


interface IPropsSetupStateParameters {
    selectEntity: BaseEntity<IBaseStateOption>;
}

const SetupStateParameters = ({ selectEntity }: IPropsSetupStateParameters) => {
    const store = useStore();
    const nameState = useInput<string>(selectEntity.activeState.name);
    const strokeWidth = useInput<number>(selectEntity.activeState.strokeWidth);
    const idTm = useInput<string>(selectEntity.descriptions.idTm);

    useEffect(() => {
        if (selectEntity && selectEntity.activeState.name !== nameState.value) {
            store.commandEditor.execute(new UpdateNameStateCommand(selectEntity, nameState.value));
        }
    }, [nameState.value]);

    const handleChangeEnableStroke = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (selectEntity && selectEntity.activeState.strokeEnabled !== checked) {
            store.commandEditor.execute(new StrokeEnableEntityCommand(selectEntity, checked));
        }
    };

    useEffect(() => {
        if (selectEntity && selectEntity.activeState.strokeWidth !== strokeWidth.value) {
            store.commandEditor.execute(
                new UpdateStrokeWidthCommand(selectEntity, strokeWidth.value),
            );
        }
    }, [strokeWidth.value]);

    useEffect(() => {
        if (selectEntity && selectEntity.descriptions.idTm !== idTm.value) {
            store.commandEditor.execute(new ChangeIdTmCommand(selectEntity, idTm.value));
        }
    }, [idTm.value]);

    const onHandleChangeBackgroundColor = (color: string) => {
        if (selectEntity && selectEntity.activeState.fill !== color) {
            store.commandEditor.execute(new UpdateFillColorEntityCommand(selectEntity, color));
        }
    };

    const onHandleChangeColorStroke = (color: string) => {
        if (selectEntity && selectEntity.activeState.stroke !== color) {
            store.commandEditor.execute(new UpdateColorStrokeEntityCommand(selectEntity, color));
        }
    };

    const handleChangeOpacity = (e: Event, value: number | number[]) => {
        if (selectEntity && selectEntity.activeState.opacity !== value) {
            store.commandEditor.execute(new UpdateOpacityEntityCommand(selectEntity, value));
        }
    };

    const handleChangeTypeTm = (e: SelectChangeEvent) => {
        if (selectEntity && selectEntity.descriptions.typeTm !== (e.target.value as TypeTm)) {
            store.commandEditor.execute(
                new ChangeTypeTmCommand(selectEntity, e.target.value as TypeTm),
            );
        }
    };

    return (
        <>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>ID объекта</TableCell>
                        <TableCell>{selectEntity.id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Тип сигнала</TableCell>
                        <TableCell>
                            <InputLabel id="select-type-tm-label" />
                            <Select
                                id="select-type-tm"
                                labelId="select-type-tm-label"
                                value={selectEntity.subscriptionsTm.typeTm}
                                onChange={handleChangeTypeTm}
                            >
                                {Object.values(TypeTm).map((type, index) => (
                                    <MenuItem
                                        key={index}
                                        value={type}
                                        selected={selectEntity.subscriptionsTm.typeTm === type}
                                    >
                                        {type === TypeTm.none ? "Нет" : type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Тег</TableCell>
                        <TableCell>
                            <TextField
                                variant="outlined"
                                {...idTm}
                                disabled={selectEntity.subscriptionsTm.typeTm === TypeTm.none}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Название состояния</TableCell>
                        <TableCell>
                            <TextField variant="outlined" {...nameState} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Фон</TableCell>
                        <TableCell>
                            <Checkbox
                                onChange={(e, checked) => selectEntity.updateEnabledFill(checked)}
                                checked={selectEntity.activeState.fillEnabled}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Цвет фона</TableCell>
                        <TableCell>
                            <MuiColorInput
                                format="hex"
                                value={selectEntity.activeState.fill ?? "white"}
                                onChange={onHandleChangeBackgroundColor}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Контур</TableCell>
                        <TableCell>
                            <Checkbox
                                onChange={handleChangeEnableStroke}
                                checked={selectEntity.activeState.strokeEnabled}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Цвет контура</TableCell>
                        <TableCell>
                            <MuiColorInput
                                format="hex"
                                value={selectEntity.activeState.stroke ?? "white"}
                                onChange={onHandleChangeColorStroke}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Толщина контура</TableCell>
                        <TableCell>
                            <TextField variant="outlined" {...strokeWidth} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Прозрачность</TableCell>
                        <TableCell>
                            <Slider
                                aria-label="Прозрачность"
                                defaultValue={selectEntity.activeState.opacity}
                                value={selectEntity.activeState.opacity}
                                marks
                                valueLabelDisplay="auto"
                                step={0.1}
                                min={0}
                                max={1}
                                onChange={handleChangeOpacity}
                            />
                        </TableCell>
                    </TableRow>
                    {PropertyEditorFactory.createProperty(selectEntity)}
                </TableBody>
            </Table>
        </>
    );
};

export default observer(SetupStateParameters);
