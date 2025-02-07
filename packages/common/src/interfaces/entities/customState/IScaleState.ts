import { IBaseStateOption } from "../IBaseStateOption";

export interface IScaleState extends IBaseStateOption {
    minValue: number;
    maxValue: number;
    fillScale: string;
}