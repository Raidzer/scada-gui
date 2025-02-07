import { IEntityItemResponse } from "./IEntityItemResponse";

export interface ILayerResponse {
    id: string;
    scaleMin: number;
    scaleMax: number;
    enable: boolean;
    entities: IEntityItemResponse[];
}