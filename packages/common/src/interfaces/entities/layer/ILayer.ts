import { BaseEntity } from "@scada/common/models/Elements/BaseEntity";
import { ILayerResponse } from "../../response/ILayerResponse";
import { IBaseStateOption } from "../IBaseStateOption";

export interface ILayer extends Omit<ILayerResponse, "entities"> {
    entitiesAllList: Map<string, BaseEntity<IBaseStateOption>>;
}
