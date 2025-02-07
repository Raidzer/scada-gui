import { EntityType } from "../enums/entity/EntityType";
import { IBaseEntityOption } from "../interfaces/entities/IBaseEntityOption";
import { IBaseStateOption } from "../interfaces/entities/IBaseStateOption";
import { ISubscriptionsTm } from "../interfaces/entities/SubscriptionsTm/ISubscriptionsTm";
import { IEntityItemResponse } from "../interfaces/response/IEntityItemResponse";
import { AnalogValueModel } from "../models/Elements/AnalogValueModel";
import { BaseEntity } from "../models/Elements/BaseEntity";
import { CircleModel } from "../models/Elements/CircleModel";
import { EllipseModel } from "../models/Elements/EllipseModel";
import { ImageModel } from "../models/Elements/ImageModel";
import { LineModel } from "../models/Elements/LineModel";
import { RectangleModel } from "../models/Elements/RectangleModel";
import { ScaleModel } from "../models/Elements/ScaleModel";
import { StarModel } from "../models/Elements/StarModel";
import { TextModel } from "../models/Elements/TextModel";

export class EntityFactory {
    static createEntity(
        entityData: IEntityItemResponse,
        idLayer: string,
        subscribe?: ISubscriptionsTm,
    ): BaseEntity<IBaseStateOption> | null {
        const type = entityData.frame.type as EntityType;
        const baseOption: IBaseEntityOption = {
            id: entityData.id,
            idGroup: entityData.idGroup,
            idPlan: entityData.idPlan,
            idLayer: idLayer,
            name: entityData.name,
            frame: entityData.frame,
            commands: entityData.commands,
            tooltip: entityData.tooltip,
            value: entityData.value,
            subscriptionsTm: subscribe,
            states: [],
        };
        switch (type) {
            case EntityType.Rectangle:
                return new RectangleModel(baseOption, entityData.states);
            case EntityType.Line:
                return new LineModel(baseOption, entityData.states);
            case EntityType.Text:
                return new TextModel(baseOption, entityData.states);
            case EntityType.Circle:
                return new CircleModel(baseOption, entityData.states);
            case EntityType.Ellipse:
                return new EllipseModel(baseOption, entityData.states);
            case EntityType.Star:
                return new StarModel(baseOption, entityData.states);
            case EntityType.Scale:
                return new ScaleModel(baseOption, entityData.states);
            case EntityType.AnalogValue:
                return new AnalogValueModel(baseOption, entityData.states);
            case EntityType.Image:
                return new ImageModel(baseOption, entityData.states);
            default:
                return null;
        }
    }
}
