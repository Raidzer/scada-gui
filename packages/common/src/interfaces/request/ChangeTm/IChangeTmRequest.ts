import { EntityType } from "src/enums/entity/EntityType";
import { TypeCommand } from "src/enums/entity/TypeCommand";
import { TypeTm } from "src/enums/TypeTm/TypeTm";

export interface IChangeTmRequest {
    idTm: string;
    typeCommand: TypeCommand;
    typeTm: TypeTm;
    time: number;
    bvalue: boolean;
}
