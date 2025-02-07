import {
    AnalogValueModel,
    BaseEntity,
    IBaseStateOption,
    ImageModel,
    ScaleModel,
    TextModel,
} from "@scada/common";
import React from "react";
import PropertyAnalogValue from "../components/ObjectPropertyMenu/Entity/SetupStateParameters/EntityesProperty/PropertyAnalogValue/PropertyAnalogValue";
import PropertyScale from "../components/ObjectPropertyMenu/Entity/SetupStateParameters/EntityesProperty/PropertyScale/PropertyScale";
import PropertyText from "../components/ObjectPropertyMenu/Entity/SetupStateParameters/EntityesProperty/PropertyText/PropertyText";
import PropertyImage from "../components/ObjectPropertyMenu/Entity/SetupStateParameters/EntityesProperty/PropertyImage/PropertyImage";

export class PropertyEditorFactory {
    static createProperty(entity: BaseEntity<IBaseStateOption>): React.ReactNode {
        if (entity instanceof TextModel) {
            return <PropertyText entity={entity} />;
        }
        if (entity instanceof AnalogValueModel) {
            return <PropertyAnalogValue entity={entity} />;
        }
        if (entity instanceof ScaleModel) {
            return <PropertyScale entity={entity} />;
        }
        if (entity instanceof ImageModel) {
            return <PropertyImage entity={entity}/>
        }
    }
}
