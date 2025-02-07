import { TypeImage } from "@scada/common/enums/TypeImage/TypeImage";

export interface IImageResponse {
    name: string;
    id: string;
    url: string;
    type: TypeImage;
}
