import { IBaseEntityOption } from "../entities/IBaseEntityOption";

export interface ILayerRequest {
    id: string;
    scaleMin: number;
    scaleMax: number;
    enable: boolean;
    entities: Omit<IBaseEntityOption, "idLayer">[];
}
