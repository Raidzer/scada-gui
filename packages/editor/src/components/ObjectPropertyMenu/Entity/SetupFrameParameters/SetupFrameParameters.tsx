import { Input, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { BaseEntity, IBaseStateOption, TIME_DEBOUNCE_MS, useInput } from "@scada/common";
import { DragElementCommand } from "@scada/editor/utils/Command/Entities/DragElementCommand";
import { useStore } from "@scada/state";
import { Vector2d } from "konva/lib/types";
import { debounce } from "lodash";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

interface ISetupFrameParameters {
    entity: BaseEntity<IBaseStateOption>;
}

const SetupFrameParameters: React.FC<ISetupFrameParameters> = ({ entity }) => {
    const [position, setPosition] = useState<Vector2d>(entity.frame.positionFrame);
    const posX = useInput<number>(entity.frame.positionFrame.x, true);
    const posY = useInput<number>(entity.frame.positionFrame.y, true);
    const store = useStore();

    useEffect(() => {
        if (
            position.x !== entity.frame.positionFrame.x ||
            position.y !== entity.frame.positionFrame.y
        ) {
            setPosition(entity.frame.positionFrame);
        }
    }, [entity.frame.positionFrame, []]);

    useEffect(() => {
        const debouncedUpdatePosX = debounce(
            (x, y) => commandChangePosition({ x, y }),
            TIME_DEBOUNCE_MS,
        );
        if (
            posX.value !== entity.frame.positionFrame.x ||
            posY.value !== entity.frame.positionFrame.y
        ) {
            debouncedUpdatePosX(posX.value, posY.value);
        }

        return () => debouncedUpdatePosX.cancel();
    }, [posX.value, posY.value]);

    const commandChangePosition = (pos: Vector2d): void => {
        store.commandEditor.execute(new DragElementCommand(entity, pos));
    };

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>Координата Х:</TableCell>
                    <TableCell>
                        <Input
                            value={Math.round(posX.value)}
                            size="small"
                            onChange={posX.onChange}
                            inputProps={{
                                type: "number",
                                min: 0,
                            }}
                            style={{ maxWidth: "50px" }}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Координата Y:</TableCell>
                    <TableCell>
                        <Input
                            value={Math.floor(posY.value)}
                            size="small"
                            onChange={posY.onChange}
                            inputProps={{
                                type: "number",
                                min: 0,
                            }}
                            style={{ maxWidth: "50px" }}
                        />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default observer(SetupFrameParameters);
