import { EntityType, IBaseEntityOption, IRectangleState, RectangleModel } from "@scada/common";
import { v4 as uuidv4 } from "uuid";

const state = (idState: number): IRectangleState => {
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
    };

    return state;
};

const rectangle = (idPlan: string) => {
    const initBaseOption: IBaseEntityOption = {
        id: uuidv4(),
        idGroup: 0,
        idPlan: idPlan,
        idLayer: "1",
        name: "Прямоугольник",
        frame: {
            scaleX: 1,
            scaleY: 1,
            x: 30,
            y: 30,
            type: EntityType.Rectangle,
            rotation: 0,
            width: 100,
            height: 100,
        },
        commands: [],
        states: [],
    };

    const initState: IRectangleState[] = [state(1)];
    return new RectangleModel(initBaseOption, initState);
};

const DefaultShapeRectangle = {
    rectangle,
    state,
};

export default DefaultShapeRectangle;
