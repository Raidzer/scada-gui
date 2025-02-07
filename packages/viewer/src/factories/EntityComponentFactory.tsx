import {
    AnalogValueModel,
    BaseEntity,
    IBaseStateOption,
    ImageModel,
    RectangleModel,
    ScaleModel,
    TextModel,
} from "@scada/common";
import ElementAnalogValue from "@scada/viewer/components/Elements/AnalogValue/ElementAnalogValue";
import ElementRectangle from "@scada/viewer/components/Elements/Rectangle/ElementRectangle";
import ElementScale from "@scada/viewer/components/Elements/Scale/ElementScale";
import ElementText from "@scada/viewer/components/Elements/Text/ElementText";
import React from "react";
import Image from "../components/Elements/Image/Image";

export class EntityComponentFactory {
    static createComponent(entity: BaseEntity<IBaseStateOption>): React.ReactNode {
        if (entity instanceof TextModel) {
            return <ElementText key={entity.id} entity={entity} />;
        }
        if (entity instanceof RectangleModel) {
            return <ElementRectangle key={entity.id} entity={entity} />;
        }
        if (entity instanceof ScaleModel) {
            return <ElementScale key={entity.id} entity={entity} />;
        }
        if (entity instanceof AnalogValueModel) {
            return <ElementAnalogValue key={entity.id} entity={entity} />;
        }
        if (entity instanceof ImageModel) {
            return <Image key={entity.id} entity={entity} />;
        }
        return null;
    }
}
