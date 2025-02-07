import { EntityType, ImageModel } from "@scada/common";
import { IImageState } from "@scada/common/src/interfaces/entities/customState/IImageState";
import { IBaseEntityOption } from "@scada/common/src/interfaces/entities/IBaseEntityOption";
import { v4 as uuidv4 } from "uuid";

const state = (idState: number): IImageState => {
    const state: IImageState = {
        idState: idState,
        name: `Состояние ${idState}`,
        priority: 1,
        active: true,
        fill: "gray",
        fillEnabled: false,
        stroke: "black",
        strokeWidth: 4,
        strokeEnabled: false,
        visible: true,
        opacity: 1,
        imageId: "default",
    };
    return state;
};

const image = (idPlan: string) => {
    const initBaseOption: IBaseEntityOption = {
        id: uuidv4(),
        idGroup: 0,
        idPlan: idPlan,
        idLayer: "1",
        name: "Картинка",
        frame: {
            scaleX: 1,
            scaleY: 1,
            x: 30,
            y: 30,
            type: EntityType.Image,
            rotation: 0,
            width: 100,
            height: 100,
        },
        commands: [],
        states: [],
    };

    const initState: IImageState[] = [state(1)];
    return new ImageModel(initBaseOption, initState);
};

const DefaultShapeImage = {
    image,
    state,
};

export default DefaultShapeImage;
