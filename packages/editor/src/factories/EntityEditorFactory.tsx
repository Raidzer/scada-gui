import {
    AnalogValueModel,
    BaseEntity,
    IBaseStateOption,
    ImageModel,
    RectangleModel,
    ScaleModel,
    TextModel,
} from "@scada/common";
import React from "react";
import EditorAnalogValue from "../components/Elements/AnalogValue/EditorAnalogValue";
import Image from "../components/Elements/Image/Image";
import EditorRectangle from "../components/Elements/Rectangle/EditorRectangle";
import EditorScale from "../components/Elements/Scale/EditorScale";
import EditorText from "../components/Elements/Text/EditorText";

export class EntityEditorFactory {
    static createComponent(entity: BaseEntity<IBaseStateOption>): React.ReactNode {
        if (entity instanceof RectangleModel) {
            return <EditorRectangle key={entity.id} entity={entity} />;
        }
        if (entity instanceof TextModel) {
            return <EditorText key={entity.id} entity={entity} />;
        }
        if (entity instanceof ScaleModel) {
            return <EditorScale key={entity.id} entity={entity} />;
        }
        if (entity instanceof AnalogValueModel) {
            return <EditorAnalogValue key={entity.id} entity={entity} />;
        }
        if (entity instanceof ImageModel) {
            return <Image key={entity.id} entity={entity} />;
        }
        return null;
    }
}
