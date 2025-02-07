import { IFieldOfView } from "@scada/common/interfaces/fieldOfView/IFieldOfView";

class FieldOfView implements IFieldOfView {
    x: number;
    y: number;
    scale: number;

    constructor({ x, y, scale }: IFieldOfView) {
        this.x = isNaN(x) ? NaN : x;
        this.y = isNaN(y) ? NaN : y;
        this.scale = isNaN(scale) ? NaN : scale;
    }

    get fieldOfView(): IFieldOfView {
        return {
            x: this.x,
            y: this.y,
            scale: this.scale,
        };
    }
}

export default FieldOfView;
