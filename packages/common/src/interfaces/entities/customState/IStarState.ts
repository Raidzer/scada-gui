import { IBaseStateOption } from "../IBaseStateOption";

export interface IStarState extends IBaseStateOption {
    numPoints: number;
    innerRadius: number;
    outerRadius: number;
}