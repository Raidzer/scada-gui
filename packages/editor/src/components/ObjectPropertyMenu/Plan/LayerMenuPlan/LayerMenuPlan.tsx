import { Box, Button, Grid, Input, Slider, Typography } from "@mui/material";
import { MAX_SCALE_PLAN, MIN_SCALE_PLAN, TIME_DEBOUNCE_MS } from "@scada/common";
import LayerModel from "@scada/common/src/models/layer/LayerModel";
import { UpdateLayerRangeScaleCommand } from "@scada/editor/utils/Command/Layer/UpdateLayerRangeScaleCommand";
import { useStore } from "@scada/state";
import { debounce } from "lodash";
import { observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";

interface IPropsLayerMenuPlan {
    layer: LayerModel;
}

const STEP = 0.01;

const LayerMenuPlan: React.FC<IPropsLayerMenuPlan> = ({ layer }) => {
    const store = useStore();
    const [rangeScale, setRangeScale] = useState<number[]>(layer.rangeScale);
    const valueText = (value: number) => {
        return `${value}`;
    };

    const changeScaleRange = useCallback(
        debounce((newValue: number[]) => {
            store.commandEditor.execute(new UpdateLayerRangeScaleCommand(layer, newValue));
        }, TIME_DEBOUNCE_MS),
        [],
    );

    const updateRangeScale = (range: number[]) => {
        setRangeScale(range);
        changeScaleRange(range);
    };

    useEffect(() => {
        setRangeScale(layer.rangeScale);
    }, [layer.scaleMax, layer.scaleMin]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        updateRangeScale(newValue);
    };

    const handleBlur = () => {
        if (rangeScale[0] < MIN_SCALE_PLAN) {
            setRangeScale([MIN_SCALE_PLAN, rangeScale[1]]);
        } else if (rangeScale[1] > MAX_SCALE_PLAN) {
            setRangeScale([rangeScale[0], MAX_SCALE_PLAN]);
        }
    };

    const handleInputChangeMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRangeScale =
            event.target.value === ""
                ? [rangeScale[0], MAX_SCALE_PLAN]
                : [rangeScale[0], Number(event.target.value)];
        updateRangeScale(newRangeScale);
    };

    const handleInputChangeMinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRangeScale =
            event.target.value === ""
                ? [MIN_SCALE_PLAN, rangeScale[1]]
                : [Number(event.target.value), rangeScale[1]];
        updateRangeScale(newRangeScale);
    };

    const deleteLayer = () => {
        store.editorSelectPlan.selectPlan?.deleteLayer(layer.id);
    };

    return (
        <Box marginTop={layer.id === "1" ? 0 : 2}>
            <Box>
                <Typography id="input-slider" gutterBottom textAlign={"center"}>
                    {`Масштаб работы слоя ${layer.id}`}
                </Typography>
                <Button onClick={deleteLayer}>Удалить</Button>
            </Box>
            <Grid container spacing={2} sx={{ alignItems: "center" }}>
                <Grid item marginLeft={1} marginRight={1}>
                    <Input
                        value={rangeScale[0]}
                        size="small"
                        onChange={handleInputChangeMinValue}
                        onBlur={handleBlur}
                        inputProps={{
                            step: STEP,
                            min: MIN_SCALE_PLAN,
                            max: rangeScale[1],
                            type: "number",
                        }}
                    />
                </Grid>
                <Grid item xl>
                    <Slider
                        getAriaLabel={() => "Масштаб работы слоя"}
                        value={rangeScale}
                        step={STEP}
                        min={MIN_SCALE_PLAN}
                        max={MAX_SCALE_PLAN}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valueText}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={rangeScale[1]}
                        size="small"
                        onChange={handleInputChangeMaxValue}
                        onBlur={handleBlur}
                        inputProps={{
                            step: STEP,
                            min: rangeScale[0],
                            max: MAX_SCALE_PLAN,
                            type: "number",
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default observer(LayerMenuPlan);
