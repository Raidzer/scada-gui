import { IBasePlanOption } from "../entities/IBasePlanOption";
import { IFieldOfView } from "../fieldOfView/IFieldOfView";
import { ILayerResponse } from "./ILayerResponse";

export interface ISelectPlanResponse extends Required<Omit<IBasePlanOption, "fieldOfView" | "layers">> {
    fieldOfView: IFieldOfView;
    layers: ILayerResponse[];
}
