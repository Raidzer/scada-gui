import { EntityType } from "@scada/common/enums/entity/EntityType";
import { IScaleState } from "@scada/common/interfaces/entities/customState/IScaleState";
import { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";
import { ScaleModel } from "@scada/common/models/Elements/ScaleModel";
import { v4 as uuidv4 } from "uuid";

const state = (idState: number): IScaleState => {
    const state = {
        idState: idState,
        name: `Состояние ${idState}`,
        priority: 1,
        active: true,
        fill: "green",
        fillEnabled: true,
        stroke: "black",
        strokeWidth: 4,
        strokeEnabled: true,
        visible: true,
        opacity: 1,
        maxValue: 10,
        minValue: 0,
        fillScale: "blue",
    };
    return state;
};

const scale = (idPlan: string) => {
    const initBaseOption: IBaseEntityOption = {
        id: uuidv4(),
        idGroup: 0,
        idPlan: idPlan,
        idLayer: "1",
        name: "Шкала",
        frame: {
            scaleX: 1,
            scaleY: 1,
            x: 30,
            y: 30,
            type: EntityType.Scale,
            rotation: 0,
            width: 50,
            height: 200,
        },
        commands: [],
        states: [],
    };

    const initState: IScaleState[] = [state(1)];
    return new ScaleModel(initBaseOption, initState);
};

const DefaultShapeScale = {
    scale,
    state,
};

export default DefaultShapeScale;
