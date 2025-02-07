import { EntityType } from "@scada/common/enums/entity/EntityType";
import { ITextState } from "@scada/common/interfaces/entities/customState/ITextState";
import { IBaseEntityOption } from "@scada/common/interfaces/entities/IBaseEntityOption";
import { TextModel } from "@scada/common/models/Elements/TextModel";
import { v4 as uuidv4 } from "uuid";

const state = (idState: number): ITextState => {
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
        text: "Я пример текста",
        fontFamily: "Calibri",
        fontSize: 30,
        fontStyle: "normal",
        align: "",
        verticalAlign: "",
    };
    return state;
};

const text = (idPlan: string) => {
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
            type: EntityType.Text,
            rotation: 0,
            width: 100,
            height: 50,
        },
        commands: [],
        states: [],
    };

    const initState: ITextState[] = [state(1)];
    return new TextModel(initBaseOption, initState);
};

const DefaultShapeText = {
    text,
    state,
};

export default DefaultShapeText;
