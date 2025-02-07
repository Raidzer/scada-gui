import { IBaseEntityOption } from "../entities/IBaseEntityOption";
import { IEntityStateResponse } from "./IEntityStateResponse";

export interface IEntityItemResponse extends Omit<IBaseEntityOption, "idLayer" | "states"> {
    states: IEntityStateResponse[];
}
