import { EntityType, IAnalogValueState, IBaseEntityOption, AnalogValueModel } from "@scada/common";
import { v4 as uuidv4 } from "uuid";

const state = (idState: number): IAnalogValueState => {
    const state = {
        idState: idState,
        name: `Состояние ${idState}`,
        priority: 1,
        active: true,
        fill: "gray",
        fillEnabled: true,
        stroke: "black",
        strokeWidth: 4,
        strokeEnabled: true,
        visible: true,
        opacity: 1,
        text: "",
        fontFamily: "Calibri",
        fontSize: 30,
        fontStyle: "normal",
        align: "",
        verticalAlign: "",
    };

    return state;
};

const analogValue = (idPlan: string) => {
    const initBaseOption: IBaseEntityOption = {
        id: uuidv4(),
        idGroup: 0,
        idPlan: idPlan,
        idLayer: "1",
        name: "Аналоговое значение",
        value: "0.0",
        frame: {
            scaleX: 1,
            scaleY: 1,
            x: 30,
            y: 30,
            type: EntityType.AnalogValue,
            rotation: 0,
            width: 100,
            height: 50,
        },
        commands: [],
        states: [],
    };

    const initState: IAnalogValueState[] = [state(1)];
    return new AnalogValueModel(initBaseOption, initState);
};

const DefaultShapeAnalogValue = {
    analogValue,
    state,
};

export default DefaultShapeAnalogValue;
