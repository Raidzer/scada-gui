import { TypeImage } from "@scada/common/enums/TypeImage/TypeImage";
import { IImageResponse } from "@scada/common/interfaces/response/IImagesResponse";

export class PictureModel implements IImageResponse {
    name: string;
    id: string;
    url: string;
    type: TypeImage;

    constructor(data: IImageResponse) {
        this.name = data.name;
        this.id = data.id;
        this.url = data.url;
        this.type = data.type;
    }
}
